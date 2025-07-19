import type React from "react"
import * as LucideIcons from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faDiscord, faTwitter, faYoutube, faTiktok, faReddit } from "@fortawesome/free-brands-svg-icons"
import {
  faHome,
  faScroll,
  faQuestionCircle,
  faUserCircle,
  faMessage,
  faShoppingCart,
  faBars,
  faTimes,
  faChevronRight,
  faSearch,
  faExclamationTriangle,
  faGamepad,
  faFileAlt,
  faWrench,
  faUsers,
  faArrowRight,
  faFrown,
  faCalendarAlt,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faSignOutAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons"

// Add Font Awesome icons to the library
library.add(
  faDiscord,
  faTwitter,
  faYoutube,
  faTiktok,
  faReddit, // Add faReddit here
  faHome,
  faScroll,
  faQuestionCircle,
  faUserCircle,
  faMessage,
  faShoppingCart,
  faBars,
  faTimes,
  faChevronRight,
  faSearch,
  faExclamationTriangle,
  faGamepad,
  faFileAlt,
  faWrench,
  faUsers,
  faArrowRight,
  faFrown,
  faCalendarAlt,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faSignOutAlt,
  faExclamationCircle,
)

// Map Lucide icon names to their components
const lucideIconMap: { [key: string]: React.ElementType } = LucideIcons

// Map Font Awesome icon names to their components
const faIconMap: { [key: string]: any } = {
  Discord: faDiscord,
  Twitter: faTwitter,
  Youtube: faYoutube,
  TikTok: faTiktok,
  Reddit: faReddit, // Add Reddit icon mapping
  Home: faHome,
  ScrollText: faFileAlt,
  HelpCircle: faQuestionCircle,
  UserRound: faUserCircle,
  MessageSquare: faMessage,
  ShoppingCart: faShoppingCart,
  Menu: faBars,
  X: faTimes,
  ChevronRight: faChevronRight,
  Search: faSearch,
  AlertTriangle: faExclamationTriangle,
  Gamepad: faGamepad,
  Wrench: faWrench,
  Users: faUsers,
  ArrowRight: faArrowRight,
  Frown: faFrown,
  CalendarIcon: faCalendarAlt,
  Loader2: faSpinner,
  CheckCircle: faCheckCircle,
  XCircle: faTimesCircle,
  LogOut: faSignOutAlt,
  AlertCircle: faExclamationCircle,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  size?: number
  className?: string
  library?: "lucide" | "fa" // Explicitly choose library
}

export function Icon({ name, size = 24, className, library: preferredLibrary, ...props }: IconProps) {
  // Try Lucide first if no preference or preferred is lucide
  if (!preferredLibrary || preferredLibrary === "lucide") {
    const LucideComponent = lucideIconMap[name]
    if (LucideComponent) {
      return <LucideComponent size={size} className={className} {...props} />
    }
  }

  // If Lucide not found or preferred is fa, try Font Awesome
  if (preferredLibrary === "fa" || !lucideIconMap[name]) {
    // Fallback to FA if Lucide not found
    const FaComponent = faIconMap[name]
    if (FaComponent) {
      // Font Awesome size prop works differently (e.g., '1x', '2x', or pixel values)
      // We'll pass the pixel size directly, which FA can handle.
      return (
        <FontAwesomeIcon icon={FaComponent} style={{ width: size, height: size }} className={className} {...props} />
      )
    }
  }

  // Fallback if icon not found in either
  console.warn(`Icon "${name}" not found in Lucide or Font Awesome. Using fallback.`)
  return <LucideIcons.HelpCircle size={size} className={className} {...props} /> // Default fallback
}
