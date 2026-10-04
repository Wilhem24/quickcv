import { MessageSquareText, Download, FileText } from "lucide-react"

function Bubble({ children, from = "bot" }) {
  const isUser = from === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-snug shadow-sm ${
          isUser ? "bg-[#DCF8C6] text-ink rounded-tr-none" : "bg-white text-ink rounded-tl-none"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px] h-[560px] sm:h-[540px] rounded-[40px] border-[10px] border-ink bg-white shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-whatsapp h-14 px-4 flex items-center gap-2 text-white">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquareText size={16} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">QuickCV</p>
          <p className="text-[11px] opacity-90">online</p>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-[#ECE5DD] h-full p-4 space-y-3">
        <Bubble>Hi! I'm QuickCV 👋 I'll turn your chat into a clean PDF CV.</Bubble>
        <Bubble from="user">Hi, I need a CV for a Product Manager role</Bubble>
        <Bubble>Got it! Send your name, experience and skills...</Bubble>
      </div>

      {/* PDF card */}
      <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-2xl p-4 shadow-[0_-6px_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={18} className="text-primary" />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-ink">CV — John Doe</p>
            <p className="text-[12px] text-muted">Product Manager</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-1.5 rounded bg-gray-200" />
          <div className="h-1.5 rounded bg-gray-200 w-11/12" />
          <div className="h-1.5 rounded bg-gray-200 w-4/5" />
        </div>
        <button className="w-full h-9 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2">
          <Download size={16} /> Download PDF
        </button>
      </div>
    </div>
  )
}