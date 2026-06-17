/* Catalog pages: Articles, Projects, Resources */

/* -------- Markdown renderer (articles) -------- */
function renderMarkdown(md) {
  if (!md) return null;
  const inlineHtml = (s) =>
    s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Split into blocks on blank lines
  const lines = md.split("\n");
  const blocks = [];
  let current = [];

  const flush = () => {
    if (current.length) { blocks.push(current.join("\n")); current = []; }
  };

  lines.forEach(line => {
    if (line.trim() === "") { flush(); } else { current.push(line); }
  });
  flush();

  return blocks.map((block, i) => {
    const firstLine = block.split("\n")[0];
    if (firstLine.startsWith("### ")) {
      return <h3 key={i} style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", marginTop: 32, marginBottom: 10, color: "var(--text)" }}
        dangerouslySetInnerHTML={{ __html: inlineHtml(firstLine.slice(4)) }} />;
    }
    if (firstLine.startsWith("## ")) {
      return <h2 key={i} style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 44, marginBottom: 12, color: "var(--text)", paddingBottom: 10, borderBottom: "1px solid var(--line)" }}
        dangerouslySetInnerHTML={{ __html: inlineHtml(firstLine.slice(3)) }} />;
    }
    // Fenced code block (~~~ ... ~~~ or ``` ... ```)
    if (block.startsWith("~~~") || block.startsWith("```")) {
      const fence = block.startsWith("~~~") ? "~~~" : "```";
      const re = new RegExp("^" + fence + "[^\\n]*\\n?");
      const re2 = new RegExp("\\n?" + fence + "$");
      const inner = block.replace(re, "").replace(re2, "");
      return <pre key={i} style={{ background: "var(--bg-0)", border: "1px solid var(--line)", borderRadius: "var(--rad-sm)", padding: "14px 18px", overflowX: "auto", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6, margin: "18px 0", color: "var(--neon-cyan)" }}><code>{inner}</code></pre>;
    }
    // Bullet list
    if (block.split("\n").every(l => l.startsWith("- "))) {
      const items = block.split("\n").map(l => l.slice(2));
      return <ul key={i} style={{ margin: "14px 0 14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, j) => <li key={j} style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-dim)" }} dangerouslySetInnerHTML={{ __html: inlineHtml(item) }} />)}
      </ul>;
    }
    // Paragraph
    return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--text-dim)", margin: "14px 0" }}
      dangerouslySetInnerHTML={{ __html: inlineHtml(block) }} />;
  });
}

