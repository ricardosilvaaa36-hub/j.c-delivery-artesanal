import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { business } from "@/config/business";
import { brl, cart, lineTotal, subtotal, useCart } from "@/lib/cart";
import { ui, useUI } from "@/lib/ui-store";
import { Stepper } from "./ProductSheet";

export function Totals({ delivery = true }: { delivery?: boolean }) {
  const items = useCart();
  const sub = subtotal(items);
  const fee = delivery ? business.deliveryFee : 0;
  return (
    <dl className="space-y-1.5 text-sm">
      <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{brl(sub)}</dd></div>
      {delivery && (
        <div className="flex justify-between"><dt className="text-muted-foreground">Taxa de entrega</dt><dd className="font-semibold">{fee == null ? "a combinar no WhatsApp" : brl(fee)}</dd></div>
      )}
      <div className="flex justify-between border-t pt-2 text-lg"><dt className="font-bold">Total</dt><dd className="font-extrabold text-brand-dark">{brl(sub + (fee ?? 0))}{delivery && fee == null && <span className="block text-right text-[11px] font-normal text-muted-foreground">+ taxa de entrega</span>}</dd></div>
    </dl>
  );
}

export function CartLines({ editable = true }: { editable?: boolean }) {
  const items = useCart();
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.key} className="rounded-2xl bg-card p-3 shadow-soft">
          <div className="flex justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold leading-tight">{i.name}{i.variant && <span className="font-normal text-muted-foreground"> · {i.variant}</span>}</p>
              {i.extras.map((e) => <p key={e.id} className="text-xs text-muted-foreground">+ {e.qty}x {e.name} ({brl(e.price * e.qty)})</p>)}
              {!editable && i.note && <p className="text-xs italic text-muted-foreground">Obs: {i.note}</p>}
            </div>
            <p className="shrink-0 font-extrabold">{editable ? brl(lineTotal(i)) : `${i.qty}x ${brl(lineTotal(i))}`}</p>
          </div>
          {editable && (
            <>
              <input aria-label={`Observação para ${i.name}`} value={i.note} onChange={(e) => cart.setNote(i.key, e.target.value)} placeholder="Observação (ex: sem cebola)" className="mt-2 h-9 w-full rounded-lg border bg-background px-2 text-sm" />
              <div className="mt-2 flex items-center justify-between">
                <Stepper label={i.name} min={1} value={i.qty} onChange={(n) => cart.setQty(i.key, n)} />
                <button onClick={() => cart.remove(i.key)} aria-label={`Remover ${i.name}`} className="flex items-center gap-1 text-sm font-semibold text-destructive"><Trash2 className="h-4 w-4" /> Remover</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CartDrawer() {
  const { cart: open } = useUI();
  const items = useCart();
  const close = () => ui.set({ cart: false });
  return (
    <Sheet open={open} onOpenChange={(o) => ui.set({ cart: o })}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md [&>button]:hidden">
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
          <SheetTitle className="font-display text-xl text-primary-foreground">Seu pedido</SheetTitle>
          <SheetDescription className="sr-only">Itens do carrinho</SheetDescription>
          <button aria-label="Fechar carrinho" onClick={close} className="grid h-10 w-10 place-items-center rounded-full bg-destructive text-destructive-foreground"><X className="h-5 w-5" /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary"><ShoppingBag className="h-9 w-9 text-primary" /></div>
            <p className="font-display text-xl font-bold">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">Que tal escolher um burger caprichado?</p>
            <Link to="/cardapio" onClick={close} className="mt-2 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">Ver cardápio</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4"><CartLines /></div>
            <div className="space-y-3 border-t bg-card p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <Totals />
              <Link to="/checkout" onClick={close} className="flex h-12 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground shadow-pop">Avançar para o checkout</Link>
              <button onClick={close} className="h-11 w-full rounded-2xl border-2 border-primary font-bold text-brand-dark">Continuar comprando</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
