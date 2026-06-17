/* Architecture diagrams for Impact panels */

const LandingZoneDiagram = () => (
  <svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-pink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0L10 5L0 10z" fill="var(--neon-pink)" />
      </marker>
      <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0L10 5L0 10z" fill="var(--neon-cyan)" />
      </marker>
    </defs>
    {/* Management account */}
    <g>
      <rect x="260" y="14" width="160" height="42" rx="6" fill="var(--bg-1)" stroke="var(--neon-pink)" strokeWidth="1.5" />
      <text x="340" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--neon-pink)">MANAGEMENT</text>
      <text x="340" y="48" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">AWS Organizations · SSO</text>
    </g>
    {/* Shared services hub */}
    <g>
      <rect x="240" y="100" width="200" height="58" rx="6" fill="var(--bg-1)" stroke="var(--neon-cyan)" strokeWidth="1.5" />
      <text x="340" y="122" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--neon-cyan)">SHARED-SERVICES HUB</text>
      <text x="340" y="138" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">Transit Gateway · Route 53</text>
      <text x="340" y="152" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">Endpoint hub · Logging</text>
    </g>
    {/* Workload accounts */}
    {[0, 1, 2, 3, 4].map(i => {
      const x = 40 + i * 125;
      return (
        <g key={i}>
          <rect x={x} y="210" width="100" height="46" rx="6" fill="var(--bg-1)" stroke="var(--line)" strokeWidth="1" />
          <text x={x + 50} y="230" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">workload-{i+1}</text>
          <text x={x + 50} y="245" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-mute)">20+ accounts</text>
          <line x1={x + 50} y1="210" x2="340" y2="162" stroke="var(--line)" strokeWidth="1" />
        </g>
      );
    })}
    {/* Management → hub */}
    <line x1="340" y1="56" x2="340" y2="98" stroke="var(--neon-pink)" strokeWidth="1.5" markerEnd="url(#arrow-pink)" />
    <text x="352" y="80" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-mute)">policy-as-code</text>
  </svg>
);

const CommandCenterDiagram = () => (
  <svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="260" y="14" width="160" height="44" rx="6" fill="var(--bg-1)" stroke="var(--neon-pink)" strokeWidth="1.5" />
      <text x="340" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--neon-pink)">AUTHOR AGENT</text>
      <text x="340" y="48" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">patterned, MCP-driven</text>
    </g>
    <g>
      <rect x="60" y="90" width="160" height="44" rx="6" fill="var(--bg-1)" stroke="var(--neon-amber)" strokeWidth="1.5" />
      <text x="140" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--neon-amber)">VERIFIER A</text>
      <text x="140" y="124" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">security-biased</text>
    </g>
    <g>
      <rect x="460" y="90" width="160" height="44" rx="6" fill="var(--bg-1)" stroke="var(--neon-cyan)" strokeWidth="1.5" />
      <text x="540" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--neon-cyan)">VERIFIER B</text>
      <text x="540" y="124" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">cost-biased</text>
    </g>
    <g>
      <rect x="240" y="170" width="200" height="44" rx="6" fill="var(--bg-1)" stroke="var(--line)" strokeWidth="1.5" />
      <text x="340" y="188" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--text)">APPROVAL GATE</text>
      <text x="340" y="204" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-mute)">external ground truth</text>
    </g>
    <line x1="260" y1="50" x2="160" y2="90" stroke="var(--line)" strokeWidth="1" markerEnd="url(#arrow-pink)" />
    <line x1="420" y1="50" x2="520" y2="90" stroke="var(--line)" strokeWidth="1" />
    <line x1="140" y1="134" x2="300" y2="170" stroke="var(--line)" strokeWidth="1" />
    <line x1="540" y1="134" x2="380" y2="170" stroke="var(--line)" strokeWidth="1" />
  </svg>
);

