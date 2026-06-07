import { supabase } from "./supabase"

export async function uploadFile(file, bucket = "media") {
    // Sanitizar el nombre del archivo eliminando caracteres especiales y espacios
    const extension = file.name.split('.').pop();
    const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
    const cleanBaseName = baseName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Reemplazar caracteres especiales y espacios por guiones bajos
        .replace(/_{2,}/g, '_'); // Reducir guiones bajos consecutivos
    
    const fileName = `${Date.now()}_${cleanBaseName}.${extension}`;

    // Resolver contentType si viene vacío (común en Windows para formatos modernos)
    let contentType = file.type;
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
        .upload(fileName, file, { 
            contentType,
            cacheControl: '3600',
            upsert: false
        });

    if (error) throw error

    const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

    return publicUrl.publicUrl
}
