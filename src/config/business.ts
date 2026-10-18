/**
 * Configurações do negócio — edite aqui telefone, endereço, horários,
 * taxa de entrega e formas de pagamento.
 */
export const business = {
  name: "J.C Hamburgueria",
  slogan: "Feito com carinho, servido com alegria!",
  phoneDisplay: "(67) 99242-0331",
  whatsappNumber: "5567992420331",
  instagramUrl: "https://www.instagram.com/jc_burges_/",
  instagramHandle: "@jc_burges_",
  address: "Avenida da Saudade, 2060, Jardim Aeroporto, Aparecida do Taboado - MS",
  /** Texto exibido no menu. Coloque null para mostrar "Consulte nossos horários pelo WhatsApp". */
  hours: "Todos os dias das 17h às 23h30" as string | null,
  averageDeliveryTime: "Tempo médio de entrega: 50 min",
  /**
   * Taxa de entrega em reais. Deixe null enquanto não houver valor oficial:
   * o site mostra "a combinar" e avisa que a taxa será confirmada no WhatsApp.
   */
  deliveryFee: null as number | null,
  paymentMethods: [
    { id: "pix", label: "Pix" },
    { id: "dinheiro", label: "Dinheiro" },
    { id: "cartao", label: "Cartão (débito/crédito)" },
  ],
} as const;

export type PaymentMethodId = (typeof business.paymentMethods)[number]["id"];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
