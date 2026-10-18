import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { business } from "@/config/business";
import { itemCount, useCart } from "@/lib/cart";
import { ui, useUI } from "@/lib/ui-store";
import { Logo } from "./Logo";

export function Header() {
  const items = useCart();
  const { bump } = useUI();
  const count = itemCount(items);
  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-soft">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
        <button aria-label="Abrir menu" onClick={() => ui.set({ menu: true })} className="grid h-11 w-11 place-items-center rounded-full bg-brand-dark/25 transition hover:bg-brand-dark/40">
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2.5">
          <Logo className="h-11 w-11 ring-2 ring-gold" />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-lg font-bold">{business.name}</p>
            <p className="truncate text-xs opacity-90">{business.averageDeliveryTime}</p>
          </div>
        </Link>
        <button aria-label={`Abrir carrinho, ${count} itens`} onClick={() => ui.set({ cart: true })} className="relative grid h-11 w-11 place-items-center rounded-full bg-gold text-gold-foreground shadow-soft">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span key={bump} className="animate-bump absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[11px] font-bold text-destructive-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
