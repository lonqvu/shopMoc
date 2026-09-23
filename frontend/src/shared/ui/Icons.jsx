import {
  ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Headphones, Heart, Leaf, Mail, MapPin, Menu, MessageCircle, Minus, Phone, Plus,
  Search, ShieldCheck, ShoppingBag, Star, Trash2, Truck, UserRound, X,
} from 'lucide-react'

const icons = {
  arrow: ArrowRight, arrowLeft: ArrowLeft, cart: ShoppingBag, check: Check, chevronDown: ChevronDown, close: X,
  headset: Headphones, heart: Heart, leaf: Leaf, menu: Menu,
  mail: Mail, map: MapPin, message: MessageCircle, minus: Minus, phone: Phone, plus: Plus, search: Search, shield: ShieldCheck,
  star: Star, trash: Trash2, truck: Truck, user: UserRound,
  up: ChevronUp,
}

export function Icon({ name, size = 20, className = '' }) {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} className={className} strokeWidth={1.7} aria-hidden="true" />
}
