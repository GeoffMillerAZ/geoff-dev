/* Interactive Resume page — dashboard + compact roles + full role detail */

const PERSONA_LABELS = { ai: "Agentic AI Engineer", cloud: "Cloud Architect", leadership: "Technology Leadership" };

/* Which skills (by skillGroups id) belong to which role */
const ROLE_SKILLS = {
  paypal:    ["ai", "iac", "obs"],           // agentic, IaC, observability/SRE
  fcb:       ["platform", "iac", "aws", "sec", "finops"],
  repay:     ["platform", "iac", "aws", "sec", "obs"],
  ews:       ["platform", "iac", "obs"],
  thinkvine: ["iac", "aws"],
  ownzones:  ["aws", "iac"],
  azstate:   ["platform"],
};

/* Which bullets to feature on the compact card, per persona.
   Returns top 3 favored bullets; falls back to first N. */
const favorForPersona = {
  ai:         ["ai", "platform"],
  cloud:      ["cloud", "platform", "finops", "sec"],
  leadership: ["lead", "sre"],
};
const topBulletsFor = (role, persona, n = 3) => {
  const favored = favorForPersona[persona] || [];
  const hit = role.bullets.filter(b => favored.includes(b.tag));
  const rest = role.bullets.filter(b => !favored.includes(b.tag));
  return [...hit, ...rest].slice(0, n);
};

/* Persona-aware global dashboard stats */
const DASH_STATS = {
  ai: [
    { value: "L4/5",     label: "Agentic engineering harnesses", sub: "at PayPal · planning → build → validation" },
    { value: "Top",      label: "AI user, enterprise-wide",      sub: "PayPal AI Super Users community" },
    { value: "3×",       label: "Dev throughput lift",           sub: "patterned agents + competing-incentive verification" },
    { value: "12y",      label: "Infra depth backing the AI",    sub: "AWS · Kubernetes · CNCF · regulated FinTech" },
  ],
  cloud: [
    { value: "100+",     label: "AWS accounts governed",         sub: "landing zone · multi-region · bank-hardened" },
    { value: "30%",      label: "YoY AWS spend cut",             sub: "FinOps automation at First Citizens" },
    { value: "0",        label: "PCI criticals",                 sub: "first-time green-field pass at REPAY" },
    { value: "70%+",     label: "Non-prod spend cut",            sub: "event-driven environments" },
  ],
  leadership: [
    { value: "1 → 18",   label: "Team grown",                    sub: "REPAY infra org, from the ground up" },
    { value: "12",       label: "Direct reports",                sub: "platform team at First Citizens" },
    { value: "0 → 100+", label: "Accounts onboarded",            sub: "platform + CoP model · no Ops bottleneck" },
    { value: "6–12w → d",label: "Feature lead time",             sub: "after monorepo → team-owned repos" },
  ],
};

const DashboardCard = ({ value, label, sub, featured }) => (
  <div className={"dash-card" + (featured ? " is-featured" : "")}>
    <div className="dash-card-value">{value}</div>
    <div className="dash-card-label">{label}</div>
    <div className="dash-card-sub">{sub}</div>
  </div>
);

/* =========================================================
   Full-page role detail view
   ========================================================= */
