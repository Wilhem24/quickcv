import { Link } from "react-router-dom"

const variants = {
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
  secondary: "bg-white text-ink border border-line hover:bg-gray-50",
  ghost: "text-body hover:text-ink",
}

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-6 text-base",
}

export default function Button({
  children,
  variant = "whatsapp",
  size = "md",
  href,
  to,
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}