import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
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
    ],
  }),
  component: Index,
});

function Index() {
  const popular = products.filter((p) => p.popular && p.available);
  const combos = products.filter((p) => p.category === "combos" && p.available);
  return (
    <div className="mx-auto max-w-5xl">
      <section className="relative mx-4 mt-4 overflow-hidden rounded-3xl shadow-pop">
        <img src={hero.url} alt="Hambúrguer artesanal da J.C" className="h-[22rem] w-full object-cover sm:h-[26rem]" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground sm:p-8">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground"><Clock className="h-3.5 w-3.5" /> {business.hours ?? "Consulte nossos horários"}</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.05] sm:text-5xl">O sabor que conquista a cada mordida!</h1>
          <p className="mt-1 text-gold">{business.slogan}</p>
          <Link to="/cardapio" className="mt-4 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 font-bold text-primary-foreground shadow-pop">
            Ver cardápio <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mt-6 px-4" aria-labelledby="cat">
        <h2 id="cat" className="text-xl font-bold">Categorias</h2>
        <div className="no-scrollbar -mx-4 mt-2 flex gap-3 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <Link key={c.id} to="/cardapio" search={{ c: c.id }} className="flex w-20 shrink-0 flex-col items-center gap-1.5">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-3xl shadow-soft">{c.icon}</span>
              <span className="text-center text-xs font-bold leading-tight">{c.label}</span>
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
