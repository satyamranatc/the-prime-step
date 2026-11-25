import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import {
  buildVerificationUrl,
  normalizeCertificateId,
} from "@/lib/certificates/validation";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const col = await getCertificatesCollection();

    const doc = ObjectId.isValid(id)
      ? await col.findOne({ _id: new ObjectId(id) }, { projection: { certificateId: 1 } })
      : await col.findOne(
          { certificateId: normalizeCertificateId(id) },
          { projection: { certificateId: 1 } },
        );

    if (!doc) {
      return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") === "svg" ? "svg" : "png";
    const verifyUrl = buildVerificationUrl(doc.certificateId);

    if (format === "svg") {
      const svg = await QRCode.toString(verifyUrl, {
        type: "svg",
        width: 512,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: "#0B1220", light: "#FFFFFF" },
      });
      return new NextResponse(svg, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Content-Disposition": `attachment; filename="${doc.certificateId}-qr.svg"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const pngBuffer = await QRCode.toBuffer(verifyUrl, {
      type: "png",
      width: 1024,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#0B1220", light: "#FFFFFF" },
    });

    return new NextResponse(new Uint8Array(pngBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${doc.certificateId}-qr.png"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[TPS_QR_GENERATE_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Failed to generate QR code." }, { status: 500 });
  }
}
