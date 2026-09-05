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
    <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-4 text-white">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-white/40">ERRO 404</p>
        <h1 className="mt-3 text-6xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-4 text-sm leading-6 text-white/45">A página que você procura não existe ou foi movida.</p>
        <Link to="/" className="mt-7 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">Voltar ao início</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Não foi possível carregar</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">Algo inesperado aconteceu. Tente novamente ou volte para o início.</p>
        <div className="mt-7 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">Tentar novamente</button>
          <a href="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/75">Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Embrace — Sua história merece um lugar extraordinário" },
      { name: "description", content: "Uma experiência digital moderna para transformar momentos, ideias e conquistas em algo extraordinário." },
      { name: "author", content: "Embrace" },
      { property: "og:title", content: "Embrace — Sua história merece um lugar extraordinário" },
      { property: "og:description", content: "Uma experiência digital moderna feita para você." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
