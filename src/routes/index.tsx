import { useMemo, useState } from "react";
import { ArrowRight, Bot, BrainCircuit, CheckCircle2, ChevronRight, CircleDollarSign, Clock3, Command, Gauge, Globe2, LayoutDashboard, MessageSquareText, Network, Play, Radar, ShieldCheck, Sparkles, Target, TrendingUp, Users, WandSparkles, Zap } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Index });

type Workflow = { name: string; status: string; value: string; color: string };

const workflows: Workflow[] = [
  { name: "Recuperação de leads esquecidos", status: "Executando", value: "+R$ 8.420", color: "bg-emerald-400" },
  { name: "Clientes em risco de churn", status: "Monitorando", value: "17 sinais", color: "bg-amber-400" },
  { name: "Propostas sem resposta", status: "4 ações prontas", value: "R$ 31.800", color: "bg-violet-400" },
];

function Index() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState("Overview");
  const [toast, setToast] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);

  const liveMetric = useMemo(() => running ? "14 agentes trabalhando" : "12 agentes trabalhando", [running]);

  const runDemo = () => {
    setRunning(true);
    setToast("Embrace iniciou uma nova missão autônoma.");
    window.setTimeout(() => setRunning(false), 2600);
    window.setTimeout(() => setToast("Missão concluída: 3 oportunidades identificadas."), 2800);
    window.setTimeout(() => setToast(""), 6000);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07080c] text-white selection:bg-violet-400/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_5%,rgba(139,92,246,.18),transparent_28%),radial-gradient(circle_at_10%_45%,rgba(45,212,191,.07),transparent_28%)]" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07080c]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => setActive("Overview")} className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-white text-black shadow-lg shadow-white/10"><Sparkles className="size-4" /></span>
            <span className="font-semibold tracking-tight">embrace<span className="text-violet-300">.</span></span>
          </button>
          <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
            {['Overview', 'Missions', 'Intelligence', 'Network'].map((item) => (
              <button key={item} onClick={() => setActive(item)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${active === item ? 'bg-white text-black' : 'text-white/45 hover:text-white'}`}>{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Command palette" onClick={() => setCommandOpen(true)} className="hidden rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-white/45 transition hover:text-white sm:block"><Command className="size-4" /></button>
            <button onClick={runDemo} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90">Run mission</button>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 pt-10 lg:px-8 lg:pt-14">
        <div className="flex flex-col justify-between gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300/70"><span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" /> System online · {liveMetric}</div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Your business, <span className="text-white/35">thinking ahead.</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/40">Embrace é uma camada operacional de IA que observa seus sinais, encontra oportunidades e executa o próximo passo — antes que você precise pedir.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/35"><ShieldCheck className="size-4 text-emerald-400" /> Human approval where it matters</div>
        </div>

        <div className="grid gap-4 py-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['Pipeline protegido', 'R$ 184.240', '+18.4%', TrendingUp],
            ['Oportunidades', '37', '+9 hoje', Target],
            ['Tempo recuperado', '126h', 'este mês', Clock3],
            ['Ações autônomas', '842', '98.7% sucesso', Zap],
          ].map(([label, value, delta, Icon]) => (
            <div key={String(label)} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition hover:border-white/15 hover:bg-white/[0.05]">
              <div className="flex items-center justify-between"><span className="text-xs text-white/35">{label}</span><Icon className="size-4 text-white/25" /></div>
              <div className="mt-5 text-2xl font-semibold tracking-tight">{value}</div>
              <div className="mt-1 text-xs text-emerald-300/70">{delta}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <section className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.035]">
            <div className="flex items-center justify-between border-b border-white/7 px-5 py-4"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-white/30">Autonomous missions</p><h2 className="mt-1 font-semibold">The business is moving.</h2></div><button onClick={() => setActive('Missions')} className="flex items-center gap-1 text-xs text-white/40 hover:text-white">View all <ChevronRight className="size-3.5" /></button></div>
            <div className="divide-y divide-white/[0.06]">
              {workflows.map((workflow) => (
                <button key={workflow.name} onClick={() => setSelectedWorkflow(workflow)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/[0.035]">
                  <div className="flex min-w-0 items-center gap-3"><span className={`size-2 rounded-full ${workflow.color}`} /><div className="min-w-0"><p className="truncate text-sm font-medium">{workflow.name}</p><p className="mt-1 text-xs text-white/30">{workflow.status}</p></div></div>
                  <span className="shrink-0 text-xs font-medium text-white/55">{workflow.value}</span>
                </button>
              ))}
            </div>
            <div className="m-4 rounded-2xl border border-violet-300/10 bg-gradient-to-r from-violet-400/10 to-transparent p-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Bot className="size-4" /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium">{running ? 'Agent swarm is executing...' : 'Embrace recommendation'}</p><p className="mt-1 truncate text-xs text-white/35">{running ? 'Research → decide → execute → verify' : `${selectedWorkflow.name} has a high-confidence next action.`}</p></div><button onClick={runDemo} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black">Approve</button></div></div>
          </section>

          <aside className="rounded-3xl border border-white/8 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between"><p className="text-xs font-medium uppercase tracking-[0.16em] text-white/30">Signal map</p><Radar className="size-4 text-violet-300" /></div>
            <div className="relative mx-auto mt-7 aspect-square max-w-[280px] rounded-full border border-white/7 bg-[radial-gradient(circle,rgba(139,92,246,.15),transparent_55%)]">
              {[['Customers', 'left-8 top-12'], ['Revenue', 'right-2 top-28'], ['Market', 'left-3 bottom-20'], ['Ops', 'right-6 bottom-10']].map(([name, pos]) => <div key={name} className={`absolute ${pos} rounded-xl border border-white/10 bg-[#101117]/90 px-3 py-2 text-[10px] text-white/55 shadow-xl backdrop-blur`}><span className="mr-1.5 inline-block size-1.5 rounded-full bg-violet-300" />{name}</div>)}
              <div className="absolute inset-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-violet-300/20 bg-violet-400/10 shadow-[0_0_70px_rgba(139,92,246,.18)]"><BrainCircuit className="size-8 text-violet-200" /></div>
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-300/20 to-transparent" /><div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
            </div>
            <p className="mt-5 text-sm font-medium">One context, every signal.</p><p className="mt-2 text-xs leading-5 text-white/30">Embrace conecta contexto de clientes, operações, receita e mercado para decidir o que merece atenção.</p>
          </aside>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.018]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/70">Not another dashboard</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">You don't need more software.<br /><span className="text-white/35">You need fewer things to do.</span></h2><p className="mt-5 max-w-md text-sm leading-6 text-white/35">A interface é só o cockpit. O valor está no sistema de agentes que transforma sinais em trabalho concluído, com aprovação humana nos pontos sensíveis.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [Network, 'Context graph', 'Memória operacional contínua em vez de dados espalhados.'],
              [WandSparkles, 'Mission engine', 'Transforme um objetivo em pesquisa, decisão, execução e verificação.'],
              [MessageSquareText, 'Human handoff', 'Quando a confiança não basta, o sistema chama você — com contexto pronto.'],
              [Gauge, 'Outcome ledger', 'Meça dinheiro, tempo e oportunidades recuperadas por cada missão.'],
            ].map(([Icon, title, text]) => <article key={String(title)} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"><Icon className="size-5 text-white/45" /><h3 className="mt-8 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-white/30">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/8 bg-white/[0.035] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/70">Built for the agentic era</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">The software works while you work on the business.</h2></div><button onClick={runDemo} className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Launch a mission <Play className="size-3.5 fill-current transition group-hover:translate-x-0.5" /></button></div>
          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {[['Observe', '2,481 signals', Globe2], ['Reason', '37 hypotheses', BrainCircuit], ['Act', '842 actions', Zap], ['Verify', '98.7% success', CheckCircle2]].map(([title, value, Icon]) => <div key={String(title)} className="rounded-2xl border border-white/7 bg-black/20 p-5"><Icon className="size-4 text-white/35" /><p className="mt-7 text-xs text-white/35">{title}</p><p className="mt-1 font-semibold">{value}</p></div>)}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between"><span className="font-medium text-white/45">embrace.</span><span>AI-native business operations · 2026</span><span className="flex items-center gap-1"><CircleDollarSign className="size-3" /> Outcome over activity.</span></div></footer>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-white/10 bg-[#12131a]/95 px-5 py-3 text-xs font-medium text-white shadow-2xl backdrop-blur-xl">{toast}</div>}

      {commandOpen && <div className="fixed inset-0 z-[60] grid place-items-start justify-center bg-black/60 p-5 pt-[15vh] backdrop-blur-sm" onMouseDown={() => setCommandOpen(false)}><div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#101117] p-3 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center gap-3 border-b border-white/7 px-3 pb-3"><Command className="size-4 text-white/30" /><input autoFocus placeholder="What do you want Embrace to do?" className="w-full bg-transparent text-sm outline-none placeholder:text-white/25" /></div><div className="mt-2 space-y-1"><button onClick={() => { setCommandOpen(false); runDemo(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/65 hover:bg-white/5"><Play className="size-4" /> Start a revenue recovery mission <span className="ml-auto text-[10px] text-white/25">↵</span></button><button onClick={() => { setCommandOpen(false); setActive('Intelligence'); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/65 hover:bg-white/5"><BrainCircuit className="size-4" /> Show intelligence map</button><button onClick={() => { setCommandOpen(false); setActive('Network'); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/65 hover:bg-white/5"><Users className="size-4" /> Open business network</button></div></div></div>}
    </main>
  );
}
