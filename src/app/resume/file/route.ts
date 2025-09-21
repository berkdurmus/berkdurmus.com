import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const shouldDownload = url.searchParams.get("download") === "1";

    const resumePath = path.join(
      process.cwd(),
      "src",
      "resume",
      "Berk-Durmus_resume.pdf"
    );

    const buffer = await fs.readFile(resumePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${
          shouldDownload ? "attachment" : "inline"
        }; filename="Berk-Durmus_resume.pdf"`,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Resume not found", { status: 404 });
  }
}
