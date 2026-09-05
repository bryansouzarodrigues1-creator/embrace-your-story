import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,92,255,0.22),transparent_32%),radial-gradient(circle_at_15%_55%,rgba(45,212,191,0.10),transparent_30%)]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-white text-black shadow-lg shadow-white/10">
            <Sparkles className="size-4" />
          </span>
          <span>Embrace</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a className="transition hover:text-white" href="#features">Recursos</a>
          <a className="transition hover:text-white" href="#about">Experiência</a>
          <a className="transition hover:text-white" href="#start">Começar</a>
        </nav>
        <a href="#start" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/10">
          Entrar
        </a>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70 backdrop-blur-xl">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
            Uma experiência feita para você
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
            Sua história merece um lugar <span className="bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">extraordinário.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/55 sm:text-xl">
            Uma plataforma moderna para transformar momentos, ideias e conquistas em uma experiência que realmente representa quem você é.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#start" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90">
              Começar agora <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/[0.08]">
              Conhecer recursos
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/45">
            {['Simples de usar', 'Visual premium', 'Feito para você'].map((item) => (
              <span key={item} className="flex items-center gap-2"><Check className="size-4 text-emerald-400" />{item}</span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-10 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="rounded-[1.55rem] border border-white/10 bg-[#101118] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">Seu espaço</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tudo o que importa.</h2>
                </div>
                <div className="grid size-11 place-items-center rounded-2xl bg-white/10"><Zap className="size-5" /></div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Momentos', 'Conquistas', 'Memórias', 'Planos'].map((item, index) => (
                  <div key={item} className="group rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                    <div className="mb-7 flex items-center justify-between">
                      <span className="text-sm text-white/55">0{index + 1}</span>
                      <ArrowRight className="size-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white/70" />
                    </div>
                    <p className="font-medium">{item}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-white/25" style={{ width: `${55 + index * 9}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-violet-300/10 bg-gradient-to-br from-violet-400/10 to-white/[0.02] p-5">
                <p className="text-xs text-white/35">UMA NOVA PERSPECTIVA</p>
                <p className="mt-2 text-sm leading-6 text-white/65">Organize o que você viveu e dê significado ao que ainda está por vir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-y border-white/[0.07] bg-white/[0.018]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-20 sm:grid-cols-3 lg:px-8">
          {[
            ['01', 'Clareza', 'Uma interface limpa para encontrar o que realmente importa.'],
            ['02', 'Personalidade', 'Um espaço que pode evoluir junto com a sua história.'],
            ['03', 'Presença', 'Uma experiência elegante em qualquer tela, do celular ao desktop.'],
          ].map(([number, title, text]) => (
            <article key={number} className="rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition hover:bg-white/[0.045]">
              <span className="text-xs text-white/25">{number}</span>
              <h3 className="mt-10 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-white/45">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300/70">Mais do que um site</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Tecnologia discreta. Experiência marcante.</h2>
          <p className="mt-6 text-lg leading-8 text-white/45">Cada detalhe foi pensado para criar uma presença digital sofisticada, rápida e fácil de navegar — sem excesso de elementos e sem aparência de template.</p>
        </div>
      </section>

      <section id="start" className="relative z-10 mx-6 mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] px-6 py-16 text-center backdrop-blur-xl sm:px-10 lg:mx-auto lg:max-w-7xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.18),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Vamos dar forma à sua história.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/45">Comece com uma experiência simples e transforme-a em algo único.</p>
          <a href="#" className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90">Começar</a>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {new Date().getFullYear()} Embrace. Todos os direitos reservados.</span>
        <span>Uma experiência digital com propósito.</span>
      </footer>
    </main>
  );
}
