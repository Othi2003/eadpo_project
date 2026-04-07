import { v2 as cloudinary } from "cloudinary"
import { NextRequest, NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const fileType = formData.get("fileType") as string ?? "image"

    if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const resourceType = fileType === "image" ? "image" : "video"
    const folder = fileType === "audio" ? "peadpo/audio" : fileType === "video" ? "peadpo/video" : "peadpo"

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          ...(resourceType === "image" && {
            transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
          }),
        },
        (error, result) => {
          if (error || !result) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({ url: result.secure_url, fileType })
  } catch (error) {
    console.error("Erreur upload:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}