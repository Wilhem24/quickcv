import { Document, Page, Text, View, Svg, Path, StyleSheet } from "@react-pdf/renderer"

// Change these to restyle the whole template
const SIDEBAR = "#0F5F55"
const SIDE_LINE = "#4F8F86"
const SIDE_MUTED = "#CFE5E1"
const ACCENT = "#0F5F55"
const SIDEBAR_W = 185
const TEXT = "#374151"
const INK = "#111827"

const ICONS = {
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
}

function Icon({ name }) {
  return (
    <Svg viewBox="0 0 24 24" style={{ width: 11, height: 11 }}>
      <Path d={ICONS[name]} fill="#FFFFFF" />
    </Svg>
  )
}

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.4,
    paddingTop: 44,
    paddingBottom: 36,
    paddingLeft: SIDEBAR_W + 24,
    paddingRight: 30,
  },

  // Sidebar
  sidebarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    height: 842,
    backgroundColor: SIDEBAR,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    paddingTop: 44,
    paddingHorizontal: 18,
  },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#FFFFFF", lineHeight: 1.2 },
  role: { fontSize: 10, color: SIDE_MUTED, marginTop: 5 },
  contactRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  contactIcon: { width: 18, paddingTop: 1 },
  contactText: { flex: 1, fontSize: 9, color: "#FFFFFF" },
  skill: { fontSize: 9.5, color: "#FFFFFF", marginBottom: 4 },

  // Headings (line runs to the right)
  headingRow: { flexDirection: "row", alignItems: "center", marginBottom: 9 },
  heading: { fontSize: 15, fontFamily: "Helvetica-Bold", color: INK },
  rule: { flex: 1, height: 0.75, backgroundColor: "#D1D5DB", marginLeft: 8 },
  sideHeading: { fontSize: 12.5, color: "#FFFFFF" },
  sideRule: { flex: 1, height: 0.75, backgroundColor: SIDE_LINE, marginLeft: 8 },

  // Main column
  section: { marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 11 },
  date: { width: 88, paddingRight: 8, fontFamily: "Helvetica-Bold", fontSize: 9, color: INK },
  rowBody: { flex: 1 },
  itemTitle: { fontFamily: "Helvetica-Bold", color: INK },
  itemSub: { color: ACCENT, marginTop: 1 },
  bulletRow: { flexDirection: "row", marginTop: 2.5, paddingLeft: 4 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
})

const lines = (t = "") => t.split("\n").map((x) => x.trim()).filter(Boolean)

function Heading({ children, light }) {
  return (
    <View style={s.headingRow}>
      <Text style={light ? s.sideHeading : s.heading}>{children}</Text>
      <View style={light ? s.sideRule : s.rule} />
    </View>
  )
}

function Row({ date, children }) {
  return (
    <View style={s.row} wrap={false}>
      <Text style={s.date}>{date || " "}</Text>
      <View style={s.rowBody}>{children}</View>
    </View>
  )
}

export default function ModernDoc({ cv }) {
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
        {/* Colored strip repeats on every page */}
        <View fixed style={s.sidebarBg} />

        {/* Sidebar content: page 1 only */}
        <View style={s.sidebar}>
          <View style={{ marginBottom: 22 }}>
            <Text style={s.name}>{cv.name || "Your Name"}</Text>
            {cv.title ? <Text style={s.role}>{cv.title}</Text> : null}
          </View>

          {contacts.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Heading light>Details</Heading>
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
              <Heading light>Skills</Heading>
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
            <Heading>Profile</Heading>
            <Text>{cv.summary}</Text>
          </View>
        ) : null}

        {cv.experience.length > 0 && (
          <View style={s.section}>
            <Heading>Employment</Heading>
            {cv.experience.map((e) => (
              <Row key={e.id} date={e.period}>
                <Text style={s.itemTitle}>{e.role}</Text>
                {e.company ? <Text style={s.itemSub}>{e.company}</Text> : null}
                {lines(e.bullets).map((b, i) => (
                  <View key={i} style={s.bulletRow}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.bulletText}>{b}</Text>
                  </View>
                ))}
              </Row>
            ))}
          </View>
        )}

        {cv.education.length > 0 && (
          <View style={s.section}>
            <Heading>Education</Heading>
            {cv.education.map((d) => (
              <Row key={d.id} date={d.year}>
                <Text style={s.itemTitle}>{d.degree}</Text>
                {d.school ? <Text style={s.itemSub}>{d.school}</Text> : null}
              </Row>
            ))}
          </View>
        )}

        {certificates.length > 0 && (
          <View style={s.section}>
            <Heading>Certificates</Heading>
            {certificates.map((c) => (
              <Row key={c.id} date={c.year}>
                <Text style={s.itemTitle}>{c.name}</Text>
                {c.issuer ? <Text style={s.itemSub}>{c.issuer}</Text> : null}
              </Row>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}