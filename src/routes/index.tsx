import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, MessageCircle, Search } from "lucide-react";
import { Logo } from "@/components/shop/Logo";
import hero from "@/assets/p86.jpg.asset.json";
import { business, whatsappLink } from "@/config/business";
import { categories, products } from "@/data/menu";
import { FeaturedCard, ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "J.C Hamburgueria — O sabor que conquista a cada mordida" },
      { name: "description", content: "Hambúrgueres artesanais em Aparecida do Taboado - MS. Monte seu pedido e envie pelo WhatsApp." },
      { property: "og:title", content: "J.C Hamburgueria — Delivery" },
      { property: "og:description", content: "Feito com carinho, servido com alegria! Peça pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const popular = products.filter((p) => p.popular && p.available);
  const combos = products.filter((p) => p.category === "combos" && p.available);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <div className="mx-auto max-w-5xl">
      <section className="relative mx-4 mt-4 overflow-hidden rounded-3xl border border-border shadow-pop">
        <img src={hero.url} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-md" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative flex flex-col items-center gap-4 px-5 pb-6 pt-8 text-center">
          <Logo className="h-28 w-28 ring-4 ring-gold/80 shadow-pop" />
          <span className="glass inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-gold"><Clock className="h-3.5 w-3.5" /> {business.hours ?? "Consulte nossos horários"}</span>
          <h1 className="text-3xl font-extrabold leading-[1.05] sm:text-5xl">O sabor que conquista <span className="text-gold">a cada mordida!</span></h1>
          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/cardapio" }); }} className="w-full max-w-md">
            <label className="flex items-center gap-2 border-b-2 border-gold px-1 pb-2 text-left">
              <Search className="h-5 w-5 text-gold" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="O que você quer comer hoje?" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </label>
          </form>
          <Link to="/cardapio" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-pop">
            Ver cardápio <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mt-6 px-4" aria-labelledby="cat">
        <h2 id="cat" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categorias</h2>
        <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <Link key={c.id} to="/cardapio" search={{ c: c.id }} className="glass flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition hover:bg-primary hover:text-primary-foreground">
              <span>{c.icon}</span>{c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="pop">
        <div className="flex items-end justify-between px-4">
          <h2 id="pop" className="text-xl font-bold">🔥 Mais pedidos</h2>
          <Link to="/cardapio" className="text-sm font-bold text-primary">Ver tudo</Link>
        </div>
        <div className="no-scrollbar mt-2 flex gap-3 overflow-x-auto px-4 pb-3">
          {popular.map((p) => <FeaturedCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mt-4 px-4" aria-labelledby="combos">
        <h2 id="combos" className="text-xl font-bold">🎁 Combos e promoções</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {combos.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mx-4 mt-8 flex flex-col items-center gap-3 rounded-3xl bg-brand-dark p-6 text-center text-brand-dark-foreground">
        <MessageCircle className="h-10 w-10 text-gold" />
        <h2 className="text-2xl font-bold">Prefere pedir conversando?</h2>
        <p className="text-sm opacity-90">Chame a gente no WhatsApp {business.phoneDisplay}</p>
        <a href={whatsappLink("Olá! Gostaria de fazer um pedido.")} target="_blank" rel="noreferrer" className="h-12 rounded-2xl bg-gold px-6 font-bold leading-[3rem] text-gold-foreground">Pedir pelo WhatsApp</a>
      </section>
    </div>
  );
}
