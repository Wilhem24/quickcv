function Section({ title, children }) {
  return (
    <section className="mt-5">
      <h3 className="text-[13px] font-bold tracking-wide text-blue-800 uppercase border-b border-line/70 pb-1">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  )
}

export default function CVPreview({ cv }) {
  const contact = [cv.title, cv.location, cv.email, cv.phone].filter(Boolean).join(" • ")
  const skills = cv.skills.split(",").map((s) => s.trim()).filter(Boolean)

  return (
    <div className="bg-white border border-line rounded-xl shadow-sm p-6 sm:p-8 text-ink min-h-[560px]">
      <header className="text-center">
        <h2 className="text-2xl font-bold">{cv.name || "Your Name"}</h2>
        <p className="mt-1 text-xs text-body">{contact || "Role • City • Email • Phone"}</p>
      </header>

      {cv.summary && (
        <Section title="Professional Summary">
          <p className="text-[13px] leading-5 text-body">{cv.summary}</p>
        </Section>
      )}

      {cv.experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-4">
            {cv.experience.map((e) => (
              <div key={e.id}>
                <p className="text-sm font-semibold">
                  {e.role || "Role"}
                  {e.company && ` — ${e.company}`}
                  {e.period && ` • ${e.period}`}
                </p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {e.bullets
                    .split("\n")
                    .map((b) => b.trim())
                    .filter(Boolean)
                    .map((b, i) => (
                      <li key={i} className="text-[13px] leading-5 text-body">
                        {b}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {cv.education.length > 0 && (
        <Section title="Education">
          <div className="space-y-2">
            {cv.education.map((d) => (
              <p key={d.id} className="text-sm">
                <span className="font-semibold">{d.degree || "Qualification"}</span>
                {d.school && ` — ${d.school}`}
                {d.year && ` • ${d.year}`}
              </p>
            ))}
          </div>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-gray-100 border border-line/70 text-xs text-body">
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}