const RoleDetail = ({ role, persona, onBack }) => {
  const D = window.SITE_DATA;
  const skillIds = ROLE_SKILLS[role.id] || [];
  const skillGroups = D.skillGroups.filter(g => skillIds.includes(g.id));

  // Scroll to top on open
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [role.id]);

  const favored = favorForPersona[persona] || [];

  return (
    <div className="page role-detail">
      <button className="role-back" onClick={onBack}>
        <Icon name="chevronLeft" size={13} />
        Back to resume
      </button>

      <div className="role-detail-head">
        <div className="role-detail-crumb">
          <span>Experience</span>
          <span className="sep">/</span>
          <span>{role.company}</span>
        </div>
        <h1 className="role-detail-title">{role.title}</h1>
        <div className="role-detail-company">
          <span className="name">{role.company}</span>
          <span className="sep">·</span>
          <span>{role.location}</span>
          <span className="sep">·</span>
          <span>{role.start} — {role.end}</span>
        </div>
        <p className="role-detail-tagline">{role.tagline}</p>
        <div className="role-detail-scope">
          {role.scope.map((s, j) => (
            <span key={j} className="scope-chip">{s}</span>
          ))}
        </div>
      </div>

      {/* Impact dashboard */}
      {role.impact?.stats && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">01</span>
            <h2>Impact</h2>
            <span className="hint">measurable outcomes delivered at {role.company}</span>
          </div>
          <div className="stat-grid">
            {role.impact.stats.map((s, j) => (
              <div key={j} className="stat">
                <div className="stat-value">
                  {s.value}{s.unit && <span className="unit">{s.unit}</span>}
                </div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
          {role.impact.chart && (
            <div style={{ marginTop: 22 }}>
              <AreaChart data={role.impact.chart} />
            </div>
          )}
        </section>
      )}

      {/* Full bullets */}
      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">{role.impact?.stats ? "02" : "01"}</span>
          <h2>What I did</h2>
          <span className="hint">highlighted for · <span style={{ color: "var(--accent)" }}>{PERSONA_LABELS[persona]}</span></span>
        </div>
        <ul className="role-bullets role-detail-bullets">
          {role.bullets.map((b, j) => {
            const hl = favored.includes(b.tag);
            return (
              <li key={j} className={"bullet" + (hl ? " is-highlighted" : "")}>
                <span>{b.text}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Skills used here */}
      {skillGroups.length > 0 && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">{role.impact?.stats ? "03" : "02"}</span>
            <h2>Skills deployed</h2>
            <span className="hint">{skillGroups.length} groups</span>
          </div>
          <div className="skills-grid">
            {skillGroups.map(g => (
              <div key={g.id} className="skill-group">
                <div className="skill-group-title">
                  <span>{g.title}</span>
                </div>
                <div className="skill-list">
                  {g.skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Architecture diagram */}
      {role.impact?.diagram && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">{role.impact?.stats ? (skillGroups.length ? "04" : "03") : "03"}</span>
            <h2>Architecture</h2>
            <span className="hint">how it was actually built</span>
          </div>
          <div className="diagram" style={{ marginTop: 6 }}>
            {role.impact.diagram === "landingzone"   && <LandingZoneDiagram />}
            {role.impact.diagram === "commandcenter" && <CommandCenterDiagram />}
            {role.impact.diagram === "idp"           && <IDPDiagram />}
          </div>
        </section>
      )}

      {/* Related case studies */}
      {(window.SITE_DATA.achievements || []).filter(a => a.roleId === role.id).length > 0 && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">•</span>
            <h2>Case studies from this role</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {window.SITE_DATA.achievements.filter(a => a.roleId === role.id).map(a => (
              <button key={a.id} className="xlink-chip" onClick={() => window.GO?.("achievements", { achievementId: a.id })}>
                <span className="xlink-metric">{a.metric}</span>
                <span>{a.title}</span>
                <Icon name="chevronRight" size={11} />
              </button>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 48, display: "flex", gap: 10 }}>
        <button className="btn" onClick={onBack}>
          <Icon name="chevronLeft" size={13} />
          Back to resume
        </button>
        <button className="btn btn-primary" onClick={() => window.ROUTE_SET?.("chat")}>
          <Icon name="sparkles" size={13} />
          Ask the JD-chat about this role
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   ATS / scanner-friendly resume (plain, keyword-complete)
   Rendered via portal to <body>, shown only when printing in robot mode.
   ========================================================= */
const AtsResume = () => {
  const D = window.SITE_DATA;
  const p = D.profile;
  const summary = "Infrastructure Director and Principal Cloud Architect with 20 years in IT and 12 years designing, leading, and operating cloud platforms at regulated FinTechs. Deep expertise in AWS, Kubernetes, and the CNCF ecosystem with a focus on platform engineering, DevSecOps, FinOps automation, policy-as-code compliance (FFIEC, PCI-DSS, SOC 2), and Level-4 agentic software engineering. Proven record cutting cloud spend 30%+, governing 100+ AWS accounts, passing PCI-DSS with zero criticals, and building high-performing platform teams.";

  return ReactDOM.createPortal(
    <div className="ats-doc" aria-hidden="true">
      <h1>{p.name}</h1>
      <div className="ats-contact">
        {[p.tagline].filter(Boolean).join("")}
      </div>
      <div className="ats-contact">
        {p.location} | {p.email} | {p.phone} | {p.links.site} | {p.links.github} | {p.links.linkedin}
      </div>

      <h2>Professional Summary</h2>
      <p>{summary}</p>

      <h2>Core Skills</h2>
      <div className="ats-skills">
        {D.skillGroups.map(g => (
          <div key={g.id}><strong>{g.title}:</strong> {g.skills.join(", ")}</div>
        ))}
      </div>

      <h2>Professional Experience</h2>
      {D.roles.map(r => (
        <div key={r.id} className="ats-role">
          <h3>{r.title} — {r.company}</h3>
          <div className="ats-role-meta">{r.location} | {r.start} – {r.end}</div>
          <ul>
            {r.bullets.map((b, j) => <li key={j}>{b.text}</li>)}
          </ul>
        </div>
      ))}

      <h2>Key Achievements</h2>
      <ul>
        {D.achievements.map(a => (
          <li key={a.id}>{a.metric} {a.metricUnit} — {a.title} ({a.org}, {a.year})</li>
        ))}
      </ul>

      <h2>Certifications</h2>
      <ul>
        {D.certifications.map((c, i) => (
          <li key={i}>{c.name} — {c.issuer}, {c.year}</li>
        ))}
      </ul>

      <h2>Education</h2>
      <ul>
        {D.education.map((e, i) => (
          <li key={i}>{e.degree} — {e.school}, {e.year}</li>
        ))}
      </ul>
    </div>,
    document.body
  );
};

/* =========================================================
   Main Resume page
   ========================================================= */
const ResumePage = () => {
  const D = window.SITE_DATA;
  const [persona, setPersona] = React.useState(() => localStorage.getItem("persona") || "ai");
  const [pdfMenu, setPdfMenu] = React.useState(false);

  const printPretty = () => {
    document.documentElement.removeAttribute("data-print");
    setTimeout(() => window.print(), 30);
  };
  const printAts = () => {
    document.documentElement.setAttribute("data-print", "ats");
    const cleanup = () => { document.documentElement.removeAttribute("data-print"); window.removeEventListener("afterprint", cleanup); };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => window.print(), 60);
  };
  const [openRoleId, setOpenRoleId] = React.useState(() => {
    const dl = window.DEEP_LINK;
    if (dl?.roleId) { window.DEEP_LINK = null; return dl.roleId; }
    return null;
  });
  const [openEdu, setOpenEdu] = React.useState(false);

  React.useEffect(() => { localStorage.setItem("persona", persona); }, [persona]);

  const rolesSorted = React.useMemo(() => {
    return [...D.roles].sort((a, b) => {
      const af = a.personaFit?.[persona] ?? 0;
      const bf = b.personaFit?.[persona] ?? 0;
      if (af !== bf) return bf - af;
      return 0;
    });
  }, [persona]);

  const summary = {
    ai: (<>Level-4 <strong>Agentic Software Engineering</strong> leader. Builds controlled agentic layers — MCP servers, patterned agents, competing-incentive verification — that <strong>triple developer throughput</strong> while keeping security, compliance, and consistency airtight. Backed by <strong>12 years of cloud infrastructure depth</strong> so the AI actually ships in regulated enterprise.</>),
    cloud: (<>Principal Cloud Architect specializing in <strong>AWS, Kubernetes, and the CNCF ecosystem</strong>. Known for unified platform services, <strong>policy-as-code compliance gates</strong>, and event-driven FinOps automation that trims <strong>30–70%</strong> off cloud bills without touching reliability.</>),
    leadership: (<>Infrastructure Director and Principal Cloud Architect with <strong>12 years designing and operating cloud platforms</strong> at regulated FinTechs. Built a 12-person platform team at First Citizens Bank, grew REPAY's infra org from 1 → 18, and ships simple repeatable engineering patterns that make <strong>compliance the cheap path</strong>.</>),
  };

  const openRole = openRoleId ? D.roles.find(r => r.id === openRoleId) : null;
  if (openRole) {
    return <RoleDetail role={openRole} persona={persona} onBack={() => setOpenRoleId(null)} />;
  }
  if (openEdu) {
    return <EducationDetail onBack={() => setOpenEdu(false)} />;
  }

  const stats = DASH_STATS[persona];

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Interactive resume · CUE-backed</span>
        <h1 className="page-title"><span className="neon-name">Geoffrey Miller</span></h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", color: "var(--text-mute)", fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 24 }}>
          <span>Phoenix, AZ</span>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <span>Geoff.E.Miller@gmail.com</span>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <span>(480) 688-7370</span>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="github" size={12} /> GeoffMillerAZ
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <div className="persona-toggle" role="tablist">
            {D.personas.map(p => (
              <button key={p.id}
                      className={persona === p.id ? "active" : ""}
                      onClick={() => setPersona(p.id)}>
                <span className="badge-dot" />
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ position: "relative" }}>
              <button className="btn btn-sm" onClick={() => setPdfMenu(o => !o)}>
                <Icon name="download" size={13} />
                Download résumé
                <Icon name="chevronDown" size={12} style={{ marginLeft: 2, transform: pdfMenu ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
              </button>
              {pdfMenu && (
                <>
                  <div className="pdf-menu-scrim" onClick={() => setPdfMenu(false)} />
                  <div className="pdf-menu">
                    <div className="pdf-menu-head">Download · {PERSONA_LABELS[persona]} view</div>
                    <a className="pdf-opt" href={`/downloads/${persona}/resume.pdf`} download onClick={() => setPdfMenu(false)}>
                      <span className="pdf-opt-icon"><Icon name="user" size={18} /></span>
                      <span>
                        <span className="pdf-opt-title">Human PDF</span>
                        <span className="pdf-opt-sub">Designed and print-perfect — for people.</span>
                      </span>
                    </a>
                    <a className="pdf-opt" href={`/downloads/${persona}/resume.ats.pdf`} download onClick={() => setPdfMenu(false)}>
                      <span className="pdf-opt-icon"><Icon name="server" size={18} /></span>
                      <span>
                        <span className="pdf-opt-title">ATS PDF</span>
                        <span className="pdf-opt-sub">Plain, single-column, parse-verified — beats the résumé bots.</span>
                      </span>
                    </a>
                    <a className="pdf-opt" href={`/downloads/${persona}/resume.txt`} download onClick={() => setPdfMenu(false)}>
                      <span className="pdf-opt-icon"><Icon name="file" size={18} /></span>
                      <span>
                        <span className="pdf-opt-title">Plain text (.txt)</span>
                        <span className="pdf-opt-sub">Maximum ATS compatibility.</span>
                      </span>
                    </a>
                    <a className="pdf-opt" href={`/downloads/${persona}/resume.md`} download onClick={() => setPdfMenu(false)}>
                      <span className="pdf-opt-icon"><Icon name="book" size={18} /></span>
                      <span>
                        <span className="pdf-opt-title">Markdown (.md)</span>
                        <span className="pdf-opt-sub">Human- and machine-readable.</span>
                      </span>
                    </a>
                    <a className="pdf-opt" href={`/downloads/${persona}/resume.json`} download onClick={() => setPdfMenu(false)}>
                      <span className="pdf-opt-icon"><Icon name="layers" size={18} /></span>
                      <span>
                        <span className="pdf-opt-title">JSON Resume</span>
                        <span className="pdf-opt-sub">Structured data for ATS & LLMs (jsonresume.org).</span>
                      </span>
                    </a>
                  </div>
                </>
              )}
            </div>
            <button className="btn btn-sm btn-primary" onClick={() => window.ROUTE_SET?.("chat")}>
              <Icon name="sparkles" size={13} />
              Ask the JD-chat
            </button>
          </div>
        </div>

        <p className="resume-summary">{summary[persona]}</p>
        <div className="fit-trace">view compiled from resume.cue · {D.roles.length} roles · {D.roles.reduce((n, r) => n + r.bullets.length, 0)} bullets · weighted for <span style={{ color: "var(--accent)" }}>{persona}</span></div>
      </div>

      {/* ===== Dashboard ===== */}
      <section className="resume-section resume-dash">
        <div className="resume-section-head">
          <span className="num">01</span>
          <h2>At a glance</h2>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
            <span style={{ color: "var(--text-faint)" }}>fixed</span> + tuned for <span style={{ color: "var(--accent)" }}>{PERSONA_LABELS[persona]}</span>
          </span>
        </div>
        <div className="fixed-strip">
          {[
            { v: "20yr", l: "in IT" },
            { v: "12yr", l: "cloud platforms" },
            { v: "5", l: "regulated FinTechs" },
            { v: "100+", l: "AWS accounts" },
            { v: "2", l: "CS degrees + Claude cert" },
          ].map((s, i) => (
            <div key={i} className="fixed-pill">
              <span className="fixed-pill-v">{s.v}</span>
              <span className="fixed-pill-l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="dash-grid">
          {stats.map((s, i) => (
            <DashboardCard key={i} {...s} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* ===== Experience ===== */}
      <section className="resume-section">
        <div className="resume-section-head">
          <span className="num">02</span>
          <h2>Experience</h2>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
            sorted for · <span style={{ color: "var(--accent)" }}>{PERSONA_LABELS[persona]}</span>
          </span>
        </div>

        <div className="year-strip" aria-hidden="true">
          {(() => {
            const y0 = 2015, y1 = 2026;
            const yearOf = s => parseInt((s.match(/\d{4}/) || [y0])[0], 10);
            const topId = rolesSorted[0]?.id;
            return (
              <>
                <span className="year-strip-label">{y0}</span>
                <div className="year-strip-track">
                  {D.roles.map(r => {
                    const y = yearOf(r.start);
                    const pct = ((y - y0) / (y1 - y0)) * 100;
                    return <span key={r.id} className={"year-strip-dot" + (r.id === topId ? " on" : "")} style={{ left: pct + "%" }} title={r.company + " · " + r.start}></span>;
                  })}
                </div>
                <span className="year-strip-label">{y1}</span>
              </>
            );
          })()}
        </div>

        <div className="role-list">
          {rolesSorted.map((role) => {
            const fit = role.personaFit?.[persona] ?? 0;
            const featured = fit >= 3;
            const topBullets = topBulletsFor(role, persona, 3);
            return (
              <button
                key={role.id}
                className={"role-card" + (featured ? " is-featured" : "")}
                onClick={() => setOpenRoleId(role.id)}
              >
                <div className="role-card-main">
                  <div className="role-card-head">
                    <div className="role-card-title">
                      <h3>{role.title}</h3>
                      <div className="role-card-meta">
                        <span className="co">{role.company}</span>
                        <span className="sep">·</span>
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <div className="role-card-date">
                      <span>{role.start}</span>
                      <span className="dash">—</span>
                      <span>{role.end}</span>
                    </div>
                  </div>
                  <div className="role-card-tagline">{role.taglines?.[persona] || role.tagline}</div>
                  <ul className="role-card-bullets">
                    {topBullets.map((b, j) => (
                      <li key={j} className="bullet"><span>{b.text}</span></li>
                    ))}
                  </ul>
                  <div className="role-card-foot">
                    <div className="role-card-scope">
                      {role.scope.slice(0, 4).map((s, j) => (
                        <span key={j} className="scope-chip sm">{s}</span>
                      ))}
                    </div>
                    <span className="role-card-open">
                      Open full case
                      <Icon name="chevronRight" size={12} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="resume-section">
        <div className="resume-section-head">
          <span className="num">03</span>
          <h2>Skills</h2>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
            weighted for · <span style={{ color: "var(--accent)" }}>{PERSONA_LABELS[persona]}</span>
          </span>
        </div>
        <div className="skills-grid">
          {[...D.skillGroups].sort((a,b) => (b.weights[persona]||0) - (a.weights[persona]||0)).map(g => {
            const w = g.weights[persona] || 0;
            return (
              <div key={g.id} className={"skill-group" + (w >= 3 ? " is-featured" : "")}>
                <div className="skill-group-title">
                  <span>{g.title}</span>
                  <span className="skill-group-dots">
                    <span className={w >= 1 ? "on" : ""}/>
                    <span className={w >= 2 ? "on" : ""}/>
                    <span className={w >= 3 ? "on" : ""}/>
                  </span>
                </div>
                <div className="skill-list">
                  {g.skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Certifications ===== */}
      {D.certifications && D.certifications.length > 0 && (
        <section className="resume-section">
          <div className="resume-section-head">
            <span className="num">04</span>
            <h2>Certifications</h2>
          </div>
          <div className="cert-grid">
            {D.certifications.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-badge" aria-hidden="true">
                  <Icon name="sparkles" size={20} />
                </div>
                <div className="cert-body">
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer"><span className="iss">{c.issuer}</span><span className="sep">·</span><span>{c.year}</span></div>
                  {c.blurb && <div className="cert-blurb">{c.blurb}</div>}
                  {c.tags && (
                    <div className="cert-tags">
                      {c.tags.map(t => <span key={t} className="scope-chip sm">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Education ===== */}
      <section className="resume-section">
        <div className="resume-section-head">
          <span className="num">05</span>
          <h2>Education</h2>
        </div>
        <button className="edu-card" onClick={() => setOpenEdu(true)}>
          <div className="edu-card-seal" aria-hidden="true"><span>NIU</span></div>
          <div className="edu-card-body">
            {D.education.map((e, i) => (
              <div key={i} className="edu-card-row" style={{ borderBottom: i < D.education.length - 1 ? "1px solid var(--line-soft)" : 0 }}>
                <div>
                  <div className="edu-card-degree">{e.degree}</div>
                  <div className="edu-card-school">{e.school}</div>
                  {e.honors && <div className="edu-card-school" style={{ color: "var(--accent)", fontSize: 12 }}>{e.honors}</div>}
                </div>
                <div className="edu-card-year">{e.year}</div>
              </div>
            ))}
          </div>
          <span className="edu-card-open">Open infographic<Icon name="chevronRight" size={12} /></span>
        </button>
      </section>

      <AtsResume />
    </div>
  );
};

/* =========================================================
   Education detail — infographic
   ========================================================= */
const EducationDetail = ({ onBack }) => {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  const milestones = [
    { year: "2012", label: "Teaching Assistant", sub: "Data Structures & Algorithms · NIU" },
    { year: "2013", label: "B.S. Computer Science", sub: "Magna Cum Laude · 3.75 GPA · emphasis in Mainframes" },
    { year: "2013", label: "Graduate Assistant", sub: "Data Structures & Algorithms · continued across 8 semesters" },
    { year: "2015", label: "M.S. Computer Science", sub: "emphasis in Network Programming & Database Systems" },
    { year: "2015", label: "→ Career launch", sub: "AZ Dept. of Administration · mainframe modernization" },
  ];

  const foundations = [
    { title: "Undergraduate — Mainframes", items: ["Mainframe systems", "Computer architecture", "Operating systems", "Upper Division Honors"] },
    { title: "Graduate — Networks",        items: ["Network programming", "Protocols & concurrency", "Distributed systems", "Systems design"] },
    { title: "Graduate — Databases",       items: ["Database systems", "Relational set theory", "Relational calculus", "Relational algebra"] },
    { title: "Taught for 8 semesters",     items: ["TA → GA · Data Structures & Algorithms", "Algorithm design & analysis", "Mentoring undergraduates", "Explaining hard ideas simply"] },
  ];

  const fromClassToCareer = [
    { phase: "Mainframes & COBOL", then: "Undergraduate emphasis — legacy systems, discipline, correctness.", now: "Started my career modernizing mainframe COBOL with Git and unit testing." },
    { phase: "Relational theory", then: "Relational set theory, calculus, and algebra in graduate database work.", now: "Shows up as CUE-typed, structured-data artifacts that make agentic output deterministic." },
    { phase: "Network programming", then: "Graduate emphasis — protocols, concurrency, distributed systems.", now: "Landing Zones across 100+ AWS accounts with sub-5 ms hybrid links." },
    { phase: "Teaching DS & Algorithms", then: "TA then GA for 8 semesters — explaining hard ideas simply.", now: "Mentoring platform teams and running a Cloud Community of Practice." },
  ];

  return (
    <div className="page role-detail edu-detail">
      <button className="role-back" onClick={onBack}>
        <Icon name="chevronLeft" size={13} />
        Back to resume
      </button>

      <div className="role-detail-head edu-head">
        <div className="role-detail-crumb">
          <span>Education</span>
          <span className="sep">/</span>
          <span>Northern Illinois University</span>
        </div>
        <div className="edu-hero">
          <div className="edu-seal" aria-hidden="true">
            <div className="edu-seal-inner">
              <div className="edu-seal-ring"></div>
              <div className="edu-seal-mark">NIU</div>
              <div className="edu-seal-year">1895</div>
            </div>
          </div>
          <div className="edu-hero-text">
            <h1 className="role-detail-title">Computer Science<br/><span style={{ color: "var(--accent)" }}>B.S. + M.S.</span></h1>
            <div className="role-detail-company">
              <span className="name">Northern Illinois University</span>
              <span className="sep">·</span>
              <span>DeKalb, IL</span>
              <span className="sep">·</span>
              <span>2009 — 2015</span>
            </div>
            <p className="role-detail-tagline">A Magna Cum Laude B.S. (3.75 GPA, Upper Division Honors) with an emphasis in mainframes, then an M.S. emphasizing network programming and database systems — relational set theory, calculus, and algebra. Taught Data Structures &amp; Algorithms as TA, then GA, across 8 semesters.</p>
            <div className="role-detail-scope">
              <span className="scope-chip">Magna Cum Laude</span>
              <span className="scope-chip">3.75 GPA</span>
              <span className="scope-chip">Upper Division Honors</span>
              <span className="scope-chip">TA → GA · 8 semesters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Degree-to-career timeline */}
      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">01</span>
          <h2>Academic timeline</h2>
          <span className="hint">enrolled → career launch</span>
        </div>
        <div className="edu-timeline">
          {milestones.map((m, i) => (
            <div key={i} className={"edu-milestone" + (m.label.includes("B.S.") || m.label.includes("M.S.") ? " is-major" : "")}>
              <div className="edu-mile-year">{m.year}</div>
              <div className="edu-mile-dot" aria-hidden="true"></div>
              <div className="edu-mile-body">
                <div className="edu-mile-label">{m.label}</div>
                <div className="edu-mile-sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic foundations */}
      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">02</span>
          <h2>Academic foundations</h2>
          <span className="hint">four pillars · compound interest on 12 years of infra work</span>
        </div>
        <div className="edu-pillars">
          {foundations.map((f, i) => (
            <div key={i} className="edu-pillar">
              <div className="edu-pillar-num">{String(i+1).padStart(2,'0')}</div>
              <div className="edu-pillar-title">{f.title}</div>
              <ul className="edu-pillar-list">
                {f.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">03</span>
          <h2>By the numbers</h2>
        </div>
        <div className="stat-grid">
          <div className="stat"><div className="stat-value">3.75<span className="unit">GPA</span></div><div className="stat-label">Magna Cum Laude</div><div className="stat-sub">B.S. · Upper Division Honors</div></div>
          <div className="stat"><div className="stat-value">8<span className="unit">semesters</span></div><div className="stat-label">TA → GA</div><div className="stat-sub">Data Structures &amp; Algorithms</div></div>
          <div className="stat"><div className="stat-value">2<span className="unit">degrees</span></div><div className="stat-label">B.S. + M.S.</div><div className="stat-sub">Computer Science, NIU</div></div>
          <div className="stat"><div className="stat-value">DeKalb</div><div className="stat-label">Home campus</div><div className="stat-sub">Northern Illinois University</div></div>
        </div>
      </section>

      {/* Classroom → career bridge */}
      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">04</span>
          <h2>From classroom to cloud</h2>
          <span className="hint">what the degree became, in production</span>
        </div>
        <div className="edu-bridge">
          {fromClassToCareer.map((b, i) => (
            <div key={i} className="edu-bridge-row">
              <div className="edu-bridge-phase">{b.phase}</div>
              <div className="edu-bridge-arrow">
                <span className="then">At NIU</span>
                <div className="edu-bridge-line"><span></span></div>
                <span className="now">In production</span>
              </div>
              <div className="edu-bridge-cols">
                <div className="edu-bridge-col"><div className="edu-bridge-col-label">Studied</div>{b.then}</div>
                <div className="edu-bridge-col edu-bridge-col--now"><div className="edu-bridge-col-label">Now shows up as</div>{b.now}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 48, display: "flex", gap: 10 }}>
        <button className="btn" onClick={onBack}>
          <Icon name="chevronLeft" size={13} />
          Back to resume
        </button>
      </div>
    </div>
  );
};
