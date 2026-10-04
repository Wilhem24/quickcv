import { pdf } from "@react-pdf/renderer"
import CVDocument from "../components/cv/CVDocument"

export function cvFileName(cv) {
  const base = (cv.name || "My").trim().replace(/[^a-z0-9]+/gi, "_")
  return `${base}_CV.pdf`
}

export async function buildPdfBlob(cv) {
  return pdf(<CVDocument cv={cv} />).toBlob()
}