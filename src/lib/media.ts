import fs from "fs";
import path from "path";

// Checks whether a file referenced by a /public path (e.g. "/logo.png")
// actually exists on disk at build time. Lets pages fall back to a
// placeholder gracefully until real assets are dropped in.
export function assetExists(publicPath: string): boolean {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}
