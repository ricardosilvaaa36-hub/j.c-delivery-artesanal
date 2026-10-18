import { business } from "@/config/business";
import { brl, lineTotal, subtotal, unitPrice, type CartItem } from "./cart";

export type OrderForm = {
  name: string;
  phone: string;
  type: "entrega" | "retirada";
  street: string;
  number: string;
  district: string;
  complement: string;
  payment: string;
  changeFor: string;
  notes: string;
};

export type OrderErrors = Partial<Record<keyof OrderForm, string>>;
export function validateOrder(f: OrderForm): OrderErrors {
  const e: OrderErrors = {};
  if (f.name.trim().length < 2) e.name = "Informe seu nome.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um telefone com DDD.";
  if (f.type === "entrega") {
    if (!f.street.trim()) e.street = "Informe o endereço.";
    if (!f.number.trim()) e.number = "Informe o número.";
    if (!f.district.trim()) e.district = "Informe o bairro.";
  }
  if (!f.payment) e.payment = "Escolha a forma de pagamento.";
  return e;
}

export function buildOrderMessage(items: CartItem[], f: OrderForm, deliveryFee: number | null = business.deliveryFee): string {
  const sub = subtotal(items);
  const isDelivery = f.type === "entrega";
  const fee = isDelivery ? deliveryFee : 0;
  const L: string[] = [];
  L.push(`*NOVO PEDIDO — ${business.name}*`, "");
  L.push("*Itens:*");
  for (const i of items) {
    L.push(`• ${i.qty}x ${i.name}${i.variant ? ` (${i.variant})` : ""} — ${brl(lineTotal(i))}`);
    for (const e of i.extras) L.push(`   + ${e.qty}x ${e.name} (${brl(e.price * e.qty)})`);
    if (i.extras.length) L.push(`   Valor unitário: ${brl(unitPrice(i))}`);
    if (i.note.trim()) L.push(`   Obs: ${i.note.trim()}`);
  }
  L.push("");
  L.push(`Subtotal: ${brl(sub)}`);
  if (isDelivery) L.push(`Taxa de entrega: ${fee == null ? "a combinar" : brl(fee)}`);
  L.push(`*Total: ${brl(sub + (fee ?? 0))}*${isDelivery && fee == null ? " + taxa de entrega" : ""}`);
  L.push("");
  L.push(`*Cliente:* ${f.name.trim()}`);
  L.push(`*Telefone:* ${f.phone.trim()}`);
  L.push(`*Tipo:* ${isDelivery ? "Entrega" : "Retirada no local"}`);
  if (isDelivery) {
    L.push(`*Endereço:* ${f.street.trim()}, ${f.number.trim()} — ${f.district.trim()}`);
    if (f.complement.trim()) L.push(`*Complemento/Ref.:* ${f.complement.trim()}`);
  }
  const pay = business.paymentMethods.find((p) => p.id === f.payment)?.label ?? f.payment;
  L.push(`*Pagamento:* ${pay}`);
  if (f.payment === "dinheiro" && f.changeFor.trim()) L.push(`*Troco para:* ${f.changeFor.trim()}`);
  if (f.notes.trim()) L.push(`*Observações:* ${f.notes.trim()}`);
  return L.join("\n");
}
