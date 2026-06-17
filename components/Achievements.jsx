/* Achievements catalog — number-forward case studies */

const AchievementCard = ({ a, onOpen }) => (
  <button className="achv-card" onClick={() => onOpen(a.id)}>
    <div className="achv-card-metric">
      <div className="achv-card-value">{a.metric}</div>
      {a.metricUnit && <div className="achv-card-unit">{a.metricUnit}</div>}
    </div>
    <div className="achv-card-body">
      <div className="achv-card-meta">
        <span className="achv-card-org">{a.org}</span>
        <span className="sep">·</span>
        <span>{a.year}</span>
      </div>
      <h3 className="achv-card-title">{a.title}</h3>
      <p className="achv-card-summary">{a.summary}</p>
      <div className="achv-card-tags">
        {a.tags.slice(0, 4).map(t => <span key={t} className="scope-chip sm">{t}</span>)}
      </div>
    </div>
    <span className="achv-card-open">
      Open case
      <Icon name="chevronRight" size={12} />
    </span>
  </button>
);

const AchievementDetail = ({ achievement: a, onBack }) => {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [a.id]);

  return (
    <div className="page role-detail achv-detail">
      <button className="role-back" onClick={onBack}>
        <Icon name="chevronLeft" size={13} />
        Back to achievements
      </button>

      <div className="role-detail-head">
        <div className="role-detail-crumb">
          <span>Achievements</span>
          <span className="sep">/</span>
          <span>{a.org}</span>
        </div>
        <div className="achv-hero">
          <div className="achv-hero-metric">
            <div className="achv-hero-value">{a.metric}</div>
            {a.metricUnit && <div className="achv-hero-unit">{a.metricUnit}</div>}
          </div>
          <div className="achv-hero-text">
            <h1 className="role-detail-title">{a.title}</h1>
            <div className="role-detail-company">
              <span className="name">{a.org}</span>
              <span className="sep">·</span>
              <span>{a.year}</span>
            </div>
            <p className="role-detail-tagline">{a.summary}</p>
            <div className="role-detail-scope">
              {a.tags.map(t => <span key={t} className="scope-chip">{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">01</span>
          <h2>The challenge</h2>
        </div>
        <p className="achv-prose">{a.challenge}</p>
      </section>

      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">02</span>
          <h2>The approach</h2>
        </div>
        <p className="achv-prose">{a.approach}</p>
      </section>

      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">03</span>
          <h2>The outcome</h2>
        </div>
        <p className="achv-prose achv-prose--strong">{a.outcome}</p>
      </section>

      <section className="role-detail-section">
        <div className="role-detail-section-head">
          <span className="num">04</span>
          <h2>Why it matters</h2>
        </div>
        <p className="achv-prose">{a.whyItMatters}</p>
      </section>

      {a.stack && a.stack.length > 0 && (
        <section className="role-detail-section">
          <div className="role-detail-section-head">
            <span className="num">05</span>
            <h2>Stack deployed</h2>
          </div>
          <div className="skill-list" style={{ marginTop: 4 }}>
            {a.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </section>
      )}

      <div style={{ marginTop: 48, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={onBack}>
          <Icon name="chevronLeft" size={13} />
          Back to achievements
        </button>
        {a.roleId && (
          <button className="btn" onClick={() => window.GO?.("resume", { roleId: a.roleId })}>
            <Icon name="file" size={13} />
            See the role behind this
          </button>
        )}
        {a.projectId && (
          <button className="btn" onClick={() => window.GO?.("projects", { projectId: a.projectId })}>
            <Icon name="folder" size={13} />
            Related project
          </button>
        )}
        <button className="btn btn-primary" onClick={() => window.ROUTE_SET?.("chat")}>
          <Icon name="sparkles" size={13} />
          Ask the JD-chat about this
        </button>
      </div>
    </div>
  );
};

const AchievementsPage = () => {
  const D = window.SITE_DATA;
  const [openId, setOpenId] = React.useState(() => {
    const dl = window.DEEP_LINK;
    if (dl?.achievementId) { window.DEEP_LINK = null; return dl.achievementId; }
    return null;
  });
  const [filter, setFilter] = React.useState("all");

  const filters = React.useMemo(() => {
    const tagSet = new Set();
    D.achievements.forEach(a => a.tags.forEach(t => tagSet.add(t)));
    return ["all", ...[...tagSet].slice(0, 8)];
  }, []);

  const list = filter === "all"
    ? D.achievements
    : D.achievements.filter(a => a.tags.includes(filter));

  const open = openId ? D.achievements.find(a => a.id === openId) : null;
  if (open) return <AchievementDetail achievement={open} onBack={() => setOpenId(null)} />;

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Selected achievements · receipts attached</span>
        <h1 className="page-title">What I've shipped</h1>
        <p className="page-sub">Concrete outcomes from 12 years of cloud and platform engineering at regulated FinTechs. Each one has a number, a story, and a stack.</p>

        <div className="catalog-toolbar" style={{ marginTop: 18 }}>
          <div className="seg">
            {filters.map(f => (
              <button key={f}
                      className={filter === f ? "active" : ""}
                      onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-mute)" }}>
            {list.length} {list.length === 1 ? "achievement" : "achievements"}
          </span>
        </div>
      </div>

      <div className="achv-grid">
        {list.map(a => <AchievementCard key={a.id} a={a} onOpen={setOpenId} />)}
      </div>
    </div>
  );
};

window.AchievementsPage = AchievementsPage;
