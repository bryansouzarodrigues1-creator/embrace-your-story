import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7f9] px-4 text-[#101217]"><div className="max-w-md text-center"><p className="text-sm font-medium text-black/40">ERRO 404</p><h1 className="mt-3 text-6xl font-semibold tracking-tight">Página não encontrada</h1><p className="mt-4 text-sm leading-6 text-black/45">A página que você procura não existe ou foi movida.</p><Link to="/" className="mt-7 inline-flex rounded-full bg-[#11131a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black">Voltar ao CashPilot</Link></div></div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-[#f6f7f9] px-4 text-[#101217]"><div className="max-w-md text-center"><h1 className="text-2xl font-semibold tracking-tight">O CashPilot encontrou um erro</h1><p className="mt-3 text-sm leading-6 text-black/45">Tente novamente para recuperar seu painel.</p><div className="mt-7 flex justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-[#11131a] px-5 py-2.5 text-sm font-semibold text-white">Tentar novamente</button><a href="/" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-black/65">Início</a></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CashPilot — Recebíveis que se administram" },
      { name: "description", content: "Inteligência e automação para reduzir atrasos, priorizar cobranças e recuperar caixa para pequenas e médias empresas." },
      { name: "author", content: "CashPilot" },
      { property: "og:title", content: "CashPilot — Recebíveis que se administram" },
      { property: "og:description", content: "Descubra quem vai atrasar, qual ação tomar e recupere caixa antes que vire problema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
