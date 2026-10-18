import logo from "@/assets/logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <img src={logo.url} alt="Logo J.C Hamburgueria" className={cn("rounded-full bg-brand-dark object-cover", className)} />;
}
