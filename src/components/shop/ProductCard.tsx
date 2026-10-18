import { Plus } from "lucide-react";
import { categoryIcon, type Product } from "@/data/menu";
import { brl } from "@/lib/cart";
import { ui } from "@/lib/ui-store";

export function ProductImage({ p, className }: { p: Product; className?: string }) {
  return p.image ? (
    <img src={p.image} alt={p.name} loading="lazy" className={`object-cover ${className ?? ""}`} />
  ) : (
    <div className={`grid place-items-center bg-accent text-4xl ${className ?? ""}`} aria-hidden>{categoryIcon(p.category)}</div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const open = () => ui.set({ productId: p.id });
  return (
    <article className="flex gap-3 rounded-2xl bg-card p-3 shadow-soft transition active:scale-[0.99]">
      <button onClick={open} className="flex min-w-0 flex-1 flex-col text-left" disabled={!p.available}>
        <h3 className="font-display text-base font-bold leading-tight">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <p className="mt-auto pt-2 text-lg font-extrabold text-brand-dark">
          {p.variants ? <span className="text-xs font-semibold text-muted-foreground">a partir de </span> : null}
          {brl(p.price)}
        </p>
      </button>
      <div className="relative shrink-0">
        <button onClick={open} aria-label={`Ver ${p.name}`} tabIndex={-1}>
          <ProductImage p={p} className="h-28 w-28 rounded-xl" />
        </button>
        {p.available ? (
          <button onClick={open} aria-label={`Adicionar ${p.name}`} className="absolute -bottom-2 left-1/2 flex h-9 -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-3 text-sm font-bold text-gold-foreground shadow-pop">
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        ) : (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-muted px-3 py-1 text-xs font-bold">Indisponível</span>
        )}
      </div>
    </article>
  );
}

export function FeaturedCard({ p }: { p: Product }) {
  return (
    <button onClick={() => ui.set({ productId: p.id })} className="w-44 shrink-0 overflow-hidden rounded-2xl bg-card text-left shadow-soft">
      <ProductImage p={p} className="h-32 w-full" />
      <div className="p-3">
        <p className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold leading-tight">{p.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-extrabold text-brand-dark">{brl(p.price)}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="h-4 w-4" /></span>
        </div>
      </div>
    </button>
  );
}
