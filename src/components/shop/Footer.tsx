import { Instagram, MapPin, Phone } from "lucide-react";
import { business, mapsLink, whatsappLink } from "@/config/business";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-10 bg-brand-dark text-brand-dark-foreground">
      <div className="mx-auto max-w-5xl space-y-4 px-5 py-8">
        <div className="flex items-center gap-3">
          <Logo className="h-14 w-14 ring-2 ring-gold" />
          <div>
            <p className="font-display text-xl font-bold">{business.name}</p>
            <p className="text-sm text-gold">{business.slogan}</p>
          </div>
        </div>
        <a href={mapsLink} target="_blank" rel="noreferrer" className="flex gap-2 text-sm opacity-90"><MapPin className="h-5 w-5 shrink-0" />{business.address}</a>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex gap-2 text-sm opacity-90"><Phone className="h-5 w-5" />{business.phoneDisplay}</a>
        <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="flex gap-2 text-sm opacity-90"><Instagram className="h-5 w-5" />{business.instagramHandle}</a>
        <p className="pt-2 text-xs opacity-60">© {new Date().getFullYear()} {business.name}. Algumas fotos são ilustrativas.</p>
      </div>
    </footer>
  );
}
