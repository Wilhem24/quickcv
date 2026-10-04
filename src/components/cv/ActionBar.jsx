import { useState } from "react"
import { Download, Pencil, Loader2 } from "lucide-react"
import Button from "../Button"
import WhatsAppIcon from "../WhatsAppIcon"
import { buildPdfBlob, cvFileName } from "../../lib/pdf"

export default function ActionBar({ cv, onEdit }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const hasName = () => {
    if (!cv.name.trim()) {
      setError("Add your full name before downloading or sharing.")
      return false
    }
    return true
  }

  const download = async () => {
    setError("")
    if (!hasName()) return
    setBusy(true)
    try {
      const blob = await buildPdfBlob(cv)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = cvFileName(cv)
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
      console.error(e)
      setError("Could not create the PDF. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const share = async () => {
    setError("")
    if (!hasName()) return
    try {
      const blob = await buildPdfBlob(cv)
      const file = new File([blob], cvFileName(cv), { type: "application/pdf" })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "My CV" })
        return
      }
    } catch (e) {
      if (e?.name === "AbortError") return
      console.error(e)
    }
    const text = encodeURIComponent(`Hi, here is my CV: ${cv.name}`.trim())
    window.open(`https://wa.me/?text=${text}`, "_blank", "noreferrer")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={download} disabled={busy} variant="whatsapp" size="lg" className="bg-primary sm:flex-1">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {busy ? "Creating..." : "Download PDF"}
        </Button>
        <Button onClick={onEdit} variant="secondary" size="lg" className="sm:w-28">
          <Pencil size={16} /> Edit
        </Button>
        <Button onClick={share} variant="whatsapp" size="lg" className="sm:flex-1">
          <WhatsAppIcon className="w-5 h-5" /> Share on WhatsApp
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}