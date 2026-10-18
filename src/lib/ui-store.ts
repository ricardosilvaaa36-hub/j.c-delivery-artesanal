import { useSyncExternalStore } from "react";

type UI = { menu: boolean; cart: boolean; productId: string | null; bump: number };
let state: UI = { menu: false, cart: false, productId: null, bump: 0 };
const ls = new Set<() => void>();

export const ui = {
  set(p: Partial<UI>) {
    state = { ...state, ...p };
    ls.forEach((l) => l());
  },
  get: () => state,
  subscribe: (l: () => void) => (ls.add(l), () => ls.delete(l)),
};
export const useUI = () => useSyncExternalStore(ui.subscribe, ui.get, ui.get);
