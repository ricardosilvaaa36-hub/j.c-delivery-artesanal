import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { products } from "@/data/menu";
import { brl, cart } from "@/lib/cart";
import { ui, useUI } from "@/lib/ui-store";
import { ProductImage } from "./ProductCard";

export function Stepper({ value, onChange, min = 0, label }: { value: number; onChange: (n: number) => void; min?: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <button aria-label={`Diminuir ${label}`} onClick={() => onChange(Math.max(min, value - 1))} className="grid h-9 w-9 place-items-center rounded-full bg-muted disabled:opacity-40" disabled={value <= min}>
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center font-bold" aria-live="polite">{value}</span>
      <button aria-label={`Aumentar ${label}`} onClick={() => onChange(value + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ProductSheet() {
  const { productId } = useUI();
  const p = products.find((x) => x.id === productId);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>();
  const [extras, setExtras] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");

  useEffect(() => {
    setQty(1);
    setExtras({});
    setNote("");
    setVariant(p?.variants?.[0]?.id);
  }, [productId]);

  const close = () => ui.set({ productId: null });
  const base = p?.variants?.find((v) => v.id === variant)?.price ?? p?.price ?? 0;
  const extrasTotal = (p?.extras ?? []).reduce((s, e) => s + e.price * (extras[e.id] ?? 0), 0);
  const total = (base + extrasTotal) * qty;

  const add = () => {
    if (!p) return;
    cart.add({
      productId: p.id,
      name: p.name,
      basePrice: base,
      variant: p.variants?.find((v) => v.id === variant)?.name,
      extras: (p.extras ?? []).filter((e) => extras[e.id]).map((e) => ({ ...e, qty: extras[e.id] })),
      note,
      qty,
    });
    ui.set({ productId: null, bump: ui.get().bump + 1 });
    toast.success(`${qty}x ${p.name} adicionado ao carrinho`);
  };

  return (
    <Sheet open={!!p} onOpenChange={(o) => !o && close()}>
      <SheetContent side="bottom" className="mx-auto flex max-h-[92dvh] max-w-lg flex-col gap-0 rounded-t-3xl p-0 [&>button]:hidden">
        {p && (
          <>
            <div className="relative">
              <ProductImage p={p} className="h-52 w-full rounded-t-3xl" />
              <button aria-label="Fechar" onClick={close} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-pop">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <SheetTitle className="font-display text-2xl leading-tight">{p.name}</SheetTitle>
                <SheetDescription className="mt-1 text-sm">{p.description}</SheetDescription>
                {p.note && <p className="mt-2 rounded-xl bg-accent p-2 text-xs font-semibold text-accent-foreground">{p.note}</p>}
                {!p.image && <p className="mt-1 text-xs text-muted-foreground">Foto em breve</p>}
              </div>
              {p.variants && (
                <fieldset>
                  <legend className="mb-2 font-bold">Escolha o tamanho</legend>
                  <div className="space-y-2">
                    {p.variants.map((v) => (
                      <label key={v.id} className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-3 ${variant === v.id ? "border-primary bg-secondary" : "border-border"}`}>
                        <span className="flex items-center gap-2 font-semibold">
                          <input type="radio" name="variant" checked={variant === v.id} onChange={() => setVariant(v.id)} className="accent-[var(--primary)]" />
                          {v.name}
                        </span>
                        <span className="font-bold">{brl(v.price)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              {p.extras && (
                <div>
                  <p className="mb-2 font-bold">Adicionais <span className="text-xs font-normal text-muted-foreground">(opcional)</span></p>
                  <div className="divide-y rounded-xl border">
                    {p.extras.map((e) => (
                      <div key={e.id} className="flex items-center justify-between p-3">
                        <div>
                          <p className="font-semibold">{e.name}</p>
                          <p className="text-sm text-muted-foreground">+ {brl(e.price)}</p>
                        </div>
                        <Stepper label={e.name} value={extras[e.id] ?? 0} onChange={(n) => setExtras((s) => ({ ...s, [e.id]: n }))} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="note" className="mb-2 block font-bold">Observação</label>
                <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={140} rows={2} placeholder="Ex: sem cebola, ponto da carne..." className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="flex items-center gap-3 border-t bg-card p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <Stepper label="quantidade" min={1} value={qty} onChange={setQty} />
              <button onClick={add} className="flex h-12 flex-1 items-center justify-between rounded-2xl bg-primary px-4 font-bold text-primary-foreground shadow-pop">
                <span>Adicionar</span>
                <span>{brl(total)}</span>
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
