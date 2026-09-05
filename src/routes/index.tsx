import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BellRing,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Command,
  CreditCard,
  DollarSign,
  FileCheck2,
  Filter,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Index });

type Invoice = {
  id: string;
  customer: string;
  amount: number;
  due: string;
  daysLate: number;
  risk: "Alto" | "Médio" | "Baixo";
  status: "Atrasada" | "Vence hoje" | "Próxima";
  lastContact: string;
};

const initialInvoices: Invoice[] = [
  { id: "INV-2048", customer: "Orion Arquitetura", amount: 12840, due: "02 set", daysLate: 3, risk: "Alto", status: "Atrasada", lastContact: "Nunca" },
  { id: "INV-2042", customer: "Ateliê Norte", amount: 7840, due: "04 set", daysLate: 1, risk: "Alto", status: "Atrasada", lastContact: "há 2 dias" },
  { id: "INV-2031", customer: "Lumen Engenharia", amount: 18600, due: "05 set", daysLate: 0, risk: "Médio", status: "Vence hoje", lastContact: "há 5 dias" },
  { id: "INV-2027", customer: "Casa Brava Hotel", amount: 9320, due: "08 set", daysLate: 0, risk: "Baixo", status: "Próxima", lastContact: "há 1 dia" },
  { id: "INV-2019", customer: "Vértice Móveis", amount: 4210, due: "10 set", daysLate: 0, risk: "Médio", status: "Próxima", lastContact: "há 7 dias" },
];

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Index() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selected, setSelected] = useState<Invoice | null>(initialInvoices[0]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todas" | "Alto" | "Atrasadas">("Todas");
  const [commandOpen, setCommandOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [scanning, setScanning] = useState(false);

  const filtered = useMemo(() => invoices.filter((invoice) => {
    const matchesQuery = `${invoice.customer} ${invoice.id}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "Todas" || (filter === "Alto" ? invoice.risk === "Alto" : invoice.status === "Atrasada");
    return matchesQuery && matchesFilter;
  }), [filter, invoices, query]);

  const overdueTotal = invoices.filter((i) => i.status === "Atrasada").reduce((sum, i) => sum + i.amount, 0);
  const atRiskTotal = invoices.filter((i) => i.risk === "Alto").reduce((sum, i) => sum + i.amount, 0);

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const sendRecovery = (invoice: Invoice) => {
    setInvoices((current) => current.map((item) => item.id === invoice.id ? { ...item, lastContact: "agora" } : item));
    setSelected({ ...invoice, lastContact: "agora" });
    flash(`Cobrança inteligente enviada para ${invoice.customer}.`);
  };

  const runScan = () => {
    setScanning(true);
    flash("CashPilot está analisando comportamento de pagamento...");
    window.setTimeout(() => {
      setScanning(false);
      flash("Análise concluída: 2 clientes entraram em zona de risco.");
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#101217]">
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-xl bg-[#11131a] text-white"><WalletCards className="size-4" /></span><span className="font-semibold tracking-[-0.03em]">CashPilot</span></div>
            <nav className="hidden items-center gap-1 md:flex"><button className="rounded-lg bg-black/[0.05] px-3 py-2 text-xs font-medium">Visão geral</button><button className="px-3 py-2 text-xs text-black/45 hover:text-black">Recebíveis</button><button className="px-3 py-2 text-xs text-black/45 hover:text-black">Clientes</button><button className="px-3 py-2 text-xs text-black/45 hover:text-black">Automações</button></nav>
          </div>
          <div className="flex items-center gap-2"><button onClick={() => setCommandOpen(true)} className="hidden rounded-lg border border-black/10 p-2 text-black/40 hover:text-black sm:block" aria-label="Abrir comandos"><Command className="size-4" /></button><button onClick={runScan} className="flex items-center gap-2 rounded-lg bg-[#11131a] px-3 py-2 text-xs font-semibold text-white transition hover:bg-black"><Sparkles className="size-3.5" /> {scanning ? "Analisando..." : "Rodar análise"}</button><div className="ml-1 grid size-8 place-items-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">BR</div></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[230px_1fr]">
        <aside className="hidden border-r border-black/[0.06] px-4 py-6 lg:block"><p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">Operação</p><div className="mt-3 space-y-1">{[[LayoutDashboard, "Visão geral", true], [CreditCard, "Recebíveis", false], [Users, "Clientes", false], [Bot, "Agente de cobrança", false]].map(([Icon, label, active]) => <button key={String(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium ${active ? "bg-white shadow-sm ring-1 ring-black/[0.05]" : "text-black/45 hover:bg-white/70"}`}><Icon className="size-4" />{label}</button>)}</div><p className="mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">Inteligência</p><div className="mt-3 space-y-1">{[[Target, "Risco de atraso"], [RefreshCw, "Reconciliação"], [ShieldCheck, "Políticas"]].map(([Icon, label]) => <button key={String(label)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-black/45 hover:bg-white/70"><Icon className="size-4" />{label}</button>)}</div><div className="mt-12 rounded-2xl border border-violet-200 bg-violet-50 p-4"><p className="text-xs font-semibold">CashPilot AI</p><p className="mt-1 text-[11px] leading-4 text-black/45">Aprende com seus ciclos de pagamento e ajusta o próximo contato.</p><button onClick={runScan} className="mt-3 text-[11px] font-semibold text-violet-700">Analisar agora →</button></div></aside>

        <section className="min-w-0 px-5 py-7 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-medium text-black/40">Sexta-feira, 5 de setembro</p><h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Bom dia. Seu caixa está sob controle.</h1><p className="mt-2 max-w-2xl text-sm text-black/45">O CashPilot monitora quem deve, quando pagar e qual ação aumenta a chance de receber — sem você precisar perseguir cada cliente.</p></div><div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> IA ativa · 24 sinais analisados</div></div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["A receber", money.format(184240), "+12,8% vs. mês anterior", WalletCards, "text-black"],
              ["Em atraso", money.format(overdueTotal), `${invoices.filter(i => i.status === "Atrasada").length} títulos precisam de ação`, AlertTriangle, "text-rose-600"],
              ["Em risco", money.format(atRiskTotal), "IA encontrou 2 sinais críticos", Target, "text-amber-600"],
              ["Recuperado por IA", money.format(28460), "últimos 30 dias", TrendingUp, "text-emerald-600"],
            ].map(([label, value, helper, Icon, color]) => <article key={String(label)} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,.03)]"><div className="flex items-center justify-between"><span className="text-xs text-black/40">{label}</span><Icon className={`size-4 ${color}`} /></div><p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-1 text-[11px] text-black/35">{helper}</p></article>)}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
            <section className="min-w-0 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
              <div className="flex flex-col gap-3 border-b border-black/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-sm font-semibold">Fila de recebíveis</h2><p className="mt-1 text-xs text-black/35">Priorizada pelo potencial de atraso e valor em risco.</p></div><div className="flex gap-2"><div className="relative"><Search className="absolute left-2.5 top-2.5 size-3.5 text-black/25" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cliente..." className="w-44 rounded-lg border border-black/10 bg-[#fafafa] py-2 pl-8 pr-3 text-xs outline-none focus:border-black/25" /></div><button onClick={() => setFilter(filter === "Todas" ? "Alto" : filter === "Alto" ? "Atrasadas" : "Todas")} className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 text-xs text-black/55"><Filter className="size-3.5" /> {filter}<ChevronDown className="size-3" /></button></div></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead><tr className="border-b border-black/[0.05] text-[10px] uppercase tracking-[0.12em] text-black/30"><th className="px-5 py-3 font-semibold">Cliente</th><th className="px-3 py-3 font-semibold">Vencimento</th><th className="px-3 py-3 font-semibold">Valor</th><th className="px-3 py-3 font-semibold">Risco</th><th className="px-3 py-3 font-semibold">Último contato</th><th className="px-5 py-3"></th></tr></thead><tbody>{filtered.map((invoice) => <tr key={invoice.id} onClick={() => setSelected(invoice)} className="cursor-pointer border-b border-black/[0.05] transition hover:bg-[#fafafa]"><td className="px-5 py-4"><p className="text-xs font-semibold">{invoice.customer}</p><p className="mt-1 text-[10px] text-black/30">{invoice.id}</p></td><td className="px-3 py-4"><span className={`text-xs ${invoice.daysLate > 0 ? "font-semibold text-rose-600" : "text-black/55"}`}>{invoice.due}</span>{invoice.daysLate > 0 && <span className="ml-1.5 text-[10px] text-rose-500">+{invoice.daysLate}d</span>}</td><td className="px-3 py-4 text-xs font-medium">{money.format(invoice.amount)}</td><td className="px-3 py-4"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${invoice.risk === "Alto" ? "bg-rose-50 text-rose-700" : invoice.risk === "Médio" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{invoice.risk}</span></td><td className="px-3 py-4 text-xs text-black/40">{invoice.lastContact}</td><td className="px-5 py-4 text-right"><MoreHorizontal className="ml-auto size-4 text-black/25" /></td></tr>)}</tbody></table></div>
              {filtered.length === 0 && <div className="p-12 text-center"><Search className="mx-auto size-6 text-black/20" /><p className="mt-3 text-sm font-medium">Nenhum recebível encontrado.</p><p className="mt-1 text-xs text-black/35">Tente outro cliente ou filtro.</p></div>}
            </section>

            <aside className="rounded-2xl border border-black/[0.07] bg-[#11131a] p-5 text-white shadow-xl shadow-black/10">
              {selected ? <><div className="flex items-start justify-between"><div><span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">Próxima melhor ação</span><h2 className="mt-2 text-lg font-semibold tracking-[-0.03em]">{selected.customer}</h2><p className="mt-1 text-xs text-white/35">{selected.id} · {money.format(selected.amount)}</p></div><button onClick={() => setSelected(null)} className="text-white/25 hover:text-white"><X className="size-4" /></button></div><div className="mt-6 rounded-xl border border-violet-300/10 bg-violet-400/[0.08] p-4"><div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-violet-200"><Bot className="size-4" /></span><div><p className="text-xs font-semibold">Confiança 91%</p><p className="mt-1 text-[11px] leading-5 text-white/45">O padrão indica que um lembrete pessoal hoje tem maior chance de recuperar este valor do que esperar o próximo ciclo.</p></div></div></div><div className="mt-5 space-y-3"><div className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-lg bg-white/5"><Clock3 className="size-3.5 text-white/40" /></span><div><p className="text-[10px] text-white/30">Janela recomendada</p><p className="text-xs font-medium">Hoje, entre 14h e 16h</p></div></div><div className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-lg bg-white/5"><Mail className="size-3.5 text-white/40" /></span><div><p className="text-[10px] text-white/30">Canal sugerido</p><p className="text-xs font-medium">WhatsApp + e-mail de respaldo</p></div></div><div className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-lg bg-white/5"><ShieldCheck className="size-3.5 text-white/40" /></span><div><p className="text-[10px] text-white/30">Política</p><p className="text-xs font-medium">Sem ameaça, juros ou cobrança automática</p></div></div></div><button onClick={() => sendRecovery(selected)} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold text-black transition hover:bg-white/90"><Send className="size-3.5" /> Aprovar cobrança inteligente</button><button onClick={() => flash("Mensagem aberta para edição antes do envio.")} className="mt-2 w-full py-2 text-[11px] text-white/35 hover:text-white">Revisar mensagem</button></> : <div className="grid min-h-[420px] place-items-center text-center"><div><FileCheck2 className="mx-auto size-7 text-white/20" /><p className="mt-3 text-sm font-medium">Selecione um recebível</p><p className="mt-1 text-xs text-white/30">O agente explicará a próxima ação.</p></div></div>}
            </aside>
          </div>

          <section className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-black/[0.07] bg-white p-5"><div className="flex items-center gap-2 text-xs font-semibold"><BellRing className="size-4 text-amber-500" /> Alertas inteligentes</div><p className="mt-4 text-2xl font-semibold">7</p><p className="mt-1 text-xs text-black/35">eventos merecem sua atenção hoje</p><button onClick={runScan} className="mt-5 text-xs font-semibold text-black">Ver sinais <ArrowUpRight className="ml-1 inline size-3" /></button></article>
            <article className="rounded-2xl border border-black/[0.07] bg-white p-5"><div className="flex items-center gap-2 text-xs font-semibold"><TrendingDown className="size-4 text-rose-500" /> Tendência de atraso</div><div className="mt-5 flex items-end gap-1"><span className="text-2xl font-semibold">-14%</span><span className="pb-1 text-[10px] text-emerald-600">vs. 30 dias</span></div><div className="mt-4 h-10 flex items-end gap-1">{[30,34,28,38,25,29,18,22,14,17,10,12].map((height, i) => <span key={i} className="flex-1 rounded-sm bg-black/[0.08]" style={{ height: `${height}px` }} />)}</div></article>
            <article className="rounded-2xl border border-black/[0.07] bg-white p-5"><div className="flex items-center gap-2 text-xs font-semibold"><CheckCircle2 className="size-4 text-emerald-500" /> Automação</div><p className="mt-4 text-sm font-semibold">31 cobranças resolvidas</p><p className="mt-1 text-xs text-black/35">sem intervenção humana este mês</p><div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-700"><Check className="size-3" /> regras de segurança ativas</div></article>
          </section>
        </section>
      </div>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-[#11131a] px-5 py-3 text-xs font-medium text-white shadow-2xl"><Zap className="size-3.5 text-violet-300" />{notice}</div>}

      {commandOpen && <div className="fixed inset-0 z-[70] grid place-items-start justify-center bg-black/40 p-5 pt-[16vh] backdrop-blur-sm" onMouseDown={() => setCommandOpen(false)}><div className="w-full max-w-lg rounded-2xl bg-white p-3 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center gap-2 border-b border-black/[0.07] px-3 pb-3"><Command className="size-4 text-black/30" /><input autoFocus placeholder="O que você quer resolver?" className="w-full bg-transparent text-sm outline-none placeholder:text-black/25" /></div><div className="mt-2"><button onClick={() => { setCommandOpen(false); runScan(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs hover:bg-black/[0.04]"><Sparkles className="size-4 text-violet-600" /><span><b>Encontrar dinheiro em risco</b><span className="ml-2 text-black/35">analisar todos os recebíveis</span></span></button><button onClick={() => { setCommandOpen(false); setFilter("Atrasadas"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs hover:bg-black/[0.04]"><AlertTriangle className="size-4 text-rose-500" /><span><b>Mostrar atrasados</b><span className="ml-2 text-black/35">priorizar cobrança</span></span></button><button onClick={() => { setCommandOpen(false); flash("Relatório de caixa preparado para revisão."); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs hover:bg-black/[0.04]"><DollarSign className="size-4 text-emerald-600" /><span><b>Preparar relatório</b><span className="ml-2 text-black/35">visão executiva do mês</span></span></button></div></div></div>}
    </main>
  );
}
