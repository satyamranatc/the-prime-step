"use client";

import { useState, type ChangeEvent } from "react";
import { escapeCsvCell } from "@/lib/certificates/validation";
import type {
  CsvImportCommitResult,
  CsvImportPreview,
  CsvRejectedRow,
} from "@/lib/certificates/types";

const SAMPLE_CSV = [
  "certificateId,studentName,course,courseDuration,issueDate",
  "TPS-2026-000123,Rahul Sharma,Python Programming,3 Months,2026-10-15",
  "TPS-2026-000124,Priya Jain,Java Full Stack,6 Months,2026-10-15",
  "TPS-2026-000125,Aman Verma,MERN Stack Development,6 Months,2026-10-16",
].join("\r\n");

function downloadCsvFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadRejectedCsv(rejected: CsvRejectedRow[], batchLabel: string) {
  const header = [
    "rowNumber",
    "certificateId",
    "studentName",
    "course",
    "courseDuration",
    "issueDate",
    "category",
    "reason",
  ].join(",");

  const rows = rejected.map((r) =>
    [
      String(r.rowNumber),
      r.certificateId,
      r.studentName,
      r.course,
      r.courseDuration,
      r.issueDate,
      r.category,
      r.reason,
    ]
      .map(escapeCsvCell)
      .join(","),
  );

  downloadCsvFile(`rejected-certificates-${batchLabel}.csv`, [header, ...rows].join("\r\n"));
}

