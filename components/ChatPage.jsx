/* Hero Chat page — scripted demo */

const CHAT_DEMO = [
  {
    chip: "Regulated FinTech",
    q: "We're a regulated FinTech looking for a Principal Cloud Architect. Does Geoff fit?",
    a: [
      { p: "Short answer: **yes**, and the fit is unusually clean. Here's why:" },
      { ul: [
        "**12 years of regulated FinTech cloud.** FFIEC / PCI-DSS / SOC 2 compliance and a 100+ account AWS landing zone across regulated FinTechs — Early Warning (Zelle), REPAY, Silicon Valley Bank, and First Citizens Bank.",
        "**30% YoY AWS spend cut at FCB** via FinOps dashboards and event-driven rightsizing — *without* touching reliability.",
        "**Bank-hardened EKS platform:** multi-AZ, CIS-benchmarked, OPA/Gatekeeper, automated zero-day node patching.",
        "**Override-as-code:** every security exception peer-reviewed and committed to Git — auditors love it.",
      ]},
      { p: "If you want to go deeper on the landing zone architecture or the FinOps automation, ask me — I have the diagrams." },
    ],
    sources: ["First Citizens Bank · Director role", "REPAY · Director role", "Policy-as-code whitepaper"],
  },
  {
    chip: "AI / Agentic Engineering",
    q: "How does Geoff's agentic AI experience compare to someone from a pure AI lab?",
    a: [
      { p: "Different shape, probably stronger for a product org. Geoff leads **Level-4 agentic software engineering** — one stage from full automation — with the infrastructure chops to actually ship it in production." },
      { ul: [
        "Builds **MCP servers and patterned agent layers** that apply engineering patterns across projects consistently.",
        "At **PayPal**, ships agentic code & configuration review tooling with automatic approval gates for the Command Center.",
        "Uses **competing-incentive verification** — verifier agents with different incentives audit the author agent, plus validation sourced external to the source repo.",
        "Result: **3× developer throughput** with security, compliance, and consistency intact.",
      ]},
      { p: "A lab researcher would beat Geoff on model internals. Geoff will beat them on *shipping agentic workflows inside a regulated enterprise*." },
    ],
    sources: ["PayPal · Sr Engineering Manager SRE", "Technical Achievements · AI-Driven Engineering"],
  },
  {
    chip: "Cost optimization",
    q: "We need someone to cut our AWS bill without destabilizing production. Proof?",
    a: [
      { p: "Receipts, in order of size:" },
      { ul: [
        "**30% YoY cut at First Citizens Bank** across 100+ AWS accounts via FinOps dashboards + automated rightsizing.",
        "**70%+ cut** on non-prod at multiple orgs via event-driven teardown/spin-up automation.",
        "**VPC endpoint consolidation:** replaced thousands of duplicate interface endpoints with a single multi-AZ hub — top-3 AWS line item → negligible. Hundreds of thousands saved annually.",
        "**S3 lifecycle + Glacier** storage-cost optimization for green-field video infrastructure at OWNZONES.",
      ]},
      { p: "Method is boring on purpose: instrument first, tag everything, event-driven automation in the margins, never ship a cost optimization without a rollback plan. `cost_allocation.enabled = true` is where it starts." },
    ],
    sources: ["FCB · Director", "REPAY · Director", "OWNZONES · Lead DevOps"],
  },
  {
    chip: "Leadership style",
    q: "What's Geoff like to work for?",
    a: [
      { p: "Manager track + IC track, both active. Grew REPAY's infra org from **1 engineer to 18** across SRE, ops, and platform dev. Led a **12-person platform team** at FCB and founded the Cloud Community of Practice." },
      { ul: [
        "**Servant leadership** — I draw the architecture, hand you the guardrails, get out of the way.",
        "**Mentoring loop:** pair → pattern → delegate → audit. Every hire should be doing my job in two years.",
        "**Writes a lot:** turns incidents and architecture into deterministic documentation artifacts — GameDay readiness reports, ARB-ready docs. If it's not written, it didn't happen.",
        "**Decisive in crisis, patient in design.** Happy to sit in silence during a P1.",
      ]},
    ],
    sources: ["REPAY · Director", "FCB · Director", "PayPal · Sr EM"],
  },
];

