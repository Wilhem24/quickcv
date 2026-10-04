const options = [
  { id: "classic", label: "Classic", note: "Light sidebar" },
  { id: "simple", label: "Simple", note: "Plain, ATS-safe" },
  { id: "modern", label: "Modern", note: "Colored sidebar" },
  { id: "compact", label: "Compact", note: "Dark header,2 columns" },
]

export default function TemplatePicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {options.map((o) => {
        const active = value === o.id
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`rounded-xl border px-3 py-2 text-left transition ${
              active
                ? "border-primary bg-successbg ring-2 ring-primary/30"
                : "border-line bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-semibold text-ink">{o.label}</p>
            <p className="text-[11px] text-muted leading-tight">{o.note}</p>
          </button>
        )
      })}
    </div>
  )
}