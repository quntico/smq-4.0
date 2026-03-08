import { supabase } from "./supabase"

export async function uploadFile(file, bucket = "media") {
    const fileName = `${Date.now()}_${file.name}`

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { contentType: file.type })

    if (error) throw error

    const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

    return publicUrl.publicUrl
}
