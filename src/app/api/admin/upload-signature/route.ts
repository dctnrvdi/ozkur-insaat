import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  let isVideo = false;
  try {
    const body = await req.json();
    isVideo = Boolean(body?.isVideo);
  } catch {
    // gövde yoksa görsel varsayılır
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "ozkur-insaat";
  // HEIC/HEIF gibi tarayıcıların gösteremediği formatları web-uyumlu JPG'ye
  // çeviriyoruz. Video için formatı olduğu gibi bırakıyoruz.
  const format = isVideo ? undefined : "jpg";

  const paramsToSign: Record<string, string | number> = { timestamp, folder };
  if (format) paramsToSign.format = format;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder,
    format: format ?? null,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
