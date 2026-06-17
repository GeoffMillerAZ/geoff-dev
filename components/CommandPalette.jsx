/* Command palette — global ⌘K */
const { useState: _cpUseState, useEffect: _cpUseEffect, useRef: _cpUseRef, useMemo: _cpUseMemo } = React;

const CommandPalette = ({ open, onClose, setRoute }) => {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);
  const D = window.SITE_DATA;

  React.useEffect(() => {
    if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 10); }
  }, [open]);

  const items = React.useMemo(() => {
    const base = [
      { kind: "Nav", id: "chat",     title: "JD Chat",       sub: "Recruiter-friendly chat with my background", icon: "sparkles", go: () => setRoute("chat") },
      { kind: "Nav", id: "resume",   title: "Interactive Resume", sub: "Persona toggle, impact dashboards", icon: "file", go: () => setRoute("resume") },
      { kind: "Nav", id: "projects", title: "Projects",      sub: "Professional, OSS, and closed source", icon: "folder", go: () => setRoute("projects") },
      { kind: "Nav", id: "articles", title: "Articles",      sub: "Blog and engineering guides", icon: "book", go: () => setRoute("articles") },
      { kind: "Nav", id: "resources",title: "Resources",     sub: "What I read, watch, listen to", icon: "layers", go: () => setRoute("resources") },
      { kind: "Nav", id: "about",    title: "About Geoff",   sub: "Dad, BJJ, Latin dance, tinkering", icon: "user", go: () => setRoute("about") },
      { kind: "Nav", id: "contact",  title: "Contact",       sub: "Let's connect", icon: "mail", go: () => setRoute("contact") },
    ];
    const articles = D.articles.map(a => ({ kind: "Article", id: a.id, title: a.title, sub: a.tags.join(" · "), icon: "book", go: () => setRoute("articles") }));
    const projects = D.projects.map(a => ({ kind: "Project", id: a.id, title: a.title, sub: a.org + " · " + a.year, icon: "folder", go: () => setRoute("projects") }));
    const roles    = D.roles.map(r => ({ kind: "Role", id: r.id, title: r.title + " · " + r.company, sub: r.start + " – " + r.end, icon: "file", go: () => setRoute("resume") }));
    const actions  = [
      { kind: "Action", id: "download", title: "Download PDF resume", sub: "Static, recruiter-ready", icon: "download", go: () => window.print() },
      { kind: "Action", id: "copyemail", title: "Copy email", sub: D.profile.email, icon: "mail", go: () => navigator.clipboard?.writeText(D.profile.email) },
    ];
    const all = [...base, ...roles, ...projects, ...articles, ...actions];
    if (!q.trim()) return all;
    const needle = q.toLowerCase();
    return all.filter(it => (it.title + " " + it.sub + " " + it.kind).toLowerCase().includes(needle));
  }, [q, setRoute]);

  React.useEffect(() => { setIdx(0); }, [q]);

  const run = (it) => { it.go(); onClose(); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(items.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (items[idx]) run(items[idx]); }
    else if (e.key === "Escape") { onClose(); }
  };

  if (!open) return null;

  // Group
  const groups = items.reduce((acc, it) => { (acc[it.kind] ||= []).push(it); return acc; }, {});

  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk-panel panel" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <Icon name="search" size={16} style={{ color: "var(--text-mute)" }} />
          <input
            ref={inputRef}
            placeholder="Search pages, roles, projects, articles…"
            value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey}
          />
          <span className="kbd">ESC</span>
        </div>
        <div className="cmdk-results">
          {Object.keys(groups).length === 0 && (
            <div className="cmdk-empty">No results for "{q}"</div>
          )}
          {Object.entries(groups).map(([group, list]) => (
            <div key={group} className="cmdk-group">
              <div className="cmdk-group-label">{group}</div>
              {list.map((it) => {
                const flatIdx = items.indexOf(it);
                const active = flatIdx === idx;
                return (
                  <div key={group + "-" + it.id}
                       className={"cmdk-item" + (active ? " active" : "")}
                       onMouseEnter={() => setIdx(flatIdx)}
                       onClick={() => run(it)}>
                    <Icon name={it.icon} size={14} style={{ color: active ? "var(--accent)" : "var(--text-mute)" }} />
                    <div className="grow" style={{ minWidth: 0 }}>
                      <div className="cmdk-title">{it.title}</div>
                      <div className="cmdk-sub">{it.sub}</div>
                    </div>
                    {active && <Icon name="arrow" size={14} style={{ color: "var(--accent)" }} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="cmdk-foot">
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↵</span> select</span>
          <span><span className="kbd">⌘K</span> close</span>
          <span className="grow" />
          <span style={{ color: "var(--text-faint)" }}>{items.length} result{items.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
};

window.CommandPalette = CommandPalette;
