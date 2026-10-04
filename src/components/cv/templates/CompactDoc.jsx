import { Document, Page, Text, View, Svg, Path, StyleSheet } from "@react-pdf/renderer"

// Change these to restyle the whole template
const DARK = "#2F3744"
const HEADER_H = 120
const RIGHT_W = 160
const MARGIN = 34
const TEXT = "#374151"
const INK = "#111827"
const MUTED = "#6B7280"
const HAIR = "#E5E7EB"

const ICONS = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
}

function Icon({ name }) {
  return (
    <Svg viewBox="0 0 24 24" style={{ width: 9, height: 9 }}>
      <Path d={ICONS[name]} fill="#94A3B8" />
    </Svg>
  )
}

const s = StyleSheet.create({
  // Left padding/right padding reserve space; the right column is positioned absolutely
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.4,
    paddingTop: 36,
    paddingBottom: 34,
    paddingLeft: MARGIN,
    paddingRight: MARGIN + RIGHT_W + 26,
  },

  // Header band (page 1 only)
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_H,
    backgroundColor: DARK,
    paddingHorizontal: MARGIN,
    justifyContent: "center",
  },
  name: { fontSize: 25, fontFamily: "Helvetica-Bold", color: "#FFFFFF", lineHeight: 1.15 },
  title: { fontSize: 11, color: "#CBD5E1", marginTop: 3 },
  contacts: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  contactItem: { flexDirection: "row", alignItems: "center", marginRight: 14, marginBottom: 3 },
  contactText: { fontSize: 8.5, color: "#E5E7EB", marginLeft: 5 },

  // Right column (page 1 only)
  divider: {
    position: "absolute",
    top: HEADER_H + 20,
    right: MARGIN + RIGHT_W + 12,
    width: 0.75,
    height: 842 - HEADER_H - 20 - 28,
    backgroundColor: HAIR,
  },
  right: {
    position: "absolute",
    top: HEADER_H + 26,
    right: MARGIN,
    width: RIGHT_W,
  },
  skillRow: {
    paddingVertical: 4.5,
    borderBottomWidth: 0.75,
    borderBottomColor: HAIR,
    color: INK,
  },

  // Main column
  section: { marginBottom: 14 },
  heading: {
    fontSize: 14,
    color: INK,
    paddingBottom: 4,
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: HAIR,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  itemTitle: { flex: 1, paddingRight: 8, fontFamily: "Helvetica-Bold", color: INK },
  itemDate: { fontSize: 9, color: INK },
  itemSub: { color: MUTED, marginTop: 1 },
  item: { marginBottom: 10 },
  bulletRow: { flexDirection: "row", marginTop: 2.5, paddingLeft: 4 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
})

const lines = (t = "") => t.split("\n").map((x) => x.trim()).filter(Boolean)

export default function CompactDoc({ cv }) {
  const skills = (cv.skills || "").split(",").map((x) => x.trim()).filter(Boolean)
  const certificates = cv.certificates || []
  const contacts = [
    { icon: "mail", value: cv.email },
    { icon: "phone", value: cv.phone },
    { icon: "pin", value: cv.location },
    { icon: "link", value: cv.website },
  ].filter((c) => c.value)

  return (
    <Document title={`${cv.name || "CV"} - CV`} author={cv.name || "QuickCV"}>
      <Page size="A4" style={s.page}>
        {/* Header band */}
        <View style={s.header}>
          <Text style={s.name}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={s.title}>{cv.title}</Text> : null}
          {contacts.length > 0 && (
            <View style={s.contacts}>
              {contacts.map((c, i) => (
                <View key={i} style={s.contactItem}>
                  <Icon name={c.icon} />
                  <Text style={s.contactText}>{c.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right column */}
        {skills.length > 0 && <View style={s.divider} />}
        {skills.length > 0 && (
          <View style={s.right}>
            <Text style={[s.heading, { borderBottomWidth: 0, paddingBottom: 0 }]}>Skills</Text>
            {skills.map((sk, i) => (
              <Text key={i} style={s.skillRow}>
                {sk}
              </Text>
            ))}
          </View>
        )}

        {/* Spacer pushes page-1 content below the header band */}
        <View style={{ height: HEADER_H - 36 + 20 }} />

        {cv.summary ? (
          <View style={s.section}>
            <Text style={s.heading}>Summary</Text>
            <Text>{cv.summary}</Text>
          </View>
        ) : null}

        {cv.experience.length > 0 && (
          <View style={s.section}>
            <Text style={s.heading}>Employment</Text>
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
      </Page>
    </Document>
  )
}