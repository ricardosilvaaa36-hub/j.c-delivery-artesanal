import { useSyncExternalStore } from "react";

export type CartExtra = { id: string; name: string; price: number; qty: number };
export type CartItem = {
  key: string;
  productId: string;
  name: string;
  basePrice: number;
  variant?: string;
  extras: CartExtra[];
  note: string;
  qty: number;
};

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const unitPrice = (i: Pick<CartItem, "basePrice" | "extras">) =>
  i.basePrice + i.extras.reduce((s, e) => s + e.price * e.qty, 0);
export const lineTotal = (i: CartItem) => Math.round(unitPrice(i) * i.qty * 100) / 100;
export const subtotal = (items: CartItem[]) => Math.round(items.reduce((s, i) => s + lineTotal(i), 0) * 100) / 100;
export const itemCount = (items: CartItem[]) => items.reduce((s, i) => s + i.qty, 0);

const KEY = "jc-cart-v1";
let items: CartItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = [];
  }
}
function set(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

const EMPTY: CartItem[] = [];
export const cart = {
  get: () => (load(), items),
  subscribe: (l: () => void) => (listeners.add(l), () => listeners.delete(l)),
  add(item: Omit<CartItem, "key">) {
    load();
    const key = [item.productId, item.variant ?? "", item.extras.map((e) => `${e.id}x${e.qty}`).join(","), item.note.trim()].join("|");
    const found = items.find((i) => i.key === key);
    if (found) set(items.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i)));
    else set([...items, { ...item, key }]);
  },
  setQty(key: string, qty: number) {
    set(qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i)));
  },
  setNote(key: string, note: string) {
    set(items.map((i) => (i.key === key ? { ...i, note } : i)));
  },
  remove(key: string) {
    set(items.filter((i) => i.key !== key));
  },
  clear() {
    set([]);
  },
};

export function useCart() {
  return useSyncExternalStore(cart.subscribe, cart.get, () => EMPTY);
}
