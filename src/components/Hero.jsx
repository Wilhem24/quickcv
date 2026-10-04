import Button from "./Button"
import WhatsAppIcon from "./WhatsAppIcon"
import PhoneMockup from "./PhoneMockup"
import { WA_LINK } from "../config"
import { FileText } from "lucide-react"

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-6 py-10 lg:py-12 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-[32px] leading-[44px] lg:text-5xl lg:leading-[1.15] font-bold text-ink tracking-tight">
          Your CV in 2 Minutes via <span className="text-primary">WhatsApp</span>
        </h1>

        <p className="mt-4 text-base leading-6 lg:text-lg lg:leading-7 text-body max-w-xl">
          No sign-up. Just chat. Get a professional PDF ready to download in minutes.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button to="/builder" size="md">
            <FileText size={18} />
            Build my CV
          </Button>
          <Button href={WA_LINK} target="_blank" rel="noreferrer" variant="secondary" size="md">
            <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
            Chat on WhatsApp
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted">
          Free • No account required • PDF download
        </p>
      </div>

      <PhoneMockup />
    </section>
  )
}