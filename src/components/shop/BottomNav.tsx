import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { whatsappLink } from "@/config/business";
import { brl, itemCount, subtotal, useCart } from "@/lib/cart";
import { ui } from "@/lib/ui-store";

const WhatsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" /></svg>
);

export function WhatsAppFab() {
  return (
    <a href={whatsappLink("Olá! Vim pelo site da J.C Hamburgueria.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-pop transition hover:scale-105">
      <WhatsIcon />
    </a>
  );
}

export function BottomNav() {
  const items = useCart();
  const n = itemCount(items);
  const cls = "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-semibold text-muted-foreground";
  const active = { className: "text-brand-dark" };
  return (
    <nav aria-label="Atalhos" className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center px-2">
        <Link to="/" className={cls} activeProps={active} activeOptions={{ exact: true }}><Home className="h-6 w-6" />Início</Link>
        <Link to="/cardapio" className={cls} activeProps={active}><UtensilsCrossed className="h-6 w-6" />Cardápio</Link>
        <button onClick={() => ui.set({ cart: true })} className="m-1.5 flex flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 font-bold text-primary-foreground shadow-soft">
          <ShoppingBag className="h-5 w-5" />
          {n > 0 ? `${n} · ${brl(subtotal(items))}` : "Carrinho"}
        </button>
      </div>
    </nav>
  );
}
