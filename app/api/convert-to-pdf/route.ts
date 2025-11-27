import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "child_process";

export const runtime = "nodejs"; // ensure Node runtime for child_process/fs

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // read uploaded file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // prepare temp dir and paths
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "conv-"));
    const inputPath = path.join(tmpDir, "input.docx");
    const outputPath = path.join(tmpDir, "input.pdf");

    // write uploaded docx
    fs.writeFileSync(inputPath, buffer);

    // convert using LibreOffice headless
    // ensure 'libreoffice' binary is available in your environment
    execFileSync(
      "libreoffice",
      ["--headless", "--convert-to", "pdf", "--outdir", tmpDir, inputPath],
      { stdio: "inherit", timeout: 120000 }
    );

    if (!fs.existsSync(outputPath)) {
      throw new Error("Conversion failed: PDF not produced");
    }

    const pdfBuffer = fs.readFileSync(outputPath);

    // cleanup temp files
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="filled_billty.pdf"',
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err: any) {
    console.error("convert-to-pdf error:", err);
    return new NextResponse(
      "Conversion failed: " + (err?.message ?? String(err)),
      { status: 500 }
    );
  }
}
