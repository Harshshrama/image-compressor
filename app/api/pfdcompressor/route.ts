import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { PDFDocument } = await import("pdf-lib"); // dynamic import

    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

    return new Response(compressedBytes, {
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (err: any) {
    console.error("PDF Compression API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}