import p74 from "@/assets/p74.jpg.asset.json";
import p75 from "@/assets/p75.jpg.asset.json";
import p76 from "@/assets/p76.jpg.asset.json";
import p77 from "@/assets/p77.jpg.asset.json";
import p78 from "@/assets/p78.jpg.asset.json";
import p79 from "@/assets/p79.jpg.asset.json";
import p80 from "@/assets/p80.jpg.asset.json";
import p81 from "@/assets/p81.jpg.asset.json";
import p83 from "@/assets/p83.jpg.asset.json";
import p84 from "@/assets/p84.jpg.asset.json";
import p85 from "@/assets/p85.jpg.asset.json";
import p86 from "@/assets/p86.jpg.asset.json";
import p87 from "@/assets/p87.jpg.asset.json";
import p88 from "@/assets/p88.jpg.asset.json";
import p90 from "@/assets/p90.jpg.asset.json";
import p91 from "@/assets/p91.jpg.asset.json";
import p92 from "@/assets/p92.jpg.asset.json";

/**
 * Cardápio centralizado. Para editar: altere nome, descrição, preço,
 * imagem, categoria, disponibilidade (available) ou adicionais.
 * Dados retirados do cardápio digital e dos materiais da J.C Hamburgueria.
 */
export type CategoryId = "hamburgueres" | "especiais" | "combos" | "hotdogs" | "porcoes" | "bebidas" | "adicionais";

export const categories: { id: CategoryId; label: string; icon: string }[] = [
  { id: "hamburgueres", label: "Hambúrgueres", icon: "🍔" },
  { id: "especiais", label: "Pão Especial", icon: "🥖" },
  { id: "combos", label: "Combos", icon: "🎁" },
  { id: "hotdogs", label: "Hot-dogs", icon: "🌭" },
  { id: "porcoes", label: "Porções", icon: "🍟" },
  { id: "bebidas", label: "Bebidas", icon: "🥤" },
  { id: "adicionais", label: "Adicionais", icon: "➕" },
];

export type Extra = { id: string; name: string; price: number };
export type Variant = { id: string; name: string; price: number };

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image?: string;
  available: boolean;
  popular?: boolean;
  extras?: Extra[];
  variants?: Variant[];
  note?: string;
};

export const burgerExtras: Extra[] = [
  { id: "bacon", name: "Bacon", price: 6 },
  { id: "calabresa", name: "Calabresa", price: 6 },
  { id: "doritos", name: "Doritos", price: 7 },
  { id: "queijo", name: "Queijo", price: 6 },
];

const B = "Pão de brioche, hambúrguer de costela assado";
const E = "Pão especial gratinado com queijo, hambúrguer de costela assado";
const S = "alface, tomate, cebola roxa e molho barbecue";

const burger = (p: Omit<Product, "available" | "extras">): Product => ({ available: true, extras: burgerExtras, ...p });