const useSearchAndTags = (items, getTags, getText) => {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(new Set());

  const allTags = React.useMemo(() => {
    const m = new Map();
    items.forEach(it => (getTags(it) || []).forEach(t => m.set(t, (m.get(t) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const filtered = React.useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter(it => {
      const tagOk = active.size === 0 || (getTags(it) || []).some(t => active.has(t));
      const textOk = !n || getText(it).toLowerCase().includes(n);
      return tagOk && textOk;
    });
  }, [items, q, active]);

  const toggle = (t) => setActive(s => {
    const n = new Set(s);
    n.has(t) ? n.delete(t) : n.add(t);
    return n;
  });

  return { q, setQ, active, toggle, allTags, filtered, clear: () => setActive(new Set()) };
};

/* -------- Article Detail -------- */
const ArticleDetail = ({ article, onBack }) => {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [article.id]);
  const a = article;
  return (
    <div className="page role-detail" style={{ maxWidth: 780 }}>
      <button className="role-back" onClick={onBack}>
        <Icon name="chevronLeft" size={13} />
        Back to articles
      </button>

      <div className="role-detail-head">
        <div className="role-detail-crumb">
          <span>Articles</span>
          {a.series && (
            <>
              <span className="sep">/</span>
              <span>{a.series.name}</span>
            </>
          )}
          {a.series && (
            <>
              <span className="sep">/</span>
              <span>Part {a.series.part} of {a.series.of}</span>
            </>
          )}
        </div>

        {a.series && (
          <div style={{ marginBottom: 16 }}>
            <span className="series-pill" style={{ fontSize: 12, padding: "4px 12px" }}>
              <Icon name="layers" size={11} />
              {a.series.name} · Part {a.series.part} of {a.series.of}
            </span>
          </div>
        )}

        <h1 className="role-detail-title" style={{ fontSize: 36, lineHeight: 1.12 }}>{a.title}</h1>

        <div className="role-detail-company">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-mute)" }}>{fmtDate(a.date)}</span>
          <span className="sep">·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-mute)" }}>{a.read} read</span>
        </div>

        <p className="role-detail-tagline">{a.summary}</p>

        <div className="role-detail-scope">
          {(a.tags || []).map(t => <span key={t} className="scope-chip">#{t}</span>)}
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        {a.body ? renderMarkdown(a.body) : (
          <p style={{ color: "var(--text-mute)", fontStyle: "italic" }}>Full article coming soon.</p>
        )}
      </div>

      <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--line)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn" onClick={onBack}>
          <Icon name="chevronLeft" size={13} />Back to articles
        </button>
        <button className="btn btn-primary" onClick={() => window.ROUTE_SET?.("chat")}>
          <Icon name="sparkles" size={13} />Ask the JD-chat about this
        </button>
      </div>
    </div>
  );
};

/* -------- Articles -------- */
const ArticlesPage = () => {
  const D = window.SITE_DATA;
  const { q, setQ, active, toggle, allTags, filtered, clear } = useSearchAndTags(
    D.articles,
    a => a.tags,
    a => a.title + " " + a.summary + " " + a.tags.join(" ")
  );

  const [openId, setOpenId] = React.useState(() => {
    // Check DEEP_LINK first (set by router.onChange on re-navigation)
    const dl = window.DEEP_LINK;
    if (dl?.articleId) { window.DEEP_LINK = null; return dl.articleId; }
    // Fall back to reading URL params directly for initial hard load
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.has("article")) return p.get("article");
    } catch (_) {}
    return null;
  });

  // Series sidebar: show series index for whichever series is visible first
  // (hooks must all be called before any early return)
  const seriesByName = React.useMemo(() => {
    const m = {};
    D.articles.forEach(a => { if (a.series) (m[a.series.name] ||= []).push(a); });
    Object.values(m).forEach(arr => arr.sort((a, b) => a.series.part - b.series.part));
    return m;
  }, []);

  const seriesInView = React.useMemo(() => {
    const first = filtered.find(a => a.series);
    return first ? first.series.name : null;
  }, [filtered]);

  if (openId) {
    const a = D.articles.find(x => x.id === openId);
    if (a) return <ArticleDetail article={a} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="page" style={{ maxWidth: 1180 }}>
      <div className="page-head">
        <span className="eyebrow">Writing</span>
        <h1 className="page-title">Articles & guides</h1>
        <p className="page-sub">Engineering notes from the cloud platform, FinOps, and agentic AI trenches. Some pieces are part of a series — the sidebar tracks your place.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="searchbox">
          <Icon name="search" size={14} />
          <input placeholder="Search articles…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {active.size > 0 && (
          <button className="btn btn-sm btn-ghost" onClick={clear}>
            <Icon name="x" size={12} /> Clear {active.size}
          </button>
        )}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
          {filtered.length} / {D.articles.length}
        </span>
      </div>

      <div className="tag-row">
        {allTags.map(([t, n]) => (
          <span key={t} className={"tag" + (active.has(t) ? " is-active" : "")} onClick={() => toggle(t)}>
            #{t}<span style={{ color: "var(--text-faint)", marginLeft: 4 }}>{n}</span>
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: seriesInView ? "1fr 260px" : "1fr", gap: 32, alignItems: "start" }}>
        <div>
          {filtered.map(a => (
            <button key={a.id} type="button" className="article-row" onClick={() => setOpenId(a.id)}
              style={{ appearance: "none", font: "inherit", color: "inherit", textAlign: "left", cursor: "pointer", width: "100%", background: "none", border: "none", borderBottom: "1px solid var(--line-soft)" }}>
              <div className="date">{fmtDate(a.date)}</div>
              <div>
                {a.series && (
                  <span className="series-pill">
                    <Icon name="layers" size={10} />
                    {a.series.name} · Part {a.series.part} of {a.series.of}
                  </span>
                )}
                <h3>{a.title}</h3>
                <p className="summary">{a.summary}</p>
                <div className="row-tags">
                  {a.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                </div>
              </div>
              <div className="meta-right">
                {a.read}<br/>
                <span style={{ color: "var(--text-faint)" }}>→</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 60, textAlign: "center", color: "var(--text-mute)" }}>No articles match.</div>
          )}
        </div>

        {seriesInView && (
          <aside style={{ position: "sticky", top: 48 }}>
            <div className="panel" style={{ padding: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Series</div>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>{seriesInView}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {seriesByName[seriesInView].map(a => {
                  const isActive = filtered[0]?.id === a.id;
                  return (
                    <button key={a.id} type="button" onClick={() => setOpenId(a.id)} style={{
                      display: "grid", gridTemplateColumns: "auto 1fr", gap: 10,
                      padding: "8px 10px",
                      borderRadius: "var(--rad-sm)",
                      background: isActive ? "var(--bg-2)" : "transparent",
                      borderLeft: "2px solid " + (isActive ? "var(--accent)" : "transparent"),
                      cursor: "pointer",
                      appearance: "none", font: "inherit", color: "inherit", textAlign: "left", border: "none",
                      borderLeft: "2px solid " + (isActive ? "var(--accent)" : "transparent"),
                      width: "100%",
                    }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: isActive ? "var(--accent)" : "var(--text-faint)" }}>
                        {String(a.series.part).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 13, color: isActive ? "var(--text)" : "var(--text-dim)", lineHeight: 1.4 }}>
                        {a.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  } catch { return iso; }
}

/* -------- Projects -------- */
const KIND_LABEL = { pro: "Professional deployment", oss: "Open source", closed: "Closed source" };

const ProjectDetail = ({ project, onBack }) => {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [project.id]);
  const p = project;
  const stack = p.stack || [];
  const tags = p.tags || [];
  return (
    <div className="page role-detail">
      <button className="role-back" onClick={onBack}>
        <Icon name="chevronLeft" size={13} />
        Back to projects
      </button>
      <div className="role-detail-head">
        <div className="role-detail-crumb">
          <span>Projects</span>
          <span className="sep">/</span>
          <span>{KIND_LABEL[p.kind]}</span>
        </div>
        <h1 className="role-detail-title">{p.title}</h1>
        <div className="role-detail-company">
          <span className="name">{p.org}</span>
          <span className="sep">·</span>
          <span>{p.year}</span>
          {p.github && (<><span className="sep">·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
              <Icon name="github" size={12} /> {p.github}
            </span></>)}
        </div>
        <p className="role-detail-tagline">{p.summary}</p>
        <div className="role-detail-scope">
          <span className="scope-chip">{KIND_LABEL[p.kind]}</span>
          {tags.map(t => <span key={t} className="scope-chip">#{t}</span>)}
        </div>
      </div>

      {p.problem && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">01</span><h2>The problem</h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-dim)", margin: 0, maxWidth: "65ch" }}>{p.problem}</p>
        </section>
      )}

      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">{p.problem ? "02" : "01"}</span><h2>Impact</h2>
        </div>
        <div className="impact-panel" style={{ marginTop: 0 }}>
          <div style={{ fontSize: 17, lineHeight: 1.55, color: "var(--text)" }}>{p.impact}</div>
        </div>
      </section>

      {stack.length > 0 && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">{p.problem ? "03" : "02"}</span><h2>Stack</h2>
            <span className="hint">{stack.length} components</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map(s => <span key={s} className="tag" style={{ fontSize: 13 }}>{s}</span>)}
          </div>
        </section>
      )}

      <div style={{ marginTop: 48, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={onBack}>
          <Icon name="chevronLeft" size={13} />Back to projects
        </button>
        {p.roleId && (
          <button className="btn" onClick={() => window.GO?.("resume", { roleId: p.roleId })}>
            <Icon name="file" size={13} />See the role behind this
          </button>
        )}
        {(window.SITE_DATA.achievements || []).filter(a => a.projectId === p.id).map(a => (
          <button key={a.id} className="btn" onClick={() => window.GO?.("achievements", { achievementId: a.id })}>
            <Icon name="award" size={13} />Case study: {a.metric} {a.metricUnit}
          </button>
        ))}
        <button className="btn btn-primary" onClick={() => window.ROUTE_SET?.("chat")}>
          <Icon name="sparkles" size={13} />Ask the JD-chat about this
        </button>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const D = window.SITE_DATA;
  const { q, setQ, active, toggle, allTags, filtered, clear } = useSearchAndTags(
    D.projects,
    p => [p.kind, ...(p.tags || [])],
    p => p.title + " " + p.summary + " " + (p.problem||"") + " " + p.tags.join(" ") + " " + (p.stack||[]).join(" ")
  );
  const [openId, setOpenId] = React.useState(() => {
    const dl = window.DEEP_LINK;
    if (dl?.projectId) { window.DEEP_LINK = null; return dl.projectId; }
    return null;
  });
  if (openId) {
    const p = D.projects.find(x => x.id === openId);
    if (p) return <ProjectDetail project={p} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="page" style={{ maxWidth: 1180 }}>
      <div className="page-head">
        <span className="eyebrow">Work</span>
        <h1 className="page-title">Projects</h1>
        <p className="page-sub">Shipped things. Professional deployments ship business impact; OSS ships code; closed source ships the diagram and the problem.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="searchbox">
          <Icon name="search" size={14} />
          <input placeholder="Search projects…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {["pro", "oss", "closed"].map(k => (
          <span key={k} className={"tag" + (active.has(k) ? " is-active" : "")} onClick={() => toggle(k)} style={{ cursor: "pointer" }}>
            <span className="status-dot" style={{
              width: 6, height: 6,
              background: k === "pro" ? "var(--neon-cyan)" : k === "oss" ? "var(--neon-amber)" : "var(--neon-pink)",
              boxShadow: "none", animation: "none"
            }}/>
            {KIND_LABEL[k]}
          </span>
        ))}
        <span style={{ flex: 1 }} />
        {active.size > 0 && (
          <button className="btn btn-sm btn-ghost" onClick={clear}>
            <Icon name="x" size={12} /> Clear
          </button>
        )}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
          {filtered.length} / {D.projects.length}
        </span>
      </div>

      <div className="tag-row">
        {allTags.filter(([t]) => !["pro", "oss", "closed"].includes(t)).map(([t, n]) => (
          <span key={t} className={"tag" + (active.has(t) ? " is-active" : "")} onClick={() => toggle(t)}>
            #{t}<span style={{ color: "var(--text-faint)", marginLeft: 4 }}>{n}</span>
          </span>
        ))}
      </div>

      {[
        { owner: "mine", label: "My projects",       sub: "Created and owned by me — source on GitHub." },
        { owner: "org",  label: "Organization work", sub: "Built and led inside employers — owned by them, shipped by me." },
      ].map(group => {
        const groupList = filtered.filter(p => p.owner === group.owner);
        if (groupList.length === 0) return null;
        return (
          <section key={group.owner} style={{ marginBottom: 36 }}>
            <div className="resume-section-head" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18 }}>{group.label}</h2>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>{group.sub}</span>
            </div>
            <div className="projects-grid">
              {groupList.map(p => (
        <button key={p.id} type="button" className="project-card" data-kind={p.kind} onClick={() => setOpenId(p.id)} style={{ appearance: "none", font: "inherit", color: "inherit", textAlign: "left", cursor: "pointer" }}>
          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="kind-pill">{KIND_LABEL[p.kind]}</span>
            {p.github && (
              <a className="hstack" style={{ gap: 6, color: "var(--text-mute)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
                <Icon name="github" size={12} /> GitHub
                <Icon name="ext" size={10} />
              </a>
            )}
          </div>
          <h3>{p.title}</h3>
          <div className="project-meta">
            <span>{p.org}</span>
            <span className="sep">·</span>
            <span>{p.year}</span>
          </div>
          <p className="body">{p.summary}</p>
          {p.problem && (
            <div style={{ fontSize: 12.5, color: "var(--text-mute)", lineHeight: 1.55 }}>
              <span style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Problem · </span>
              {p.problem}
            </div>
          )}
          <div className="impact-line">
            <span className="impact-label">Impact</span>
            {p.impact}
          </div>
          <div className="row-tags" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
            {(p.stack || []).map(s => <span key={s} className="tag">{s}</span>)}
          </div>
          <span className="role-card-open" style={{ marginTop: 12, alignSelf: "flex-start" }}>Open case<Icon name="chevronRight" size={12} /></span>
        </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

/* -------- Resources -------- */
const RESOURCE_ICONS = { youtube: "play", podcast: "music", book: "book", blog: "file" };
const RESOURCE_LABEL = { youtube: "YouTube", podcast: "Podcast", book: "Book", blog: "Blog" };

const ResourcesPage = () => {
  const D = window.SITE_DATA;
  const [activeKind, setActiveKind] = React.useState("all");
  const [q, setQ] = React.useState("");

  const kinds = ["all", "youtube", "podcast", "book", "blog"];

  const filtered = D.resources.filter(r => {
    const k = activeKind === "all" || r.kind === activeKind;
    const n = q.trim().toLowerCase();
    const t = !n || (r.title + " " + r.by + " " + r.note).toLowerCase().includes(n);
    return k && t;
  });

  return (
    <div className="page" style={{ maxWidth: 1180 }}>
      <div className="page-head">
        <span className="eyebrow">Inputs</span>
        <h1 className="page-title">Resources</h1>
        <p className="page-sub">What I read, watch, and listen to. Mostly engineering, leadership, and applied AI.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="searchbox">
          <Icon name="search" size={14} />
          <input placeholder="Search resources…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {kinds.map(k => (
          <span key={k} className={"tag" + (activeKind === k ? " is-active" : "")} onClick={() => setActiveKind(k)} style={{ cursor: "pointer", textTransform: "capitalize" }}>
            {k === "all" ? "All" : RESOURCE_LABEL[k]}
          </span>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
          {filtered.length} / {D.resources.length}
        </span>
      </div>

      <div className="resources-grid">
        {filtered.map((r, i) => (
          <div key={i} className="resource-card" data-kind={r.kind}>
            <div className="resource-kind">
              <Icon name={RESOURCE_ICONS[r.kind]} size={16} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="resource-title">{r.title}</div>
              <div className="resource-by">{r.by}</div>
              <div className="resource-note">{r.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsPageWrapper = ProjectsPage;

window.ArticlesPage = ArticlesPage;
window.ProjectsPage = ProjectsPage;
window.ResourcesPage = ResourcesPage;
