import { Plus, Trash2 } from "lucide-react"

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-line bg-white text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block mb-1 text-xs font-medium text-body">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-red-600">{hint}</span>}
    </label>
  )
}

function Card({ title, action, children }) {
  return (
    <div className="bg-white border border-line/70 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function AddBtn({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      <Plus size={16} /> {label}
    </button>
  )
}

function RemoveBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
    >
      <Trash2 size={14} /> Remove
    </button>
  )
}

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

export default function CVForm({ cv, setCV }) {
  const set = (field, value) => setCV((p) => ({ ...p, [field]: value }))

  const setItem = (list, id, field, value) =>
    setCV((p) => ({
      ...p,
      [list]: p[list].map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))

  const addItem = (list, blank) =>
    setCV((p) => ({ ...p, [list]: [...p[list], { id: newId(), ...blank }] }))

  const removeItem = (list, id) =>
    setCV((p) => ({ ...p, [list]: p[list].filter((it) => it.id !== id) }))

  const emailBad = cv.email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(cv.email.trim())

  return (
    <div className="space-y-5">
      <Card title="Personal details">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Full name">
            <input className={inputCls} value={cv.name} onChange={(e) => set("name", e.target.value)} placeholder="Alex Morgan" />
          </Field>
          <Field label="Job title">
            <input className={inputCls} value={cv.title} onChange={(e) => set("title", e.target.value)} placeholder="Product Designer" />
          </Field>
          <Field label="Email" hint={emailBad ? "This email address looks incomplete." : ""}>
            <input
              type="email"
              className={`${inputCls} ${emailBad ? "border-red-400" : ""}`}
              value={cv.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Field label="Phone">
            <input className={inputCls} value={cv.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+263 77 000 0000" />
          </Field>
          <Field label="Address">
            <input className={inputCls} value={cv.location} onChange={(e) => set("location", e.target.value)} placeholder="Harare, Zimbabwe" />
          </Field>
          <Field label="Website or LinkedIn (optional)">
            <input className={inputCls} value={cv.website} onChange={(e) => set("website", e.target.value)} placeholder="linkedin.com/in/yourname" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Professional summary">
              <textarea
                rows={4}
                className={inputCls}
                value={cv.summary}
                onChange={(e) => set("summary", e.target.value)}
                placeholder="2-3 sentences about who you are and what you do best"
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card
        title="Experience"
        action={
          <AddBtn
            label="Add"
            onClick={() => addItem("experience", { role: "", company: "", period: "", bullets: "" })}
          />
        }
      >
        {cv.experience.length === 0 && <p className="text-sm text-muted">No experience added yet.</p>}
        <div className="space-y-5">
          {cv.experience.map((e) => (
            <div key={e.id} className="space-y-3 pb-5 border-b border-line/60 last:border-0 last:pb-0">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Role">
                  <input className={inputCls} value={e.role} onChange={(ev) => setItem("experience", e.id, "role", ev.target.value)} />
                </Field>
                <Field label="Company">
                  <input className={inputCls} value={e.company} onChange={(ev) => setItem("experience", e.id, "company", ev.target.value)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Period">
                    <input className={inputCls} value={e.period} onChange={(ev) => setItem("experience", e.id, "period", ev.target.value)} placeholder="Feb 2022 - Present" />
                  </Field>
                </div>
              </div>
              <Field label="What did you do? (one achievement per line)">
                <textarea
                  rows={4}
                  className={inputCls}
                  value={e.bullets}
                  onChange={(ev) => setItem("experience", e.id, "bullets", ev.target.value)}
                  placeholder="e.g. Repaired and serviced 30+ laptops a month"
                />
              </Field>
              <RemoveBtn onClick={() => removeItem("experience", e.id)} />
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Education"
        action={<AddBtn label="Add" onClick={() => addItem("education", { degree: "", school: "", year: "" })} />}
      >
        {cv.education.length === 0 && <p className="text-sm text-muted">No education added yet.</p>}
        <div className="space-y-5">
          {cv.education.map((d) => (
            <div key={d.id} className="space-y-3 pb-5 border-b border-line/60 last:border-0 last:pb-0">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Qualification">
                  <input className={inputCls} value={d.degree} onChange={(ev) => setItem("education", d.id, "degree", ev.target.value)} />
                </Field>
                <Field label="School">
                  <input className={inputCls} value={d.school} onChange={(ev) => setItem("education", d.id, "school", ev.target.value)} />
                </Field>
                <Field label="Year">
                  <input className={inputCls} value={d.year} onChange={(ev) => setItem("education", d.id, "year", ev.target.value)} />
                </Field>
              </div>
              <RemoveBtn onClick={() => removeItem("education", d.id)} />
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Certificates"
        action={<AddBtn label="Add" onClick={() => addItem("certificates", { name: "", issuer: "", year: "" })} />}
      >
        {cv.certificates.length === 0 && <p className="text-sm text-muted">No certificates added yet.</p>}
        <div className="space-y-5">
          {cv.certificates.map((c) => (
            <div key={c.id} className="space-y-3 pb-5 border-b border-line/60 last:border-0 last:pb-0">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Certificate">
                  <input className={inputCls} value={c.name} onChange={(ev) => setItem("certificates", c.id, "name", ev.target.value)} />
                </Field>
                <Field label="Issued by">
                  <input className={inputCls} value={c.issuer} onChange={(ev) => setItem("certificates", c.id, "issuer", ev.target.value)} />
                </Field>
                <Field label="Year">
                  <input className={inputCls} value={c.year} onChange={(ev) => setItem("certificates", c.id, "year", ev.target.value)} />
                </Field>
              </div>
              <RemoveBtn onClick={() => removeItem("certificates", c.id)} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Skills">
        <Field label="Separate skills with commas (you can include languages here too)">
          <textarea
            rows={3}
            className={inputCls}
            value={cv.skills}
            onChange={(e) => set("skills", e.target.value)}
            placeholder="Figma, Prototyping, Communication, English, Shona"
          />
        </Field>
      </Card>
    </div>
  )
}