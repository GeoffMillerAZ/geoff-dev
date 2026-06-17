/* About Me + Contact + Tweaks panel */

const ABOUT_ICONS = {
  family: "users", bjj: "shield", latin: "music", rc: "drone", ai: "sparkles", build: "tool",
};

const AboutPage = () => {
  const D = window.SITE_DATA;
  return (
    <div className="page" style={{ maxWidth: 1000 }}>
      <div className="page-head">
        <span className="eyebrow">The human behind the resume</span>
        <h1 className="page-title">About Geoff</h1>
        <p className="page-sub">Outside the terminal: two kids, a jiu-jitsu gi that never dries fully, a dance floor, and a bench full of half-finished RC parts.</p>
      </div>

      <div className="masonry">
        <div className="about-card feature">
          <h3>
            <span className="iconwrap"><Icon name="heart" size={16} /></span>
            What I optimize for
          </h3>
          <p>Being a present dad, a calm leader, and an engineer who ships. In that order. Everything else — the architecture, the FinOps wins, the agentic experiments — is downstream of being settled, curious, and unhurried.</p>
        </div>

        {D.about.map(a => (
          <div key={a.id} className="about-card">
            <h3>
              <span className="iconwrap"><Icon name={ABOUT_ICONS[a.id] || "dot"} size={15} /></span>
              {a.title}
            </h3>
            <p>{a.body}</p>
          </div>
        ))}

        <div className="about-card">
          <h3>
            <span className="iconwrap"><Icon name="compass" size={15} /></span>
            What I'm reading next
          </h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-dim)" }}>
            <span style={{ color: "var(--accent)" }}>→</span> The Manager's Path (again)<br/>
            <span style={{ color: "var(--text-faint)" }}>·</span> Designing Data-Intensive Applications<br/>
            <span style={{ color: "var(--text-faint)" }}>·</span> Anthropic's applied agents playbook
          </p>
        </div>

        <div className="about-card">
          <h3>
            <span className="iconwrap"><Icon name="clock" size={15} /></span>
            A normal week
          </h3>
          <p>
            Mon–Fri: architecture and agent work. Two evenings: BJJ. One night: dance class. Saturday morning: workshop with the kids. Sunday: no screens before noon, then usually one tiny AI experiment.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------- Contact -------- */
const ContactPage = () => {
  const D = window.SITE_DATA;
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); };

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-head">
        <span className="eyebrow">Inbound</span>
        <h1 className="page-title">Let's connect</h1>
        <p className="page-sub">Shortest path: email. If you're a recruiter with a JD, the chat on the homepage will answer fit questions faster than I will.</p>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field">
              <label>Your name</label>
              <input placeholder="Jane Recruiter" />
            </div>
            <div className="field">
              <label>Company</label>
              <input placeholder="Example Inc." />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="jane@example.com" />
          </div>
          <div className="field">
            <label>What's this about?</label>
            <div className="seg" style={{ padding: 3 }}>
              {["Recruiting", "Consulting", "Speaking", "Just saying hi"].map((x, i) => (
                <button key={x} type="button" className={i === 0 ? "active" : ""} style={{ padding: "6px 10px", fontSize: 11 }}>{x}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Message</label>
            <textarea placeholder="If it's a role, paste the JD here and I'll read it before replying." />
          </div>
          <div className="hstack" style={{ justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
              {sent ? <span style={{ color: "var(--neon-cyan)" }}>✓ Thanks — I'll reply within a couple days.</span> : "No auto-responders. A human reads every one."}
            </span>
            <button className="btn btn-primary" type="submit">
              <Icon name="send" size={13} /> Send message
            </button>
          </div>
        </form>

        <div className="contact-side">
          <div className="side-card">
            <h4>Direct</h4>
            <a><Icon name="mail" size={14} /> {D.profile.email}</a>
            <a><Icon name="home" size={14} /> {D.profile.location}</a>
          </div>
          <div className="side-card">
            <h4>Social</h4>
            <a><Icon name="github" size={14} /> {D.profile.links.github}</a>
            <a><Icon name="linkedin" size={14} /> {D.profile.links.linkedin}</a>
          </div>
          <div className="side-card">
            <h4>Availability</h4>
            <div className="hstack" style={{ gap: 8, color: "var(--text-dim)", padding: "4px 10px" }}>
              <span className="status-dot" />
              <span style={{ fontSize: 13 }}>Open to Principal / Director roles in FinTech or applied-AI platforms.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------- Tweaks panel -------- */
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "aesthetic": "synthwave",
  "accent": "pink",
  "density": "comfortable",
  "theme": "dark",
  "grid": "on"
}/*EDITMODE-END*/;

const TweaksPanel = ({ visible, prefs, setPrefs }) => {
  if (!visible) return null;
  const set = (k, v) => {
    const next = { ...prefs, [k]: v };
    setPrefs(next);
    window.parent?.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <Icon name="sliders" size={13} style={{ color: "var(--accent)" }} />
        <h4>Tweaks</h4>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>live</span>
      </div>

      <div className="tweak-row">
        <label>Aesthetic</label>
        <div className="seg">
          {[["synthwave","Synthwave"],["terminal","Terminal"],["outrun","Outrun"]].map(([k, l]) => (
            <button key={k} className={prefs.aesthetic === k ? "active" : ""} onClick={() => set("aesthetic", k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatches">
          {[
            ["pink",   "#ff7edb"],
            ["cyan",   "#72f1b8"],
            ["amber",  "#fede5d"],
            ["purple", "#b893ce"],
          ].map(([k, c]) => (
            <button key={k} className={prefs.accent === k ? "active" : ""}
                    style={{ background: c, boxShadow: `0 0 10px ${c}` }}
                    onClick={() => set("accent", k)} aria-label={k} />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Theme</label>
        <div className="seg">
          {[["dark","Dark"],["light","Light"]].map(([k, l]) => (
            <button key={k} className={prefs.theme === k ? "active" : ""} onClick={() => set("theme", k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Density</label>
        <div className="seg">
          {[["compact","Compact"],["comfortable","Default"],["spacious","Spacious"]].map(([k, l]) => (
            <button key={k} className={prefs.density === k ? "active" : ""} onClick={() => set("density", k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Grid backdrop</label>
        <div className="seg">
          {[["on","Show"],["off","Hide"]].map(([k, l]) => (
            <button key={k} className={prefs.grid === k ? "active" : ""} onClick={() => set("grid", k)}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
window.TweaksPanel = TweaksPanel;
window.TWEAK_DEFAULTS = DEFAULTS;
