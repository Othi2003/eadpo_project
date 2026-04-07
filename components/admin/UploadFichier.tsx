"use client"

import { useState, useRef } from "react"
import { Upload, X, Check } from "lucide-react"

export default function UploadFichier({ value, onChange, label, type }: {
  value: string
  onChange: (url: string) => void
  label: string
  type: "audio" | "video"
}) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptMap = {
    audio: "audio/*,.mp4,.m4a,.mp3,.wav,.ogg,.aac,.wma,.amr",
    video: "video/*,.mov,.avi,.webm,.mkv",
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileType", type)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
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
          display: "flex", alignItems: "flex-start", gap: "0.75rem",
          padding: "0.875rem 1rem", background: "#f0f9f0",
          border: "1.5px solid #86efac", borderRadius: "0.875rem",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "9999px",
            background: "#059669", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0, marginTop: "0.1rem",
          }}>
            <Check size={16} color="white" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#065f46", marginBottom: "0.4rem" }}>
              Fichier {type === "audio" ? "audio" : "vidéo"} uploadé
            </p>
            {type === "audio" && (
              <audio controls src={value} style={{ width: "100%", height: "36px" }} />
            )}
            {type === "video" && (
              <video controls src={value} style={{ width: "100%", maxHeight: "120px", borderRadius: "0.5rem" }} />
            )}
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              padding: "0.4rem", background: "rgba(239,68,68,0.08)",
              border: "none", borderRadius: "0.5rem", cursor: "pointer",
              color: "#DC2626", display: "flex", alignItems: "center", flexShrink: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label style={{
          display: "flex", alignItems: "center", gap: "1rem",
          padding: "1rem 1.25rem",
          border: "2px dashed rgba(21,101,192,0.25)", borderRadius: "0.875rem",
          cursor: uploading ? "not-allowed" : "pointer",
          background: "rgba(21,101,192,0.02)",
        }}>
          {uploading ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2.5"
                style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>Upload en cours...</span>
            </>
          ) : (
            <>
              <div style={{
                width: "36px", height: "36px", borderRadius: "0.625rem",
                background: "rgba(21,101,192,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Upload size={16} color="#1565C0" />
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e3a5f" }}>
                  Choisir un fichier {type === "audio" ? "audio" : "vidéo"}
                </p>
                <p style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                  {type === "audio"
                    ? "MP3, WAV, M4A, OGG, AAC, MP4 (audio)"
                    : "MP4, MOV, AVI, WEBM"} · max 100MB
                </p>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={acceptMap[type]}
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