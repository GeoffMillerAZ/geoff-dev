/* Sidebar + Layout shell with router state */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const NAV = [
  { section: "Candidate" },
  { id: "chat",     label: "JD Chat",        icon: "sparkles", meta: "⌘1" },
  { id: "resume",   label: "Resume",         icon: "file",     meta: "⌘2" },
  { section: "Catalogs" },
  { id: "projects", label: "Projects",       icon: "folder",   meta: "⌘3" },
  { id: "achievements",label: "Achievements", icon: "award",    meta: "⌘4" },
  { id: "articles", label: "Articles",       icon: "book",     meta: "⌘5" },
  { id: "resources",label: "Resources",      icon: "layers",   meta: "⌘6" },
  { section: "Personal" },
  { id: "about",    label: "About Geoff",    icon: "user",     meta: "⌘7" },
  { id: "contact",  label: "Contact",        icon: "mail",     meta: "⌘8" },
];

const Sidebar = ({ route, setRoute, onOpenPalette, sidebarOpen, setSidebarOpen }) => {
  const p = window.SITE_DATA.profile;
  return (
    <aside className={"sidebar" + (sidebarOpen ? " open" : "")}>
      <div className="brand" style={{ cursor: "pointer" }} onClick={() => { setRoute("chat"); setSidebarOpen(false); }}>
        <div className="brand-mark"><img src="assets/geoff.png" alt="Geoff" /></div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ color: "var(--text)", fontWeight: 600 }}>geoff<span style={{color:"var(--text-mute)"}}>miller</span>.cloud</div>
          <div style={{ color: "var(--text-mute)", fontSize: 10.5, marginTop: 2 }}>v{(new Date().getFullYear()).toString().slice(2)}.4</div>
        </div>
      </div>

      <button className="btn" style={{ justifyContent: "space-between", width: "100%" }} onClick={onOpenPalette}>
        <span className="hstack" style={{ gap: 8, color: "var(--text-mute)" }}>
          <Icon name="search" size={14} />
          <span>Search…</span>
        </span>
        <span className="kbd">⌘K</span>
      </button>

      <nav className="nav">
        {NAV.map((item, i) => item.section ? (
          <div key={"s"+i} className="nav-section">{item.section}</div>
        ) : (
          <a key={item.id}
             className={"nav-link" + (route === item.id ? " active" : "")}
             onClick={() => { setRoute(item.id); setSidebarOpen(false); }}>
            <Icon name={item.icon} size={15} className="icon" />
            <span>{item.label}</span>
            <span className="nav-meta">{item.meta}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-foot">
        <div className="hstack" style={{ justifyContent: "space-between" }}>
          <span className="hstack" style={{ gap: 6 }}>
            <span className="status-dot" />
            <span>Available — selectively</span>
          </span>
        </div>
        <div className="hstack" style={{ gap: 8, color: "var(--text-faint)", fontSize: 10 }}>
          <Icon name="github" size={12} />
          <span>{p.links.github.replace("github.com/", "")}</span>
        </div>
        <div className="hstack" style={{ gap: 8, color: "var(--text-faint)", fontSize: 10 }}>
          <Icon name="linkedin" size={12} />
          <span>{p.links.linkedin.replace("linkedin.com/in/", "")}</span>
        </div>
      </div>
    </aside>
  );
};

/* Top-right floating control cluster (theme, tweaks) */
const HeaderBar = ({ onToggleTheme, theme, onOpenPalette, onToggleMobile }) => (
  <>
    <div className="mobile-top">
      <button className="btn btn-icon btn-ghost" onClick={onToggleMobile} aria-label="Menu">
        <Icon name="menu" size={18} />
      </button>
      <div className="brand" style={{ flex: 1, cursor: "pointer" }} onClick={() => setRoute("chat")}>
        <div className="brand-mark"><img src="assets/geoff.png" alt="Geoff" /></div>
        <span style={{ fontSize: 13 }}>geoffmiller.cloud</span>
      </div>
      <button className="btn btn-icon btn-ghost" onClick={onOpenPalette} aria-label="Search">
        <Icon name="search" size={16} />
      </button>
      <button className="btn btn-icon btn-ghost" onClick={onToggleTheme} aria-label="Theme">
        <Icon name={theme === "light" ? "moon" : "sun"} size={16} />
      </button>
    </div>
  </>
);

window.Sidebar = Sidebar;
window.HeaderBar = HeaderBar;
window.NAV = NAV;
