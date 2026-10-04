import { MessageCircle, Sparkles, Download } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    text: "Send your details in chat: name, experience, education and skills.",
  },
  {
    icon: Sparkles,
    title: "We format it",
    text: "We clean and design your CV into a professional layout.",
  },
  {
    icon: Download,
    title: "Download PDF",
    text: "Get your clean PDF instantly, ready to send to employers.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 border-y border-line/50">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-14 lg:py-20">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          How it works
        </p>
        <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-ink">
          Three simple steps to your CV
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="bg-white border border-line/70 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-primary text-primary text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}