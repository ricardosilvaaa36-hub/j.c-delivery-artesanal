import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products, type CategoryId } from "@/data/menu";
import { ProductCard } from "@/components/shop/ProductCard";

type S = { c?: CategoryId | undefined };

export const Route = createFileRoute("/cardapio")({
  validateSearch: (s: Record<string, unknown>): S => ({
    c: categories.some((x) => x.id === s["c"]) ? (s["c"] as CategoryId) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Cardápio — J.C Hamburgueria" },
      { name: "description", content: "Hambúrgueres, combos, hot-dogs, porções e bebidas da J.C Hamburgueria com preços." },
      { property: "og:title", content: "Cardápio — J.C Hamburgueria" },
      { property: "og:description", content: "Escolha seus favoritos e envie o pedido pelo WhatsApp." },
    ],
  }),
  component: Cardapio,
});

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Cardapio() {
  const { c } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => products.filter((p) => (!c || p.category === c) && (!q || norm(p.name + " " + p.description).includes(norm(q)))),
    [c, q],
  );
  const groups = categories.map((cat) => ({ cat, items: filtered.filter((p) => p.category === cat.id) })).filter((g) => g.items.length);
  const chip = (on: boolean) => `flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition ${on ? "bg-primary text-primary-foreground shadow-soft" : "bg-card text-foreground shadow-soft"}`;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="sticky top-[64px] z-30 space-y-3 bg-background/95 px-4 pb-3 pt-4 backdrop-blur">
        <h1 className="text-2xl font-extrabold">Cardápio</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input type="search" aria-label="Pesquisar produtos" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Quer pedir o quê?" className="h-12 w-full rounded-2xl border bg-card pl-10 pr-10 outline-none focus:ring-2 focus:ring-ring" />
          {q && <button aria-label="Limpar pesquisa" onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-5 w-5" /></button>}
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="tablist">
          <button role="tab" aria-selected={!c} className={chip(!c)} onClick={() => navigate({ search: {} })}>Todos</button>
          {categories.map((cat) => (
            <button key={cat.id} role="tab" aria-selected={c === cat.id} className={chip(c === cat.id)} onClick={() => navigate({ search: { c: cat.id } })}>
              <span aria-hidden>{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-8 px-4 pt-2">
        {groups.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-5xl">🍔</p>
            <p className="mt-3 font-display text-xl font-bold">Nada encontrado</p>
            <p className="text-sm text-muted-foreground">Tente outro nome ou veja todas as categorias.</p>
          </div>
        )}
        {groups.map(({ cat, items }) => (
          <section key={cat.id} aria-labelledby={`h-${cat.id}`}>
            <h2 id={`h-${cat.id}`} className="mb-3 text-xl font-bold">{cat.icon} {cat.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
