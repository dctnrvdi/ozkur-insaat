export type UploadProgress = (percent: number) => void;

async function getSignature() {
  const res = await fetch("/api/admin/upload-signature", { method: "POST" });
  if (!res.ok) throw new Error("İmza alınamadı");
  return res.json() as Promise<{
    signature: string;
    timestamp: number;
    folder: string;
    apiKey: string;
    cloudName: string;
  }>;
}

// Büyük telefon fotoğraflarını yüklemeden önce tarayıcıda küçültür,
// böylece yükleme hızı internet bağlantısından bağımsız olarak çok artar.
async function compressImage(
  file: File,
  maxDimension = 2400,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }
  // Zaten küçük dosyaları uğraştırmaya gerek yok.
  if (file.size < 1.5 * 1024 * 1024) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export function uploadToCloudinary(file: File, onProgress?: UploadProgress) {
  return new Promise<string>((resolve, reject) => {
    compressImage(file)
      .then((prepared) =>
        getSignature().then(({ signature, timestamp, folder, apiKey, cloudName }) => {
          const isVideo = prepared.type.startsWith("video/");
          const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${
            isVideo ? "video" : "image"
          }/upload`;

          const formData = new FormData();
          formData.append("file", prepared);
          formData.append("api_key", apiKey);
          formData.append("timestamp", String(timestamp));
          formData.append("signature", signature);
          formData.append("folder", folder);

          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl);

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
              onProgress(Math.round((e.loaded / e.total) * 100));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data.secure_url as string);
              } catch {
                reject(new Error("Yükleme yanıtı okunamadı"));
              }
            } else {
              let message = `Yükleme başarısız (${xhr.status})`;
              try {
                const data = JSON.parse(xhr.responseText);
                if (data?.error?.message) message = data.error.message;
              } catch {
                // yoksay, genel mesajı kullan
              }
              reject(new Error(message));
            }
          };

          xhr.onerror = () => reject(new Error("Yükleme başarısız (ağ hatası)"));
          xhr.send(formData);
        })
      )
      .catch(reject);
  });
}
