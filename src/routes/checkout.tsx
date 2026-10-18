import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Bike, Store } from "lucide-react";
import { business, whatsappLink } from "@/config/business";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, validateOrder, type OrderErrors, type OrderForm } from "@/lib/order";
import { CartLines, Totals } from "@/components/shop/CartDrawer";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — J.C Hamburgueria" },
      { name: "description", content: "Informe seus dados e envie seu pedido pelo WhatsApp da J.C Hamburgueria." },
      { property: "og:title", content: "Finalizar pedido — J.C Hamburgueria" },
      { property: "og:description", content: "Checkout rápido com envio pelo WhatsApp." },
    ],
  }),
  component: Checkout,
});

const empty: OrderForm = { name: "", phone: "", type: "entrega", street: "", number: "", district: "", complement: "", payment: "", changeFor: "", notes: "" };

function Field({ label, error, children, id }: { label: string; error?: string | undefined; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-bold">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm font-semibold text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function Checkout() {
  const items = useCart();
  const [f, setF] = useState<OrderForm>(empty);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [sent, setSent] = useState(false);
  const up = (k: keyof OrderForm) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const input = (k: keyof OrderForm, extra: Record<string, unknown> = {}) => (
    <input id={k} value={f[k]} onChange={up(k)} aria-invalid={!!errors[k]} className={`h-12 w-full rounded-xl border bg-card px-3 outline-none focus:ring-2 focus:ring-ring ${errors[k] ? "border-destructive" : ""}`} {...extra} />
  );

  if (items.length === 0 && !sent) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-3 text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="text-sm text-muted-foreground">Adicione produtos para finalizar o pedido.</p>
        <Link to="/cardapio" className="mt-5 inline-block rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">Ver cardápio</Link>
      </div>
    );
  }

  const submit = () => {
    const e = validateOrder(f);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0] ?? "")?.focus();
      return;
    }
    const url = whatsappLink(buildOrderMessage(items, f));
    setSent(true);
    window.open(url, "_blank", "noopener");
  };

  const typeBtn = (t: OrderForm["type"], icon: ReactNode, label: string) => (
    <button type="button" onClick={() => setF((s) => ({ ...s, type: t }))} aria-pressed={f.type === t} className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border-2 font-bold ${f.type === t ? "border-primary bg-secondary text-brand-dark" : "border-border bg-card"}`}>
      {icon}{label}
    </button>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-5">
      <h1 className="text-2xl font-extrabold">Finalizar pedido</h1>
      {sent && (
        <div className="rounded-2xl border-2 border-primary bg-secondary p-4 text-sm">
          <p className="font-bold">Quase lá! Envie a mensagem no WhatsApp para concluir.</p>
          <p className="mt-1 text-muted-foreground">Seu pedido só é recebido pela J.C após você enviar a mensagem. A confirmação e a taxa de entrega serão informadas por lá.</p>
        </div>
      )}
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate>
        <section className="space-y-3 rounded-2xl bg-card p-4 shadow-soft">
          <h2 className="text-lg font-bold">Seus dados</h2>
          <Field id="name" label="Nome *" error={errors.name}>{input("name", { autoComplete: "name" })}</Field>
          <Field id="phone" label="Telefone para contato *" error={errors.phone}>{input("phone", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "(67) 99999-9999" })}</Field>
        </section>
        <section className="space-y-3 rounded-2xl bg-card p-4 shadow-soft">
          <h2 className="text-lg font-bold">Como deseja receber?</h2>
          <div className="flex gap-3">{typeBtn("entrega", <Bike className="h-5 w-5" />, "Entrega")}{typeBtn("retirada", <Store className="h-5 w-5" />, "Retirada")}</div>
          {f.type === "entrega" ? (
            <>
              <Field id="street" label="Endereço (rua) *" error={errors.street}>{input("street", { autoComplete: "address-line1" })}</Field>
              <div className="grid grid-cols-3 gap-3">
                <Field id="number" label="Número *" error={errors.number}>{input("number", { inputMode: "numeric" })}</Field>
                <div className="col-span-2"><Field id="district" label="Bairro *" error={errors.district}>{input("district")}</Field></div>
              </div>
              <Field id="complement" label="Complemento e referência">{input("complement")}</Field>
            </>
          ) : (
            <p className="rounded-xl bg-muted p-3 text-sm">Retirada em: <strong>{business.address}</strong></p>
          )}
        </section>
        <section className="space-y-3 rounded-2xl bg-card p-4 shadow-soft">
          <h2 id="payment" tabIndex={-1} className="text-lg font-bold">Forma de pagamento *</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {business.paymentMethods.map((p) => (
              <button type="button" key={p.id} aria-pressed={f.payment === p.id} onClick={() => setF((s) => ({ ...s, payment: p.id }))} className={`h-12 rounded-2xl border-2 font-bold ${f.payment === p.id ? "border-primary bg-secondary text-brand-dark" : "border-border"}`}>{p.label}</button>
            ))}
          </div>
          {errors.payment && <p className="text-sm font-semibold text-destructive" role="alert">{errors.payment}</p>}
          {f.payment === "dinheiro" && <Field id="changeFor" label="Troco para quanto?">{input("changeFor", { placeholder: "Ex: R$ 100,00 (deixe vazio se não precisar)", inputMode: "decimal" })}</Field>}
          <Field id="notes" label="Observações gerais">
            <textarea id="notes" value={f.notes} onChange={up("notes")} rows={2} className="w-full rounded-xl border bg-card p-3 outline-none focus:ring-2 focus:ring-ring" />
          </Field>
        </section>
        <section className="space-y-3 rounded-2xl bg-card p-4 shadow-soft">
          <h2 className="text-lg font-bold">Resumo do pedido</h2>
          <CartLines editable={false} />
          <Totals delivery={f.type === "entrega"} />
        </section>
        <button type="submit" className="flex h-14 w-full items-center justify-center rounded-2xl bg-whatsapp text-lg font-extrabold text-primary-foreground shadow-pop">
          Finalizar pedido pelo WhatsApp
        </button>
        <p className="text-center text-xs text-muted-foreground">Você será direcionado ao WhatsApp com a mensagem pronta. O pedido é concluído ao enviar a mensagem.</p>
      </form>
    </div>
  );
}
