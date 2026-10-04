import { Document, Page, Text, View, Svg, Path, StyleSheet } from "@react-pdf/renderer"

const ACCENT = "#3F5A82"
const SIDEBAR_BG = "#F3F5F8"
const SIDEBAR_W = 190
const TEXT = "#374151"
const INK = "#111827"

// Simple 24x24 icons
const ICONS = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
}

function Icon({ name }) {
  return (
    <Svg viewBox="0 0 24 24" style={{ width: 11, height: 11 }}>
      <Path d={ICONS[name]} fill={ACCENT} />
    </Svg>
  )
}

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.4,
    paddingTop: 40,
    paddingBottom: 36,
    paddingLeft: SIDEBAR_W + 26,
    paddingRight: 32,
  },

  // Sidebar
  sidebarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    height: 842,
    backgroundColor: SIDEBAR_BG,
  },
  sidebarTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    height: 120,
    backgroundColor: ACCENT,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: 19, fontFamily: "Helvetica-Bold", color: "#FFFFFF", textAlign: "center" },
  role: { fontSize: 9.5, color: "#DCE6F5", textAlign: "center", marginTop: 5 },
  sidebarBody: {
    position: "absolute",
    top: 140,
    left: 0,
    width: SIDEBAR_W,
    paddingHorizontal: 18,
  },
  sideHeading: {
    fontSize: 13,
    color: ACCENT,
    borderBottomWidth: 0.75,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 4,
    marginBottom: 9,
  },
  contactRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  contactIcon: { width: 18, paddingTop: 1 },
  contactText: { flex: 1, fontSize: 9, color: INK },
  skill: { fontSize: 9.5, color: INK, marginBottom: 4 },

  // Main column
  section: { marginBottom: 16 },
  heading: {
    fontSize: 15,
    color: ACCENT,
    borderBottomWidth: 0.75,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 4,
    marginBottom: 9,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  itemTitle: { flex: 1, paddingRight: 8, fontFamily: "Helvetica-Bold", color: INK },
  itemDate: { fontFamily: "Helvetica-Bold", fontSize: 9, color: INK },
  itemSub: { color: ACCENT, marginTop: 1 },
  item: { marginBottom: 10 },
  bulletRow: { flexDirection: "row", marginTop: 2.5, paddingLeft: 6 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
})

const lines = (t = "") => t.split("\n").map((x) => x.trim()).filter(Boolean)

export default function ClassicDoc({ cv }) {
  const skills = (cv.skills || "").split(",").map((x) => x.trim()).filter(Boolean)
  const certificates = cv.certificates || []
  const contacts = [
    { icon: "mail", value: cv.email },
    { icon: "phone", value: cv.phone },
    { icon: "home", value: cv.location },
    { icon: "link", value: cv.website },
  ].filter((c) => c.value)

  return (
    <Document title={`${cv.name || "CV"} - CV`} author={cv.name || "QuickCV"}>
      <Page size="A4" style={s.page}>
        {/* Sidebar background repeats on every page */}
        <View fixed style={s.sidebarBg} />

        {/* Sidebar content shows on page 1 */}
        <View style={s.sidebarTop}>
          <Text style={s.name}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={s.role}>{cv.title}</Text> : null}
        </View>

        <View style={s.sidebarBody}>
          {contacts.length > 0 && (
            <View style={{ marginBottom: 18 }}>
              <Text style={s.sideHeading}>Personal details</Text>
              {contacts.map((c, i) => (
                <View key={i} style={s.contactRow}>
                  <View style={s.contactIcon}>
                    <Icon name={c.icon} />
                  </View>
                  <Text style={s.contactText}>{c.value}</Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View>
              <Text style={s.sideHeading}>Skills</Text>
              {skills.map((sk, i) => (
                <Text key={i} style={s.skill}>
                  {sk}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main column */}
        {cv.summary ? (
          <View style={s.section}>
            <Text style={s.heading}>Profile</Text>
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