const IDPDiagram = () => (
  <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="20" y="20" width="140" height="54" rx="6" fill="var(--bg-1)" stroke="var(--line)" />
      <text x="90" y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-mute)">GIT PUSH</text>
      <text x="90" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">app repo</text>
    </g>
    <g>
      <rect x="200" y="20" width="140" height="54" rx="6" fill="var(--bg-1)" stroke="var(--neon-pink)" />
      <text x="270" y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--neon-pink)">BACKSTAGE IDP</text>
      <text x="270" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">catalog · templates</text>
    </g>
    <g>
      <rect x="380" y="20" width="140" height="54" rx="6" fill="var(--bg-1)" stroke="var(--neon-cyan)" />
      <text x="450" y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--neon-cyan)">ARGO CD</text>
      <text x="450" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">GitOps</text>
    </g>
    <g>
      <rect x="540" y="20" width="120" height="54" rx="6" fill="var(--bg-1)" stroke="var(--neon-amber)" />
      <text x="600" y="40" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--neon-amber)">EKS</text>
      <text x="600" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">multi-AZ</text>
    </g>
    <line x1="160" y1="47" x2="200" y2="47" stroke="var(--line)" strokeWidth="1" />
    <line x1="340" y1="47" x2="380" y2="47" stroke="var(--line)" strokeWidth="1" />
    <line x1="520" y1="47" x2="540" y2="47" stroke="var(--line)" strokeWidth="1" />
    <g>
      <rect x="200" y="120" width="320" height="54" rx="6" fill="var(--bg-1)" stroke="var(--line)" strokeDasharray="3 3" />
      <text x="360" y="140" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-mute)">DOCS-AS-CODE · POLICY-AS-CODE · SECRETS</text>
      <text x="360" y="158" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-dim)">enforced by pre-commit + CI gates</text>
    </g>
    <line x1="270" y1="74" x2="270" y2="120" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 3" />
    <line x1="450" y1="74" x2="450" y2="120" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 3" />
  </svg>
);

/* ---------- Area chart ---------- */
const AreaChart = ({ data }) => {
  const w = 640, h = 200, padL = 36, padR = 14, padT = 20, padB = 28;
  const iw = w - padL - padR, ih = h - padT - padB;
  const all = data.series.flatMap(s => s.values);
  const maxV = Math.max(...all, 100);
  const n = data.xLabels.length;
  const x = i => padL + (iw * i) / (n - 1);
  const y = v => padT + ih - (ih * v) / maxV;
  const linePath = (vals) => vals.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
  const areaPath = (vals) => linePath(vals) + ` L${x(n-1)} ${padT+ih} L${padL} ${padT+ih} Z`;
  const yTicks = [0, 50, 100, 150, 200];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span className="impact-label">{data.title}</span>
      </div>
      <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          {data.series.map((s, i) => (
            <linearGradient key={i} id={"g"+i} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={w - padR} y1={y(t)} y2={y(t)} stroke="var(--line-soft)" strokeDasharray="2 3" />
            <text x={padL - 6} y={y(t) + 3} textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-faint)">{t}</text>
          </g>
        ))}
        {data.series.map((s, i) => (
          <g key={i}>
            <path d={areaPath(s.values)} fill={"url(#g"+i+")"} />
            <path d={linePath(s.values)} fill="none" stroke={s.color} strokeWidth="1.75" strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}/>
            {s.values.map((v, j) => (
              <circle key={j} cx={x(j)} cy={y(v)} r="2.4" fill={s.color} />
            ))}
          </g>
        ))}
        {data.xLabels.map((lbl, i) => (
          <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--text-mute)">{lbl}</text>
        ))}
      </svg>
      <div className="chart-legend">
        {data.series.map((s, i) => (
          <span key={i}><span className="swatch" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} /> {s.label}</span>
        ))}
      </div>
    </div>
  );
};

window.LandingZoneDiagram = LandingZoneDiagram;
window.CommandCenterDiagram = CommandCenterDiagram;
window.IDPDiagram = IDPDiagram;
window.AreaChart = AreaChart;
