"use client"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

async function compresserImage(file: File, maxMB = 8): Promise<File> {
  return new Promise((resolve) => {
    const img = document.createElement("img")
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement("canvas")
      let { width, height } = img

      // Réduire la taille si trop grande
      const maxDim = 2000
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = Math.round(height * maxDim / width); width = maxDim }
        else { width = Math.round(width * maxDim / height); height = maxDim }
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, width, height)

      // Compresser en JPEG avec qualité 0.85
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }))
        },
        "image/jpeg",
        0.85
      )
    }
    img.src = url
  })
}

export default function UploadButton({ value, onChange, label = "Photo" }: {
  value: string; onChange: (url: string) => void; label?: string
}) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    try {
      const compressed = await compresserImage(file)

      const formData = new FormData()
      formData.append("file", compressed)
      formData.append("fileType", "image")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.url) onChange(data.url)
      else throw new Error("Pas d'URL retournée")
    } catch (err) {
      console.error("Erreur upload:", err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.75rem", fontWeight: 700,
        color: "#374151", marginBottom: "0.5rem",
        letterSpacing: "0.05em", textTransform: "uppercase" as const,
      }}>
        {label}
      </label>

      {value ? (
        <div style={{
          position: "relative", width: "120px", height: "120px",
          borderRadius: "1rem", overflow: "hidden",
          border: "2px solid rgba(21,101,192,0.2)",
        }}>
          <Image src={value} alt="upload" fill className="object-contain" />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute", top: "4px", right: "4px",
              background: "rgba(0,0,0,0.5)", border: "none",
              borderRadius: "9999px", width: "24px", height: "24px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={12} color="white" />
          </button>
        </div>
      ) : (
        <label style={{
          display: "flex", flexDirection: "column" as const,
          alignItems: "center", justifyContent: "center", gap: "0.5rem",
          width: "120px", height: "120px",
          border: "2px dashed rgba(21,101,192,0.3)", borderRadius: "1rem",
          cursor: uploading ? "not-allowed" : "pointer",
          background: "rgba(21,101,192,0.03)",
        }}>
          {uploading ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2.5"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>Upload...</span>
            </>
          ) : (
            <>
              <Upload size={20} color="#1565C0" />
              <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>Choisir</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}