import { describe, expect, it } from "vitest";
import { products, burgerExtras } from "@/data/menu";
import { subtotal, type CartItem } from "@/lib/cart";
import { buildOrderMessage, type OrderForm } from "@/lib/order";

// Literal prices verified against the official Foodzap menu on 2026-10-23.
const officialPrices: [string, number][] = [
  [
    "Ana Castela (Bacon)",
    28.99
  ],
  [
    "Belo (Bacon triplo queijo)",
    31.99
  ],
  [
    "Caetano Veloso (Catubacon)",
    31.99
  ],
  [
    "Gilberto Gil (Bacon + cheddar)",
    31.99
  ],
  [
    "Gustavo Lima (Calabresa cheddar)",
    33.99
  ],
  [
    "Ivete Sangalo (Calabresa cheddar + queijo)",
    33.99
  ],
  [
    "Leonardo (Doritos)",
    29.99
  ],
  [
    "Roberto Carlos (Doritos + cheddar)",
    31.99
  ],
  [
    "Sérgio Reis (Chicken bacon jr)",
    30.99
  ],
  [
    "Tim Maia (Chicken bacon jr + cheddar)",
    31.99
  ],
  [
    "Djavan (Chiken bacon jr triplo queijo)",
    31.99
  ],
  [
    "Vini Jr (Kids)",
    19.99
  ],
  [
    "Ayrton Senna (Bacon)",
    40.99
  ],
  [
    "Cauã Reymond (Bacon triplo queijo)",
    51.99
  ],
  [
    "Hebe Camargo (Catubacon)",
    48.99
  ],
  [
    "Jô Soares (Bacon + cheddar)",
    48.99
  ],
  [
    "Luciano Hulk (Calabresa cheddar)",
    40.99
  ],
  [
    "Odete Roitman (Calabresa cheddar + queijo)",
    48.99
  ],
  [
    "Paolla Oliveira (Doritos)",
    40.99
  ],
  [
    "Pelé (Doritos + cheddar)",
    48.99
  ],
  [
    "Toni Ramos (Chicken bacon)",
    42.99
  ],
  [
    "Silvio Santos (Chicken bacon + cheddar)",
    48.99
  ],
  [
    "Faustão (Chicken bacon triplo queijo)",
    50.99
  ],
  [
    "XUXA (Tradicional)",
    24.99
  ],
  [
    "Neymar Jr. (Doritos)",
    26.99
  ],
  [
    "Batata Frita",
    15.99
  ],
  [
    "Batata Croc-Croc",
    9.0
  ],
  [
    "Onion Rings",
    24.99
  ],
  [
    "Mini Coxinhas",
    27.99
  ],
  [
    "Mini Churros",
    16.99
  ],
  [
    "Água natural",
    3.5
  ],
  [
    "Água com gás",
    4.0
  ],
  [
    "Coca-Cola | 2L",
    15.0
  ],
  [
    "Coca-Cola | 1L",
    10.0
  ],
  [
    "Coca-Cola | Lata",
    6.0
  ],
  [
    "Coca-Cola | 600ml",
    8.0
  ],
  [
    "Guaraná Antarctica | 2L",
    12.0
  ],
  [
    "Guaraná Antarctica | 1L",
    10.0
  ],
  [
    "Guaraná Antarctica | Lata",
    6.0
  ],
  [
    "Pepsi Zero | Lata",
    6.0
  ],
  [
    "Fanta | 2L",
    12.0
  ],
  [
    "Fanta | Lata",
    6.0
  ]
];

describe("Foodzap catalog prices", () => {
  it.each(officialPrices)("%s costs R$ %s", (name, price) => {
    expect(products.find((p) => p.name === name)?.price).toBe(price);
  });
  it.each([["Bacon", 6], ["Calabresa", 6], ["Doritos", 7], ["Queijo", 6], ["Cheddar", 6], ["Catupiry", 7], ["Hamburguer 350g", 15], ["Hamburguer 150g", 10]] as const)("extra %s costs R$ %s", (name, price) => {
    expect(burgerExtras.find((e) => e.name === name)?.price).toBe(price);
    expect(products.find((p) => p.name === `Adicional de ${name}`)?.price).toBe(price);
  });
  it.each([["Tamanho P", 15.99], ["Tamanho G", 29.99]] as const)("fries %s cost R$ %s", (name, price) => {
    expect(products.find((p) => p.id === "batata-frita")?.variants?.find((v) => v.name === name)?.price).toBe(price);
  });
  it("uses official prices in the cart and WhatsApp order", () => {
    const djavan = products.find((p) => p.id === "djavan");
    const cheddar = burgerExtras.find((e) => e.id === "cheddar");
    const coke = products.find((p) => p.id === "coca-lata");
    if (!djavan || !cheddar || !coke) throw new Error("Missing verified products");
    const items: CartItem[] = [
      { key: "burger", productId: djavan.id, name: djavan.name, basePrice: djavan.price, extras: [{ ...cheddar, qty: 1 }], qty: 2, note: "" },
      { key: "drink", productId: coke.id, name: coke.name, basePrice: coke.price, extras: [], qty: 1, note: "" },
    ];
    expect(subtotal(items)).toBe(81.98);
    const form: OrderForm = { name: "Teste", phone: "67999990000", type: "retirada", street: "", number: "", district: "", complement: "", payment: "pix", changeFor: "", notes: "" };
    expect(buildOrderMessage(items, form)).toContain("Total: R$\u00a081,98");
  });
});
