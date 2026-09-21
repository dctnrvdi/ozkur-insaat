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

export function uploadToCloudinary(file: File, onProgress?: UploadProgress) {
  return new Promise<string>((resolve, reject) => {
    getSignature()
      .then(({ signature, timestamp, folder, apiKey, cloudName }) => {
        const isVideo = file.type.startsWith("video/");
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${
          isVideo ? "video" : "image"
        }/upload`;

        const formData = new FormData();
        formData.append("file", file);
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
            reject(new Error("Yükleme başarısız"));
          }
        };

        xhr.onerror = () => reject(new Error("Yükleme başarısız (ağ hatası)"));
        xhr.send(formData);
      })
      .catch(reject);
  });
}