export default function BulkCsvImportModal({
  onClose,
  onImported,
}: {
  onClose: () => void;
  onImported: () => void;
}) {
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CsvImportPreview | null>(null);
  const [previewTab, setPreviewTab] = useState<"valid" | "rejected">("valid");
  const [commitResult, setCommitResult] = useState<CsvImportCommitResult | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(null);
    setCommitResult(null);
    setFileName(file.name);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/certificates/import/preview", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Could not validate CSV file.");
        setUploading(false);
        return;
      }

      setPreview(data.preview);
      setPreviewTab(data.preview.validCount > 0 ? "valid" : "rejected");
    } catch {
      setError("Network error while uploading CSV for validation.");
    } finally {
      setUploading(false);
    }
  };

  const handleCommit = async () => {
    if (!preview || preview.validRecords.length === 0) return;
    setError(null);
    setCommitting(true);

    try {
      const res = await fetch("/api/admin/certificates/import/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          records: preview.validRecords,
          rejectedRecords: preview.rejectedRecords,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Import failed. No records were overwritten.");
        setCommitting(false);
        return;
      }

      setCommitResult(data.result);
      onImported();
    } catch {
      setError("Network error while importing certificates. You can safely retry.");
    } finally {
      setCommitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-import-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-xs"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[16px] border border-hairline bg-surface shadow-[var(--elevation-2)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6">
          <div>
            <h2 id="bulk-import-title" className="text-lg font-bold text-ink">
              Bulk CSV Certificate Import
            </h2>
            <p className="text-xs text-ink-muted">
              Prepare in Excel or Google Sheets → Export CSV → Review → Confirm Import
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="grid size-9 place-items-center rounded-[8px] border border-hairline text-ink-muted hover:border-ink hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Step 1: Upload & Template */}
          {!commitResult && (
            <div className="rounded-[8px] border border-hairline bg-canvas p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    1. Upload your student CSV file
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Required columns:{" "}
                    <code className="font-mono text-ink">
                      certificateId,studentName,course,courseDuration,issueDate
                    </code>{" "}
                    (max 5,000 rows, 5 MB)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => downloadCsvFile("the-prime-step-certificates-template.csv", SAMPLE_CSV)}
                  className="inline-flex min-h-[38px] shrink-0 items-center rounded-[8px] border border-hairline bg-surface px-3.5 text-xs font-semibold text-accent hover:border-accent"
                >
                  Download CSV Template ↓
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="press-scale inline-flex min-h-[42px] cursor-pointer items-center rounded-[8px] bg-ink px-4 text-xs font-semibold text-white hover:bg-accent">
                  <span>{uploading ? "Validating CSV..." : "Choose CSV File"}</span>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    disabled={uploading || committing}
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {fileName && (
                  <span className="font-mono text-xs text-ink-muted">{fileName}</span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-[8px] border border-status-danger/35 bg-status-danger/[0.06] px-4 py-3 text-sm text-status-danger"
            >
              {error}
            </div>
          )}

          {/* Step 2: Validation Preview */}
          {preview && !commitResult && (
            <div className="mt-6 space-y-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-[8px] border border-hairline bg-canvas p-3.5">
                  <p className="text-xs text-ink-muted">Total rows</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-ink">
                    {preview.totalRows}
                  </p>
                </div>
                <div className="rounded-[8px] border border-status-success/30 bg-status-success/[0.06] p-3.5">
                  <p className="text-xs text-status-success">Valid records</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-success">
                    {preview.validCount}
                  </p>
                </div>
                <div className="rounded-[8px] border border-status-warning/30 bg-status-warning/[0.06] p-3.5">
                  <p className="text-xs text-status-warning">Duplicate records</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-warning">
                    {preview.duplicateCount}
                  </p>
                </div>
                <div className="rounded-[8px] border border-status-danger/30 bg-status-danger/[0.06] p-3.5">
                  <p className="text-xs text-status-danger">Invalid records</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-danger">
                    {preview.invalidCount}
                  </p>
                </div>
              </div>

              {/* Preview Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-[8px] border border-hairline bg-canvas p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("valid")}
                    className={`rounded-[6px] px-3 py-1.5 ${
                      previewTab === "valid" ? "bg-surface text-ink shadow-2xs" : "text-ink-muted"
                    }`}
                  >
                    Ready to Import ({preview.validCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("rejected")}
                    className={`rounded-[6px] px-3 py-1.5 ${
                      previewTab === "rejected" ? "bg-surface text-ink shadow-2xs" : "text-ink-muted"
                    }`}
                  >
                    Rejected / Skipped ({preview.rejectedRecords.length})
                  </button>
                </div>

                {preview.rejectedRecords.length > 0 && (
                  <button
                    type="button"
                    onClick={() => downloadRejectedCsv(preview.rejectedRecords, "preview")}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Download rejected rows CSV ↓
                  </button>
                )}
              </div>

              {/* Preview Table (capped to first 100 rows in UI for crisp performance) */}
              <div className="max-h-64 overflow-auto rounded-[8px] border border-hairline">
                {previewTab === "valid" ? (
                  preview.validRecords.length === 0 ? (
                    <p className="p-6 text-center text-sm text-ink-muted">
                      No valid new records found to import.
                    </p>
                  ) : (
                    <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                      <thead className="sticky top-0 border-b border-hairline bg-canvas text-ink-muted">
                        <tr>
                          <th className="px-3 py-2.5">Row</th>
                          <th className="px-3 py-2.5">Certificate ID</th>
                          <th className="px-3 py-2.5">Student Name</th>
                          <th className="px-3 py-2.5">Course</th>
                          <th className="px-3 py-2.5">Duration</th>
                          <th className="px-3 py-2.5">Issue Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {preview.validRecords.slice(0, 100).map((r) => (
                          <tr key={`${r.rowNumber}-${r.certificateId}`}>
                            <td className="tabular-nums px-3 py-2 text-ink-muted">{r.rowNumber}</td>
                            <td className="font-mono px-3 py-2 font-semibold text-ink">
                              {r.certificateId}
                            </td>
                            <td className="px-3 py-2 text-ink">{r.studentName}</td>
                            <td className="px-3 py-2 text-ink">{r.course}</td>
                            <td className="px-3 py-2 text-ink-muted">{r.courseDuration}</td>
                            <td className="tabular-nums px-3 py-2 text-ink-muted">{r.issueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                ) : preview.rejectedRecords.length === 0 ? (
                  <p className="p-6 text-center text-sm text-status-success">
                    All rows passed validation with zero duplicates or errors.
                  </p>
                ) : (
                  <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                    <thead className="sticky top-0 border-b border-hairline bg-canvas text-ink-muted">
                      <tr>
                        <th className="px-3 py-2.5">Row</th>
                        <th className="px-3 py-2.5">Certificate ID</th>
                        <th className="px-3 py-2.5">Student</th>
                        <th className="px-3 py-2.5">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline">
                      {preview.rejectedRecords.slice(0, 100).map((r) => (
                        <tr key={`${r.rowNumber}-${r.certificateId}-${r.reason}`}>
                          <td className="tabular-nums px-3 py-2 text-ink-muted">{r.rowNumber}</td>
                          <td className="font-mono px-3 py-2 font-semibold text-ink">
                            {r.certificateId || "—"}
                          </td>
                          <td className="px-3 py-2 text-ink">{r.studentName || "—"}</td>
                          <td className="px-3 py-2 font-medium text-status-danger">{r.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Final Import Report */}
          {commitResult && (
            <div className="space-y-5">
              <div className="rounded-[8px] border border-status-success/35 bg-status-success/[0.07] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-status-success">
                  Import Complete · {commitResult.batchId}
                </p>
                <p className="mt-1 text-sm text-ink">
                  All imported certificates are immediately live on{" "}
                  <span className="font-mono font-medium">/verify-certificate</span>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-[8px] border border-hairline bg-canvas p-4">
                  <p className="text-xs text-ink-muted">Successfully imported</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-success">
                    {commitResult.importedCount}
                  </p>
                </div>
                <div className="rounded-[8px] border border-hairline bg-canvas p-4">
                  <p className="text-xs text-ink-muted">Duplicates skipped</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-warning">
                    {commitResult.duplicatesSkipped}
                  </p>
                </div>
                <div className="rounded-[8px] border border-hairline bg-canvas p-4">
                  <p className="text-xs text-ink-muted">Invalid records</p>
                  <p className="tabular-nums mt-1 text-2xl font-bold text-status-danger">
                    {commitResult.invalidCount}
                  </p>
                </div>
              </div>

              {commitResult.rejectedRecords.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-hairline bg-canvas p-4">
                  <p className="text-xs text-ink">
                    {commitResult.rejectedRecords.length} row(s) were skipped or rejected. Download the report to fix and re-upload safely.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      downloadRejectedCsv(commitResult.rejectedRecords, commitResult.batchId)
                    }
                    className="inline-flex min-h-[38px] items-center rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-accent hover:border-accent"
                  >
                    Download Rejected Records CSV ↓
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-hairline bg-canvas/60 px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-ink hover:border-ink"
          >
            {commitResult ? "Done" : "Cancel"}
          </button>

          {preview && !commitResult && (
            <button
              type="button"
              disabled={committing || preview.validCount === 0}
              onClick={handleCommit}
              className="press-scale min-h-[42px] rounded-full bg-accent px-6 text-xs font-semibold text-accent-ink hover:bg-accent-hover disabled:opacity-50"
            >
              {committing
                ? "Importing certificates..."
                : `Import ${preview.validCount} Certificate${preview.validCount === 1 ? "" : "s"}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
