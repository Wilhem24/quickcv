import { Link } from "react-router-dom"
import { MessageSquareText } from "lucide-react"
import Button from "./Button"
import WhatsAppIcon from "./WhatsAppIcon"
import { WA_LINK } from "../config"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-line/50">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
            <MessageSquareText size={20} />
          </span>
          <span className="text-2xl font-bold text-ink tracking-tight">
            Quick<span className="text-primary">CV</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#how-it-works" className="text-sm font-medium text-body hover:text-ink">
            How it works
          </a>
          <Link to="/builder" className="text-sm font-medium text-body hover:text-ink">
            Build CV
          </Link>
          <a href="#help" className="text-sm font-medium text-body hover:text-ink">
            Help
          </a>
        </nav>

        <Button href={WA_LINK} size="sm" target="_blank" rel="noreferrer">
          <WhatsAppIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Open WhatsApp</span>
          <span className="sm:hidden">Chat</span>
        </Button>
      </div>
    </header>
  )
}