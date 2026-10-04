import { useEffect, useRef, useState } from "react"
import * as pdfjsLib from "pdfjs-dist"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { Loader2 } from "lucide-react"
import { buildPdfBlob } from "../../lib/pdf"

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

function useDebounced(value, ms) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}

export default function PDFPreview({ cv }) {
  const debounced = useDebounced(cv, 500)
  const hostRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState("")

  // Track the container width (it is 0 while the mobile "Preview" tab is hidden)
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      setWidth(Math.round(entries[0].contentRect.width))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!width || !debounced) return
    let cancelled = false

    ;(async () => {
      setBusy(true)
      setError("")
      let task
      try {
        const blob = await buildPdfBlob(debounced)
        const data = await blob.arrayBuffer()
        task = pdfjsLib.getDocument({ data })
        const doc = await task.promise
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const canvases = []

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i)
          const base = page.getViewport({ scale: 1 })
          const viewport = page.getViewport({ scale: (width / base.width) * dpr })
          const canvas = document.createElement("canvas")
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = "100%"
          canvas.style.height = "auto"
          canvas.className = "block bg-white border border-line rounded-md shadow-sm"
          await page.render({
            canvasContext: canvas.getContext("2d"),
            canvas,
            viewport,
          }).promise
          canvases.push(canvas)
        }

        if (cancelled) return
        hostRef.current.replaceChildren(...canvases)
      } catch (e) {
        console.error(e)
        if (!cancelled) setError("Could not draw the preview.")
      } finally {
        if (task) task.destroy()
        if (!cancelled) setBusy(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [debounced, width])

  return (
    <div className="relative">
      {busy && (
        <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-line px-3 py-1 text-xs text-body shadow-sm">
          <Loader2 size={13} className="animate-spin" /> Updating...
        </div>
      )}
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <div ref={hostRef} className="space-y-3 min-h-[300px]" />
    </div>
  )
}