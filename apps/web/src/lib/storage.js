import { supabase } from "./supabase"

function compressImage(file, maxWidth = 1920, quality = 0.82) {
    return new Promise((resolve) => {
        // Skip files that are not images, or are gifs, svgs, or icons
        if (!file.type || !file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml' || file.name.endsWith('.ico')) {
            return resolve(file);
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Adjust dimensions while maintaining aspect ratio
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        return resolve(file);
                    }
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const compressedFile = new File([blob], `${baseName}.webp`, {
                        type: "image/webp",
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, "image/webp", quality);
            };
            img.onerror = () => resolve(file);
        };
        reader.onerror = () => resolve(file);
    });
}

export async function uploadFile(file, bucket = "media") {
    let targetFile = file;
    if (file.type && file.type.startsWith('image/')) {
        try {
            targetFile = await compressImage(file);
        } catch (e) {
            console.warn("[Storage] Error compressing image, uploading raw file instead:", e);
        }
    }

    // Sanitizar el nombre del archivo eliminando caracteres especiales y espacios
    const extension = targetFile.name.split('.').pop();
    const baseName = targetFile.name.substring(0, targetFile.name.lastIndexOf('.'));
    const cleanBaseName = baseName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Reemplazar caracteres especiales y espacios por guiones bajos
        .replace(/_{2,}/g, '_'); // Reducir guiones bajos consecutivos
    
    const fileName = `${Date.now()}_${cleanBaseName}.${extension}`;

    // Resolver contentType si viene vacío (común en Windows para formatos modernos)
    let contentType = targetFile.type;
    if (!contentType) {
        const ext = extension.toLowerCase();
        const mimeTypes = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'webp': 'image/webp',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'bmp': 'image/bmp',
            'tiff': 'image/tiff',
            'heic': 'image/heic',
            'heif': 'image/heif',
            'jfif': 'image/jpeg',
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
            'mov': 'video/quicktime',
            'avi': 'video/x-msvideo'
        };
        contentType = mimeTypes[ext] || 'application/octet-stream';
    }

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, targetFile, { 
            contentType,
            cacheControl: 'public, max-age=31536000, immutable',
            upsert: false
        });

    if (error) throw error

    const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

    return publicUrl.publicUrl
}
