import { describe, it, expect } from "vitest";
import { buildOrderMessage, validateOrder, type OrderForm } from "@/lib/order";
import { subtotal, type CartItem } from "@/lib/cart";

const items: CartItem[] = [
  { key: "a", productId: "ana", name: "Ana Castela (Bacon)", basePrice: 28.99, extras: [{ id: "bacon", name: "Bacon", price: 6, qty: 1 }], note: "sem cebola", qty: 2 },
  { key: "b", productId: "coca", name: "Coca-Cola | Lata", basePrice: 6, extras: [], note: "", qty: 1 },
];
const form: OrderForm = { name: "João", phone: "(67) 99999-0000", type: "entrega", street: "Rua A", number: "10", district: "Centro", complement: "", payment: "dinheiro", changeFor: "R$ 100", notes: "" };

describe("pedido", () => {
  it("soma subtotal com adicionais", () => {
    expect(subtotal(items)).toBe(75.98);
  });
  it("entrega exige endereço, número e bairro", () => {
    const e = validateOrder({ ...form, street: "", number: "", district: "" });
    expect(Object.keys(e).sort()).toEqual(["district", "number", "street"]);
  });
  it("retirada não exige endereço", () => {
    expect(validateOrder({ ...form, type: "retirada", street: "", number: "", district: "" })).toEqual({});
  });
  it("mensagem inclui total com taxa", () => {
    const m = buildOrderMessage(items, form, 5);
    expect(m).toContain("2x Ana Castela (Bacon)");
    expect(m).toContain("Obs: sem cebola");
    expect(m).toContain("Total: R$\u00a080,98");
    expect(m).toContain("Troco para:* R$ 100");
  });
});
