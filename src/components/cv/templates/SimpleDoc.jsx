import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const ACCENT = "#1E40AF"
const INK = "#111827"
const TEXT = "#374151"
const MUTED = "#6B7280"
const LINE = "#D1D5DB"

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: TEXT,
    lineHeight: 1.45,
    paddingTop: 44,
    paddingBottom: 40,
    paddingHorizontal: 44,
  },

  // Header
  header: {
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  name: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
    color: INK,
    textAlign: "center",
    lineHeight: 1.15,
  },
  title: {
    fontSize: 12,
    color: ACCENT,
    textAlign: "center",
    marginTop: 6,
  },
  contact: {
    fontSize: 9,
    color: MUTED,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 1.5,
  },

  // Sections
  section: { marginTop: 18 },
  heading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingBottom: 4,
    marginBottom: 8,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  itemTitle: { flex: 1, paddingRight: 8, fontFamily: "Helvetica-Bold", color: INK },
  itemDate: { fontSize: 9, color: MUTED },
  itemSub: { color: MUTED, marginTop: 1 },
  item: { marginBottom: 9 },
  bulletRow: { flexDirection: "row", marginTop: 2.5, paddingLeft: 6 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
})

const lines = (t = "") => t.split("\n").map((x) => x.trim()).filter(Boolean)

export default function SimpleDoc({ cv }) {
  const contact = [cv.location, cv.email, cv.phone, cv.website].filter(Boolean).join("   |   ")
  const skills = (cv.skills || "").split(",").map((x) => x.trim()).filter(Boolean)
  const certificates = cv.certificates || []

  return (
    <Document title={`${cv.name || "CV"} - CV`} author={cv.name || "QuickCV"}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={s.title}>{cv.title}</Text> : null}
          {contact ? <Text style={s.contact}>{contact}</Text> : null}
        </View>

        {cv.summary ? (
          <View style={s.section}>
            <Text style={s.heading}>Professional Summary</Text>
            <Text>{cv.summary}</Text>
          </View>
        ) : null}

        {cv.experience.length > 0 && (
          <View style={s.section}>
            <Text style={s.heading}>Experience</Text>
            {cv.experience.map((e) => (
              <View key={e.id} style={s.item} wrap={false}>
                <View style={s.rowBetween}>
                  <Text style={s.itemTitle}>{e.role}</Text>
                  {e.period ? <Text style={s.itemDate}>{e.period}</Text> : null}
                </View>
                {e.company ? <Text style={s.itemSub}>{e.company}</Text> : null}
                {lines(e.bullets).map((b, i) => (
                  <View key={i} style={s.bulletRow}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {cv.education.length > 0 && (
          <View style={s.section}>
            <Text style={s.heading}>Education</Text>
            {cv.education.map((d) => (
              <View key={d.id} style={s.item} wrap={false}>
                <View style={s.rowBetween}>
                  <Text style={s.itemTitle}>{d.degree}</Text>
                  {d.year ? <Text style={s.itemDate}>{d.year}</Text> : null}
                </View>
                {d.school ? <Text style={s.itemSub}>{d.school}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {certificates.length > 0 && (
          <View style={s.section}>
            <Text style={s.heading}>Certificates</Text>
            {certificates.map((c) => (
              <View key={c.id} style={s.item} wrap={false}>
                <View style={s.rowBetween}>
                  <Text style={s.itemTitle}>{c.name}</Text>
                  {c.year ? <Text style={s.itemDate}>{c.year}</Text> : null}
                </View>
                {c.issuer ? <Text style={s.itemSub}>{c.issuer}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.heading}>Skills</Text>
            <Text>{skills.join("   •   ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}