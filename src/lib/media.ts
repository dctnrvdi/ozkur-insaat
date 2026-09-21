import fs from "fs";
import path from "path";

// A media value can be a remote URL (Cloudinary) or a /public-relative path.
// Remote URLs are assumed valid; local paths are checked on disk so pages
// can fall back to a placeholder gracefully until real assets are set.
export function assetExists(value: string | null | undefined): boolean {
  if (!value) return false;
  if (/^https?:\/\//.test(value)) return true;
  try {
    const filePath = path.join(process.cwd(), "public", value.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
