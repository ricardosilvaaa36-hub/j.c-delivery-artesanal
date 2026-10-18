import { Clock, Instagram, MapPin, MessageCircle, Navigation, Phone, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { business, mapsLink, whatsappLink } from "@/config/business";
import { ui, useUI } from "@/lib/ui-store";
import { Logo } from "./Logo";

export function SideMenu() {
  const { menu } = useUI();
  const row = "flex items-start gap-3 rounded-2xl bg-muted p-3.5";
  return (
    <Sheet open={menu} onOpenChange={(o) => ui.set({ menu: o })}>
      <SheetContent side="left" className="w-[86%] max-w-sm overflow-y-auto p-0 [&>button]:hidden">
        <div className="relative bg-brand-dark px-5 pb-6 pt-8 text-center text-brand-dark-foreground">
          <button aria-label="Fechar menu" onClick={() => ui.set({ menu: false })} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-destructive text-destructive-foreground">
            <X className="h-5 w-5" />
          </button>
          <Logo className="mx-auto h-28 w-28 ring-4 ring-gold" />
          <SheetTitle className="mt-3 font-display text-2xl text-brand-dark-foreground">{business.name}</SheetTitle>
          <SheetDescription className="text-sm text-gold">{business.slogan}</SheetDescription>
        </div>
        <div className="space-y-3 p-4">
          <div className={row}>
            <Clock className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-bold">Horário de funcionamento</p>
              <p className="text-sm text-muted-foreground">{business.hours ?? "Consulte nossos horários pelo WhatsApp"}</p>
            </div>
          </div>
          <a href={`tel:+${business.whatsappNumber}`} className={row}>
            <Phone className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-bold">Telefone</p>
              <p className="text-sm text-muted-foreground">{business.phoneDisplay}</p>
            </div>
          </a>
          <a href={whatsappLink("Olá! Vim pelo site da J.C Hamburgueria.")} target="_blank" rel="noreferrer" className={row}>
            <MessageCircle className="mt-0.5 h-5 w-5 text-whatsapp" />
            <div>
              <p className="font-bold">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Conversar agora</p>
            </div>
          </a>
          <div className={row}>
            <MapPin className="mt-0.5 h-5 w-5 text-destructive" />
            <div>
              <p className="font-bold">Endereço</p>
              <p className="text-sm text-muted-foreground">{business.address}</p>
            </div>
          </div>
          <a href={mapsLink} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground shadow-soft">
            <Navigation className="h-5 w-5" /> Como chegar
          </a>
          <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-destructive font-bold text-destructive">
            <Instagram className="h-5 w-5" /> {business.instagramHandle}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
