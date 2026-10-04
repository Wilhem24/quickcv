import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Wand2 } from "lucide-react"
import CVForm from "../components/cv/CVForm"
import PDFPreview from "../components/cv/PDFPreview"
import ActionBar from "../components/cv/ActionBar"
import TemplatePicker from "../components/cv/TemplatePicker"
import { emptyCV, sampleCV } from "../data/sampleCV"

const STORAGE_KEY = "quickcv:draft"

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    // Merge with defaults so drafts saved before new fields existed still work
    return raw ? { ...emptyCV, ...JSON.parse(raw) } : sampleCV
  } catch {
    return sampleCV
  }
}

export default function Builder() {
  const [cv, setCV] = useState(loadDraft)
  const [tab, setTab] = useState("form") // mobile only

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
    } catch {
      /* storage unavailable, ignore */
    }
  }, [cv])

  const goEdit = () => {
    setTab("form")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const setTemplate = (template) => setCV((p) => ({ ...p, template }))

  const clearCV = () => {
    if (window.confirm("Clear everything and start with a blank CV?")) {
      setCV({ ...emptyCV, template: cv.template || "classic" })
    }
  }

  const loadExample = () => {
    if (window.confirm("Replace your current CV with the example?")) {
      setCV({ ...sampleCV, template: cv.template || "classic" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line/50">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-body hover:text-ink">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <span className="text-xl font-bold text-ink">
            Quick<span className="text-primary">CV</span>
          </span>
          <div className="flex items-center gap-4">
            <button type="button" onClick={loadExample} className="text-sm font-medium text-primary hover:underline">
              Example
            </button>
            <button type="button" onClick={clearCV} className="text-sm font-medium text-muted hover:text-ink">
              Clear
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 mt-5">
        <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-successbg px-5 py-3">
          <Wand2 className="text-primary shrink-0" size={20} />
          <p className="text-sm text-ink">
            <span className="font-semibold">Edit on the left,</span> watch your CV update on the right.
          </p>
        </div>
      </div>

      <div className="lg:hidden max-w-[1200px] mx-auto px-4 mt-4">
        <div className="grid grid-cols-2 rounded-xl bg-white border border-line p-1">
          {["form", "preview"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`h-10 rounded-lg text-sm font-semibold capitalize ${
                tab === t ? "bg-primary text-white" : "text-body"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 lg:px-6 py-6 grid lg:grid-cols-2 gap-6 items-start">
        <div className={tab === "form" ? "block" : "hidden lg:block"}>
          <CVForm cv={cv} setCV={setCV} />
        </div>

        <div
          className={`${
            tab === "preview" ? "block" : "hidden lg:block"
          } lg:sticky lg:top-24 space-y-4`}
        >
          <TemplatePicker value={cv.template || "classic"} onChange={setTemplate} />
          <div className="lg:max-h-[62vh] lg:overflow-y-auto rounded-xl">
            <PDFPreview cv={cv} />
          </div>
          <ActionBar cv={cv} onEdit={goEdit} />
        </div>
      </main>
    </div>
  )
}