import ClassicDoc from "./templates/ClassicDoc"
import ModernDoc from "./templates/ModernDoc"
import CompactDoc from "./templates/CompactDoc"
import SimpleDoc from "./templates/SimpleDoc"

export default function CVDocument({ cv }) {
  switch (cv.template) {
    case "simple":
      return <SimpleDoc cv={cv} variant="simple" />
    case "modern":
      return <ModernDoc cv={cv} />
    case "compact":
      return <CompactDoc cv={cv} />
    default:
      return <ClassicDoc cv={cv} />
  }
}