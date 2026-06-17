/* Resume + site data. Single source of truth. */

window.SITE_DATA = {
  profile: {
    name: "Geoffrey Miller",
    handle: "geoff.e.miller",
    tagline: "Principal Cloud Architect × Agentic AI Engineer",
    location: "Phoenix, AZ",
    email: "Geoff.E.Miller@gmail.com",
    phone: "(480) 688-7370",
    links: {
      site: "geoffmiller.cloud",
      github: "github.com/GeoffMillerAZ",
      linkedin: "linkedin.com/in/geoff-e-miller",
    },
    summary: {
      leadership: "Infrastructure Director and Principal Cloud Architect with 12 years designing and operating cloud platforms at regulated FinTechs (20 years in IT). Builds high-performing platform teams, manages stakeholders across business and technology, and ships simple repeatable engineering patterns that cut spend 30%+ while tightening compliance.",
      cloud: "Principal Cloud Architect specializing in AWS, Kubernetes, and the CNCF ecosystem. Known for unified platform services, policy-as-code, and FinOps automation — real-time, event-driven right-sizing that trims 30–70% off cloud bills without touching reliability.",
      ai: "Level-4 Agentic Software Engineering leader. Ships controlled agentic layers — MCP servers, patterned agents, automated verification with competing incentives — that triple developer throughput while keeping security, compliance, and consistency airtight. Also: a Director and Principal Cloud Architect with 12 years of infrastructure depth to ground the AI in reality.",
    },
  },

  /* ---------- Personas ---------- */
  personas: [
    { id: "ai",         label: "Agentic AI Engineer",       icon: "sparkles" },
    { id: "cloud",      label: "Cloud Architect",           icon: "cloud" },
    { id: "leadership", label: "Technology Leadership",     icon: "compass" },
  ],

  /* ---------- Skill groups, weighted per persona ---------- */
  skillGroups: [
    {
      id: "ai", title: "Agentic AI & MCP",
      weights: { ai: 3, cloud: 1, leadership: 2 },
      skills: ["MCP Servers", "Claude Code", "OpenAI Codex", "Anthropic Agents", "AutoGen", "CrewAI", "Multi-Agent Orchestration", "Prompt Engineering", "Patterned Agents", "Agentic Verification", "MLOps", "Pydantic", "CUE / Cuelang"],
    },
    {
      id: "platform", title: "Platform & Kubernetes",
      weights: { ai: 2, cloud: 3, leadership: 2 },
      skills: ["Amazon EKS", "Kubernetes", "Helm", "Kustomize", "Karpenter", "KEDA", "Istio", "Cilium", "Argo CD", "Flux CD", "GitOps", "Backstage IDP", "Devbox", "NixOS"],
    },
    {
      id: "iac", title: "IaC & Policy-as-Code",
      weights: { ai: 2, cloud: 3, leadership: 2 },
      skills: ["Terraform", "Pulumi", "Crossplane", "OPA / Gatekeeper", "Kyverno", "Sentinel", "CloudFormation", "Packer", "Timoni"],
    },
    {
      id: "aws", title: "AWS Services",
      weights: { ai: 1, cloud: 3, leadership: 2 },
      skills: ["EKS", "Lambda", "Transit Gateway", "Direct Connect", "Route 53", "S3 / Glacier", "DynamoDB", "Aurora", "CloudFront", "Organizations", "Security Hub", "Config"],
    },
    {
      id: "finops", title: "FinOps & SRE",
      weights: { ai: 1, cloud: 3, leadership: 3 },
      skills: ["Savings Plans", "Reserved Instances", "Spot", "Right-sizing Automation", "SLI / SLO", "Error Budgets", "Incident Response", "PagerDuty", "Prometheus", "Grafana", "Datadog", "OpenTelemetry"],
    },
    {
      id: "sec", title: "Security & Compliance",
      weights: { ai: 1, cloud: 2, leadership: 3 },
      skills: ["FFIEC", "PCI-DSS", "SOC 2", "Zero Trust", "CIS Benchmarks", "Snyk", "Falco", "Aqua", "OWASP", "Network Segmentation", "Secrets Management"],
    },
    {
      id: "lead", title: "Leadership",
      weights: { ai: 2, cloud: 2, leadership: 3 },
      skills: ["Team Building", "Stakeholder Management", "Executive Communication", "Mentoring", "Cloud Strategy", "Change Leadership", "Community of Practice"],
    },
  ],

  /* ---------- Roles / timeline ---------- */
  roles: [
    {
      id: "paypal",
      company: "PayPal",
      title: "Sr Engineering Manager, SRE",
      location: "Scottsdale, AZ · Hybrid",
      start: "Oct 2025", end: "Present",
      tagline: "Leading agentic software engineering for the PayPal Command Center.",
      taglines: {
        ai: "Agentic code review gates, patterned agents, and mostly-automated engineering — live in the PayPal Command Center.",
        cloud: "Real-time incident tooling and IaC for the Command Center that keeps every PayPal brand reliable.",
        leadership: "Recognized as a top-impact AI user enterprise-wide; consulted across every PayPal brand on reliability and agentic engineering.",
      },
      scope: ["SRE", "Agentic Engineering", "Incident Management"],
      personaFit: { ai: 3, cloud: 2, leadership: 3 },
      bullets: [
        { tag: "ai",        text: "Lead and specialize in agentic software engineering — mostly-automated dev with controlled approval gates." },
        { tag: "ai",        text: "Ship agentic code & configuration reviewing tools with automatic approval recommendation gates for the Command Center." },
        { tag: "sre",       text: "Built real-time incident management and collaboration tooling that speeds up live incident recovery." },
        { tag: "sre",       text: "Built a risk inventory system mapping mitigation capabilities and auditing reliability readiness across all PayPal brands and workloads." },
        { tag: "sre",       text: "Command Center scheduling + live staffing with low-coverage alarms and daily shift-handoff summarization." },
        { tag: "sre",       text: "Readiness scenario simulations — live P1 drills and paging readiness drills." },
        { tag: "lead",      text: "Recognized as a top-impact AI user enterprise-wide and appointed to PayPal's AI Super Users community shaping corporate AI adoption." },
        { tag: "lead",      text: "Authored GameDay tooling that ingests incident logs and chat transcripts to generate agentically-scored participant feedback reports." },
        { tag: "lead",      text: "Consult across all PayPal brands on cloud architecture, DevOps, and reliability engineering." },
      ],
      impact: {
        type: "dashboard",
        stats: [
          { label: "Enterprise AI recognition", value: "Top", unit: "user", sub: "AI Super Users community" },
          { label: "PayPal brands consulted", value: "ALL", unit: "", sub: "cross-brand reliability" },
          { label: "Agentic review gates", value: "Auto", unit: "", sub: "config + IaC approval" },
        ],
        diagram: "commandcenter",
      },
    },
    {
      id: "fcb",
      company: "First Citizens Bank",
      title: "Director of Cloud Infrastructure",
      location: "Remote from Tempe, AZ",
      start: "Jul 2021", end: "Sep 2025",
      tagline: "Built a bank-hardened AWS platform across 100+ accounts; cut spend 30% YoY.",
      taglines: {
        ai: "Sat on the bank's AI governance board — built the guardrails that let GenAI ship inside a bank.",
        cloud: "Bank-hardened AWS platform: 100+ accounts, sub-5ms hybrid connectivity, EKS with zero-day patching.",
        leadership: "Led a 12-person platform team through the SVB → FCB integration; founded the Cloud Community of Practice.",
      },
      scope: ["Landing Zone", "EKS Platform", "FinOps", "AI Governance"],
      personaFit: { ai: 2, cloud: 3, leadership: 3 },
      bullets: [
        { tag: "lead",   text: "Guided the team through the Silicon Valley Bank → First Citizens Bank integration, including platform migrations." },
        { tag: "cloud",  text: "Built secure AWS Landing Zone (100+ accounts) with centralized logging and IAM federation." },
        { tag: "finops", text: "Cut AWS spend 30% YoY via FinOps dashboards and automated rightsizing." },
        { tag: "sec",    text: "Enforced policy-as-code gates for continuous FFIEC / PCI-DSS / SOC 2 compliance." },
        { tag: "cloud",  text: "Designed sub-5 ms hybrid connectivity (Direct Connect, ExpressRoute, Megaport)." },
        { tag: "lead",   text: "Led and mentored a 12-member platform team; founded the Cloud Community of Practice." },
        { tag: "sec",    text: "Integrated DevSecOps toolchain (Sentinel, Snyk, SAST / SCA) into CI/CD." },
        { tag: "sec",    text: "Introduced 'override-as-code' workflow — risk acceptance and governance logic in Git, every exception peer-reviewed." },
        { tag: "platform", text: "Decomposed a monolithic repo into team-owned repos with CODEOWNERS, mandatory gates, and policy-as-code checks. Lead time: 6–12 weeks → days." },
        { tag: "cloud",  text: "Consolidated 'VPC-per-service' sprawl into a shared-services hub (Transit Gateway, Route 53 resolver rules, central interface endpoints) — hundreds of VPCs → a few network segments." },
        { tag: "finops", text: "Replaced thousands of duplicate interface endpoints with a single multi-AZ endpoint hub — VPC-endpoint costs went from top-3 line item to negligible. Saved hundreds of thousands annually." },
        { tag: "platform", text: "Engineered a bank-hardened EKS platform — multi-AZ, CIS-benchmark hardened, OPA/Gatekeeper, automated zero-day node patching." },
        { tag: "ai",     text: "Sat on the bank's AI governance board — crafted secure onboarding patterns for GenAI/ML tools, defined data-access guardrails." },
      ],
      impact: {
        type: "dashboard",
        stats: [
          { label: "AWS spend reduction", value: "30", unit: "%", sub: "year over year" },
          { label: "AWS accounts governed", value: "100+", unit: "", sub: "multi-account landing zone" },
          { label: "Feature lead time", value: "6–12 wk", unit: "→ days", sub: "after monorepo decomposition" },
          { label: "Platform team size", value: "12", unit: "", sub: "direct reports" },
        ],
        chart: {
          kind: "area",
          title: "AWS spend vs workload growth",
          series: [
            { label: "Spend",    color: "var(--neon-pink)", values: [100, 98, 92, 85, 76, 68, 63, 58] },
            { label: "Workload", color: "var(--neon-cyan)", values: [100, 108, 118, 132, 148, 168, 192, 220] },
          ],
          xLabels: ["Q3'21", "Q4", "Q1'22", "Q2", "Q3", "Q4", "Q1'23", "Q2"],
        },
        diagram: "landingzone",
      },
    },
    {
      id: "repay",
      company: "REPAY",
      title: "Director of Cloud Infrastructure",
      location: "Remote from Tempe, AZ",
      start: "Oct 2017", end: "Jul 2021",
      tagline: "Built a green-field AWS platform, passed PCI with zero criticals, grew the team 1 → 18.",
      taglines: {
        ai: "Backstage IDP and docs-as-code — the platform-as-product groundwork for today's agentic patterns.",
        cloud: "Green-field AWS platform that passed PCI with zero criticals; migrations cut from months to a day.",
        leadership: "Grew the infra org from 1 engineer to 18 across SRE, ops, and platform development.",
      },
      scope: ["Green-field AWS", "PCI", "Backstage IDP", "EKS"],
      personaFit: { ai: 1, cloud: 3, leadership: 3 },
      bullets: [
        { tag: "cloud",    text: "Built green-field AWS platform (Terraform, Packer, Kubernetes); passed PCI with zero criticals." },
        { tag: "platform", text: "Launched Backstage IDP and Documentation-as-Code — drift cut 75%, groundwork for everything-as-code." },
        { tag: "lead",     text: "Grew team from a single engineer to a 10-person SRE team + 5-person ops team; led a 3-person full-stack team building platform services." },
        { tag: "sre",      text: "24/7 on-call with PagerDuty; managed enterprise vendor support contracts." },
        { tag: "sre",      text: "Engineered Prometheus / Loki / Grafana observability." },
        { tag: "cloud",    text: "Multi-account Landing Zone with guardrails; FinOps automation saved 30% YoY." },
        { tag: "platform", text: "Secure EKS with GitOps, admission control, and autoscaling." },
        { tag: "platform", text: "Reusable patterns cut cloud migration time from months to one day." },
      ],
      impact: {
        type: "dashboard",
        stats: [
          { label: "PCI audit", value: "0", unit: "criticals", sub: "first-time green-field pass" },
          { label: "Team grown", value: "1 → 18", unit: "", sub: "across SRE, ops, platform dev" },
          { label: "Doc drift", value: "−75", unit: "%", sub: "Documentation-as-Code" },
          { label: "Migration time", value: "months", unit: "→ 1 day", sub: "via reusable patterns" },
        ],
        diagram: "idp",
      },
    },
    {
      id: "ews",
      company: "Early Warning Services",
      title: "DevOps Engineer",
      location: "Scottsdale, AZ",
      start: "Jan 2017", end: "Oct 2017",
      tagline: "DevOps engineering at the bank-owned network behind Zelle, during its launch era.",
      scope: ["CI/CD", "Blue/Green", "Microservices"],
      personaFit: { ai: 0, cloud: 2, leadership: 1 },
      bullets: [
        { tag: "cloud",    text: "DevOps engineering at Early Warning Services — the bank-owned network that operates Zelle — during the launch period." },
        { tag: "platform", text: "Built immutable CI/CD pipelines and containerized microservices supporting daily releases." },
        { tag: "sre",      text: "Automated blue-green rollouts and A/B testing to make deploys low-risk." },
      ],
      impact: null,
    },
    {
      id: "thinkvine",
      company: "Thinkvine",
      title: "Principal Cloud Architect",
      location: "Remote from Chandler, AZ",
      start: "Apr 2016", end: "Jan 2017",
      tagline: "Migrated Windows + Linux workloads to AWS with Terraform IaC and CI/CD.",
      scope: ["Migration", "Terraform IaC"],
      personaFit: { ai: 0, cloud: 2, leadership: 1 },
      bullets: [
        { tag: "cloud", text: "Migrated Windows & Linux workloads to AWS, reducing hosting cost." },
        { tag: "platform", text: "Converted legacy infrastructure to Terraform IaC with CI/CD for faster, repeatable deployments." },
      ],
      impact: null,
    },
    {
      id: "ownzones",
      company: "OWNZONES Media Network",
      title: "Lead DevOps Engineer",
      location: "Remote from Scottsdale, AZ",
      start: "Apr 2016", end: "Jul 2016",
      tagline: "Green-field AWS video infrastructure with S3 lifecycle + Glacier cost optimization.",
      scope: ["Green-field AWS", "S3 / Glacier"],
      personaFit: { ai: 0, cloud: 2, leadership: 0 },
      bullets: [
        { tag: "cloud", text: "Designed green-field AWS infrastructure for video workloads, using S3 lifecycle policies and Glacier to optimize storage cost." },
      ],
      impact: null,
    },
    {
      id: "azstate",
      company: "State of Arizona — Dept. of Administration",
      title: "Applications Developer",
      location: "Phoenix, AZ",
      start: "Jan 2015", end: "Apr 2016",
      tagline: "Introduced Git and unit testing to mainframe COBOL.",
      scope: ["Mainframe", "Modernization"],
      personaFit: { ai: 0, cloud: 1, leadership: 1 },
      bullets: [
        { tag: "platform", text: "Introduced Git and automated unit testing to mainframe COBOL systems." },
      ],
      impact: null,
    },
  ],

  education: [
    {
      school: "Northern Illinois University",
      degree: "M.S. Computer Science",
      year: "2015",
      honors: "Emphasis: Network Programming & Database Systems",
    },
    {
      school: "Northern Illinois University",
      degree: "B.S. Computer Science",
      year: "2013",
      honors: "Magna Cum Laude · 3.75 GPA · Upper Division Honors",
    },
  ],

  certifications: [
    {
      name: "Claude Certified Architect — Foundations",
      issuer: "Anthropic",
      year: "In Progress",
      tags: ["Agentic AI", "Claude", "MCP"],
      blurb: "Foundations of designing controlled agentic systems on Claude — patterned agents, MCP servers, verification, and production safety. Currently in progress.",
    },
  ],

  /* ---------- Articles ---------- */
  articles: [
    {
      id: "shift-left-vs-shift-luck",
      title: "Shift Left vs Shift Luck",
      tags: ["engineering-culture", "devsecops", "governance"],
      date: "2026-06-16",
      read: "8 min",
      summary: "Every team that hasn't shifted left has shifted luck — they've just moved the discovery of defects, security gaps, and compliance failures to production, where luck decides whether a customer or an auditor finds them first. Shifting left means building correctness in early: policy-as-code gates, automated verification, and deterministic artifacts that fail the build instead of the bank. The alternative to shifting left was never 'move faster' — it was gambling, and quietly hoping the dice land your way.",
      body: `## The thing everyone calls "moving fast" is usually shifting luck

There are two strategies for dealing with software defects, security gaps, and compliance failures. The first is to find them before they reach production. The second is to find them after — and hope luck decides it's a developer who finds them, not a customer or an auditor.

Most teams choose the second strategy without realizing it. They call it "moving fast."

Shifting left is not a philosophy. It is a set of concrete engineering choices that move the discovery of failures from production to the build pipeline. The choices are not complicated. What they require is that you stop treating correctness as somebody else's problem and start building it into every artifact the pipeline produces.

## What shifting left actually looks like

**Policy-as-code gates** are the most durable form of shifting left at the infrastructure layer. When a Terraform plan runs through OPA or Sentinel before it applies, you cannot ship a misconfigured S3 bucket to production. The policy runs on every plan, against every branch, before any human reviews anything. The rule doesn't get tired on a Friday afternoon.

At First Citizens Bank, running 100+ AWS accounts across FFIEC, PCI-DSS, and SOC 2 requirements, policy-as-code wasn't optional — it was the only realistic way to maintain continuous compliance posture without a dedicated human reviewing every resource change. The alternative was a quarterly audit that found problems months after they were introduced.

**Automated verification with competing incentives** takes this further into the agentic tier. When an agent authors a configuration change, a separate verifier agent — with different system context and different incentives — audits the output before it lands. The verifier isn't trying to help the author; it's trying to find holes. That adversarial relationship is the point.

**Deterministic artifacts** close the gap between "it worked in CI" and "it worked in production." A container image that is reproducibly built from a pinned base, signed, and hash-verified at deploy time is not the same artifact as one that was built from <code>latest</code> on a developer laptop. Reproducibility is not a performance optimization. It is a correctness property.

## The asymmetry nobody talks about

The cost of finding a defect scales exponentially with how far right it travels.

A failed unit test costs thirty seconds. A failed policy gate costs a pipeline re-run. A security gap found in a pre-prod environment costs a day of remediation. The same gap found by a PCI auditor costs six figures and a project freeze.

Every team knows this asymmetry intellectually. Most don't act on it, because the pain of a build failure is immediate and the benefit of preventing a production incident is counterfactual. You never see the incident that didn't happen.

The teams that shift left consistently have usually experienced the alternative: a data breach, a compliance finding, a production incident caused by a misconfiguration that was visible in the diff for two weeks before anyone noticed. Once you've paid that tax, the thirty-second pipeline failure feels like a bargain.

## What "move faster" actually requires

Here is the uncomfortable truth: shifting left is what actually makes teams move faster. Not in the first week. In the third month.

A team that ships correct, policy-compliant, reproducibly-built artifacts doesn't spend its Friday afternoons on emergency rollbacks. It doesn't spend its Q3 on a remediation sprint after an audit finding. It doesn't lose two engineers for a month tracking down a production bug that was visible in the test suite if anyone had looked.

The teams I've watched move the fastest over a sustained period are the ones where the pipeline is the floor, not the ceiling. Where a green build is a meaningful signal, not a formality. Where the definition of "done" includes "verified by something that doesn't share your assumptions."

**Shift left is not overhead.** It is the cost of engineering instead of gambling. The alternative to shifting left was never "move faster." It was accepting that luck is part of your architecture — and quietly hoping the dice keep landing your way.

The dice don't always land your way.`,
    },
    {
      id: "why-agentic-kit",
      title: "Why every serious team needs an agentic-kit",
      series: { name: "Building the Agentic Stack", part: 1, of: 4 },
      tags: ["agentic", "governance", "platform"],
      date: "2026-06-12",
      read: "11 min",
      summary: "Raw LLM calls are not an engineering platform. An agentic-kit is the governed harness that sits between your agents and production: budget guards, injection detection, replay-tested determinism, competing-incentive verification, and provenance journaling. Without it you have demos; with it you have software you can put in front of a regulated enterprise.",
      body: `## The demo problem

Every agentic system looks great in a demo. The model is smart, the tool calls are plausible, the output is coherent. Then you put it in front of a production workload and discover that "coherent" and "correct" are not the same thing — and that there is nothing between the model's output and your infrastructure to tell the difference.

Raw LLM calls are not an engineering platform. They are a capability. An agentic-kit is the governed harness that turns that capability into software you can actually put in front of a regulated enterprise.

## The governed agent loop

The architecture that works — the one I built agentic-kit around — has a specific shape. Every agent interaction flows through the same loop:

- **Model turn.** The model receives context and produces either a message or a tool call request.
- **Tool dispatch.** Tool calls are routed through a registry that validates the call signature, checks the caller's current budget, and logs the intent before dispatch.
- **Governance screens.** Before execution, the tool call passes through the endpoint guard. This is where injection detection runs, where the strike ledger is checked, and where proof-of-work challenges can be imposed on suspicious callers.

The endpoint guard is fail-closed. If it cannot make a trust decision — network partition, schema mismatch, budget exhaustion — the call does not execute. The default behavior is denial, not permissiveness. This is the opposite of what most teams build when they wire up tool calling for the first time, and it is the difference that matters in a regulated environment.

## The strike ledger and circuit breaker

Not all failures are equal. An agent that makes one malformed tool call might have hit a transient edge case. An agent that makes fifteen unusual tool calls in rapid succession is doing something that deserves human attention.

The strike ledger in agentic-kit maintains a per-agent, per-session record of governance events: injection attempts, budget warnings, schema violations, repeated failures. The circuit breaker watches this record and applies escalating responses — from rate limiting, to proof-of-work challenges that slow down automated callers, to full session suspension pending review.

The proof-of-work mechanism is particularly useful against prompt injection. An attacker who has convinced an agent to call a forbidden endpoint will find that the endpoint guard responds with a computational challenge before proceeding. Automated injection pipelines fail this reliably. A legitimate agent call, where a human is in the loop, can satisfy it with minimal friction.

## Replay determinism and hash-chained provenance

One of the hardest properties to add to an agentic system after the fact is replay determinism — the ability to re-run a past interaction and verify that the same inputs produce the same outputs. Without it, you cannot debug production failures, you cannot write meaningful regression tests, and you cannot satisfy an auditor who wants to know exactly what the agent did and why.

agentic-kit journals every interaction in a format that can be replayed: the model version, the full context, the tool calls made, and the responses received. These records are hash-chained — each entry includes the hash of the previous entry — so the chain cannot be modified without invalidating everything downstream of the edit. Provenance is not a log you add at the end. It is a property of the interaction design from the start.

## Competing-incentive verification

The most reliable verification strategy I know of is adversarial: have a second agent, with different system context and explicitly different incentives, audit the first agent's output before it executes.

The verifier is not trying to help the author. It is trying to find holes — places where the output violates schema, where a configuration change would open a security gap, where the logic is correct but the intent is ambiguous. Because the verifier's context is sourced from outside the author's repository, it cannot be fooled by a corrupt source that also corrupts the verifier.

This pattern — author/verifier with competing incentives — is what I run at PayPal for agentic code review gates. The author agent proposes. The verifier audits. A human sees a recommendation, not a raw model output. The tripling of throughput we see is not because the agents write code faster; it is because the feedback loop on correctness is tighter, and we spend less time on rework.

## Why you need the kit before you need more agents

The temptation is to add agents first and governance later. The problem is that governance shapes what the agents can safely do. An agentic system built without a budget cap will spend without bound. One built without injection detection will be compromised by a sufficiently creative prompt. One without provenance journaling will be un-debuggable when something goes wrong.

Build the kit first. Then the agents you add on top of it are software — verifiable, auditable, deployable in a regulated environment. Without the kit, they are demos.`,
    },
    {
      id: "why-app-kit-agentic-era",
      title: "The case for an app-kit in the age of agentic coding",
      series: { name: "Building the Agentic Stack", part: 2, of: 4 },
      tags: ["app-kit", "platform", "agentic", "developer-experience"],
      date: "2026-06-10",
      read: "10 min",
      summary: "When agents write most of the code, the scarce resource is consistency, not keystrokes. An app-kit gives humans and agents one set of paved roads: typed design tokens, a component library, a loopback/app contract, a single data layer, and an MCP surface so agents discover the kit instead of reinventing it. The kit is what keeps a hundred agent-generated screens from looking like a hundred different apps.",
      body: `## Keystrokes are no longer the bottleneck

For most of software engineering history, the binding constraint on output was how fast a human could write code. Every productivity tool — IDEs, snippets, frameworks, generators — attacked the same problem: reduce the number of keystrokes between intent and working software.

Agentic coding dissolves that constraint almost completely. A well-prompted agent writes a thousand lines of plausible code faster than any human. The bottleneck shifts: now the scarce resource is **consistency**. When a hundred agent-generated screens can each express a slightly different visual language, component contract, or data shape, you don't have a product — you have a museum of adjacent implementation choices.

An app-kit is the answer to that specific problem. It gives humans and agents one set of paved roads.

## The CUE design-token pipeline

app-kit's design system is expressed in CUE — a typed configuration language that validates its own constraints at definition time. The token definitions flow through a pipeline that compiles them into three simultaneous targets: CSS custom properties for the browser layer, a DTCG-format JSON bundle for design tools, and Go constants for server-side rendering.

The key property here is **single source of truth**. When the accent color changes, it changes in one place — the CUE definition — and the pipeline propagates the change everywhere. An agent generating a new component doesn't need to know the current accent hex code; it reads from the token vocabulary, which is always correct because it can't drift from itself.

This matters especially for agentic code generation. Agents that work without typed token contracts tend to hardcode colors, reach into CSS files directly, or make up values that look plausible. A typed token vocabulary with an MCP surface makes the right choice the easy choice: the agent queries the kit for <code>--color-accent</code> and gets the current value, not the value from some document it was trained on.

## Pure-Go visualization, no Node dependency

One of the deliberate constraints in app-kit is the elimination of Node.js from any critical path. The visualization layer — charts, graphs, SVG-based data displays — is implemented in pure Go, generating SVG markup server-side with no JavaScript dependency for the base rendering.

This is not an ideological stance against JavaScript. It is a practical stance against supply chain complexity. A pure-Go SVG visualization library has one build toolchain, one language ecosystem, and one set of CVE exposure. It deploys as a single binary. It runs in environments where Node is not available — Lambda functions, embedded edge workers, air-gapped build pipelines.

When an agent generates a data visualization, it calls into the Go library and gets an SVG it can embed. There is no webpack configuration to get wrong, no npm audit to run, no Node version to pin.

## The MCP component server

The most important surface in app-kit for agentic use is the MCP component server. It exposes the component library — every card, button, form, layout primitive, and page shell — through a Model Context Protocol interface that agents can query.

An agent building a new screen doesn't browse source files or guess at component names. It sends a query to the MCP server: <code>list_components</code>, <code>get_component_by_name("DataCard")</code>, <code>get_component_preview</code>. The server responds with the component's interface, its expected props, and a rendered example. The agent then composes from the vocabulary it discovers, not from the vocabulary it imagines.

The consequence is measurable: screens generated through the MCP surface look and behave consistently because they share components with every other screen in the product. The divergence problem — a hundred agents producing a hundred visual languages — is structurally prevented rather than reviewed away.

## The loopback/app contract

Every app built on app-kit has a defined contract for how the frontend and the backend communicate in development and in production. In development, that contract is satisfied over a local loopback — the same Go server that handles production traffic also handles local development, with no proxy, no mock layer, no external dev server.

This matters for agents because it means the environment an agent develops in is structurally identical to the environment that will run in production. There is no "it works locally" failure mode caused by a difference between the dev proxy and the production router. The seam between local and production is an adapter swap, not an environment difference.

## What the kit actually prevents

Without an app-kit, agentic coding produces inconsistency at scale. Every agent makes locally reasonable choices that compound into global chaos: different button styles, different form validation patterns, different error state representations, different data fetching idioms. Human reviewers spend their time on visual inconsistency instead of logic correctness.

With an app-kit, the agents have one vocabulary, one design language, and one way to compose screens. Human reviewers look at whether the agent used the right component for the job — not whether it invented a new component that looks almost like the right one.

The kit is not about constraining agents. It is about directing their creativity to the layer that matters: the problem being solved, not the infrastructure for solving it.`,
    },
    {
      id: "hexagonal-agentic-engineering",
      title: "Hexagonal architecture is a superpower in the age of agentic engineering",
      series: { name: "Building the Agentic Stack", part: 3, of: 4 },
      tags: ["architecture", "hexagonal", "agentic", "go"],
      date: "2026-06-08",
      read: "9 min",
      summary: "Ports-and-adapters gives agents a small, well-typed contract to code against and a domain core they can't accidentally couple to a database or a cloud. The same governed-agent core then runs locally over loopback and in AWS Lambda with nothing changed but the adapters — and every adapter boundary is a natural seam for replay tests and verification. Hexagonal design turns 'the agent rewrote half the app' into 'the agent swapped one adapter.'",
      body: `## The coupling problem in agentic code generation

When an agent writes code without architectural constraints, it tends to couple everything to everything. Database calls appear in route handlers. Business logic appears in database models. AWS SDK calls appear in what was supposed to be a pure computation function. This isn't a failure of the model's intelligence — it is a consequence of asking the model to make local decisions without a global structural rule.

The coupling that results is not just aesthetically displeasing. It is specifically hostile to the operations that agentic engineering depends on: replay testing, verification, adapter swaps, and deterministic re-execution. A system where the domain logic is fused to the delivery mechanism cannot be replayed in isolation. It cannot be verified without its full infrastructure dependency tree. It cannot be tested without a real database.

Hexagonal architecture — ports and adapters — solves this problem structurally, not through discipline.

## Domain core and port definitions

The center of a hexagonal system is the domain core: pure business logic, expressed in the language's type system, with no imports from infrastructure packages. In Go, this means the core package has no AWS SDK imports, no database drivers, no HTTP client calls. It defines **ports** — interfaces that describe what the core needs from the outside world.

~~~
type AgentRepository interface {
    Store(ctx context.Context, run AgentRun) error
    Load(ctx context.Context, id RunID) (AgentRun, error)
}

type GovernancePolicy interface {
    Evaluate(ctx context.Context, call ToolCall) Decision
}
~~~

These interfaces compile and test without any infrastructure present. An agent given this port definition has a precise, bounded contract to implement adapters against. It cannot accidentally couple the domain to DynamoDB because DynamoDB is not imported in the domain package.

## Adapters as the only moving part

Adapters implement the ports. A <code>DynamoAgentRepository</code> implements <code>AgentRepository</code> using DynamoDB. A <code>LocalAgentRepository</code> implements the same interface using an in-memory map. A <code>LambdaGovernancePolicy</code> calls an AWS Lambda function. A <code>LoopbackGovernancePolicy</code> makes a local HTTP call to the same process.

The domain core is unchanged across all of these. The same governed-agent loop that runs in production Lambda runs locally over loopback — the only difference is which adapter is wired at startup. In practice, this means:

- Local development has zero AWS cost and zero AWS dependency
- Integration tests run against local adapters with full domain coverage
- Production deploys swap in the cloud adapters with no domain code changes
- An agent developing a new feature can work entirely against the local adapter and be confident the domain logic will behave identically in production

## Adapter boundaries as replay and verification seams

Every adapter boundary is a natural seam for replay testing. Because adapters are injected through interfaces, they can be replaced with recording adapters that capture interactions — and replaying adapters that replay them.

In practice, this is how I test governed-agent interactions: run the real interaction once, record every domain call at the adapter boundary, then replay the recording in CI to verify that the same inputs produce the same outputs without touching any real infrastructure. This is exact replay determinism, and it is structurally free in a hexagonal architecture. In a system where domain logic is coupled to infrastructure, achieving the same property requires mocking at the SDK level, which is fragile and expensive to maintain.

Verification fits the same pattern. A verifier agent that receives an <code>AgentRun</code> from the repository adapter is working with the same typed domain object that the author agent produced. The verification logic can run against the local adapter, against a production snapshot, or against a replayed recording. The seam is always in the same place.

## What agents can and cannot touch

One of the underappreciated benefits of hexagonal architecture for agentic engineering is the clarity it provides about scope. When an agent is asked to add a new feature, the question "what files should I touch?" has a clear structural answer: if the feature is domain logic, it lives in the core; if it is delivery, it lives in an adapter; if it bridges them, it defines a new port.

An agent that follows this rule cannot accidentally rewrite the HTTP router while trying to fix a business logic bug. The two concerns live in different packages with no import path connecting them. The worst an agent can do when asked to change domain behavior is change the domain package and the tests that cover it — which is exactly the scope that should change.

This turns "the agent rewrote half the app" into "the agent swapped one adapter and added a port method." The blast radius is bounded by the architecture, not by the agent's judgment about what is safe to touch.

## The Go choice

Hexagonal architecture works in any language, but Go makes it unusually clean. Interfaces are structural, not declared — any type that implements the methods satisfies the interface without needing to import it. This means adapters have zero import-coupling to the domain; the domain defines the interface, adapters implement it, and the compiler verifies the match at build time.

For agentic code generation, Go's explicit interfaces and lack of magic make generated code easier to verify: if it compiles, the adapter contract is satisfied. There is no duck-typing ambiguity, no runtime interface discovery, no framework reflection. The type system is the governance layer for structural correctness.`,
    },
    {
      id: "cue-for-agentic-engineering",
      title: "Why CUE is the right backbone for agentic engineering",
      series: { name: "Building the Agentic Stack", part: 4, of: 4 },
      tags: ["cue", "agentic", "configuration", "verification"],
      date: "2026-06-05",
      read: "12 min",
      summary: "Agents are far more reliable when they emit structured data than freeform prose. CUE gives you one typed schema that validates that data, unifies configuration, and compiles to JSON, YAML, or Go — so drift between what the schema says and what the agent produced becomes a build failure instead of a production incident. It is the single source of truth that makes agent output deterministic and defensible.",
      body: `## The freeform prose problem

The cheapest way to get an agent to produce structured output is to ask it nicely in the system prompt: "respond with JSON in this shape." The success rate is high enough to feel reliable. Then you hit a production edge case — a long response that trips the context window, a schema field the model found ambiguous, a tool call that returned an unexpected value — and the JSON is malformed, or the shape is subtly wrong, or the model silently dropped a required field.

Asking nicely is not a schema. A schema is a constraint that makes the wrong shape impossible to produce — or at least impossible to pass without being caught.

CUE is that constraint. It is a typed configuration language whose validation logic is expressed in the same syntax as the data it validates. When an agent's output passes CUE evaluation, the schema says so mechanically, not probabilistically. When it fails, the error is precise, actionable, and available before the output reaches any system that would act on it.

## CUE as contract between agent and system

In agentic-kit and app-kit, CUE schemas serve as the contract between what an agent is allowed to produce and what downstream systems will accept. The schema is defined once, in a <code>.cue</code> file that is version-controlled alongside the code it governs. Any output the agent produces is evaluated against it before use.

The evaluation is not a JSON Schema validation pass (though CUE can export JSON Schema). It is a type unification: CUE's evaluation model treats the schema and the data as two values being merged, and produces either a unified result or a type error. This means constraints compose — you can layer a base schema, a feature-specific schema, and an environment-specific override, and CUE will evaluate all of them simultaneously and report conflicts precisely.

For agent output, this matters because agents produce outputs that satisfy multiple overlapping constraints: the tool call schema, the governance policy, the application domain contract, and the environment configuration. CUE handles all of these in one evaluation pass. A Python validator chain handles them sequentially, in an order that may hide conflicts.

## Unifying configuration: one schema, three targets

The design token pipeline in app-kit illustrates CUE's most practical property: a single schema definition that compiles to multiple target formats simultaneously.

The token schema is defined in CUE. A <code>cue export</code> command with the appropriate mappings produces:

- **CSS custom properties** for the browser layer (<code>--color-accent: #c084fc;</code>)
- **DTCG-format JSON** for design tooling
- **Go constants** for server-side rendering and Go clients

All three are derived from the same source. When the schema changes, all three change in sync. An agent generating a new component queries the CSS layer. A Go backend reads constants from the generated package. A design tool reads the DTCG bundle. None of them can drift from the others because they share a common origin that is enforced at build time.

**Drift = build failure** is the key property. If the CSS and the Go constants diverge, the build fails before anything is deployed. This is not something a code review or a linter can reliably catch — it requires a mechanical check that runs on every change.

## CUE as agent output validator

The most direct use of CUE in an agentic system is as the output validator in the governance loop. After the model turn produces a tool call or a structured response, before the endpoint guard allows dispatch, the output is evaluated against the CUE schema for that tool.

A tool call that would write a Kubernetes manifest passes CUE evaluation for the manifest schema. If the agent produced a <code>Deployment</code> with a missing <code>selector</code>, the evaluation fails with a specific field-level error. The call does not dispatch. The agent receives the error and can attempt correction.

This changes the failure mode from "the agent produced a subtly wrong manifest that deployed successfully and caused a production incident six days later" to "the agent produced a wrong manifest and got an immediate, specific error that it corrected on the next turn." The first failure mode is expensive. The second is a normal part of the agentic loop.

## Compiling to Go: type safety across the boundary

One of CUE's underused features is its ability to generate Go struct definitions from a CUE schema. In a Go-backed agentic system, this means the same schema that validates agent output also defines the Go types that the domain core works with.

When the schema changes, <code>cue generate</code> produces updated Go types. If the domain code uses a field that the schema removed, the Go compiler fails. The schema and the implementation are mechanically coupled — they cannot drift because drift is a compile error.

For agentic engineering, this closes the last gap in the type safety chain: the model produces JSON that satisfies the CUE schema, the CUE schema generates the Go types, and the Go compiler verifies that the domain logic handles those types correctly. The schema is not documentation. It is the load-bearing constraint that makes the system defensible.

## CUE's limitations and where it earns its complexity

CUE has a learning curve. Its unification model is not immediately intuitive for engineers coming from JSON Schema or YAML. The toolchain is Go-based and has opinions about module layout. Error messages can be dense.

These are real costs. They are worth paying when:

- You have agent output that must satisfy multiple overlapping constraints
- You have configuration that must compile to multiple target formats without drift
- You need a build-time guarantee that schema and implementation agree
- You are operating in a regulated environment where "the model said so" is not a sufficient audit trail

If you only need one of these properties, a lighter tool may suffice. If you need all of them — and in a serious agentic engineering platform you will — CUE is the right backbone, not because it is the most ergonomic choice, but because it is the one that makes the wrong outputs structurally impossible rather than merely unlikely.`,
    },
    {
      id: "finops-event-driven",
      title: "Event-driven FinOps: 70% cloud spend cut without touching reliability",
      tags: ["finops", "aws", "platform"],
      date: "2026-01-14",
      read: "11 min",
      summary: "Non-prod environments that spin up on first PR comment and tear down on idle. EventBridge rules, tag-driven right-sizing, and the dashboards that prove it.",
      body: `## The non-prod spend problem nobody measures

Cloud cost optimization discussions tend to focus on production: reserved instances, savings plans, spot fleets, rightsizing running workloads. These are real levers. They are also the hardest levers to pull, because production changes carry reliability risk and require change management overhead that slows everything down.

Non-production environments are a different story. They are idle most of the time — nights, weekends, the three hours between a deploy and the next review. They are often over-provisioned because nobody wants to be the person who made the dev environment too small. And they rarely have cost accountability because the teams that run them are measured on delivery, not on spend.

At multiple organizations, I've seen non-prod account for 60–75% of total cloud spend. That is not a misconfiguration. It is the predictable consequence of treating non-prod infrastructure as a permanent fixture rather than an on-demand resource.

The event-driven teardown and spin-up pattern changes that accounting directly.

## The architecture: EventBridge as the orchestration layer

The core of the pattern is simple: non-prod environments are not always-on resources. They exist when something needs them, and they don't when nothing does.

AWS EventBridge provides the event backbone. Three categories of events drive the automation:

**PR lifecycle events.** A GitHub webhook (delivered to an EventBridge partner bus) fires when a pull request is opened, updated, or closed. On open or update, a Step Functions workflow provisions the environment — or confirms it is already running. On close or merge, the same workflow begins the teardown sequence: drain connections, snapshot state if needed, terminate instances.

**Idle detection events.** CloudWatch metrics on ECS task CPU, RDS connection count, and ALB request rate feed custom EventBridge rules. When all three metrics fall below threshold for a configurable window (typically 45 minutes), an idle-detected event fires and the teardown workflow runs. The environment can be re-created on the next PR open or manual trigger.

**Schedule events.** For environments that don't use PR-driven lifecycle (shared integration environments, QA environments with unpredictable use patterns), a scheduled EventBridge rule tears down at end-of-business and spins up before business hours. This is the least sophisticated option and the most reliable — even without perfect idle detection, you don't pay for environments overnight.

## Tag-driven right-sizing

Provisioning from scratch on every PR open is expensive if every environment is sized for peak production load. Tag-driven right-sizing addresses this.

Every non-prod resource is tagged with an <code>env-tier</code> value: <code>dev</code>, <code>integration</code>, or <code>staging</code>. The provisioning workflow reads this tag and selects a sizing profile — instance types, ECS task memory, RDS instance class — appropriate for the tier. A <code>dev</code> environment gets 20% of the compute resources of a <code>staging</code> environment.

The sizing profiles are defined in a central SSM Parameter Store path and referenced by all provisioning templates. Changing the <code>dev</code> tier profile changes every dev environment on its next provision cycle. No template updates, no per-environment configuration drift.

Right-sizing accounts for a meaningful portion of the total savings on its own. But the larger impact comes from eliminating the idle hours entirely — an on-demand dev environment that runs four hours a day and is correctly-sized is where the 70%+ number comes from.

## Cost attribution that actually works

The prerequisite for any FinOps program is knowing what you're spending and on what. AWS Cost Explorer is the tool, but it is only as useful as your tagging discipline.

The tagging schema I run everywhere has four required tags on every resource:

- <code>team</code> — the team that owns the resource
- <code>environment</code> — dev, integration, staging, or prod
- <code>service</code> — the service or workload name
- <code>cost-center</code> — the internal cost center for chargeback

These four tags, enforced through AWS Config rules and OPA policies on the Terraform state, produce Cost Explorer views that answer "who is spending what on which service in which environment" without any manual reconciliation.

When you can see that a specific team's dev environments are running idle for 14 hours a day and representing 40% of that team's monthly bill, the conversation about implementing teardown automation becomes easy. The data makes the case.

## The dashboard that drives the behavior

The final piece is visibility. Event-driven teardown automation that runs silently produces savings that nobody sees and therefore nobody defends when the next "let's just leave it running" decision comes up.

A FinOps dashboard — CloudWatch Dashboard with Cost Explorer API feeds — shows the current running non-prod environments and their hourly cost, environments torn down in the last 24 hours and hours saved, rolling 30-day non-prod spend versus the baseline before the pattern was implemented, and an alert when an environment has been running for more than 8 hours without PR activity.

The dashboard is visible to teams and to leadership. It turns cost optimization from an invisible infrastructure concern into a concrete, visible engineering metric. Teams that see their own spend tend to care about it.

## What 70%+ actually means

The 70%+ non-prod spend reduction figure comes from real deployments of this pattern across multiple organizations. The range varies:

- Teams with heavy weekend development activity see smaller savings, because the environments were legitimately in use.
- Teams with strict 9-to-5 working patterns and long-lived dev environments see savings closer to the high end.
- Organizations with globally distributed teams where "business hours" spans multiple time zones see the largest gains — idle detection catches the gap hours between shifts.

The savings accrue without any change to developer workflow for teams using PR-driven lifecycle. A developer opens a PR and the environment appears. The environment disappears when the PR closes. From the developer's perspective, the environment is always there when they need it. From the platform's perspective, it was idle for 18 hours last night and the bill reflects that.

That asymmetry — invisible to users, visible in spend — is what makes the pattern durable. It doesn't require behavior change. It requires infrastructure that aligns cost with actual use.`,
    },
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      id: "agentic-code-factory",
      roleId: "paypal",
      owner: "org",
      title: "Agentic Code Factory",
      kind: "closed",
      org: "PayPal / First Citizens Bank",
      year: "2024 – present",
      tags: ["agentic", "mcp", "platform"],
      summary: "Independent patterned agentic layer that applies engineering patterns across projects — generates service catalogs, policy code, and IaC with controlled approval gates.",
      problem: "Developer throughput capped by specialization; security and compliance overhead grew linearly with team size.",
      impact: "3× throughput · consistent patterns · automated verification with competing incentives.",
      stack: ["Claude Code", "MCP", "CUE", "Python", "Terraform"],
    },
    {
      id: "landing-zone",
      roleId: "fcb",
      owner: "org",
      title: "100-Account AWS Landing Zone",
      kind: "pro",
      org: "First Citizens Bank",
      year: "2021 – 2025",
      tags: ["aws", "landing-zone", "ffiec", "pci-dss", "soc2"],
      summary: "Multi-account AWS architecture with Transit Gateway, centralized logging, and policy-as-code compliance gates. 30+ dev teams onboard in an afternoon.",
      problem: "Banking workloads required continuous FFIEC / PCI-DSS / SOC 2 compliance across 100+ AWS accounts with no dedicated account-per-team bottleneck.",
      impact: "100+ accounts · 30% YoY spend cut · audit trails zero-cost.",
      stack: ["AWS Organizations", "Transit Gateway", "Terraform", "OPA", "Sentinel"],
    },
    {
      id: "commandcenter-tools",
      roleId: "paypal",
      owner: "org",
      title: "PayPal Command Center Agentic Tooling",
      kind: "closed",
      org: "PayPal",
      year: "2025 – present",
      tags: ["sre", "agentic", "incident-management"],
      summary: "Agentic review gates, risk inventory, readiness drills, and scheduling for the PayPal SRE Command Center.",
      problem: "Command Center reliability readiness was manually audited; incident post-mortems produced reports but weak pattern libraries.",
      impact: "Real-time P0/P1 incident mitigation · artifact-driven PIR/RCA · agentically-scored GameDay readiness.",
      stack: ["Python", "Claude Code", "PagerDuty", "AWS"],
    },
    {
      id: "eks-blueprint",
      roleId: "fcb",
      owner: "org",
      title: "Bank-Hardened EKS Blueprint",
      kind: "pro",
      org: "First Citizens Bank",
      year: "2022 – 2025",
      tags: ["eks", "kubernetes", "cis", "gitops"],
      summary: "Multi-AZ, CIS-benchmark hardened EKS with OPA/Gatekeeper, Karpenter, and automated zero-day node patching.",
      problem: "Regulated workloads on Kubernetes with no tolerance for drift or zero-day exposure.",
      impact: "Zero-day patched within hours · <1% node cost overhead · mandatory-gate compliance.",
      stack: ["EKS", "Karpenter", "Argo CD", "OPA / Gatekeeper", "Kyverno"],
    },
    {
      id: "endpoint-hub",
      roleId: "fcb",
      owner: "org",
      title: "VPC Interface-Endpoint Hub",
      kind: "pro",
      org: "First Citizens Bank",
      year: "2023",
      tags: ["aws", "networking", "finops"],
      summary: "Replaced thousands of duplicate VPC interface endpoints with one multi-AZ endpoint hub via Route 53 resolver rules.",
      problem: "VPC endpoint costs were a top-3 AWS line item despite low utilization per endpoint.",
      impact: "Top-3 line item → negligible · hundreds of thousands saved annually.",
      stack: ["Transit Gateway", "Route 53 Resolver", "Terraform"],
    },
    {
      id: "agentic-kit",
      owner: "mine",
      title: "agentic-kit",
      kind: "closed",
      org: "Personal · in active development",
      year: "2026",
      tags: ["agentic", "go", "cuelang", "mcp", "governance"],
      summary: "A governed agentic platform in Go and CUE: a real Anthropic LLM client with a conformance suite, a governed agent loop (model turn → tool dispatch → governance screens), an MCP server kit, a fail-closed endpoint-guard (circuit breaker, strike ledger, proof-of-work, budget caps), and a hash-chained evidence/provenance store.",
      problem: "Raw LLM calls aren't a platform. Putting agents near production in a regulated enterprise needs budgets, injection defense, determinism, and provenance — by construction, not by hope.",
      impact: "Governed agent loop · record/replay determinism · cost-bounded endpoint guard · CUE-as-contract across the module.",
      stack: ["Go", "CUE", "Anthropic API", "MCP", "wazero"],
    },
    {
      id: "sextant",
      owner: "mine",
      title: "sextant",
      kind: "closed",
      org: "Personal · in active development",
      year: "2026",
      tags: ["code-intelligence", "go", "mcp", "developer-tools"],
      summary: "A multi-repo code-intelligence engine that extracts symbols and call edges into evidence records and answers concern-scoped queries — blast radius, callers/callees, cross-repo symbol search, staleness. Ships as a Go library, a CLI, and an MCP server that editors and AI agents query for code facts.",
      problem: "Coding agents waste tokens and make mistakes when they can't see how a large codebase actually fits together. They need fast, evidence-tiered answers, not a blind grep.",
      impact: "Multi-tool MCP surface · hash-gated incremental ingestion · native Go AST + tree-sitter via WASM · auto-refresh on HEAD drift.",
      stack: ["Go", "DuckDB", "tree-sitter (WASM)", "MCP", "CUE"],
    },
    {
      id: "app-kit",
      owner: "mine",
      title: "app-kit",
      kind: "closed",
      org: "Personal · early, active development",
      year: "2026",
      tags: ["platform", "go", "cuelang", "templ", "no-node"],
      summary: "A personal product platform that underpins my apps, with no Node in the build chain: a CUE-driven design-token pipeline (emits @theme CSS, DTCG JSON, and Go constants), a library of pure-Go SVG visualization components, and an MCP server that makes a licensed component library queryable by coding agents.",
      problem: "When agents generate most of the UI, consistency is the scarce resource. Humans and agents both need one set of paved roads — tokens, components, an app contract — or every screen drifts.",
      impact: "CUE → CSS/Go token pipeline · golden-tested SVG components · Tailwind v4 with no Node · MCP component catalog.",
      stack: ["Go", "CUE", "templ", "Tailwind v4", "SQLite", "MCP"],
    },
    {
      id: "cue-wasm",
      owner: "mine",
      title: "cue-wasm",
      kind: "oss",
      org: "Open Source · published to npm",
      year: "2026",
      tags: ["cuelang", "webassembly", "typescript", "react"],
      summary: "A WebAssembly wrapper around the official CUE Go API that brings CUE unification, validation, and export to the browser and Node. Uses phased loading — a lightweight reader WASM for instant interactivity, then warms the full evaluator in the background — and ships React hooks with Web Worker + IndexedDB support.",
      problem: "CUE has minimal first-party browser support, so building interactive CUE tooling on the web usually means a server round-trip.",
      impact: "Published npm package · phased reader/engine loading · React hooks · dockerized playground.",
      stack: ["Go (WASM)", "TypeScript", "React", "Web Workers"],
      github: "github.com/GeoffMillerAZ/cue-wasm",
    },
    {
      id: "pulumi-stateful-string",
      owner: "mine",
      title: "Pulumi Provider: Stateful String",
      kind: "oss",
      org: "Open Source",
      year: "2024",
      tags: ["pulumi", "go", "iac"],
      summary: "A Pulumi native provider for a string resource that stays stable across plan/apply and only changes when explicit trigger keys change — solving the 'stable-until-triggered' IaC problem that Pulumi's built-in Random resource doesn't, without forcing replacement of dependent resources.",
      problem: "Some configuration values (generated secrets, UUIDs) must stay constant until a specific rotation trigger changes — but standard resources replace on any config change.",
      impact: "Native provider with diff logic · multi-language SDKs (Go / TS / Python / C#) · reproducible devbox build.",
      stack: ["Go", "Pulumi Go Provider SDK", "devbox"],
      github: "github.com/GeoffMillerAZ/pulumi-provider-stateful-string",
    },
    {
      id: "geoffmiller-cloud",
      owner: "mine",
      title: "geoffmiller.cloud",
      kind: "closed",
      org: "Personal · in active development",
      year: "2026",
      tags: ["cuelang", "go", "agentic", "resume-as-data"],
      summary: "This system. A CUE-typed 'super résumé' that compiles into a public persona-lensed résumé site plus a private studio for honest, evidence-backed job-search tooling — built on my own Go/CUE/agentic platform, with a governed chat that answers only from the fact base.",
      problem: "Recruiters want one answer: does this candidate fit this JD? Make that trivial — and prove the agentic engineering by handing them a governed agent instead of claiming it.",
      impact: "Persona-lensed interactive résumé · CUE single source of truth · governed JD-chat (in progress) · public/private fact-base wall.",
      stack: ["Go", "CUE", "templ", "Datastar", "Anthropic", "AWS Lambda"],
    },
  ],

  /* ---------- Achievements ---------- */
  achievements: [
    {
      id: "agentic-incident-pipeline",
      projectId: "commandcenter-tools",
      title: "Artifact-driven incident & GameDay pipeline for the PayPal Command Center",
      metric: "P0/P1", metricUnit: "incident ops", year: "2025 – present",
      org: "PayPal", roleId: "paypal",
      tags: ["agentic", "sre", "incident-management"],
      summary: "Built a real-time P0/P1 incident-mitigation application and an agentic pipeline that models live incidents as structured data artifacts flowing through triage, mitigation, and PIR/RCA.",
      challenge: "Incident reviews produced one-shot documents; patterns repeated, lessons evaporated, and models re-solved the same problems each time.",
      approach: "Model incidents as structured artifacts moving deterministically through autonomous workflows; orchestrate investigation tracks, visualize timelines, and aggregate evidence in a Command Center app. GameDay tooling ingests incident logs and chat transcripts to generate agentically-scored readiness feedback.",
      outcome: "Faster live incident recovery, reusable mitigation patterns instead of throwaway reports, and individualized GameDay readiness scoring across business units.",
      whyItMatters: "Turns operational pain into compounding institutional knowledge — the team gets faster after every outage instead of slower.",
      stack: ["Claude Code", "Go", "CUE", "PagerDuty", "AWS"],
    },
    {
      id: "landing-zone-100",
      projectId: "landing-zone",
      title: "AWS landing zone for 100+ regulated accounts",
      metric: "100+", metricUnit: "accounts", year: "2021 – 2025",
      org: "First Citizens Bank", roleId: "fcb",
      tags: ["aws", "landing-zone", "ffiec", "pci-dss", "soc2"],
      summary: "Multi-account architecture with Transit Gateway, centralized logging, and policy-as-code compliance gates — onboarding 30+ teams in an afternoon.",
      challenge: "Banking workloads required continuous FFIEC / PCI-DSS / SOC 2 compliance with no per-team Ops bottleneck. Account sprawl was already a budget threat.",
      approach: "AWS Organizations + Control Tower with Terraform-driven account vending, OPA/Sentinel guardrails as merge-gate, hub-and-spoke Transit Gateway, and centralized log aggregation. Compliance isn't a phase — it's the default branch.",
      outcome: "100+ accounts governed. New teams onboard in an afternoon. Audit trails generated for free as a byproduct of the platform.",
      whyItMatters: "Made compliance the cheap path. The number that scales linearly with team count is a Terraform PR, not a Ticket-of-Doom.",
      stack: ["AWS Organizations", "Control Tower", "Transit Gateway", "Terraform", "OPA", "Sentinel"],
    },
    {
      id: "finops-30",
      projectId: "endpoint-hub",
      title: "30% YoY AWS spend reduction at a regulated bank",
      metric: "30%", metricUnit: "YoY cut", year: "2022 – 2024",
      org: "First Citizens Bank", roleId: "fcb",
      tags: ["finops", "aws", "platform"],
      summary: "Event-driven FinOps automation that trims waste continuously without touching reliability — including the VPC endpoint hub that killed a top-3 line item.",
      challenge: "AWS spend was growing faster than the workload. Reservation coverage drifted. VPC interface endpoints duplicated thousands of times. No single owner.",
      approach: "Continuous savings-plan optimizer, idle-resource janitor, anomaly alerts wired into Slack, and a Route 53 resolver-based shared endpoint hub that collapsed redundancy. All in IaC, all gated by policy.",
      outcome: "30% YoY reduction. Endpoint hub alone deleted hundreds of thousands of dollars from the bill. Reliability metrics unchanged.",
      whyItMatters: "Proves regulated FinTech can be both compliant and cost-disciplined — the two are usually framed as a tradeoff.",
      stack: ["AWS", "Terraform", "Lambda", "Athena", "Slack"],
    },
    {
      id: "team-1-to-18",
      title: "Built infra org from 1 to 18 — and a 12-person platform team",
      metric: "1 → 18", metricUnit: "engineers", year: "2018 – 2025",
      org: "REPAY · First Citizens Bank", roleId: "repay",
      tags: ["leadership", "platform", "team-building"],
      summary: "Two team-building cycles back-to-back: REPAY infra 1→18, then a 12-person platform team at FCB built from scratch.",
      challenge: "Both orgs needed to scale infra and platform engineering without it becoming an Ops bottleneck — or a hiring bonfire.",
      approach: "Hire for systems-thinking and writing ability, not tool-of-the-week. Run a Community-of-Practice model so platform consumers self-serve. Document patterns until the team is no longer the bottleneck.",
      outcome: "REPAY: 1 → 18 across infra and SRE. FCB: 12-person platform team supporting 30+ product teams across 100+ accounts. Both orgs running on patterns, not heroics.",
      whyItMatters: "The hardest part of platform engineering isn't the platform — it's the org around it. Got to run that play twice.",
      stack: ["Hiring", "CoP model", "Mentorship", "Docs-as-code"],
    },
    {
      id: "pci-greenfield",
      title: "PCI-DSS first-pass green on a green-field stack",
      metric: "0", metricUnit: "criticals", year: "2019",
      org: "REPAY", roleId: "repay",
      tags: ["pci-dss", "security", "platform"],
      summary: "Designed a payments-processing AWS architecture that passed its first PCI-DSS audit with zero criticals.",
      challenge: "Build a regulated payments platform that auditors couldn't poke holes in, on a deadline, with a small team.",
      approach: "Network segmentation by control scope, KMS-everywhere, minimal-IAM with break-glass auditing, and IaC that made every control reviewable as a PR diff. Audit prep was exporting the repo.",
      outcome: "First-pass PCI-DSS audit closed with zero criticals. Subsequent audits ran in days, not months.",
      whyItMatters: "Demonstrates the discipline behind 'compliance as code' — when the audit is the side effect of how you build, it stops being a project.",
      stack: ["AWS", "Terraform", "KMS", "VPC", "Cloudtrail"],
    },
    {
      id: "eks-zeroday",
      projectId: "eks-blueprint",
      title: "Bank-hardened EKS — zero-days patched in hours",
      metric: "<4h", metricUnit: "to patch", year: "2022 – 2025",
      org: "First Citizens Bank", roleId: "fcb",
      tags: ["kubernetes", "eks", "security", "cis"],
      summary: "EKS blueprint with CIS-benchmark hardening, OPA/Gatekeeper, Karpenter, and automated zero-day node patching that runs in hours.",
      challenge: "Regulated workloads on Kubernetes, with zero tolerance for drift, vulnerable nodes, or weekend-long patching windows.",
      approach: "Karpenter-driven node lifecycle so patching = re-provisioning, OPA/Gatekeeper + Kyverno as merge-gate, Argo CD for declarative app delivery, immutable AMIs published continuously.",
      outcome: "Zero-days patched in under 4 hours from CVE publication, fleet-wide. Less than 1% node-cost overhead from the safety machinery.",
      whyItMatters: "Lets a bank run modern Kubernetes without trading reliability for speed — the patch story alone makes the platform defensible to security review.",
      stack: ["EKS", "Karpenter", "Argo CD", "OPA / Gatekeeper", "Kyverno"],
    },
    {
      id: "onboarding-months-to-day",
      title: "Cloud onboarding: months → a single day",
      metric: "months → 1d", metricUnit: "lead time", year: "2017 – 2021",
      org: "REPAY", roleId: "repay",
      tags: ["aws", "iac", "platform"],
      summary: "Built reusable landing-zone and platform patterns so teams could onboard new applications, consume shared services, and integrate secure networking in a day instead of months.",
      challenge: "Every new application onboarding was hand-rolled. Teams couldn't afford a multi-month setup per workload while still meeting PCI and security requirements.",
      approach: "Reusable Terraform patterns for account vending, shared services, edge networking, and security baselines — every new onboarding started from the previous one, never from scratch, with guardrails enforced as policy.",
      outcome: "Application onboarding lead time collapsed from months to a single day for pattern-fitting workloads, while staying inside the secure landing zone.",
      whyItMatters: "Infrastructure is a compounding asset — every onboarding should make the next one cheaper, not just done.",
      stack: ["AWS", "Terraform", "Kubernetes", "Backstage"],
    },
  ],

  /* ---------- Resources ---------- */
  resources: [
    // YouTube
    { kind: "youtube",  title: "Fireship",                 by: "Jeff Delaney",      note: "100-second explainers that get technical quickly." },
    { kind: "youtube",  title: "ThePrimeagen",             by: "Michael Paulson",   note: "Fast code, strong opinions, terminal-first workflows." },
    { kind: "youtube",  title: "Jim Kwik",                 by: "Jim Kwik",          note: "Learning how to learn — foundational for picking up new stacks fast." },
    { kind: "youtube",  title: "HashiCorp",                by: "HashiCorp",         note: "Deep dives on Terraform, Vault, and Consul." },
    // Podcasts
    { kind: "podcast",  title: "Kubernetes Podcast",       by: "Google",            note: "Release breakdowns and community interviews." },
    { kind: "podcast",  title: "Software Engineering Daily", by: "SED",             note: "Long-form engineering conversations — breadth across the field." },
    { kind: "podcast",  title: "Latent Space",             by: "swyx & Alessio",    note: "Applied AI engineering, agentic patterns, and MCP deep-dives." },
    { kind: "podcast",  title: "The Changelog",            by: "Jerod & Adam",      note: "Open source under the hood." },
    // Books
    { kind: "book",     title: "Accelerate",               by: "Forsgren, Humble, Kim", note: "The DORA metrics bible — what actually predicts software delivery performance." },
    { kind: "book",     title: "Team Topologies",          by: "Skelton & Pais",    note: "Conway's Law turned into a team-design playbook." },
    { kind: "book",     title: "Staff Engineer",           by: "Will Larson",       note: "What the IC track looks like above senior." },
    { kind: "book",     title: "The Phoenix Project",      by: "Gene Kim et al.",   note: "DevOps origin story, still the clearest intro." },
    { kind: "book",     title: "An Elegant Puzzle",        by: "Will Larson",       note: "Engineering management as systems design." },
    // Blogs
    { kind: "blog",     title: "lethain.com",              by: "Will Larson",       note: "Weekly essays on engineering leadership." },
    { kind: "blog",     title: "Simon Willison",           by: "simonwillison.net", note: "Daily LLM experimentation — practical, cited, reproducible." },
    { kind: "blog",     title: "Charity Majors",           by: "charity.wtf",       note: "Observability philosophy, hiring, and SRE culture." },
    { kind: "blog",     title: "Last Week in AWS",         by: "Corey Quinn",       note: "FinOps-adjacent AWS news with bite." },
    { kind: "blog",     title: "Anthropic Engineering",    by: "Anthropic",         note: "Applied agent and MCP engineering writeups." },
  ],

  /* ---------- About Me ---------- */
  about: [
    { id: "family",    title: "Dad mode",         body: "Two kids. Most of my weekend build-time is a kid on one knee pointing at which wire goes where.", icon: "users" },
    { id: "bjj",       title: "Brazilian Jiu-Jitsu", body: "White belt energy, permanent. BJJ is the best debugging practice I know — you think your position is great until someone shows you why it isn't.", icon: "shield" },
    { id: "latin",     title: "Latin dancing",    body: "Salsa, Bachata, Merengue, Cha-Cha. It keeps me fluent in a thing that's not keyboard-shaped.", icon: "music" },
    { id: "rc",        title: "RC drones + monster trucks", body: "Anything with a brushless motor and a receiver. I like the tuning loop — telemetry, tweak, fly again. Same loop, smaller stakes.", icon: "drone" },
    { id: "ai",        title: "Tinkering with AI", body: "Nights and weekends: building agentic harnesses, poking MCP servers, wiring small models into weirder workflows. This site is part of that.", icon: "sparkles" },
    { id: "build",     title: "Workshop",         body: "I build and fix things with the kids. No great woodworker, but a lot of time on 'why did that break' conversations — which is most of engineering.", icon: "tool" },
  ],
};