export const products: Product[] = [
  // Hambúrgueres — pão brioche
  burger({ id: "ana-castela", name: "Ana Castela (Bacon)", price: 28.99, category: "hamburgueres", image: p74.url, popular: true, description: `${B}, bacon defumado, queijo, ${S}.` }),
  burger({ id: "belo", name: "Belo (Bacon triplo queijo)", price: 31.99, category: "hamburgueres", image: p77.url, description: `${B}, bacon defumado, triplo de queijo muçarela, ${S}.` }),
  burger({ id: "caetano", name: "Caetano Veloso (Catubacon)", price: 31.99, category: "hamburgueres", image: p86.url, description: `${B}, queijo, bacon defumado, muito Catupiry original, ${S}.` }),
  burger({ id: "gilberto-gil", name: "Gilberto Gil (Bacon + cheddar)", price: 31.99, category: "hamburgueres", image: p87.url, popular: true, description: `${B}, bacon defumado, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "gustavo-lima", name: "Gustavo Lima (Calabresa cheddar)", price: 33.99, category: "hamburgueres", image: p85.url, description: `${B}, calabresa fatiada, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "ivete", name: "Ivete Sangalo (Calabresa cheddar + queijo)", price: 33.99, category: "hamburgueres", image: p88.url, description: `${B}, calabresa fatiada, duplo de queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "leonardo", name: "Leonardo (Doritos)", price: 29.99, category: "hamburgueres", image: p91.url, popular: true, description: `${B}, queijo, doritos, ${S}.` }),
  burger({ id: "roberto-carlos", name: "Roberto Carlos (Doritos + cheddar)", price: 31.99, category: "hamburgueres", image: p92.url, description: `${B}, queijo muçarela, doritos, queijo cheddar, ${S}.` }),
  burger({ id: "sergio-reis", name: "Sérgio Reis (Chicken bacon jr)", price: 30.99, category: "hamburgueres", image: p76.url, description: `Pão de brioche, bacon defumado, queijo, ${S}.` }),
  burger({ id: "tim-maia", name: "Tim Maia (Chicken bacon jr + cheddar)", price: 31.99, category: "hamburgueres", image: p75.url, description: `Pão de brioche, filé de peito de frango empanado e frito, bacon defumado, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "vini-jr", name: "Vini Jr (Kids)", price: 19.99, category: "hamburgueres", description: `${B} e queijo.` }),

  // Pão especial
  burger({ id: "ayrton-senna", name: "Ayrton Senna (Bacon)", price: 40.99, category: "especiais", description: `${E}, bacon defumado, queijo, ${S}.` }),
  burger({ id: "caua-reymond", name: "Cauã Reymond (Bacon triplo queijo)", price: 51.99, category: "especiais", popular: true, description: `${E}, bacon defumado, triplo de queijo muçarela, ${S}.` }),
  burger({ id: "hebe", name: "Hebe Camargo (Catubacon)", price: 48.99, category: "especiais", description: `${E}, queijo, bacon defumado, muito Catupiry original, ${S}.` }),
  burger({ id: "jo-soares", name: "Jô Soares (Bacon + cheddar)", price: 48.99, category: "especiais", description: `${E}, bacon defumado, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "luciano-hulk", name: "Luciano Hulk (Calabresa cheddar)", price: 40.99, category: "especiais", description: `${E}, calabresa fatiada, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "odete", name: "Odete Roitman (Calabresa cheddar + queijo)", price: 48.99, category: "especiais", description: `${E}, calabresa fatiada, duplo de queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "paolla", name: "Paolla Oliveira (Doritos)", price: 40.99, category: "especiais", description: `${E}, queijo, doritos, ${S}.` }),
  burger({ id: "pele", name: "Pelé (Doritos + cheddar)", price: 48.99, category: "especiais", description: `${E}, queijo muçarela, doritos, queijo cheddar, ${S}.` }),
  burger({ id: "toni-ramos", name: "Toni Ramos (Chicken bacon)", price: 42.99, category: "especiais", description: `Pão especial gratinado com queijo, bacon defumado, queijo, ${S}.` }),
  burger({ id: "silvio-santos", name: "Silvio Santos (Chicken bacon + cheddar)", price: 48.99, category: "especiais", description: `Pão especial gratinado com queijo, filé de peito de frango empanado e frito, bacon defumado, queijo muçarela, queijo cheddar, ${S}.` }),
  burger({ id: "faustao", name: "Faustão (Chicken bacon triplo queijo)", price: 50.99, category: "especiais", description: `Pão especial gratinado com queijo, bacon defumado, triplo de queijo muçarela, queijo cheddar, ${S}.` }),

  // Combos (valores dos materiais de divulgação)
  { id: "combo-costela-bacon", name: "Combo Costela Bacon", price: 39.99, category: "combos", image: p84.url, available: true, popular: true, description: "Hambúrguer costela bacon + Coca-Cola lata + fritas." },
  { id: "combo-2-costela", name: "Combo Dupla Costela Bacon", price: 59.99, category: "combos", image: p83.url, available: true, description: "2 hambúrgueres costela bacon + Coca-Cola lata + fritas." },
  { id: "combo-costelao", name: "Combo Costelão Triplo Queijo", price: 57.99, category: "combos", image: p80.url, available: true, description: "Costelão triplo queijo + Coca-Cola lata + fritas." },
  { id: "combo-familia", name: "Combo Família (3 burgers)", price: 81.99, category: "combos", image: p78.url, available: true, description: "3 hambúrgueres J.C + refrigerante + fritas." },
  { id: "combo-imperdivel", name: "Combo Imperdível", price: 82.99, category: "combos", image: p90.url, available: true, description: "Costela bacon + Costelão bacon + Coca-Cola lata." },
  { id: "combo-hotdog", name: "Promo Cachorro-Quente", price: 22.99, category: "combos", image: p79.url, available: true, description: "Cachorro-quente + mini batata + mini refrigerante.", note: "Oferta por tempo limitado — confirme a disponibilidade." },

  // Hot-dogs
  { id: "xuxa", name: "XUXA (Tradicional)", price: 24.99, category: "hotdogs", available: true, extras: burgerExtras, description: "Pão de brioche, três salsichas, molho artesanal de tomate, maionese, mostarda, queijo e batata palha extra fina." },
  { id: "neymar", name: "Neymar Jr. (Doritos)", price: 26.99, category: "hotdogs", available: true, extras: burgerExtras, description: "Pão de brioche, três salsichas, molho artesanal de tomate, maionese, mostarda, queijo e doritos." },

  // Porções
  { id: "batata-frita", name: "Batata Frita", price: 15.99, category: "porcoes", image: p81.url, available: true, popular: true, description: "Porção de batata frita temperada com ervas finas.", variants: [{ id: "p", name: "Tamanho P", price: 15.99 }, { id: "g", name: "Tamanho G", price: 29.99 }] },
  { id: "batata-croc", name: "Batata Croc-Croc", price: 9, category: "porcoes", available: true, description: "Porção de batata chips." },
  { id: "onion-rings", name: "Onion Rings", price: 24.99, category: "porcoes", available: true, description: "Porção de anéis de cebola." },
  { id: "mini-coxinhas", name: "Mini Coxinhas", price: 27.99, category: "porcoes", available: true, description: "Porção de mini coxinhas." },
  { id: "mini-churros", name: "Mini Churros", price: 16.99, category: "porcoes", available: true, description: "Porção de mini churros." },

  // Bebidas
  ...([
    ["agua", "Água natural", "", 3.5],
    ["agua-gas", "Água com gás", "", 4],
    ["coca-2l", "Coca-Cola | 2L", "2 litros", 15],
    ["coca-1l", "Coca-Cola | 1L", "1 litro", 10],
    ["coca-600", "Coca-Cola | 600ml", "600ml", 8],
    ["coca-lata", "Coca-Cola | Lata", "350ml", 6],
    ["guarana-2l", "Guaraná Antarctica | 2L", "2 litros", 12],
    ["guarana-1l", "Guaraná Antarctica | 1L", "1 litro", 10],
    ["guarana-lata", "Guaraná Antarctica | Lata", "350ml", 6],
    ["pepsi-zero", "Pepsi Zero | Lata", "350ml", 6],
    ["fanta-2l", "Fanta | 2L", "2 litros", 12],
    ["fanta-lata", "Fanta | Lata", "350ml", 6],
  ] as const).map(([id, name, description, price]) => ({ id, name, description, price, category: "bebidas" as const, available: true })),

  // Adicionais avulsos
  ...burgerExtras.map((e) => ({ id: `extra-${e.id}`, name: `Adicional de ${e.name}`, description: "Adicional para incrementar seu lanche.", price: e.price, category: "adicionais" as const, available: true })),
];

export const categoryIcon = (c: CategoryId) => categories.find((x) => x.id === c)?.icon ?? "🍔";