function renderContent(blocks) {
  return blocks.map((b, i) => {
    if (b.p) return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b.p) }} />;
    if (b.ul) return <ul key={i}>{b.ul.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: inline(li) }} />)}</ul>;
    return null;
  });
}
function inline(s) {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

const resolveSource = (s) => {
  if (/first citizens|fcb/i.test(s)) return { route: "resume", payload: { roleId: "fcb" } };
  if (/repay/i.test(s))              return { route: "resume", payload: { roleId: "repay" } };
  if (/paypal/i.test(s))             return { route: "resume", payload: { roleId: "paypal" } };
  if (/ownzones/i.test(s))           return { route: "resume", payload: { roleId: "ownzones" } };
  if (/technical achievements/i.test(s)) return { route: "achievements", payload: null };
  if (/whitepaper/i.test(s))         return { route: "articles", payload: null };
  return null;
};

const Thinking = () => (
  <span className="thinking"><span className="dot" /><span className="dot" /><span className="dot" /> parsing JD · retrieving context · drafting</span>
);

const SystemPromptPeek = () => (
  <pre>
<span className="c"># system.cue — compiled to Anthropic tool schema at build time</span>{"\n"}
<span className="k">package</span> <span className="f">resume_agent</span>{"\n\n"}
<span className="k">import</span> (&#10;  <span className="s">"cue.geoffmiller.cloud/resume"</span>&#10;  <span className="s">"cue.geoffmiller.cloud/personas"</span>&#10;){"\n\n"}
<span className="f">agent</span>: {"{"}{"\n"}
  <span className="f">model</span>:     <span className="s">"claude-sonnet-4.5"</span>{"\n"}
  <span className="f">system</span>:    resume.context + personas.active{"\n"}
  <span className="f">tools</span>:     [<span className="s">"fetch_jd"</span>, <span className="s">"score_fit"</span>, <span className="s">"cite_role"</span>]{"\n"}
  <span className="f">retrieval</span>: {"{"}{"\n"}
    <span className="f">corpus</span>:   [<span className="s">"roles"</span>, <span className="s">"projects"</span>, <span className="s">"articles"</span>]{"\n"}
    <span className="f">top_k</span>:    <span className="s">8</span>{"\n"}
    <span className="f">rerank</span>:   <span className="s">true</span>{"\n"}
  {"}"}{"\n"}
{"}"}{"\n"}
  </pre>
);

const ChatPage = () => {
  const [turns, setTurns] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [mode, setMode] = React.useState("chat");
  const [howOpen, setHowOpen] = React.useState(false);
  const usedRef = React.useRef(new Set());
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.parentElement?.scrollTo?.({ top: 999999, behavior: "smooth" });
  }, [turns, pending]);

  const askFromChip = (demo) => {
    if (pending) return;
    usedRef.current.add(demo.q);
    const userTurn = { role: "user", content: demo.q };
    setTurns(t => [...t, userTurn]);
    setPending(true);
    setTimeout(() => {
      setTurns(t => [...t, { role: "assistant", content: demo.a, sources: demo.sources }]);
      setPending(false);
    }, 1400);
  };

  const onSubmit = (e) => {
    e?.preventDefault?.();
    const q = input.trim();
    if (!q || pending) return;
    setInput("");
    // Try to match a demo roughly; otherwise use a generic fallback
    const matched = CHAT_DEMO.find(d => !usedRef.current.has(d.q)) || CHAT_DEMO[0];
    setTurns(t => [...t, { role: "user", content: q }]);
    setPending(true);
    setTimeout(() => {
      setTurns(t => [...t, { role: "assistant", content: matched.a, sources: matched.sources }]);
      usedRef.current.add(matched.q);
      setPending(false);
    }, 1400);
  };

  return (
    <div className="page chat-hero">
      <div className="chat-head">
        <span className="eyebrow">Meet Geoff · Interactive</span>
        <h1>
          Ask my <span className="grad">résumé</span> anything.
        </h1>
        <p className="sub">
          Paste a JD or just ask — I'll answer from 12 years of cloud + agentic AI, and the messy practical bits in between. Try one of the starter prompts.
        </p>
      </div>

      {/* Chat thread */}
      {turns.length > 0 && (
        <div className="chat-thread panel" style={{ padding: "18px 22px", maxHeight: "54vh", overflowY: "auto" }}>
          {turns.map((t, i) => (
            <div key={i} className={"msg " + t.role}>
              <div className="msg-avatar">{t.role === "user" ? "JD" : "G"}</div>
              <div className="msg-body">
                <div className="msg-who">{t.role === "user" ? "Recruiter" : "geoff-agent"}</div>
                <div className="msg-content">
                  {typeof t.content === "string" ? <p>{t.content}</p> : renderContent(t.content)}
                  {t.sources && (
                    <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {t.sources.map((s, j) => {
                        const link = resolveSource(s);
                        return (
                          <button key={j} type="button" className="tag source-chip" style={{ fontSize: 10, cursor: link ? "pointer" : "default" }}
                                  onClick={() => link && window.GO?.(link.route, link.payload)}>
                            <Icon name="file" size={10} />{s}
                            {link && <Icon name="chevronRight" size={9} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {pending && (
            <div className="msg assistant">
              <div className="msg-avatar">G</div>
              <div className="msg-body">
                <div className="msg-who">geoff-agent</div>
                <Thinking />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Composer */}
      <form className="composer" onSubmit={onSubmit}>
        <textarea
          placeholder="Paste a JD URL — or ask me anything"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit(e); }}
        />
        <div className="composer-foot">
          <div className="modes">
            <span className={"mode" + (mode === "chat" ? " active" : "")} onClick={() => setMode("chat")}>CHAT</span>
            <span className={"mode" + (mode === "jd" ? " active" : "")}   onClick={() => setMode("jd")}>JD URL</span>
            <span className={"mode" + (mode === "score" ? " active" : "")} onClick={() => setMode("score")}>FIT SCORE</span>
          </div>
          <span className="grow" />
          <button type="button" className="tag" style={{ cursor: "pointer" }} title="Persona carried from the resume — click to change it there"
                  onClick={() => window.ROUTE_SET?.("resume")}>
            persona: {(localStorage.getItem("persona") || "ai")}
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>claude-sonnet-4.5 · 8k ctx</span>
          <button type="submit" className="btn btn-primary btn-sm" disabled={!input.trim() || pending}>
            <Icon name="send" size={13} />
            Send
            <span className="kbd" style={{ marginLeft: 4 }}>⌘↵</span>
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {turns.length === 0 && (
        <>
          <div className="divider">Try one of these</div>
          <div className="suggestions">
            {CHAT_DEMO.map(d => (
              <button key={d.q} className="sugg" onClick={() => askFromChip(d)}>
                <span className="sugg-label">{d.chip}</span>
                <span className="sugg-q">{d.q}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* How it works accordion */}
      <div className={"accordion" + (howOpen ? " open" : "")}>
        <div className="accordion-head" onClick={() => setHowOpen(o => !o)}>
          <Icon name="chevronRight" size={14} className="chev" />
          <span className="eyebrow" style={{ color: howOpen ? "var(--accent)" : "var(--text-mute)" }}>How this works</span>
          <span style={{ color: "var(--text-dim)", fontSize: 13 }}>RAG + tool-using agent · CUE-typed résumé · Anthropic MCP</span>
          <span className="grow" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
            {howOpen ? "hide" : "peek under the hood"}
          </span>
        </div>
        <div className="accordion-body">
          <div className="how-it-works">
            <div>
              <h5>Architecture</h5>
              <ul>
                <li>Résumé is a <code>CUE</code> schema. Everything on this site compiles from that single source of truth.</li>
                <li>On question, an agent embeds the JD, retrieves top-k role/project chunks (rerank + rerun), then answers with inline citations.</li>
                <li>Guardrails: the agent cannot invent roles or numbers outside the CUE corpus. A verifier agent with a competing incentive re-checks every factual claim.</li>
                <li>Tools exposed via MCP: <code>fetch_jd</code>, <code>score_fit</code>, <code>cite_role</code>.</li>
              </ul>
            </div>
            <div>
              <h5>System prompt (excerpt)</h5>
              <SystemPromptPeek />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ChatPage = ChatPage;
