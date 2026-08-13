/* Resume + site data. Single source of truth. */

/* Feature flags. Flip a value here and the page, its route, its keyboard
   shortcut and its command-palette entry all follow — there is no second list
   to remember. Everything stays in the codebase; nothing is deleted.

   Set false on 2026-07-31 at Geoff's request:
     contactForm     — the form posts nowhere, so it silently drops messages.
                       Until it has a backend, Contact points at LinkedIn.
     contactDetails  — email and phone are hidden until he is comfortable
                       publishing them. GitHub and LinkedIn stay. NOTE: this
                       also removes them from the downloadable résumés, which
                       is deliberate; the website, LinkedIn and GitHub links
                       remain so an ATS-parsed record still has a reply path.
     achievements    — hidden for now.
     resources       — hidden for now.

   Set false on 2026-08-07:
     specializations — the FinOps / DevX / Agentic capability pages. Every
                       number on them is invented placeholder content pending
                       Geoff's review, so the section must not be reachable in
                       production until he has replaced them. See the override
                       shim at the bottom of this file for how to preview it
                       locally or by URL without editing this value.
     radar           — the tech radar. Same treatment and the same reason: the
                       twelve published blips are lifted from Geoff's own dated
                       decision documents, but he has not personally read the
                       page yet, and a page whose entire argument is "every
                       claim here is checked" must not go live before its author
                       has checked it. Twelve MORE blips are held inside the
                       build and never reach spa/radar.js at all (see
                       docs/radar-review.md); this flag is about the twelve that
                       do. Preview at ?ff=radar, on localhost, or on dev.       */
window.SITE_FEATURES = {
  contactForm:     false,
  contactDetails:  false,
  achievements:    false,
  resources:       false,
  specializations: false,
  radar:           false,
};

/* Tag facets — the top level of the two-level filter.
   The flat tag cloud listed 29 tags across 11 projects, 23 of them appearing
   exactly once: four fifths of the controls could not narrow anything, and the
   useful ones were buried among them. Facets group tags into the questions a
   hiring manager actually asks ("has he done compliance work?") and keep the
   specific tags one level down.

   A tag missing from every facet would disappear from the UI, so a startup
   check in Catalogs.jsx reports orphans rather than silently dropping them.
   Verified at authoring time: all 38 tags across projects and articles are
   covered. */
window.SITE_TAG_FACETS = [
  { id: "compliance", title: "Compliance & security",
    tags: ["ffiec", "pci-dss", "soc2", "cis", "governance", "security"] },
  { id: "cloud", title: "Cloud & platform",
    tags: ["aws", "eks", "kubernetes", "gitops", "networking", "landing-zone", "platform", "iac"] },
  { id: "agentic", title: "Agentic & AI",
    tags: ["agentic", "mcp", "code-intelligence", "app-kit"] },
  { id: "lang", title: "Languages & tooling",
    tags: ["go", "cuelang", "cue", "typescript", "react", "templ", "webassembly", "pulumi",
           "no-node", "developer-tools", "configuration", "hexagonal"] },
  { id: "practice", title: "Practice & outcomes",
    tags: ["finops", "sre", "incident-management", "resume-as-data", "engineering-culture",
           "devsecops", "architecture", "verification", "team-building", "leadership",
           "developer-experience"] },

  /* Radar facets. These are SYNTHETIC tags — the radar feeds
     useSearchAndTags a computed list per blip (`ring:adopt`, `basis:built`,
     `ctx:regulated-airgap`, …) exactly as ProjectsPage already feeds it
     `[p.kind, ...p.tags]`. They are enumerated here rather than derived because
     every one of them is a closed enum in resume-core/radar/schema.cue, and
     because facetOfTag needs a declared home for a tag or it falls into "More".

     Declaring them costs the other collections nothing: useSearchAndTags drops
     any facet group whose tags appear in no item of the collection being
     filtered, so the Projects and Articles filter bars are unchanged. */
  { id: "radar-ring", title: "Ring",
    tags: ["ring:adopt", "ring:trial", "ring:hold", "ring:avoid"] },
  { id: "radar-basis", title: "Basis",
    tags: ["basis:operated", "basis:built", "basis:evaluated", "basis:researched", "basis:inherited"] },
  { id: "radar-cat", title: "Radar category",
    tags: ["cat:aws", "cat:runtime", "cat:config", "cat:k8s", "cat:ci", "cat:practice"] },
  { id: "radar-ctx", title: "Context",
    tags: ["ctx:commercial-aws", "ctx:regulated-airgap", "ctx:personal-oss", "ctx:universal"] },
  { id: "radar-blast", title: "Blast radius",
    tags: ["blast:low", "blast:medium", "blast:high"] },

  /* Resources facets. Synthetic in the same way and for the same reason: the
     resources page feeds useSearchAndTags `["shelf:" + r.cat, ...tags.map(t =>
     "topic:" + t)]` rather than storing the prefixes in data.js. The prefix is
     load-bearing, not decoration — a resource tagged bare `kubernetes` would
     land in the "Cloud & platform" group above and put a YouTube channel in the
     middle of the project taxonomy.

     The two axes deliberately do NOT line up: topic:ai-agents spans three
     shelves, topic:cloud-delivery spans four, topic:science bridges "Keeping
     up" and "Shows their work". That is the whole justification for a second
     level — "AI, but not from a vendor" and "science, the non-work ones" are
     queries a person would actually run, and the second click has to move the
     number. Format and cadence were both considered and both rejected: format
     is nearly collinear with the shelf, and cadence was only recorded for four
     of the eighteen channels, so populating the rest would be invention.

     Same drop rule as the radar groups: neither appears on the Projects,
     Articles or Radar filter bars, because useSearchAndTags discards any facet
     group whose tags appear in no item of the collection being filtered. */
  { id: "res-shelf", title: "Kind of channel",
    tags: ["shelf:hands-on", "shelf:keeping-up", "shelf:maintainers", "shelf:vendor", "shelf:shows-work"] },
  { id: "res-topic", title: "Subject",
    tags: ["topic:ai-agents", "topic:cloud-delivery", "topic:science", "topic:hardware",
           "topic:consumer", "topic:medicine", "topic:vfx"] },
];

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
      cloud: "Principal Cloud Architect specializing in AWS, Kubernetes, and the CNCF ecosystem. Known for unified platform services, policy-as-code, and FinOps automation — real-time, event-driven right-sizing that cuts cloud bills without touching reliability.",
      ai: "Level 4/5 Agentic Software Engineering leader. Ships controlled agentic layers — MCP servers, patterned agents, automated verification with competing incentives — that triple engineering throughput with a smaller team, while keeping security, compliance, and consistency airtight. Also: a Director and Principal Cloud Architect with 12 years of infrastructure depth to ground the AI in reality.",
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
      title: "Sr. Engineering Manager, SRE (AI Platform Architecture & Agentic Orchestration)",
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
        { tag: "ai",        text: "Lead and specialize in agentic software engineering: full spec-driven development with AI-augmented and automated code, quality and intent reviews behind controlled approval gates." },
        { tag: "ai",        text: "Built the expert systems Command Center duty officers query during live incidents — grounded in service code, infrastructure- and config-as-code, telemetry, docs and playbooks — for investigation and mitigation recommendations." },
        { tag: "sre",       text: "Built real-time incident management and collaboration tooling that speeds up live incident recovery." },
        { tag: "sre",       text: "Built a risk inventory system mapping mitigation capabilities and auditing reliability readiness across all PayPal brands and workloads." },
        { tag: "sre",       depth: "page", text: "Command Center scheduling + live staffing with low-coverage alarms and daily shift-handoff summarization." },
        { tag: "sre",       depth: "page", text: "Readiness scenario simulations — live P1 drills and paging readiness drills." },
        { tag: "lead",      text: "Member of PayPal's AI Super Users group: sets policy and direction for enterprise AI use and previews new tools and models ahead of rollout." },
        { tag: "lead",      text: "Authored GameDay tooling that ingests incident logs and chat transcripts to generate agentically-scored participant feedback reports." },
        { tag: "lead",      text: "Consult across all PayPal brands on cloud architecture, DevOps, and reliability engineering." },
      ],
      impact: {
        type: "dashboard",
        stats: [
          { label: "Enterprise AI policy", value: "Policy", unit: "", sub: "PayPal AI Super Users — sets direction for enterprise AI use, previews new tools and models" },
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
        { tag: "finops", text: "Put non-production environments on claim-based lifecycle control — teams claimed an environment for a bounded window and the platform took it back automatically, instead of fixed schedules that a global team and a shifting sprint both defeat. Generalized afterwards into the f1n control plane." },
        { tag: "sec",    text: "Enforced policy-as-code gates for continuous FFIEC / PCI-DSS / SOC 2 compliance." },
        { tag: "cloud",  text: "Designed sub-5 ms hybrid connectivity (Direct Connect, ExpressRoute, Megaport)." },
        { tag: "lead",   text: "Led and mentored a 12-member platform team; founded the Cloud Community of Practice." },
        { tag: "sec",    text: "Integrated DevSecOps toolchain (Sentinel, Snyk, SAST / SCA) into CI/CD." },
        { tag: "sec",    text: "Introduced 'override-as-code' workflow — risk acceptance and governance logic in Git, every exception peer-reviewed." },
        { tag: "platform", text: "Decomposed a monolithic repo into team-owned repos with CODEOWNERS, mandatory gates, and policy-as-code checks. Lead time: 6–12 weeks → days." },
        { tag: "cloud",  text: "Consolidated 'VPC-per-service' sprawl into a shared-services hub (Transit Gateway, Route 53 resolver rules, central interface endpoints) — hundreds of VPCs → a few network segments." },
        { tag: "finops", text: "Replaced thousands of duplicate interface endpoints with a single multi-AZ endpoint hub — VPC-endpoint costs went from top-3 line item to negligible. Saved hundreds of thousands annually." },
        { tag: "platform", text: "Engineered a bank-hardened EKS platform — multi-AZ, CIS-benchmark hardened, OPA/Gatekeeper, automated zero-day node patching." },
        { tag: "lead",   depth: "more", text: "Inherited a platform org mid-integration: two banks, two clouds' worth of habits, and a merger timeline that did not move. The sequencing that worked was landing zone first, then guardrails, then migration — because a migration onto an ungoverned target just relocates the problem." },
        { tag: "sec",    depth: "more", text: "The override-as-code workflow started as a compromise with a security team that wanted a hard no on every exception. Putting risk acceptance in Git turned an argument into a reviewable artifact — the exception still happens, but it has an owner, an expiry and a diff." },
        { tag: "finops", depth: "more", text: "The endpoint hub was found by reading the bill rather than the architecture. Nothing about the design looked wrong; the line item did. Most large FinOps wins I have had came from that direction — the invoice is the only document that never flatters the design." },
        { tag: "platform", depth: "more", text: "Decomposing the monolith was less a technical exercise than an ownership one. CODEOWNERS is a social contract with a syntax; the gates only stuck because each team could see the checks were the same for everyone, including the platform team." },
        { tag: "ai",     text: "Sat on the bank's AI governance board — crafted secure onboarding patterns for GenAI/ML tools, defined data-access guardrails." },
      ],
      deepSections: [
        {
          id: "svb",
          title: "The SVB integration, and what it cost to do it properly",
          body: `Silicon Valley Bank's failure made the platform migration a compressed,
externally-scheduled problem rather than a roadmap item. Two estates, two sets
of conventions, one deadline nobody controlled.

The decision I would defend hardest is refusing to migrate onto the existing
account structure. Speeding up by landing workloads in an ungoverned target
would have converted a one-time migration into a permanent compliance debt, in
a bank, during the period regulators were paying the most attention. Landing
zone first cost weeks and bought a target where every subsequent workload
arrived already governed.

The second decision was to keep the platform team out of the critical path.
Thirty product teams migrating through a twelve-person team is a queue; thirty
teams migrating through a paved road with policy gates is throughput. That is
the same instinct behind everything else on this page.`,
        },
        {
          id: "cop",
          title: "Why the Community of Practice mattered more than the tooling",
          body: `Founding the Cloud Community of Practice was the highest-leverage thing I did
at First Citizens, and it does not appear on a résumé as a number.

A platform team can build paved roads and still be the bottleneck, because the
knowledge of when to use which road stays inside the platform team. The CoP
moved that knowledge outward — practitioners from product teams answering each
other, with the platform team present rather than presiding.

The measurable effect showed up somewhere else: onboarding time. Teams stopped
opening tickets to ask which pattern applied, because somebody on their own
floor already knew.`,
        },
      ],
      impact: {
        type: "dashboard",
        stats: [
          { label: "AWS spend reduction", value: "30", unit: "%", sub: "year over year" },
          { label: "AWS accounts governed", value: "100+", unit: "", sub: "multi-account landing zone" },
          { label: "Feature lead time", value: "6–12 wk", unit: "→ days", sub: "after monorepo decomposition" },
          { label: "Platform team size", value: "12", unit: "", sub: "direct reports" },
        ],
        // diagram: "landingzone" — pulled 2026-08-04. The Architecture section
        // renders only when this key is present, so removing it takes the whole
        // section with it and leaves LandingZoneDiagram intact in Charts.jsx.
        // Put it back by restoring this one line, once the diagram is worth the
        // space it takes on a role page — the bar is the PayPal Command Center
        // one, which shows the real system and can be clicked into.
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
        { tag: "sre",      depth: "page", text: "24/7 on-call with PagerDuty; managed enterprise vendor support contracts." },
        { tag: "sre",      text: "Engineered Prometheus / Loki / Grafana observability." },
        { tag: "finops",   text: "Established FinOps automation that cut AWS spend 30% year-over-year across the multi-account Landing Zone." },
        { tag: "finops",   text: "Built the first version of environment claims here — non-prod stacks defaulted off and came up against a bounded, self-expiring claim, so idle environments stopped being a discipline problem. Rebuilt the pattern at First Citizens Bank and generalized it into f1n." },
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
        // diagram: "idp" — pulled 2026-08-04, same reason as the First Citizens
        // one above. IDPDiagram stays in Charts.jsx.
      },
    },
    {
      id: "ews",
      company: "Early Warning Services",
      title: "DevOps Engineer (Contract)",
      location: "Scottsdale, AZ · Hybrid",
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
      company: "ThinkVine",
      title: "Principal Cloud Architect",
      location: "Remote · Greater Phoenix Area",
      start: "Jul 2016", end: "Jan 2017",
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

  /* Earlier career — company, title and years only.
     These carry the "20 years in IT" claim. Without them the earliest dated
     role on this site starts in 2015, so anyone doing the arithmetic — a
     recruiter, or an ATS computing tenure from date ranges — arrives at about
     eleven and the claim reads as unbacked.
     Deliberately not full role entries: a 2006 help desk does not need a
     detail page, and giving it one would dilute the roles that do.
     Years only, because that is the precision Geoff's own CV states. */
  earlierRoles: [
    { title: "Undergraduate and Graduate Teaching Assistant", company: "Northern Illinois University", location: "DeKalb, IL", years: "2012 – 2015" },
    { title: "Mainframe Technical Analyst Intern", company: "Bank of America", location: "Multiple locations", years: "2013 – 2014" },
    { title: "Help Desk Manager", company: "Universal Technical Institute", location: "Phoenix, AZ", years: "2010" },
    { title: "Help Desk Manager", company: "J-Curve Technologies", location: "Phoenix, AZ", years: "2009 – 2010" },
    { title: "Systems Support Analyst", company: "Bank of America", location: "Phoenix, AZ", years: "2006 – 2009" },
    { title: "Desktop Repair", company: "Geek Squad", location: "Multiple locations", years: "2001 – 2006" },
  ],

  /* Recommendations — other people's words, kept as evidence rather than as
     decoration. `text` is verbatim from LinkedIn and nothing may edit it;
     `pullQuotes` are spans selected FROM that text and are asserted to be
     exact substrings at build time, because the chat renders them and an
     agent must never paraphrase a named third party.
     `claimIds` is the interesting part: which résumé claim each one
     independently corroborates. Two people, years apart, at different levels,
     both naming the environment-claim work without being prompted is a
     different kind of evidence from a wall of testimonials. */
  recommendations: [
    {
      "id": "peter-chi",
      "author": {
        "name": "Peter Chi",
        "headline": "Engineering Manager | Distributed Systems & Cloud Infrastructure | Reduced Downtime to 0.1% | AWS | DevOps | Scaling 300+ Workloads",
        "linkedin": "https://www.linkedin.com/in/peterchi2/",
        "avatar": "peter-chi.jpg"
      },
      "relationship": "same-team",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-07-23",
      "text": "I’ve had the pleasure of working with Geoff for almost 4 years during our cloud journey at SVB. His skills, willingness to help, and overall leadership are second to none. I have learned so much from him and consider myself lucky to have worked alongside him. Any organization would be lucky to benefit from having someone like Geoff",
      "themes": [
        "leadership",
        "collaboration"
      ],
      "pullQuotes": [
        {
          "text": "His skills, willingness to help, and overall leadership are second to none.",
          "themes": [
            "leadership"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.6
    },
    {
      "id": "stephen-butz",
      "author": {
        "name": "Stephen Butz",
        "headline": "Director Enterprise Identity and Access Managment",
        "linkedin": "https://www.linkedin.com/in/stephenbutz/",
        "avatar": "stephen-butz.jpg"
      },
      "relationship": "different-teams",
      "org": "SVB / First Citizens Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-06-18",
      "text": "I had the pleasure of working with Geoff during their time with SVB/FCB, and truly appreciated his collaborative approach and deep understanding of their domain. Geoff consistently brought new ideas and valuable insights to our projects. It was great working with Geoff, and look forward to our paths crossing again in the future.",
      "themes": [
        "stakeholder",
        "collaboration"
      ],
      "pullQuotes": [
        {
          "text": "truly appreciated his collaborative approach and deep understanding of their domain",
          "themes": [
            "stakeholder"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.5
    },
    {
      "id": "ryan-hairston",
      "author": {
        "name": "Ryan Hairston",
        "headline": "Software Engineer",
        "linkedin": "https://www.linkedin.com/in/rahairston2014/",
        "avatar": "ryan-hairston.jpg"
      },
      "relationship": "reported-to-geoff",
      "org": "SVB / First Citizens Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-06-18",
      "text": "Geoff is a fabulous manager who is willing to learn any and all upcoming technologies. The breadth and scope of his knowledge is highly technical while still being able to bring down the simplicity for explanation purposes. Beyond that he is very personable and can talk with you about just any topic",
      "themes": [
        "mentoring",
        "communication",
        "leadership"
      ],
      "pullQuotes": [
        {
          "text": "The breadth and scope of his knowledge is highly technical while still being able to bring down the simplicity for explanation purposes.",
          "themes": [
            "communication"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.7
    },
    {
      "id": "atif-siddiqui",
      "author": {
        "name": "Atif Siddiqui",
        "headline": "CISSP | PlatformCon 2023-2026 Speaker",
        "linkedin": "https://www.linkedin.com/in/atifksiddiqui/"
      },
      "relationship": "reported-to-geoff",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-06-16",
      "text": "I have worked with Geoff for over four years, and in that time, have consistently been impressed by his technical prowess in Platform Engineering. He is knowledgeable in multiple Clouds: Azure and, especially, AWS. He is proficient in various Cloud disciplines such as Architecture and Engineering. This also includes the IaC skill set with Terraform and Pulumi. Geoff's mastery with Kubernetes was instrumental in leading the design of Kubernetes in AWS as a hardened and compliant Platform. One of his other, standout achievements was conception through the implementation of Environment Claim Automation; a solution, that optimized resources' usage across non-production environments. He also exhibited his mentoring talent as he was able to guide Junior Engineers as part of the product deliverable. Beyond his technical skills, he excels in vendor engagement, fostering strong relationships that benefit long-term strategy and execution. His ability to navigate partnerships along with his technical acumen makes him a valuable asset.",
      "themes": [
        "platform",
        "cloud-architecture",
        "iac",
        "finops",
        "mentoring",
        "stakeholder"
      ],
      "pullQuotes": [
        {
          "text": "Geoff's mastery with Kubernetes was instrumental in leading the design of Kubernetes in AWS as a hardened and compliant Platform.",
          "themes": [
            "platform"
          ]
        },
        {
          "text": "One of his other, standout achievements was conception through the implementation of Environment Claim Automation; a solution, that optimized resources' usage across non-production environments.",
          "themes": [
            "finops"
          ]
        },
        {
          "text": "he excels in vendor engagement, fostering strong relationships that benefit long-term strategy and execution",
          "themes": [
            "stakeholder"
          ]
        }
      ],
      "claimIds": [
        "env-claims",
        "eks-hardened",
        "iac"
      ],
      "strength": 0.95
    },
    {
      "id": "praveen-sondur",
      "author": {
        "name": "Praveen Sondur",
        "headline": "Landing Zone | App Modernization | DevOps | 3x AWS certified | CKA | Certified Terraform Associate | Microservices | REST APIs | Agile",
        "linkedin": "https://www.linkedin.com/in/praveen-sondur/",
        "avatar": "praveen-sondur.jpg"
      },
      "relationship": "reported-to-geoff",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-06-14",
      "text": "I had the privilege of reporting directly to Geoff Miller, and I am pleased to recommend him without reservation for any future leadership role in technology and innovation. Geoff consistently demonstrated a deep enthusiasm for exploring and adopting emerging technologies. His forward-thinking mindset created a culture of continuous learning and experimentation, which was both motivating and inspiring for our entire team. Whether it was introducing new cloud-native tools or piloting DevOps best practices, his excitement for innovation was contagious. A strong advocate for automation, Geoff led several initiatives that significantly reduced manual overhead and improved operational efficiency. Beyond his technical strengths, he is a thoughtful leader who encourages collaboration, supports individual growth, and builds a strong sense of purpose within the team. I am confident that Geoff will bring the same level of energy, innovation, and leadership to any organization he joins.",
      "themes": [
        "leadership",
        "innovation",
        "mentoring",
        "delivery"
      ],
      "pullQuotes": [
        {
          "text": "A strong advocate for automation, Geoff led several initiatives that significantly reduced manual overhead and improved operational efficiency.",
          "themes": [
            "innovation",
            "delivery"
          ]
        },
        {
          "text": "His forward-thinking mindset created a culture of continuous learning and experimentation",
          "themes": [
            "leadership",
            "innovation"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.75
    },
    {
      "id": "kimly-ly",
      "author": {
        "name": "Kimly Ly",
        "headline": "Principal Cloud Engineer at SVB Financial Group",
        "linkedin": "https://www.linkedin.com/in/kimly-l-82124636/",
        "avatar": "kimly-ly.jpg"
      },
      "relationship": "geoff-senior",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2025-06-14",
      "text": "I had the opportunity to work closely with Geoff Miller, Director of Infrastructure with deep expertise in both AWS and Azure, and I can confidently say he is one of the most insightful and innovative leaders I’ve collaborated with. While I didn’t report directly to Geoff, his impact on our projects and team direction was significant. Geoff has a rare ability to bridge deep technical knowledge with visionary thinking. His strategic understanding of cloud infrastructure—particularly within AWS and Azure—is matched by a strong grasp of AI technologies, which he seamlessly integrates into practical solutions. Whether addressing complex architectural challenges or driving new initiatives, Geoff consistently brings clarity, creativity, and forward-thinking perspectives that elevate the entire team's performance. Beyond his technical capabilities, Geoff brings an energy that makes working with him both productive and inspiring. He asks the right questions, challenges assumptions thoughtfully, and always pushes for excellence. Any organization would be fortunate to have Geoff’s leadership and insight driving their infrastructure and innovation strategy.",
      "themes": [
        "cloud-architecture",
        "ai",
        "leadership",
        "innovation"
      ],
      "pullQuotes": [
        {
          "text": "His strategic understanding of cloud infrastructure—particularly within AWS and Azure—is matched by a strong grasp of AI technologies, which he seamlessly integrates into practical solutions.",
          "themes": [
            "ai",
            "cloud-architecture"
          ]
        },
        {
          "text": "he is one of the most insightful and innovative leaders I’ve collaborated with",
          "themes": [
            "leadership"
          ]
        }
      ],
      "claimIds": [
        "ai-pivot"
      ],
      "strength": 0.85
    },
    {
      "id": "mari-triphahn",
      "author": {
        "name": "Mari Triphahn",
        "headline": "Product Leader",
        "linkedin": "https://www.linkedin.com/in/mari-croghan/",
        "avatar": "mari-triphahn.jpg"
      },
      "relationship": "different-teams",
      "org": "REPAY",
      "roleIds": [
        "repay"
      ],
      "date": "2023-08-11",
      "text": "I had the opportunity to work with Geoff for a few years during a very high growth period at REPAY. Geoff always showed up to work with a great attitude and never shied away from a difficult problem or opportunity to make his team better. Geoff was known for being very knowledgeable and a great problem solver and his accomplishments during his tenure can be directly tied to those qualities. In addition to his technical skills, he was also a good team player and easy to collaborate with. I believe Geoff would bring the same tact and tenacity to any future role.",
      "themes": [
        "problem-solving",
        "leadership",
        "collaboration"
      ],
      "pullQuotes": [
        {
          "text": "Geoff was known for being very knowledgeable and a great problem solver and his accomplishments during his tenure can be directly tied to those qualities.",
          "themes": [
            "problem-solving"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.55
    },
    {
      "id": "zenul-pomal",
      "author": {
        "name": "Zenul Pomal",
        "headline": "Executive Director - Core Data Platform | Enterprise Architecture",
        "linkedin": "https://www.linkedin.com/in/zenulpomal/",
        "avatar": "zenul-pomal.jpg"
      },
      "relationship": "senior-to-geoff",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-07-18",
      "text": "I am delighted to provide a strong recommendation for Geoff Miller, with whom I had the pleasure of working closely during my time at SVB. Geoff's exceptional knowledge and expertise in the end-to-end AWS stack, coupled with his hands-on approach as a full-stack developer and manager, make him an invaluable asset to any organization. Geoff possesses a unique problem-solving ability, and I have witnessed firsthand his capability to tackle even the most complex challenges with ease. His involvement in solutioning and migrating several franchise critical applications to AWS was pivotal in ensuring their successful implementation. Geoff's in-depth knowledge of AWS facilitated seamless migrations, including internet-facing applications with intricate ingress/egress configurations and integrations with various financial institutions. Moreover, Geoff played a significant role in designing and implementing EKS capability in AWS, enabling a containerized and decoupled architecture. His contributions in this area were instrumental in driving efficiency and scalability within the organization. Geoff's expertise extends beyond technical solutions. He is also well-versed in cost optimization strategies, implementing various levers to optimize resource utilization. His initiatives included environment claim, leveraging cloud elasticity to scale down lower environments during off-hours, right-sizing resources, and optimizing VPC endpoints and firewalls. These efforts resulted in significant cost savings for the organization. As a leader, Geoff excelled in building and nurturing high-performing teams. His mentorship was instrumental in the growth and development of the cloud engineers under his guidance. Geoff's ability to foster strong partnerships with business and technology heads showcased his exceptional interpersonal and leadership skills. Furthermore, Geoff's contributions extended beyond his immediate team. He excelled in leading hackathons and played a vital role in driving organizational objectives and key results (OKRs). His commitment to innovation and driving impactful outcomes was truly commendable. In summary, Geoff Miller would be an exceptional fit for any cloud leadership role. His breadth of knowledge, problem-solving prowess, ability to build and lead teams, and his strategic mindset make him one of the best resources available. I wholeheartedly recommend Geoff and have no doubt that he will bring immense value to any organization he joins. Please feel free to reach out to me if you require any further information regarding Geoff's qualifications or contributions.",
      "themes": [
        "cloud-architecture",
        "platform",
        "finops",
        "leadership",
        "mentoring",
        "stakeholder",
        "delivery"
      ],
      "pullQuotes": [
        {
          "text": "His initiatives included environment claim, leveraging cloud elasticity to scale down lower environments during off-hours, right-sizing resources, and optimizing VPC endpoints and firewalls. These efforts resulted in significant cost savings for the organization.",
          "themes": [
            "finops"
          ]
        },
        {
          "text": "Geoff played a significant role in designing and implementing EKS capability in AWS, enabling a containerized and decoupled architecture.",
          "themes": [
            "platform"
          ]
        },
        {
          "text": "As a leader, Geoff excelled in building and nurturing high-performing teams. His mentorship was instrumental in the growth and development of the cloud engineers under his guidance.",
          "themes": [
            "leadership",
            "mentoring"
          ]
        }
      ],
      "claimIds": [
        "env-claims",
        "vpc-endpoints",
        "eks-hardened",
        "team-growth"
      ],
      "strength": 1.0
    },
    {
      "id": "dylan-intorf",
      "author": {
        "name": "Dylan Intorf",
        "headline": "Senior Software Engineer, Infrastructure @ TRM Labs",
        "linkedin": "https://www.linkedin.com/in/dintorf/",
        "avatar": "dylan-intorf.jpg"
      },
      "relationship": "geoff-senior",
      "org": "REPAY",
      "roleIds": [
        "repay"
      ],
      "date": "2023-07-13",
      "text": "I had the pleasure of working closely with Geoff Miller during our time at REPAY, where he served as the Director of Infrastructure and I worked as a Data Engineer. I wholeheartedly recommend Geoff for his exceptional qualities and expertise in the realm of software infrastructure. Geoff is an absolute delight to work with. He is not only highly intelligent but also possesses a remarkable work ethic that is truly inspiring. His creative thinking and problem-solving abilities have proven invaluable in our collaborative projects, often leading to innovative solutions and improved outcomes. One of Geoff's standout qualities is his broad range of skill sets. He possesses a deep understanding of various aspects of software infrastructure, which allows him to contribute meaningfully across multiple domains. From system architecture design to implementation and optimization, Geoff excels in every aspect of his work. As a leader and mentor, Geoff is second to none. He effortlessly guides and inspires his team, fostering a collaborative and supportive environment. His vast knowledge and experience make him a go-to resource for any software infrastructure-related challenge. Geoff consistently delivers high-quality work and sets the bar high for excellence. Above all, Geoff is dependable and trustworthy. He consistently meets deadlines and takes responsibility for his work, ensuring that projects progress smoothly. His dedication to delivering results and maintaining a high standard of professionalism is truly commendable. In summary, Geoff Miller is an exceptional professional with a passion for software infrastructure. His intelligence, hard work, creativity, broad skill set, leadership abilities, and unwavering commitment to excellence make him an invaluable asset to any organization. I highly recommend Geoff and have no doubt that he will make a significant impact in any role he undertakes.",
      "themes": [
        "leadership",
        "mentoring",
        "problem-solving",
        "delivery",
        "cloud-architecture"
      ],
      "pullQuotes": [
        {
          "text": "As a leader and mentor, Geoff is second to none. He effortlessly guides and inspires his team, fostering a collaborative and supportive environment.",
          "themes": [
            "leadership",
            "mentoring"
          ]
        },
        {
          "text": "From system architecture design to implementation and optimization, Geoff excels in every aspect of his work.",
          "themes": [
            "cloud-architecture"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.8
    },
    {
      "id": "naresh-jayaram",
      "author": {
        "name": "Naresh Jayaram",
        "headline": "Principal Software Engineer",
        "linkedin": "https://www.linkedin.com/in/naresh-jayaram-65116aa/",
        "avatar": "naresh-jayaram.jpg"
      },
      "relationship": "geoff-senior",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-07-11",
      "text": "I have had the pleasure to work with Geoff at SVB. He is always to looking to push the boundaries and set the stage for a platform that is extensible and future-ready while effectively addressing the problems of today. His considerable knowledge and experience in different aspects of Cloud and Core Platform engineering and his zeal to explore newer technologies opened a wider horizon for solutions. It was fun to observe him navigate the organizational complexity and drive consensus in tough situations. It was also very instructive to observe him come up with interim solutions that covered considerable ground if there wasn't broad based alignment for the most optimal solution. As a colleague he is fun to work with and hang out with. He keeps it light and lively on days we have to plod through a long days work. Any team he is with is sure to benefit from his multi-faceted skills & expertise !",
      "themes": [
        "platform",
        "innovation",
        "stakeholder"
      ],
      "pullQuotes": [
        {
          "text": "He is always to looking to push the boundaries and set the stage for a platform that is extensible and future-ready while effectively addressing the problems of today.",
          "themes": [
            "platform",
            "innovation"
          ]
        },
        {
          "text": "It was fun to observe him navigate the organizational complexity and drive consensus in tough situations.",
          "themes": [
            "stakeholder"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.75
    },
    {
      "id": "jim-shingler",
      "author": {
        "name": "Jim Shingler",
        "headline": "Executive Director @ JPMorgan Chase & Co.",
        "linkedin": "https://www.linkedin.com/in/jimshingler/",
        "avatar": "jim-shingler.jpg"
      },
      "relationship": "different-teams",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-03-14",
      "text": "I am pleased to recommend Geoff Miller for his outstanding work as the Director of Infrastructure Cloud Engineering. Geoff is a highly skilled professional who has demonstrated excellent leadership abilities and technical expertise at SVB. Geoff is a true expert in cloud computing technologies, particularly in AWS, Kubernetes, and Terraform. His extensive knowledge of these platforms has been instrumental in our SVB's success in moving to the cloud. His ability to design, implement and maintain cloud infrastructure has been critical in the company's transition to cloud-based systems. Geoff is an outstanding leader who has created a cohesive and motivated team. He has excellent communication skills and has built strong relationships with his team and with other departments within the organization. His ability to motivate and inspire his team has led to increased productivity and improved results. In conclusion, I highly recommend Geoff Miller. He is a true professional who is passionate about his work, and his technical expertise and leadership abilities are second to none. He would be a valuable addition to any organization.",
      "themes": [
        "cloud-architecture",
        "platform",
        "iac",
        "leadership",
        "communication"
      ],
      "pullQuotes": [
        {
          "text": "Geoff is a true expert in cloud computing technologies, particularly in AWS, Kubernetes, and Terraform.",
          "themes": [
            "cloud-architecture",
            "iac"
          ]
        },
        {
          "text": "Geoff is an outstanding leader who has created a cohesive and motivated team.",
          "themes": [
            "leadership"
          ]
        }
      ],
      "claimIds": [
        "eks-hardened"
      ],
      "strength": 0.8
    },
    {
      "id": "antonio-tamer",
      "author": {
        "name": "Antonio Tamer",
        "headline": "kubernetes | CI/CD | Cloud | Infrastructure as code",
        "linkedin": "https://www.linkedin.com/in/antoniotamer/",
        "avatar": "antonio-tamer.jpg"
      },
      "relationship": "reported-to-geoff",
      "org": "Early Warning Services, then REPAY",
      "roleIds": [
        "ews",
        "repay"
      ],
      "date": "2023-03-13",
      "text": "Geoff approaches cloud architecture and technical challenges with incredible creativity and passion. He has led the architecture of several systems and his ideas are truly innovative and forward thinking. Geoff also always amazes me with the ability to retain very crucial technical details and is able to apply them to big picture thinking. I’m grateful to have had Geoff the opportunity to work with Geoff and have no doubts he’ll be an asset to any organization that is looking to modernize their IT and cloud environment.",
      "themes": [
        "cloud-architecture",
        "innovation",
        "problem-solving"
      ],
      "pullQuotes": [
        {
          "text": "Geoff approaches cloud architecture and technical challenges with incredible creativity and passion. He has led the architecture of several systems and his ideas are truly innovative and forward thinking.",
          "themes": [
            "cloud-architecture",
            "innovation"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.7
    },
    {
      "id": "bruce-xu",
      "author": {
        "name": "Bruce Xu",
        "headline": "Infrastructure Engineer | DevOps Engineer | Site Reliability Engineer | AWS, Kubernetes, Terraform, Cloud Security",
        "linkedin": "https://www.linkedin.com/in/brucex/",
        "avatar": "bruce-xu.jpg"
      },
      "relationship": "geoff-senior",
      "org": "REPAY",
      "roleIds": [
        "repay"
      ],
      "date": "2023-03-12",
      "text": "I worked with Geoff while at Repay. He’s an incredible leader and mentor. Everyday he brings an amazing amount of energy to everyone around him. If I ever ran into any issues, I was confident Geoff would be able to assist me. I learned so much while working along side Geoff. He leads by example and elevates the entire team. I’m fl h d k d l id G ff A ld b l k h hi grateful to have met and worked along side Geoff. Anyone would be lucky to have him on their team.",
      "themes": [
        "mentoring",
        "leadership"
      ],
      "pullQuotes": [
        {
          "text": "He’s an incredible leader and mentor. Everyday he brings an amazing amount of energy to everyone around him.",
          "themes": [
            "leadership",
            "mentoring"
          ]
        },
        {
          "text": "He leads by example and elevates the entire team.",
          "themes": [
            "leadership"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.7
    },
    {
      "id": "avi-harari",
      "author": {
        "name": "Avi Harari",
        "headline": "Sr. Technical Account Manager at Amazon Web Services (AWS)",
        "linkedin": "https://www.linkedin.com/in/avi-harari-4a859488/",
        "avatar": "avi-harari.jpg"
      },
      "relationship": "different-company",
      "org": "Amazon Web Services (partner)",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-03-11",
      "text": "I had the pleasure of working with Geoff while he was working at SVB. On top of being one of the nicest people he is also extremely knowledgeable in cloud computing and possesses great analytical skills. Geoff led multiple projects in the areas of serverless, cost optimization, disaster recovery and observability which we collaborated on. I greatly enjoyed working with Geoff and I highly recommend him.",
      "themes": [
        "cloud-architecture",
        "finops",
        "stakeholder"
      ],
      "pullQuotes": [
        {
          "text": "Geoff led multiple projects in the areas of serverless, cost optimization, disaster recovery and observability which we collaborated on.",
          "themes": [
            "cloud-architecture",
            "finops"
          ]
        }
      ],
      "claimIds": [
        "finops-30"
      ],
      "strength": 0.7
    },
    {
      "id": "rick-mulder",
      "author": {
        "name": "Rick Mulder",
        "headline": "Principal IT Systems Engineer at Silicon Valley Bank (A Division of First Citizens Bank)",
        "linkedin": "https://www.linkedin.com/in/rick-mulder-93728589/",
        "avatar": "rick-mulder.jpg"
      },
      "relationship": "different-teams",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-03-11",
      "text": "Geoff and I worked together on a project to architect Silicon Valley Bank's Kubernetes strategy on AWS. He provided valuable context from his diverse background and helped the team think outside the box. He also helped drive the project with external stakeholders and was a much needed voice of patience and reason. Though we both have different approaches, I walked away from every conversation with Geoff feeling supported and respected. He leads with empathy, which can only come from a background of walking the walk prior to his elevation into management. His background in cloud technologies and understanding of the broader ecosystem were invaluable assets to this project, but even more so was his ability to break down project commitments and timelines in an executive summary and own that communication without having to burden the engineering staff. I have tremendous respect for Geoff. I watched him navigate a complex and tumultuous political landscape with patience and grace, all the while never compromising on his commitment to those he worked with and supported. I would gladly endorse Geoff for a Director position, and I would consider myself blessed to have another opportunity to work with him.",
      "themes": [
        "platform",
        "communication",
        "stakeholder",
        "leadership"
      ],
      "pullQuotes": [
        {
          "text": "Geoff and I worked together on a project to architect Silicon Valley Bank's Kubernetes strategy on AWS.",
          "themes": [
            "platform"
          ]
        },
        {
          "text": "even more so was his ability to break down project commitments and timelines in an executive summary and own that communication without having to burden the engineering staff",
          "themes": [
            "communication"
          ]
        },
        {
          "text": "He leads with empathy, which can only come from a background of walking the walk prior to his elevation into management.",
          "themes": [
            "leadership"
          ]
        }
      ],
      "claimIds": [
        "eks-hardened"
      ],
      "strength": 0.9
    },
    {
      "id": "abhilash-panickar",
      "author": {
        "name": "Abhilash Panickar",
        "headline": "Engineering Leadership | IT Strategy | Cloud Modernization | Platform Engineering | Global Execution & Delivery",
        "linkedin": "https://www.linkedin.com/in/abhilashpanickar/",
        "avatar": "abhilash-panickar.jpg"
      },
      "relationship": "managed-geoff",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-03-11",
      "text": "I had the great pleasure of working with Geoff Miller at SVB on the Enterprise Cloud Platform team where he provided technology leadership and oversight for multiple initiatives for the team. Having worked with him closely I have been consistently impressed with his exceptional leadership and technical skills. Geoff has the uncanny ability to find simple solutions to complex problems. He also has the strategic big picture vision, is an effective communicater, and takes a collaborative approach in ensuring success for our team. He is a results-oriented leader who consistently delivers outstanding results while maintaining a positive and supportive work culture. In addition to his exceptional professional skills, Geoff is an outstanding team player and mentor. His willingness to go above and beyond to help team members achieve their goals and grow professionally has earned him the respect and admiration of everyone on our team. In summary, Geoff is an exceptional leader who would be a valuable asset to any organization. I highly recommend him for any technology leadership roles and am confident that he will exceed your expectations.",
      "themes": [
        "leadership",
        "communication",
        "delivery",
        "mentoring",
        "problem-solving"
      ],
      "pullQuotes": [
        {
          "text": "Geoff has the uncanny ability to find simple solutions to complex problems.",
          "themes": [
            "problem-solving"
          ]
        },
        {
          "text": "He is a results-oriented leader who consistently delivers outstanding results while maintaining a positive and supportive work culture.",
          "themes": [
            "leadership",
            "delivery"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.9
    },
    {
      "id": "venkata-subrahmanyam-kalaga",
      "author": {
        "name": "Venkata Subrahmanyam Kalaga",
        "headline": "Cloud/DevOps enthusiast",
        "linkedin": "https://www.linkedin.com/in/subrahmanyamkv/",
        "avatar": "venkata-kalaga.jpg"
      },
      "relationship": "reported-to-geoff",
      "org": "Early Warning Services, then Silicon Valley Bank",
      "roleIds": [
        "ews",
        "fcb"
      ],
      "date": "2023-03-10",
      "text": "I have known Geoff since 2017 (worked as a colleague at Early Warning Services and reported to him at Silicon Valley Bank). During this time, I observed how much he evolved from a passionate individual contributor to a director/mentor who can oversee several core projects and transformations. Geoff is a very hands-on manager who can help his team members in technical issues, and at the same time he can articulate these issues to upper management in layman terms. Due to his strong analytical ability, passion and excellent communication skills, Geoff can function as a Swiss army knife where he can see issues on the group level from top. I learned a lot from Geoff from his mentorship and would love to work with him again. He will be a highly valuable asset for any company looking for a technical leader.",
      "themes": [
        "mentoring",
        "communication",
        "leadership"
      ],
      "pullQuotes": [
        {
          "text": "I observed how much he evolved from a passionate individual contributor to a director/mentor who can oversee several core projects and transformations.",
          "themes": [
            "leadership"
          ]
        },
        {
          "text": "Geoff is a very hands-on manager who can help his team members in technical issues, and at the same time he can articulate these issues to upper management in layman terms.",
          "themes": [
            "communication",
            "mentoring"
          ]
        }
      ],
      "claimIds": [],
      "strength": 0.85
    },
    {
      "id": "sam-towne",
      "author": {
        "name": "Sam Towne",
        "headline": "Cloud Platform Engineer | AWS • Kubernetes (EKS) • Terraform • IaC & Policy as Code | Building developer-centric platforms with AI-native architecture, observability & cost optimization | Remote- ready",
        "linkedin": "https://www.linkedin.com/in/samtowne/",
        "avatar": "sam-towne.jpg"
      },
      "relationship": "reported-to-geoff",
      "org": "Silicon Valley Bank",
      "roleIds": [
        "fcb"
      ],
      "date": "2023-03-10",
      "text": "Geoff hired me as a cloud automation engineer in 2022. He is a technical leader with deep understanding of technology such as cloud architecture, computer science, and software development. Geoff is a natural mentor and coaching his team members. Under Geoff I learned more about cloud automation, software development, and he even taught me some super useful VSCode shortcuts. Geoff managed a team of cloud automation engineers while leading multiple enterprise-wide technology programs like kubernetes adoption and cloud cost control initiatives. Keep it up Geoff!",
      "themes": [
        "mentoring",
        "platform",
        "finops",
        "leadership"
      ],
      "pullQuotes": [
        {
          "text": "Geoff managed a team of cloud automation engineers while leading multiple enterprise-wide technology programs like kubernetes adoption and cloud cost control initiatives.",
          "themes": [
            "platform",
            "finops",
            "leadership"
          ]
        },
        {
          "text": "Geoff is a natural mentor and coaching his team members.",
          "themes": [
            "mentoring"
          ]
        }
      ],
      "claimIds": [
        "eks-hardened",
        "finops-30"
      ],
      "strength": 0.75
    },
    {
      "id": "christopher-rice",
      "author": {
        "name": "Christopher Rice",
        "headline": "AVP; Solution Architect",
        "linkedin": "https://www.linkedin.com/in/christopherlrice/",
        "avatar": "christopher-rice.jpg"
      },
      "relationship": "same-team",
      "org": "Bank of America",
      "roleIds": [
        "boa-intern"
      ],
      "date": "2016-07-06",
      "text": "Geoff and I worked under the same manager and organization (IMS Systems) in summer 2014 at Bank of America. I had not been introduced to mainframe systems prior to this work experience opportunity, but with Geoff's expertise, I was able to learn how to maneuver around using ISPF, create datasets, and submit jobs. Geoff has the interpersonal and technical skills any company should appreciate and value. I would highly recommend Geoff for any opportunity he may be considered for. Promoted Geoff, explore relevant opportunities with CBTS Get the latest jobs and industry news Follow",
      "themes": [
        "mentoring",
        "communication"
      ],
      "pullQuotes": [
        {
          "text": "with Geoff's expertise, I was able to learn how to maneuver around using ISPF, create datasets, and submit jobs",
          "themes": [
            "mentoring"
          ]
        }
      ],
      "claimIds": [
        "boa-mainframe"
      ],
      "strength": 0.6
    }
  ],

  recommendationClaims: {
    "env-claims": {
      "label": "Environment claims / non-prod lifecycle control",
      "projectId": "f1n",
      "roleIds": [
        "fcb",
        "repay"
      ]
    },
    "eks-hardened": {
      "label": "Bank-hardened EKS platform",
      "projectId": "eks-blueprint",
      "roleIds": [
        "fcb"
      ]
    },
    "vpc-endpoints": {
      "label": "VPC interface-endpoint consolidation",
      "projectId": "endpoint-hub",
      "roleIds": [
        "fcb"
      ]
    },
    "finops-30": {
      "label": "FinOps programme and cost reduction",
      "projectId": null,
      "roleIds": [
        "fcb",
        "repay"
      ]
    },
    "team-growth": {
      "label": "Building and growing platform teams",
      "projectId": null,
      "roleIds": [
        "fcb",
        "repay"
      ]
    },
    "ai-pivot": {
      "label": "AI and agentic engineering",
      "projectId": "agentic-harness",
      "roleIds": [
        "paypal",
        "fcb"
      ]
    },
    "iac": {
      "label": "Infrastructure and policy as code",
      "projectId": null,
      "roleIds": [
        "fcb",
        "repay"
      ]
    },
    "boa-mainframe": {
      "label": "Bank of America mainframe work",
      "projectId": null,
      "roleIds": []
    }
  },

  /* From the CV's PUBLIC SPEAKING and ADDITIONAL INFORMATION sections. */
  recognition: [
    { event: "DECA National Competition", date: "Apr 2004", award: "First Place — Extemporaneous Speaking", note: "Top 10 overall finalist" },
    { event: "DECA Illinois State Competition", date: "Mar 2004", award: "First Place — Extemporaneous Speaking", note: "Third place overall" },
  ],
  additional: { citizenship: "United States" },

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

  /* ---------- Article series ---------- */
  /* Only series that genuinely exist in the articles below. `dek` is left empty
     on purpose — no series-level prose exists yet; fill it in when you write it. */
  series: [
    {
      id: "building-the-agentic-stack",
      title: "Building the Agentic Stack",
      dek: "",
      status: "complete",
      plannedParts: 4,
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
      charts: [
        {
            "id": "force-of-a-check",
            "kind": "ladder",
            "title": "What a machine does about a violation",
            "note": "Four rungs, strongest first. The rungs are ordered by force — what happens when the check finds something — and the gap between two rungs carries what it takes to move a rule up one. That gap is the part a table cannot express, and it is where the engineering work actually is.",
            "source": "The argument of this article, drawn as a ladder. NO RUNG CARRIES A COUNT AND NO RUNG CARRIES A MEASURED POSITION: the ordering is by what a machine does about a violation, which is a property of the mechanism, and the spacing between rungs is not measured — the caption under the figure says so rather than leaving a reader to assume the gaps mean something.",
            "scaleLabel": "what happens when the check finds something",
            "rungs": [
              {
                "key": "build",
                "label": "FAILS THE BUILD",
                "gloss": "the artifact never exists",
                "is": "The check runs as part of producing the artifact, so a violating artifact is not produced at all. There is nothing to promote, nothing to roll back and nothing to decide.",
                "cost": "The most expensive rung to build and the one that costs a human every time it is wrong. Reserve it for what must not exist."
              },
              {
                "key": "merge",
                "label": "BLOCKS THE MERGE",
                "gloss": "the change exists and cannot promote",
                "is": "The change is real, sitting on a branch, and a required check refuses to let it cross a border. Policy-as-code at plan time lives here.",
                "cost": "Someone can usually route around it — an admin merge, a skipped required check, a re-run until it passes. The gate is as strong as the process protecting the gate.",
                "climb": "the check has to run before the artifact exists rather than after, which usually means moving it out of review and into the thing that produces the artifact."
              },
              {
                "key": "warns",
                "label": "WARNS",
                "gloss": "something noticed; nothing stopped",
                "is": "The check runs, reports, and the pipeline continues. It produces evidence and it produces no decision.",
                "cost": "A warning that has been ignored twice is decoration. This rung's real output is a backlog, and a backlog nobody is required to read is where shifted luck accumulates.",
                "climb": "the check's verdict has to be wired to a decision nobody can route around, and the team has to accept that a false stop is paid for by a person's time."
              },
              {
                "key": "written",
                "label": "WRITTEN DOWN",
                "gloss": "the rule is correct somewhere",
                "is": "The standard exists, is accurate, and requires somebody to go and look at it.",
                "cost": "Advice that requires somebody to go and look is advice that does not happen. It is the floor, not a mechanism — and it is where most compliance programmes actually live.",
                "climb": "somebody has to make the rule executable: a check that runs on its own, on a schedule nobody sets, even if all it does at first is print."
              }
            ],
            "steps": [
              {
                "id": "floor",
                "lit": [
                  "written"
                ],
                "say": "The bottom rung is where 'we have a standard for that' lives. It is not nothing — a wrong rule executed is worse than a right rule ignored — but it decides nothing."
              },
              {
                "id": "gap",
                "lit": [
                  "warns",
                  "merge"
                ],
                "say": "The interesting distance is between these two. Both run automatically; only one of them changes what happens next, and the difference is a wiring decision, not a technical one."
              },
              {
                "id": "top",
                "lit": [
                  "build"
                ],
                "say": "Shifting left, stated precisely: move the check to the point where the violating artifact is never produced. Everything below that is finding a defect that already exists."
              }
            ]
          },
        {
            "id": "where-the-defect-is-found",
            "kind": "fork",
            "title": "Two strategies, and the one you get by not choosing",
            "question": "A defect, a security gap or a compliance failure is already in the change you are about to ship. Where is it found?",
            "note": "The ladder above answers a different question — what a machine DOES about a violation once you have decided to look. This one is whether you decided to look at all, and the whole of the ladder sits inside the left branch of it. The second branch is not a strategy anybody argues for; it is marked as the default because it is what is left when the first one was never built.",
            "source": "This article's own opening, drawn as the fork it already is: “There are two strategies for dealing with software defects, security gaps, and compliance failures. The first is to find them before they reach production. The second is to find them after — and hope luck decides it's a developer who finds them, not a customer or an auditor.” The default is marked on the strength of the next line: “Most teams choose the second strategy without realizing it. They call it 'moving fast.'” NO COST FIGURE APPEARS ON THIS DRAWING. The escalation of remediation cost argued in the body is prose and carries no source, so it is not repeated here — a fork has no number field, and both cost blocks below state a kind of cost rather than an amount.",
            "branches": [
              {
                "key": "before",
                "label": "BEFORE IT SHIPS",
                "is": "A check runs on the change and refuses it. Which check, and how hard it is allowed to refuse, is the whole of the ladder above this figure.",
                "wrong": "A false stop. Somebody's correct change is blocked by a rule that was drawn too broadly, and the cost is a pipeline re-run plus an argument about the rule — paid by a person, immediately, and visibly."
              },
              {
                "key": "after",
                "label": "AFTER IT SHIPS",
                "default": true,
                "is": "Nobody picks this one. It is what is left when no check exists, and luck decides whether the finder is a developer, a customer or an auditor.",
                "wrong": "The finder is not a developer. By the time the defect surfaces it has been in production long enough that the question has stopped being how to fix it and started being who has to be told."
              }
            ],
            "steps": [
              {
                "id": "chosen",
                "lit": [
                  "before"
                ],
                "say": "This branch is the one that costs something to build, and its cost is visible every single time it is wrong. That visibility is why it feels expensive and why it is the one that gets argued about."
              },
              {
                "id": "unchosen",
                "lit": [
                  "after"
                ],
                "say": "This branch costs nothing to build and its failures are counterfactual — you never see the incident that did not happen. That asymmetry is the whole reason the default sits here rather than on the other side."
              }
            ]
          }
      ],
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
      series: { name: "Building the Agentic Stack", part: 1, of: 4, ref: "building-the-agentic-stack", position: 1 },
      tags: ["agentic", "governance", "platform"],
      date: "2026-06-12",
      read: "11 min",
      charts: [
        {
            "id": "governed-loop-guarantees",
            "kind": "span",
            "title": "What the governed loop proves, and where each guarantee stops",
            "note": "Five stages of one agent turn, left to right. Beneath them, three bands. The first two have end ticks because they are bounded: they cover an interval, and outside it they claim nothing. The third has NO END TICKS AT ALL, drawn at the same weight and the same length as the others, because nothing bounds it — and it is the most important band on the picture.",
            "source": "The governed agent loop this article describes: model turn, verification by a competing incentive, the effect that touches infrastructure, and a provenance journal that supports replay. Each band states a guarantee the loop's own design claims. NO FIGURE IS DRAWN ANYWHERE IN THIS DIAGRAM and none can be — the shape has no number field, because a chain-of-custody argument that quotes a percentage is quoting something the chain does not measure.",
            "nodes": [
              {
                "id": "n1",
                "kicker": "01 · THE ASK",
                "title": "REQUEST",
                "s1": "a task, and its context"
              },
              {
                "id": "n2",
                "kicker": "02 · THE TURN",
                "title": "MODEL",
                "s1": "message or tool call"
              },
              {
                "id": "n3",
                "kicker": "03 · THE CHECK",
                "title": "VERIFY",
                "s1": "competing incentive"
              },
              {
                "id": "n4",
                "kicker": "04 · THE EFFECT",
                "title": "TOOL CALL",
                "s1": "the first thing that is real"
              },
              {
                "id": "n5",
                "kicker": "05 · THE RECORD",
                "title": "JOURNAL",
                "s1": "replayable, ordered"
              }
            ],
            "spans": [
              {
                "id": "A",
                "from": "n2",
                "to": "n5",
                "kind": "bounded",
                "label": "WHAT THE JOURNAL PROVES",
                "proves": "That this run happened in this order with these inputs, and that replaying it produces the same domain calls. A recorded run is a test; an unrecorded one is an anecdote."
              },
              {
                "id": "B",
                "from": "n3",
                "to": "n4",
                "kind": "bounded",
                "label": "WHAT VERIFICATION PROVES",
                "proves": "That something whose incentive was to reject the output read it before it became an effect. The interval is short on purpose: it covers exactly the step between a proposal and a change to the world."
              },
              {
                "id": "C",
                "from": "n1",
                "label": "WHAT NOTHING HERE PROVES",
                "proves": "That the answer was right. Every guarantee in the loop is about what happened TO the output — recorded, checked, replayable — and none of them is about whether it was true. The chain begins at the model's turn; the question of whether the task was the right task is outside it, and always was."
              }
            ],
            "steps": [
              {
                "id": "bounded",
                "lit": [
                  "A",
                  "B"
                ],
                "say": "Two bounded guarantees. Both are real, both are cheap to verify, and both are about the handling of an output rather than its content."
              },
              {
                "id": "open",
                "lit": [
                  "C"
                ],
                "say": "The third band has no end. That is not a gap in the implementation — it is the shape of the problem, and a platform that draws it is easier to trust than one that quietly leaves it off the diagram."
              }
            ]
          },
        {
            "id": "guard-cannot-decide",
            "kind": "fork",
            "title": "The guard cannot make a trust decision. Now what?",
            "question": "A tool call is sitting in front of the endpoint guard, and the guard cannot decide — network partition, schema mismatch, budget exhaustion. Does the call execute?",
            "note": "Two answers. Only one of them has to be written, and the other one is marked as the default for exactly that reason: it is where a tool-calling integration lands when nobody wrote the guard's own failure path. The span above draws what this loop PROVES; this draws what it DECIDES.",
            "source": "This article's own paragraph, drawn: “The endpoint guard is fail-closed. If it cannot make a trust decision — network partition, schema mismatch, budget exhaustion — the call does not execute. The default behavior is denial, not permissiveness. This is the opposite of what most teams build when they wire up tool calling for the first time.” NO FREQUENCY IS DRAWN AND NONE IS KNOWN. This figure carries no rate, no incident count and no measure of how often either branch is taken — a fork has no number field, and the cost blocks below say what each branch costs when it is wrong, in kind, not what either one has cost.",
            "branches": [
              {
                "key": "deny",
                "label": "THE CALL DOES NOT EXECUTE",
                "is": "Fail-closed. The guard could not decide, so nothing happened — and the run ends carrying a reason rather than a result.",
                "wrong": "A legitimate call is refused while the network is partitioned, and a person has to look at a run that would have been fine. The cost is somebody's attention, charged at the moment they wanted to ship."
              },
              {
                "key": "execute",
                "label": "THE CALL EXECUTES",
                "default": true,
                "is": "Nobody chose this. It is what a first tool-calling integration does when the guard's own failure path was never written — which is why the article calls fail-closed the opposite of what most teams build.",
                "wrong": "The call reaches production infrastructure at exactly the moment the thing that was supposed to judge it could not. The failure is quiet, because the component that would have recorded a refusal is the one that was down."
              }
            ],
            "steps": [
              {
                "id": "written",
                "lit": [
                  "deny"
                ],
                "say": "This branch costs a paragraph of code and, occasionally, somebody's afternoon. It is the one the article argues for, and it is the one that has to be written down."
              },
              {
                "id": "unwritten",
                "lit": [
                  "execute"
                ],
                "say": "This branch costs nothing to build, which is the whole problem: it is where a system lands when the question was never asked. Denial is not the strict option here — it is the only one anybody chose."
              }
            ]
          }
      ],
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
      series: { name: "Building the Agentic Stack", part: 2, of: 4, ref: "building-the-agentic-stack", position: 2 },
      tags: ["app-kit", "platform", "agentic", "developer-experience"],
      date: "2026-06-10",
      read: "10 min",
      charts: [
        {
            "id": "museum-of-adjacent-choices",
            "kind": "field",
            "title": "A hundred screens, and how many of them share a vocabulary",
            "note": "One square is one agent-generated screen. In the first state every screen carries a component contract it invented for itself — locally reasonable, every one of them, and no two the same. In the second, all hundred carry the kit's. The drawing cannot show a hundred DIFFERENT vocabularies and does not try: what it draws is how many are shared, which is the number this article is actually about.",
            "source": "This article's own sentence, drawn: “When a hundred agent-generated screens can each express a slightly different visual language, component contract, or data shape, you don't have a product — you have a museum of adjacent implementation choices.” A hundred is the article's illustrative figure and this drawing uses exactly that figure rather than a larger one. NO SCREEN COUNT IS MEASURED, no consistency rate is claimed, and no review-time saving appears anywhere in this figure — none of the three has been measured, here or anywhere else on this site.",
            "unit": "one agent-generated screen",
            "reveal": true,
            "states": {
              "a": "each screen its own",
              "b": "one shared vocabulary"
            },
            "classes": [
              {
                "key": "own",
                "label": "a component contract this screen invented for itself",
                "tone": "off"
              },
              {
                "key": "kit",
                "label": "the kit's contract, shared with every other screen",
                "tone": "on"
              }
            ],
            "readout": {
              "label": "screens sharing one vocabulary",
              "prov": "calc",
              "cite": "count the solid squares — a hundred of them, one per screen"
            },
            "groups": [
              {
                "label": "one hundred agent-generated screens",
                "units": [
                  {
                    "a": "own",
                    "b": "kit",
                    "n": 100
                  }
                ]
              }
            ],
            "steps": [
              {
                "id": "each",
                "lit": [
                  "own"
                ],
                "say": "Every one of these was a reasonable local decision. That is what makes the problem hard: there is no bad commit to point at and no reviewer who was asleep."
              },
              {
                "id": "one",
                "lit": [
                  "kit"
                ],
                "say": "The kit does not make the agents smarter. It makes them agree — and agreement is the property a reviewer can check by reading one screen instead of a hundred."
              }
            ]
          },
        {
            "id": "what-a-kit-is-made-of",
            "kind": "anatomy",
            "title": "The five things in that sentence, and the one that was taken out",
            "note": "The summary line at the top of this page lists what an app-kit is. It is short enough to skim, and each item is doing a different job — so here it is with the jobs named. The sixth row is not in the sentence at all: it is a part the kit deliberately does not have, drawn as a rule rather than left off, because a removal is a decision and an empty space reads as an oversight.",
            "source": "The specimen is this page's own summary line, quoted exactly and not paraphrased; the reasons under the parts are read out of the body sections that argue each one in turn. The absent row quotes the body directly: “One of the deliberate constraints in app-kit is the elimination of Node.js from any critical path.” NOTHING HERE IS COUNTED OR MEASURED. An anatomy makes no magnitude claim and this one makes none: no adoption number, no defect rate, no time saved, and no claim about how many screens were generated through any of it.",
            "specimenKind": "string",
            "specimen": [
              {
                "t": "typed design tokens",
                "part": "tokens"
              },
              {
                "t": ", "
              },
              {
                "t": "a component library",
                "part": "library"
              },
              {
                "t": ", "
              },
              {
                "t": "a loopback/app contract",
                "part": "loopback"
              },
              {
                "t": ", "
              },
              {
                "t": "a single data layer",
                "part": "data"
              },
              {
                "t": ", and "
              },
              {
                "t": "an MCP surface so agents discover the kit instead of reinventing it",
                "part": "mcp"
              }
            ],
            "parts": [
              {
                "key": "tokens",
                "label": "typed design tokens",
                "why": "The agent asks the kit what the accent colour is and gets the current value, not the value from a document it was trained on. Typed is the load-bearing word: a wrong value fails when the token is defined, not when somebody reviews the screen."
              },
              {
                "key": "library",
                "label": "a component library",
                "why": "A vocabulary to compose from. The complaint this whole article is built on is that an agent without one invents a component that looks almost like the right one — and almost is the expensive kind."
              },
              {
                "key": "loopback",
                "label": "a loopback/app contract",
                "why": "The same server handles local development and production traffic, so “it works locally” stops being a failure mode an agent can walk into. The seam between the two is an adapter swap, not an environment difference."
              },
              {
                "key": "data",
                "label": "a single data layer",
                "why": "One idiom for fetching. Without it every screen invents its own, which is the museum in the figure above assembling itself one data shape at a time."
              },
              {
                "key": "mcp",
                "label": "an MCP surface so agents discover the kit instead of reinventing it",
                "why": "The one item on the list that exists because the author is a machine. It is how the other four get found — an agent that cannot query the vocabulary composes from the vocabulary it imagines."
              },
              {
                "key": "node",
                "label": "a JavaScript build toolchain",
                "present": false,
                "why": "This one is named in the body as a removal rather than an omission: “One of the deliberate constraints in app-kit is the elimination of Node.js from any critical path.” A kit with five parts and no bundler is a different object from a kit that forgot one, and the difference is worth a rule on the picture."
              }
            ],
            "steps": [
              {
                "id": "vocab",
                "lit": [
                  "tokens",
                  "library",
                  "data"
                ],
                "say": "Three of the five are vocabulary: what things are called, what they look like, and how they are fetched. Every one of them is something an agent will otherwise invent."
              },
              {
                "id": "seam",
                "lit": [
                  "loopback"
                ],
                "say": "One of the five is not vocabulary at all. It is a promise about where the code runs, and it is the reason an agent's local success means anything."
              },
              {
                "id": "found",
                "lit": [
                  "mcp"
                ],
                "say": "And one exists purely so the other four are discoverable by something that does not read documentation. A kit an agent cannot query is a kit an agent will re-derive."
              }
            ]
          }
      ],
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
      series: { name: "Building the Agentic Stack", part: 3, of: 4, ref: "building-the-agentic-stack", position: 3 },
      tags: ["architecture", "hexagonal", "agentic", "go"],
      date: "2026-06-08",
      read: "9 min",
      charts: [
        {
            "id": "import-reach",
            "kind": "coverage",
            "title": "What a change can reach, when the packages decide",
            "note": "Rows are kinds of change; columns are the packages a change would have to edit. A filled cell is a package the change legitimately reaches. A dashed rule is a package the layout keeps it out of — drawn as a rule and not as an empty cell, because an empty cell reads as an oversight. The slashed cell is the strong case: there is no import path at all, so the reach is not merely disallowed, it is unrepresentable.",
            "source": "The import rules of the hexagonal Go layout this article describes: the domain declares its interfaces structurally and never imports an implementation, so no import path connects the core to an adapter, and the compiler decides the question rather than a convention. Every cell is a statement about the package graph. NOTHING HERE IS A MEASUREMENT OF ANY AGENT'S BEHAVIOUR — no run was counted, and the figure makes no claim about how often an agent stays in scope.",
            "rowsLabel": "a change to…",
            "totalsLabel": "changes this package is kept out of",
            "cellLabels": {
              "stopped": "reaches it, legitimately",
              "past": "the layout keeps the change out",
              "cannot": "no import path exists at all"
            },
            "columns": [
              {
                "id": "core",
                "label": "domain core",
                "sub": "the business rules"
              },
              {
                "id": "ports",
                "label": "ports",
                "sub": "interfaces the domain declares"
              },
              {
                "id": "http",
                "label": "HTTP adapter",
                "sub": "one delivery mechanism"
              },
              {
                "id": "db",
                "label": "persistence adapter",
                "sub": "one infrastructure mechanism"
              }
            ],
            "rows": [
              {
                "id": "r1",
                "label": "a bug in domain behaviour",
                "un": [
                  "ports",
                  "http",
                  "db"
                ],
                "cannot": {
                  "http": "The domain package does not import the HTTP adapter — it declares an interface and the adapter satisfies it structurally, so there is no import path from core to adapter to follow.",
                  "db": "Same construction, same reason: the core names what it needs, never who provides it."
                },
                "why": "The worst a change here can do is change the domain package and the tests that cover it — which is exactly the scope that should change."
              },
              {
                "id": "r2",
                "label": "a change to the HTTP transport",
                "un": [
                  "core",
                  "ports",
                  "db"
                ],
                "why": "Delivery lives in an adapter. Nothing about a route, a header or a status code is a business rule, and the layout is what makes that a structural fact rather than a review comment."
              },
              {
                "id": "r3",
                "label": "swapping the database",
                "un": [
                  "core",
                  "ports",
                  "http"
                ],
                "cannot": {
                  "core": "The core cannot be reached from a persistence change: it imports nothing from the adapter side. This is the property the whole layout exists to buy."
                },
                "why": "One adapter is replaced. The domain does not know which implementation satisfied its interface and cannot be made to care."
              },
              {
                "id": "r4",
                "label": "a new capability that needs the outside world",
                "un": [
                  "http"
                ],
                "why": "This is the one that crosses: it defines a new port method on the domain side and implements it in one adapter. The article's rule — if it bridges them, it defines a new port — is what keeps this from becoming a change to everything."
              }
            ],
            "steps": [
              {
                "id": "narrow",
                "lit": [
                  "r1",
                  "r2",
                  "r3"
                ],
                "say": "Three of the four changes reach exactly one package. That is the answer to 'what files should I touch?', and it is structural rather than a matter of judgement."
              },
              {
                "id": "impossible",
                "lit": [
                  "core",
                  "http",
                  "db"
                ],
                "say": "The slashed cells are the strong claim. Not 'an agent should not do this' — there is no import path from the core to an adapter, so a change to domain behaviour cannot rewrite the router even if it decided to."
              },
              {
                "id": "bridge",
                "lit": [
                  "r4"
                ],
                "say": "One change crosses, and it announces itself by defining a port. A reviewer who sees a new port method knows a boundary moved; a reviewer who sees an adapter change knows one did not."
              }
            ]
          }
      ],
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
      series: { name: "Building the Agentic Stack", part: 4, of: 4, ref: "building-the-agentic-stack", position: 4 },
      tags: ["cue", "agentic", "configuration", "verification"],
      date: "2026-06-05",
      read: "12 min",
      charts: [
        {
            "id": "cue-three-targets",
            "kind": "fanout",
            "title": "One schema, three generated targets, and the gate on the way back",
            "note": "Prose states a fan-out in one sentence. What prose cannot show is the RETURN EDGE — the check that decides whether the three generated forms are still the schema's. That edge is the argument of this article; the fan-out on its own is just a picture of a build step.",
            "source": "The mechanism this article describes: one CUE schema is the source of truth and every target is generated from it, with `cue vet` plus a golden-file diff in CI, so a target that no longer matches what the schema generates fails the build. Drawn from the design this article argues for. No build-failure rate is claimed and none was measured — the figure asserts the shape of the check, not how often it fires.",
            "direction": "emit",
            "reveal": true,
            "origin": {
              "label": "one CUE schema",
              "sub": "typed and unified, version-controlled beside the code it governs"
            },
            "forms": [
              {
                "key": "json",
                "label": "JSON",
                "sub": "what the agent must emit, and what validates it"
              },
              {
                "key": "yaml",
                "label": "YAML",
                "sub": "the deployed configuration"
              },
              {
                "key": "go",
                "label": "Go types",
                "sub": "the compiler's copy of the same contract"
              }
            ],
            "check": {
              "verdict": "fails-build",
              "label": "cue vet + golden diff",
              "detail": "Drift is a build failure, not a review finding. A code review and a linter can both miss a generated file that somebody edited instead of regenerating."
            },
            "steps": [
              {
                "id": "emit",
                "lit": [
                  "json",
                  "yaml",
                  "go"
                ],
                "say": "Three targets, one source. This half is easy to state and easy to build, and on its own it guarantees nothing: three files generated once from one schema can still diverge the first time somebody edits one."
              },
              {
                "id": "gate",
                "lit": [
                  "check"
                ],
                "say": "The return edge is the guarantee. Regenerate, diff against what is committed, fail on a difference — which turns 'they cannot drift' from a promise into a build outcome."
              }
            ]
          },
        {
            "id": "wrong-manifest-loop",
            "kind": "cycle",
            "title": "The correction loop, and the only way out of it",
            "note": "Three stages and one exit — and the exit is the point. The way OUT of this loop is success: the output unifies, the guard lets it through, and it becomes an effect. Everything drawn inside the loop is the failure path, which is exactly the article's claim: this is normal, not exceptional.",
            "source": "This article's own paragraph, drawn: “After the model turn produces a tool call or a structured response, before the endpoint guard allows dispatch, the output is evaluated against the CUE schema for that tool … If the agent produced a Deployment with a missing selector, the evaluation fails with a specific field-level error. The call does not dispatch. The agent receives the error and can attempt correction on the next turn,” and its conclusion that this failure mode “is a normal part of the agentic loop.” NO TURN COUNT IS DRAWN AND NONE IS CLAIMED: the article does not say how many times round a correction takes, or that a limit on it exists, so this figure draws neither. A cycle has no number field at all — there is no duration, no length and no position here to get wrong.",
            "stages": [
              {
                "key": "turn",
                "label": "MODEL TURN",
                "via": "a tool call, or a structured response",
                "says": "The turn that produces the candidate. Nothing has been evaluated yet and nothing has touched the world — which is the only reason the rest of this loop is cheap."
              },
              {
                "key": "vet",
                "label": "CUE EVALUATION",
                "via": "schema and data unified in one pass, not validated in sequence",
                "says": "Unification, not a validator chain. Every overlapping constraint — the tool schema, the governance policy, the domain contract, the environment override — is evaluated together, so a conflict between two of them is reported rather than hidden by the order they ran in.",
                "exits": [
                  {
                    "key": "unifies",
                    "label": "IT UNIFIES",
                    "why": "The output and the schema merged into one value. This is the only exit from this loop, and it is the good one.",
                    "then": [
                      {
                        "key": "guard",
                        "label": "the endpoint guard allows dispatch",
                        "why": "Evaluation runs BEFORE the guard, so a malformed call never reaches the thing that decides whether a well-formed call is permitted."
                      },
                      {
                        "key": "effect",
                        "label": "the call becomes an effect",
                        "why": "The first point in the whole sequence at which anything is real."
                      }
                    ]
                  }
                ]
              },
              {
                "key": "err",
                "label": "A SPECIFIC FIELD-LEVEL ERROR",
                "via": "the field is named; the call does not dispatch",
                "says": "A Deployment with a missing selector fails with the missing field named. That specificity is what makes the next turn a correction rather than a retry — the model is not being asked to guess what went wrong."
              }
            ],
            "close": {
              "verdict": "bounded",
              "detail": "This is the article's whole point, and it is why the loop is drawn closed rather than as a chain that ends in a failure: the error goes back to the model and the model corrects it on the next turn. The expensive failure mode is the one that is NOT on this picture — a subtly wrong manifest that deployed successfully and caused an incident six days later. That path has no loop, because nothing in it ever came back."
            },
            "steps": [
              {
                "id": "inside",
                "lit": [
                  "turn",
                  "vet",
                  "err",
                  "close"
                ],
                "say": "Everything inside the loop is failure. The article's argument is that this is fine — a wrong manifest that earns an immediate, specific error is a normal turn, not an incident."
              },
              {
                "id": "out",
                "lit": [
                  "unifies",
                  "guard",
                  "effect"
                ],
                "say": "And the only exit is success. Nothing leaves this loop by giving up, timing out or being overridden, because none of those is in the mechanism the article describes."
              }
            ]
          }
      ],
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
      /* RETITLED. The old title was "Event-driven FinOps: 70% cloud spend cut
         without touching reliability". docs/specializations-claim-verdicts.md
         rules the savings percentage SELF-CONTRADICTED and says "publish no
         savings percentage"; Geoff approved dropping it. That verdict governed
         /specializations and articles were never gated by it — which did not
         matter while an article could not carry a figure. It carries one now,
         and a title sitting above a figure is that figure's caption. The
         replacement is the verdicts doc's own approved form: the lever is
         shutdown, not teardown. */
      title: "Event-driven FinOps: shutting it off, not tearing it down",
      tags: ["finops", "aws", "platform"],
      date: "2026-01-14",
      read: "11 min",
      charts: [
        {
            "id": "week-in-hours",
            "kind": "field",
            "title": "One non-production week, at the resolution the bill runs at",
            "note": "One square is one hour of one non-production environment; seven rows of twenty-four. The second state shuts the environment down outside a nine-hour weekday window and leaves it shut at weekends. Nothing is destroyed — the definition, the data and the DNS name all survive the night, which is the difference between shutting it off and tearing it down.",
            "source": "Arithmetic of the drawing and nothing else: 24 hours × 7 days = 168 squares standing; a nine-hour weekday window × 5 days = 45. Both are countable off the picture. NO PERCENTAGE IS PRINTED — a share of idle hours is not a share of spend, and this site publishes no savings percentage for this work. The nine-hour window is an illustration chosen to make the arithmetic checkable, not a measurement of any team's hours.",
            "unit": "one hour of one non-production environment",
            "reveal": true,
            "states": {
              "a": "left standing",
              "b": "shut outside the working window"
            },
            "classes": [
              {
                "key": "running",
                "label": "running, and billed",
                "tone": "on"
              },
              {
                "key": "off",
                "label": "shut down — the environment, not its definition",
                "tone": "off"
              }
            ],
            "groups": [
              {
                "label": "monday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "running",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "off",
                    "n": 6
                  }
                ]
              },
              {
                "label": "tuesday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "running",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "off",
                    "n": 6
                  }
                ]
              },
              {
                "label": "wednesday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "running",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "off",
                    "n": 6
                  }
                ]
              },
              {
                "label": "thursday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "running",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "off",
                    "n": 6
                  }
                ]
              },
              {
                "label": "friday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "running",
                    "n": 9
                  },
                  {
                    "a": "running",
                    "b": "off",
                    "n": 6
                  }
                ]
              },
              {
                "label": "saturday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 24
                  }
                ]
              },
              {
                "label": "sunday",
                "units": [
                  {
                    "a": "running",
                    "b": "off",
                    "n": 24
                  }
                ]
              }
            ],
            "readout": {
              "label": "billed environment-hours in one week",
              "prov": "calc",
              "cite": "24 × 7 = 168 standing; 9 × 5 = 45 with the window — count the solid squares"
            },
            "steps": [
              {
                "id": "idle",
                "lit": [
                  "off"
                ],
                "say": "Nights and weekends are the bulk of the week, and an idle environment is not a cheaper one: cost is active runtime, not resource existence."
              },
              {
                "id": "window",
                "lit": [
                  "running"
                ],
                "say": "What is left is the window somebody is actually working in. The lever is shutdown, not teardown — which is why this is reversible in one event and why nobody has to trust a rebuild at 9am."
              }
            ]
          }
      ],
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

Right-sizing accounts for a meaningful portion of the total savings on its own. But the larger impact comes from eliminating the idle hours entirely — an on-demand dev environment that runs four hours a day and is correctly-sized is paying for four hours, not for a week.

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

## Why the size of the win varies so much

How much this saves depends almost entirely on how idle the environments were to begin with, which is a property of the team rather than of the pattern. This site publishes no savings percentage for this work — the numbers that circulate for it disagree with each other and none carries a stated method. What can be said honestly is the shape of the variation:

- Teams with heavy weekend development activity see smaller savings, because the environments were legitimately in use.
- Teams with strict 9-to-5 working patterns and long-lived dev environments see savings closer to the high end.
- Organizations with globally distributed teams where "business hours" spans multiple time zones see the largest gains — idle detection catches the gap hours between shifts.

The savings accrue without any change to developer workflow for teams using PR-driven lifecycle. A developer opens a PR and the environment appears. The environment disappears when the PR closes. From the developer's perspective, the environment is always there when they need it. From the platform's perspective, it was idle for 18 hours last night and the bill reflects that.

That asymmetry — invisible to users, visible in spend — is what makes the pattern durable. It doesn't require behavior change. It requires infrastructure that aligns cost with actual use.`,
    },
  ],

  /* ---------- Project categories ---------- */
  /* A strict partition of `projects` derived from fields that already exist on
     them (owner × kind × roleId). Every project carries exactly one categoryId.
     `dek` is left empty on purpose — no category-level prose exists yet. */
  projectCategories: [
    { id: "personal-platform",   title: "Personal platform",   dek: "", order: 1 },
    { id: "open-source",         title: "Open source",         dek: "", order: 2 },
    { id: "agentic-systems",     title: "Agentic systems",     dek: "", order: 3 },
    { id: "cloud-infrastructure", title: "Cloud infrastructure", dek: "", order: 4 },
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      "id": "agentic-harness",
      "roleId": "paypal",
      "owner": "org",
      "title": "Agentic Coding Harness & Meta-Harness",
      "kind": "closed",
      "org": "PayPal / First Citizens Bank",
      "year": "2024 – present",
      "tags": [
        "agentic",
        "mcp",
        "platform",
        "governance",
        "devsecops",
        "developer-experience"
      ],
      "summary": "A harness is the governed environment an agent works inside: it carries one organisation's approved toolchain, required testing layers, commit hooks and deployment patterns, so following the standards is the shape of the workspace rather than something a person remembers. The meta-harness builds harnesses — which is the part that scales, because a governed environment only helps if every team can have one.",
      "problem": "Compliance degrades with distance from whoever wrote the rule, and every deterministic question — is this library approved, are the right test layers here, is this deployment shaped correctly — was being answered by a serial human round trip. Throughput was capped by specialist availability, not by typing speed.",
      "impact": "Approved tooling read from the platform's own docs, not guessed · every required test layer enforced · hooks installed rather than documented · deployment and cloud practice from the golden path · conformance decided at the promotion borders instead of in review.",
      "stack": [
        "Claude Code",
        "MCP",
        "Confluence MCP",
        "CUE",
        "Go",
        "Python",
        "Terraform",
        "OPA"
      ],
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "charts": [
        {
          "id": "harness-model",
          "kind": "diagram",
          "component": "HarnessDiagram",
          "title": "The harness, and the thing that builds harnesses",
          "note": "A harness is the governed environment one team's agents work inside. The meta-harness builds harnesses — which is the part that matters, because a governed environment only helps if every team can have one. Click any box."
        },
        {
          "id": "borders",
          "kind": "gateflow",
          "title": "Deterministic compliance at the promotion borders",
          "note": "A standard enforced inside a stage is advice. A standard enforced on the way out of one is a gate. The harness installs the gate on every border a change crosses, so conformance is decided by something that runs rather than by someone remembering to look.",
          "stages": [
            {
              "id": "local",
              "label": "Local",
              "sub": "developer + agent"
            },
            {
              "id": "commit",
              "label": "Commit",
              "sub": "on the machine"
            },
            {
              "id": "pr",
              "label": "Pull request",
              "sub": "CI"
            },
            {
              "id": "main",
              "label": "Main",
              "sub": "release candidate"
            },
            {
              "id": "prod",
              "label": "Production",
              "sub": "cloud"
            }
          ],
          "gates": [
            {
              "id": "g1",
              "label": "pre-commit",
              "title": "Local → Commit",
              "border": "installed by the harness, runs on the machine",
              "detail": "The cheapest border to hold, and the one teams most often leave to good intentions. The harness installs the hook set rather than documenting it, so the check exists on every clone without anyone opting in.",
              "checks": [
                {
                  "what": "formatting + lint",
                  "why": "so review never spends attention on it"
                },
                {
                  "what": "secret scan",
                  "why": "the one class of mistake that cannot be undone after it leaves the machine"
                },
                {
                  "what": "dependency allow-list",
                  "why": "an unapproved package fails here, seconds after it is added, not days later in a review thread"
                },
                {
                  "what": "commit message / traceability",
                  "why": "a change that cannot be traced to intent cannot be audited later"
                }
              ]
            },
            {
              "id": "g2",
              "label": "tests",
              "title": "Commit → Pull request",
              "border": "every layer this kind of service requires",
              "detail": "Testing standards usually fail not because tests are absent but because the wrong layers are present — plenty of unit tests, no contract test, and an integration suite nobody ran. The harness knows which layers this service type owes and requires all of them.",
              "checks": [
                {
                  "what": "required layers present",
                  "why": "unit, integration, contract and end-to-end as the service type demands, not as the author felt like writing"
                },
                {
                  "what": "coverage where it is meaningful",
                  "why": "applied to the layers where it means something rather than as one number across everything"
                },
                {
                  "what": "tests actually exercise the change",
                  "why": "a suite that passes without touching the new code is a green light with nothing behind it"
                }
              ]
            },
            {
              "id": "g3",
              "label": "policy + evidence",
              "title": "Pull request → Main",
              "border": "policy-as-code, and the artifacts an approval needs",
              "detail": "The border where an organisation's governance normally turns into a queue. The change arrives carrying its own evidence, generated as structured artifacts rather than written by hand afterwards, so the human review is about design instead of paperwork.",
              "checks": [
                {
                  "what": "infrastructure plan checked against policy",
                  "why": "the plan is evaluated before merge, not discovered at deploy"
                },
                {
                  "what": "architecture and logging artifacts generated",
                  "why": "review boards get a consistent artifact instead of a document each author invents"
                },
                {
                  "what": "approved toolchain re-verified",
                  "why": "the allow-list is read from the platform's own documentation, so it cannot drift from what the platform actually approves"
                },
                {
                  "what": "agent-authored changes carry their reasoning",
                  "why": "an approver can see what was intended, not just what was produced"
                }
              ]
            },
            {
              "id": "g4",
              "label": "deploy patterns",
              "title": "Main → Production",
              "border": "cloud and deployment practice, automated",
              "detail": "The last border, and the one where hand-rolled variation is most expensive. Deployment shape comes from the golden path rather than from whatever the last service happened to do.",
              "checks": [
                {
                  "what": "deployment pattern from the golden path",
                  "why": "rollout, health gating and rollback are the platform's, not each team's re-derivation"
                },
                {
                  "what": "tagging, encryption and network posture",
                  "why": "the cloud controls that audits ask about, enforced before the resource exists"
                },
                {
                  "what": "cost guardrails",
                  "why": "the shape that avoids a surprise line item, applied at creation instead of found in a bill"
                },
                {
                  "what": "observability wired in",
                  "why": "a service that ships without signal is a service nobody can operate"
                }
              ]
            }
          ],
          "source": "Mechanism described at the level of what the gates enforce. Employer-internal specifics are deliberately absent."
        }
      ],
      "subpages": [
        {
          "id": "enforces",
          "kind": "custom",
          "title": "What a harness enforces",
          "charts": [
            { "id": "borders" }
          ],
          "body": "Compliance usually degrades with distance from whoever wrote the rule. It is\ntransmitted at onboarding, reinforced in review when someone happens to notice,\nand audited long after the code shipped. A harness moves it from memory into\nmechanism.\n\n## Only approved tooling — read from the platform's own docs\n\nA model reaching for a library has seen the popular one a million times in\ntraining and the organisation's standardised one approximately never. Left\nalone it will confidently pick the wrong thing, and the wrongness surfaces at\nreview, at security sign-off, or in production.\n\nThe harness researches the platform's documentation through the **Confluence\nMCP** and constrains generation to what the organisation has actually approved.\nThis matters more than a static allow-list: the approved set is a living\ndocument owned by the platform organisation, so reading it means the harness\ntracks approvals as they change instead of encoding a snapshot that starts\nrotting the day it is written.\n\nThe check then runs at the pre-commit border, which is the difference between\nfinding out in seconds and finding out in a review thread three days later.\n\n## Testing standards, at every layer the service owes\n\nTesting standards rarely fail because tests are missing. They fail because the\nwrong layers are present — a large unit suite, no contract test against the\nservice this thing actually calls, and an integration suite that has not run\nsince it was written.\n\nThe harness knows which layers a given kind of service owes and requires all of\nthem, applies coverage where coverage means something, and checks that the tests\nexercise the change rather than passing beside it. A suite that goes green\nwithout touching the new code is a signal with nothing behind it, and that is\nworse than no signal, because people trust it.\n\n## Commit hooks, installed rather than documented\n\nHooks are the cheapest enforcement available and the most commonly skipped,\nbecause installing them is a manual step in a README that a fresh clone does not\nperform. The harness installs the set — formatting, lint, secret scanning,\ndependency allow-list, traceability — so the check exists on every clone with\nnobody opting in.\n\nSecret scanning is the one that justifies the whole mechanism on its own: it is\nthe single class of mistake that cannot be taken back once it crosses the\nborder.\n\n## Deployment and cloud practice, from the golden path\n\nRollout strategy, health gating, rollback, tagging, encryption, network posture,\ncost guardrails and observability are all things every team re-derives, slightly\ndifferently, and slightly wrong. The harness takes them from the platform's\ngolden path so the deployment shape is the platform's answer rather than each\nteam's reconstruction of it.\n\n## Evidence generated, not written afterwards\n\nArchitecture and logging documentation are produced as structured artifacts from\nthe change itself, so an approval board receives a consistent artifact instead of\na document each author invents under deadline. Governance stops being a queue\nand becomes something a change arrives already carrying."
        },
        {
          "id": "meta",
          "kind": "custom",
          "title": "The meta-harness",
          "charts": [
            {
              "id": "harness-model",
              "kind": "diagram",
              "component": "HarnessDiagram",
              "title": "The harness, and the thing that builds harnesses",
              "note": "A harness is the governed environment one team's agents work inside. The meta-harness builds harnesses — which is the part that matters, because a governed environment only helps if every team can have one. Click any box."
            }
          ],
          "body": "The harness is the obvious idea. The meta-harness is the one that makes it work\nat more than one team.\n\n## Why building harnesses has to be cheap\n\nA governed environment built by hand takes real effort — someone has to encode\nthe standards, wire the hooks, express the test matrix, encode the deployment\npatterns, and keep all of it current. Do that once and you have helped one team.\nDo it for twelve and you have created a full-time department that nobody\nbudgeted for, whose output goes stale the moment the standards move.\n\nSo the interesting artifact is not any individual harness. It is the thing that\nwrites them: the meta-harness reads the organisational standards, the platform\ndocumentation and a team's own conventions, and produces that team's harness.\n\n## What that changes\n\n- **Coverage stops being political.** When a harness is expensive, the team that\n  gets one is the team that escalated. When it is cheap, every team gets one, and\n  the standards apply where they were always supposed to apply.\n- **A policy change becomes a regeneration.** In the usual model a new control\n  costs an announcement, a wiki edit, a quarter of drift and a follow-up audit.\n  Here it costs a rebuild, and the next change any team makes is already\n  compliant with it.\n- **Local difference survives.** Team conventions stay an explicit input, so a\n  shared harness does not flatten every team into one house style. Repository\n  shape and required test layers legitimately differ; security and compliance\n  requirements do not.\n- **The standards get read rather than remembered.** Because the inputs are the\n  organisation's own living documents, the harness reflects what the platform\n  currently approves rather than what someone believed at authoring time.\n\n## The honest limit\n\nNone of this makes an agent correct. It makes an agent's output *conformant*,\nand it makes non-conformance fail early and cheaply. Design judgement, whether\nthe thing being built is the right thing at all, and whether a test suite is\nactually testing the risk — those remain human, and the point of removing\nconformance work from a reviewer's attention is to give it back to exactly those\nquestions."
        },
        {
          "id": "speed",
          "kind": "custom",
          "title": "Why this makes people faster",
          "body": "The throughput claim on this page is not \"the model writes code faster.\" It is\nthat most of a change's elapsed life is not spent writing it.\n\n## What was actually in the path\n\nA change of any consequence in a regulated organisation waits on a series of\nserial, human answers, most of which have a deterministic answer that nobody had\nmade deterministic:\n\n- Is this library allowed? — a question for a platform or security specialist,\n  answered in a thread, sometimes days later.\n- Are the right tests here? — discovered at review, by whoever happened to know\n  what this service type owes.\n- Are the hooks installed? — usually not, and nobody notices until something\n  slips past.\n- Is this deployment shaped correctly? — re-derived per team, checked at deploy\n  time or after.\n- Where is the architecture document the board needs? — written by hand,\n  afterwards, under deadline.\n\nEvery one of those is a round trip, and every round trip is a context switch for\ntwo people. The specialist bottleneck is real, and it is not a knowledge problem\n— it is a *serialisation* problem.\n\n## What the harness removes\n\nEach of those questions is answered by a gate that runs, at the border where the\nanswer matters. The unapproved package fails in seconds on the developer's own\nmachine. The missing test layer never reaches review. The hook is already\ninstalled. The deployment pattern comes from the golden path. The board's\nartifact arrives with the change.\n\nNone of that is faster typing. It is the removal of waiting, and of the rework\nthat follows a late no.\n\n## What is left for the humans\n\nReviewer attention moves off conformance and onto design — which is the only\npart that needed a person, and the part that was getting the least attention\nprecisely because conformance was consuming the review.\n\nThat is also why this is worth building carefully rather than quickly. A gate\nthat is wrong is worse than no gate: it teaches people to route around it, and a\nrouted-around gate is a false assurance that an auditor will eventually find."
        }
      ]
    },
    {
      "id": "landing-zone",
      "roleId": "fcb",
      "owner": "org",
      "title": "100-Account AWS Landing Zone",
      "kind": "pro",
      "org": "First Citizens Bank",
      "year": "2021 – 2025",
      "tags": [
        "aws",
        "landing-zone",
        "ffiec",
        "pci-dss",
        "soc2"
      ],
      "summary": "Multi-account AWS architecture with Transit Gateway, centralized logging, and policy-as-code compliance gates. 30+ dev teams onboard in an afternoon.",
      "problem": "Banking workloads required continuous FFIEC / PCI-DSS / SOC 2 compliance across 100+ AWS accounts with no dedicated account-per-team bottleneck.",
      "impact": "100+ accounts · 30% YoY spend cut · audit trails zero-cost.",
      "stack": [
        "AWS Organizations",
        "Transit Gateway",
        "Terraform",
        "OPA",
        "Sentinel"
      ],
      "categoryId": "cloud-infrastructure",
      "architecture": null,
      "decisions": [],
      "subpages": []
    },
    {
      "id": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "title": "Command Center Agentic Tooling",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "tags": [
        "agentic",
        "sre",
        "incident-management",
        "mcp",
        "platform",
        "governance"
      ],
      "summary": "Five tools that are only interesting together. One corpus — service code, infrastructure- and config-as-code, docs and runbooks — is read once and becomes two things: expert systems a duty officer can question during a live incident, and a catalogue of failure modes found before one fires. The findings are written back into the expert systems, which is what makes the assistant useful at 3am rather than merely knowledgeable.",
      "problem": "During a Sev1 the thing nobody can find is what the system is supposed to be. That intent is sitting in infrastructure- and config-as-code the whole time, and it is unreadable at speed by a human under pressure. Meanwhile the failure modes that cause those incidents — synchronized retries, timeout inversions, unbounded queues — are visible in that same configuration long before they fire, and nothing was reading it.",
      "impact": "Expert systems built from code and declared configuration, not curated by hand · queried individually or fanned across a cluster when an incident crosses service boundaries · a failure-mode catalogue written back into the systems that answer during the incident · every finding traceable to the line that produced it.",
      "stack": [
        "Python",
        "Go",
        "Claude Code",
        "MCP",
        "CUE",
        "PagerDuty",
        "AWS",
        "Kubernetes"
      ],
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "charts": [
        {
          "id": "SuiteDiagram",
          "kind": "diagram",
          "component": "SuiteDiagram",
          "title": "How the five pieces tie together",
          "note": "Read the middle row left to right: one corpus becomes expert systems, which a backend serves. The interesting edge is the dashed one coming back — the readiness scan writes its findings INTO the expert systems, so the assistant already knows what is fragile before anyone asks. Click any box."
        }
      ],
      "subpages": [
        {
          "id": "why-suite",
          "kind": "custom",
          "title": "Why a suite and not a tool",
          "charts": [
            { "id": "SuiteDiagram" }
          ],
          "body": "Each of these five could be a product on its own, and that is exactly why\nthe interesting question is what they share. They share a corpus, and they share\na rule about evidence. Everything else follows.\n\n## One reading, two products\n\nThe expensive part of all of this is reading a large estate's code, declared\ninfrastructure and documentation well enough to say something true about it.\nHaving paid that cost, you get two very different things out of the same\nreading:\n\n- an **expert system** that can answer questions about a service during an\n  incident, and\n- a **findings catalogue** of the failure modes that configuration implies.\n\nMost organisations build one or the other, from separate ingestions, owned by\nseparate teams, and then discover the two disagree. Building them from a single\nextraction means they cannot.\n\n## The edge that makes it work\n\nThe dashed line on the diagram — readiness findings flowing back into the expert\nsystems — is the part I would defend hardest in an interview.\n\nAn assistant that has read the code can tell you what a service does. An\nassistant that has also been told *this service retries three times with no\njitter, and its caller's timeout is shorter than its own* can tell you what is\nprobably happening right now. The first is a search engine with better manners.\nThe second is worth waking up for.\n\nThat only works if the findings and the answers come from the same substrate.\nBolting a separate risk register onto a separate chatbot gives you two things a\nduty officer has to consult and reconcile at 3am, which in practice means they\nconsult neither.\n\n## Why the boundaries are where they are\n\nThe split is not arbitrary — each boundary is somewhere the pieces genuinely\nhave different lifecycles:\n\n- The **builder** changes when the shape of the corpus changes: a new language,\n  a new infrastructure tool, a new documentation source.\n- The **backend** changes when access patterns change: a new consumer, a new\n  query shape, a new isolation requirement.\n- The **readiness scan** changes when we learn a new failure mode — which is\n  frequently, and which should never require touching the builder.\n- The **dashboard** changes with how incidents are actually run, which is a\n  human-process question and moves on its own clock entirely.\n- The **foundations** change slowest of all, which is why they are the bedrock\n  and not a layer in the middle.\n\nA single tool with all five concerns inside it would be recompiled every time\nany of those moved.\n\n## What it is not\n\nIt is not autonomous remediation. Nothing here takes an action on production.\nThe expert systems recommend and cite; the dashboard organises humans; the\nreadiness scan reports. That boundary is deliberate, and the path past it is\nearned against a track record of recommendations that turned out to be right —\nnot granted because the demo went well."
        }
      ]
    },
    {
      "parentId": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "id": "es-builder",
      "title": "Expert System Builder",
      "suiteRole": "Builds the expert systems",
      "suiteLine": "Compiles code, declared infrastructure and documentation into a queryable expert system, with every claim anchored to the line it came from.",
      "tags": [
        "agentic",
        "mcp",
        "code-intelligence",
        "governance"
      ],
      "summary": "Compiles a corpus — service code, infrastructure- and config-as-code, architecture docs and runbooks — into an expert system for one service or domain. Every extracted claim is anchored to the file and line that produced it at extraction time, so provenance is bookkeeping rather than reconstruction.",
      "problem": "A hand-curated knowledge base covers the service someone had time to curate, and is stale by the second week. Across a large estate that means the services most likely to surprise you are the ones nobody wrote up.",
      "impact": "Point it at a scope and get an expert system · no hand curation · citations captured at extraction, not retrofitted · rebuilt when the source changes rather than when someone remembers.",
      "stack": [
        "Python",
        "Go",
        "tree-sitter",
        "MCP",
        "CUE"
      ],
      "charts": [
        {
          "id": "ExpertBuilderDiagram",
          "kind": "diagram",
          "component": "ExpertBuilderDiagram",
          "title": "Corpus in, cited expert system out",
          "note": "The pipeline is deliberately boring. What matters is that the citation is attached where the fact is extracted — retrofitting provenance onto a finished answer is guesswork. Click any box."
        },
        {
          "id": "extracts",
          "kind": "cards",
          "title": "Three things extracted separately, on purpose",
          "note": "Because the most valuable signal is where they disagree.",
          "cards": [
            {
              "tone": "cyan",
              "label": "From the code",
              "what": "Symbols, call edges, dependency direction, error handling and retry logic.",
              "why": "What the service will actually do when a call fails."
            },
            {
              "tone": "pink",
              "label": "From the configuration",
              "what": "Declared resources and their settings: replicas, timeouts, pool sizes, scaling rules, network placement.",
              "why": "What the live environment is supposed to be — the intent nobody can locate during an incident."
            },
            {
              "tone": "amber",
              "label": "From the documentation",
              "what": "The claims the runbooks and architecture docs make about behaviour and ownership.",
              "why": "What humans believe, which is the third thing that can be wrong."
            }
          ]
        }
      ],
      "subpages": [
        {
          "id": "disagreement",
          "kind": "custom",
          "title": "The value is in the disagreement",
          "body": "Extracting code, configuration and documentation into one place is only\nhalf of it. The half that pays is comparing them.\n\n## Three sources, three ways to be wrong\n\nA service has three descriptions of itself and they drift independently. The\ncode says what it does. The configuration says what it is supposed to be running\nas. The documentation says what a human believed on the day they wrote it.\n\nAny pair of those disagreeing is interesting:\n\n- **Docs vs. configuration** — a runbook describing a retry policy the\n  configuration does not implement. The runbook will be followed during an\n  incident, and it is wrong.\n- **Code vs. configuration** — a client that retries internally, deployed with a\n  platform-level retry on top of it. Neither is wrong alone; together they are a\n  multiplier nobody chose.\n- **Docs vs. code** — an ownership claim that has not been true since a\n  reorganisation. Discovered at 3am, while paging someone who left.\n\n## Why this is hard to do by reading\n\nNone of these are visible in a code review, because no individual file looks\nwrong. The retry in the client is reasonable. The platform retry is reasonable.\nThe timeout is reasonable. The failure is in the composition, and the\ncomposition is spread across a repository, a Helm chart and a service mesh\npolicy that three different teams own.\n\nExtraction into a common form is what makes the comparison mechanical instead of\ndepending on one engineer who happens to hold all three in their head.\n\n## Citations at extraction time\n\nEvery observation carries the file and line it came from, captured when it is\nextracted rather than reconstructed when it is cited.\n\nThis sounds like a detail and is the whole difference between a tool people may\nact on and a tool people may only consult. A duty officer given a recommendation\nunder time pressure has exactly one question — *how do you know that* — and an\nanswer that resolves to a line in a Helm chart is actionable in seconds. An\nanswer that cannot be resolved is correctly ignored, no matter how good it was."
        }
      ]
    },
    {
      "parentId": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "id": "es-backend",
      "title": "Expert System Backend",
      "suiteRole": "Hosts and serves them",
      "suiteLine": "Serves queries against one expert system, or fans a single question across a cluster of them when an incident crosses service boundaries.",
      "tags": [
        "agentic",
        "mcp",
        "platform",
        "sre"
      ],
      "summary": "Hosts the expert systems and answers questions against them — one at a time when the question is scoped to a service, or fanned across a cluster and reconciled when it is not. Every fragment of a reconciled answer keeps its own provenance.",
      "problem": "One giant index answers vaguely about everything. A per-service index answers precisely and then cannot follow a question across a boundary — which is exactly what real incidents do, because the symptom is in one service and the cause is in its dependency.",
      "impact": "Scoped systems keep answers precise · cluster query follows an incident across the blast radius · reconciled answers keep per-fragment citations · scope is an access boundary as well as a quality one.",
      "stack": [
        "Go",
        "Python",
        "MCP",
        "Kubernetes"
      ],
      "charts": [
        {
          "id": "modes",
          "kind": "cards",
          "title": "Two query modes, and why both are needed",
          "cards": [
            {
              "tone": "cyan",
              "label": "Single system",
              "what": "A question scoped to one service or domain, answered from that scope's code, configuration, docs and findings.",
              "why": "Precise, fast, and cheap. The right shape for most questions."
            },
            {
              "tone": "pink",
              "label": "Cluster fan-out",
              "what": "One question dispatched across the systems in the blast radius, with the answers reconciled rather than blended.",
              "why": "The shape an incident actually has: symptom here, cause one hop away."
            },
            {
              "tone": "amber",
              "label": "Reconciled, not merged",
              "what": "Each fragment of the answer keeps the system and the line it came from.",
              "why": "A merged answer you cannot decompose is one you cannot check."
            },
            {
              "tone": "purple",
              "label": "Scope as a boundary",
              "what": "The scoping that keeps answers sharp is also the unit of access control.",
              "why": "Not everyone should be able to query everything, and one index makes that impossible to express."
            }
          ]
        }
      ],
      "subpages": [
        {
          "id": "cluster",
          "kind": "custom",
          "title": "Why cluster query is the interesting part",
          "body": "Serving one expert system is unremarkable. Serving a question that does not\nrespect a service boundary is the capability that incidents need.\n\n## Incidents do not stay in one scope\n\nThe shape of almost every serious incident is the same: the symptom appears in\nthe service you are looking at, and the cause is one or two hops away in\nsomething you are not. The checkout latency is real, the checkout service is\nhealthy, and the thing that changed is a connection pool setting in a dependency\nthat nobody on the bridge owns.\n\nA per-service expert system answers beautifully about checkout and cannot tell\nyou that. A single flattened index across the whole estate can technically tell\nyou, in the sense that the information is in there somewhere, alongside\neverything else, weighted by nothing useful.\n\n## Fan out, then reconcile\n\nThe answer is to keep the systems scoped and make the *query* cross boundaries:\ndispatch the question to the systems in the blast radius, get an answer from\neach, and reconcile them.\n\nReconcile, not merge. A merged answer reads better and cannot be checked. A\nreconciled one keeps each fragment attributed to the system and the line it came\nfrom, which means a duty officer can see that the checkout answer came from the\ncheckout configuration and the pool-size answer came from somewhere else — and\ncan go look.\n\n## What \"in the blast radius\" means\n\nThe dependency direction is already extracted from the code, so the set of\nsystems to ask is derived rather than guessed. That is the payoff for having\nbuilt dependency edges into the corpus in the first place: fan-out has a\nprincipled boundary instead of being \"ask everything and hope.\"\n\n## The boundary is also a permission\n\nKeeping scopes separate is not only a quality decision. It is how you express\nthat a given consumer may query some domains and not others — a requirement that\narrives immediately in a regulated organisation, and one that a single flattened\nindex simply cannot represent."
        }
      ]
    },
    {
      "parentId": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "id": "readiness-inventory",
      "title": "Readiness Inventory",
      "suiteRole": "Finds the incident before it fires",
      "suiteLine": "Scans the same corpus for failure modes that live in configuration rather than in code, and writes the findings back into the expert systems.",
      "tags": [
        "sre",
        "incident-management",
        "governance",
        "iac"
      ],
      "summary": "Scans infrastructure- and config-as-code alongside the docs for the failure modes that cause incidents but are invisible in a code review — synchronized retries, timeout inversions, unbounded queues, single points of failure. Findings are written back into the expert systems, so the assistant answering during an incident already knows what is fragile.",
      "problem": "The failure modes that take down large systems are almost never in one file. They are in the composition: a client retry multiplied by a platform retry, a caller timeout shorter than its callee's, a cache with one TTL and no jitter. No individual file looks wrong, so review never catches them.",
      "impact": "Failure modes detected from declared configuration before they fire · findings written into the expert systems, so they are available during the incident and not only in a report · the same catalogue doubles as a fix list for the owning teams.",
      "stack": [
        "Python",
        "Go",
        "CUE",
        "OPA",
        "Terraform",
        "Kubernetes"
      ],
      "charts": [
        {
          "id": "modes",
          "kind": "cards",
          "title": "Failure modes visible in configuration, before they fire",
          "note": "Each of these is detectable from declared configuration and effectively invisible in a per-file code review, because no single file is wrong. That gap is the reason this tool exists.",
          "min": 240,
          "cards": [
            {
              "tone": "amber",
              "label": "Retry with no backoff",
              "what": "A proxy or client that retries immediately, with no exponential backoff and no jitter — the single most common one, and the easiest to see in config.",
              "why": "Its first slow dependency turns every caller into a load generator against the thing that was already struggling."
            },
            {
              "tone": "amber",
              "label": "Thundering herd",
              "what": "Retries, cron schedules or cache expiries synchronized across instances, so recovery happens everywhere at the same instant.",
              "why": "The system comes back all at once and immediately re-breaks whatever it was waiting on."
            },
            {
              "tone": "amber",
              "label": "Retry multiplication",
              "what": "Retries configured at more than one layer — client, gateway and service each retrying three times.",
              "why": "Each layer is reasonable alone; composed, one request becomes twenty-seven."
            },
            {
              "tone": "pink",
              "label": "Timeout inversion",
              "what": "A caller's timeout shorter than the callee's own.",
              "why": "The caller gives up and retries while the callee is still working on the abandoned request."
            },
            {
              "tone": "pink",
              "label": "No backpressure",
              "what": "Unbounded queues or missing rate limits between a fast producer and a slower consumer.",
              "why": "Load is absorbed until memory runs out, converting a slowdown into an outage."
            },
            {
              "tone": "cyan",
              "label": "Cache stampede",
              "what": "A single TTL with no jitter, early recompute or single-flight lock.",
              "why": "Every miss goes to the origin at the same instant, on the worst possible day."
            },
            {
              "tone": "cyan",
              "label": "Single point of failure",
              "what": "One replica, one availability zone, one NAT, one credential nobody has rotated.",
              "why": "The architecture diagram says redundant; the configuration says otherwise."
            },
            {
              "tone": "purple",
              "label": "Missing circuit breaker",
              "what": "A dependency call with no breaker and no bulkhead.",
              "why": "A slow dependency becomes a thread pool exhaustion becomes an outage in a service that is itself fine."
            },
            {
              "tone": "purple",
              "label": "Pool exhaustion",
              "what": "Connection or thread pools sized below the concurrency the scaling rules permit.",
              "why": "The service scales up and starves itself, so the fix looks like it made things worse."
            }
          ],
          "source": "Illustrative of the class of check; the deployed catalogue is employer-internal."
        }
      ],
      "subpages": [
        {
          "id": "writeback",
          "kind": "custom",
          "title": "Findings that arrive during the incident",
          "body": "A risk register nobody opens during an incident is a document, not a control.\nThe design decision that matters here is where the findings go.\n\n## The usual shape, and why it fails\n\nMost readiness work produces a report. The report is reviewed, prioritised into\na backlog, and consulted approximately never — certainly not at 03:14 on a\nSaturday by someone who has been awake for four minutes and is trying to work\nout why checkout is timing out.\n\nSo the findings are not filed as a report. They are written back into the expert\nsystem for the scope they belong to, which is the thing the duty officer is\nalready talking to.\n\n## What that changes at 3am\n\nWithout it, the assistant answers: *this service calls the payments API, here is\nits timeout configuration.* Accurate and unhelpful.\n\nWith it: *this service calls the payments API with a two-second timeout, which is\nshorter than the payments API's own five-second timeout, and it retries three\ntimes with no jitter. If payments is slow, this service is generating four\ntimes its normal load against it right now.*\n\nThe second answer is not smarter. It has just been told something a scan worked\nout weeks ago, at a moment when nobody has time to work it out again.\n\n## The same catalogue is a fix list\n\nThe findings also go back to the teams that own the configuration, which makes\nthis a prevention loop rather than only a response one. The cheapest incident is\nthe one that never fires, and a finding with a file, a line and a named failure\nmode is a fixable ticket rather than a vague reliability initiative.\n\n## The honest limit\n\nThis finds failure modes that are *declared*. A resource created outside the\ndeclared configuration, a setting changed by hand in a console, a behaviour that\nexists only at runtime — those are outside what a configuration scan can see,\nand the catalogue does not pretend otherwise. Claiming a scan of intent is a\nscan of reality is exactly the kind of overreach that makes an SRE org stop\ntrusting a tool."
        }
      ]
    },
    {
      "parentId": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "id": "incident-command",
      "title": "Incident Command Dashboard",
      "suiteRole": "Runs the response",
      "suiteLine": "Real-time coordination for a live incident: investigation lanes and their owners, action items, who has been paged and actually joined, and current customer impact.",
      "tags": [
        "sre",
        "incident-management",
        "platform"
      ],
      "summary": "Real-time organisation of a live incident. Investigation lanes with named owners and state, action items attached to the lane that produced them, paging status that distinguishes sent from acknowledged from actually present, and a maintained statement of current customer impact.",
      "problem": "The part of a large incident that most often fails is not the diagnosis, it is the coordination. Two engineers investigate the same dependency while nobody looks at the one that matters, a critical owner is paged but never joins, an action item is assumed to be someone else's, and the incident commander answers 'what is the impact right now' every time somebody new arrives.",
      "impact": "Investigation lanes owned rather than assumed · paged, acknowledged and joined tracked as three different states · action items attached to the lane that produced them · impact maintained once instead of re-answered on every join · the post-incident timeline written as decisions are made.",
      "stack": [
        "Python",
        "TypeScript",
        "PagerDuty",
        "AWS"
      ],
      "charts": [
        {
          "id": "IncidentDashboardDiagram",
          "kind": "diagram",
          "component": "IncidentDashboardDiagram",
          "title": "What the responders are actually looking at",
          "note": "A wireframe — the deployed thing is employer-internal, and the layout is what carries the idea. Each panel exists because of a specific way large incidents go wrong. Click any panel."
        }
      ],
      "subpages": [
        {
          "id": "coordination",
          "kind": "custom",
          "title": "Coordination is the failure mode",
          "body": "Every panel on this dashboard exists because of a specific, repeatable way a\nlarge incident wastes time. None of them are about diagnosis.\n\n## Lanes, because unowned work is duplicated work\n\nIn the first thirty minutes of a big incident, several capable people start\ninvestigating, independently, with no shared picture of who is looking at what.\nThe predictable result is two engineers checking the same dependency while the\none that matters goes unexamined, and a fifteen-minute gap before anyone\nrealises.\n\nMaking the lanes explicit — with a named owner and a state — turns \"is anybody\non this?\" from a question shouted into a bridge into something visible.\n\n## Paged, acknowledged and joined are three different states\n\nMost tooling collapses these. An acknowledgement means a device woke somebody;\nit does not mean they are on the call, and it certainly does not mean they are\nawake enough to be useful.\n\nThe gap between acknowledged and joined is where incidents quietly stall,\nbecause it looks identical to help having arrived. Showing the three separately\nmeans the commander can escalate on the right signal instead of discovering\ntwenty minutes later that the database expert acknowledged and went back to\nsleep.\n\n## Impact, maintained rather than re-answered\n\nEvery executive who joins a Sev1 asks the same first question: what is the\nimpact right now. Answering it is not hard; answering it eleven times, from the\nincident commander, while they are also running the incident, is a real tax on\nthe person least able to pay it.\n\nHolding a current impact statement in one visible place converts that from an\ninterruption into a glance.\n\n## Action items belong to the lane that produced them\n\nA decision made in a lane, captured in that lane, with an owner and a state.\nTwo consequences: nothing is assumed to be someone else's, and the\npost-incident timeline writes itself — because the decisions were recorded when\nthey were made rather than reconstructed afterwards from a chat scrollback by\nsomebody who was not there.\n\n## What it deliberately does not do\n\nIt does not diagnose, and it does not act. Diagnosis is what the expert systems\nare for; action stays with the humans on the bridge. A coordination surface that\nstarts making technical claims is a coordination surface people stop trusting\nfor coordination."
        }
      ]
    },
    {
      "parentId": "commandcenter-tools",
      "roleId": "paypal",
      "owner": "org",
      "kind": "closed",
      "org": "PayPal",
      "year": "2025 – present",
      "categoryId": "agentic-systems",
      "architecture": null,
      "decisions": [],
      "id": "agentic-foundations",
      "title": "Agentic Foundations",
      "suiteRole": "The bedrock under all of it",
      "suiteLine": "The agentic and data engineering substrate that makes evidence, determinism and reproducibility properties of the system rather than aspirations.",
      "tags": [
        "agentic",
        "governance",
        "verification",
        "mcp"
      ],
      "summary": "The substrate the other four are built on. Every finding and every answer is sourced to evidence; anything that can be deterministic is deterministic; and a rebuild of the same corpus produces the same result. In a regulated environment these are not quality preferences — they are what makes the output usable at all.",
      "problem": "An assistant that cannot show its work is one nobody is permitted to act on during a Sev1. A findings catalogue nobody can audit is one nobody will act on. Most agentic tooling treats evidence as a presentation concern and discovers too late that it was an architectural one.",
      "impact": "Provenance captured at extraction, not reconstructed at answer time · deterministic wherever determinism is possible, with the model confined to the parts that genuinely need judgement · reproducible rebuilds · the reasoning behind an answer inspectable rather than asserted.",
      "stack": [
        "Go",
        "Python",
        "CUE",
        "MCP",
        "Claude Code"
      ],
      "charts": [
        {
          "id": "principles",
          "kind": "cards",
          "title": "The properties everything else inherits",
          "note": "Each of these is cheap if it is designed in and effectively unattainable if it is added later — which is the argument for calling them foundations rather than features.",
          "min": 250,
          "cards": [
            {
              "tone": "cyan",
              "label": "Evidence, or it does not ship",
              "what": "Every observation carries the file and line it came from, captured at extraction.",
              "why": "Retrofitting citations onto a produced answer is guesswork wearing a footnote."
            },
            {
              "tone": "pink",
              "label": "Deterministic by default",
              "what": "Parsing, extraction, dependency resolution and the failure-mode checks are ordinary code. The model is confined to the parts that genuinely need judgement.",
              "why": "Every non-deterministic step is one you cannot test, and a pipeline of them is one you cannot debug."
            },
            {
              "tone": "amber",
              "label": "Reproducible rebuilds",
              "what": "The same corpus produces the same expert system.",
              "why": "Without it you cannot tell a real change in the system from a change in the model's mood."
            },
            {
              "tone": "purple",
              "label": "Scoped, not flattened",
              "what": "Knowledge is partitioned by service or domain, and questions cross scopes explicitly.",
              "why": "Scope is what keeps answers precise, and it is the only place access control can attach."
            },
            {
              "tone": "cyan",
              "label": "Recommend, never act",
              "what": "Nothing in the suite takes an action against production.",
              "why": "Autonomy is earned against a record of being right, not granted because a demo went well."
            },
            {
              "tone": "pink",
              "label": "State the limits on the page",
              "what": "A configuration scan reads declared intent, not live reality, and the tooling says so.",
              "why": "A tool that overstates its coverage once is a tool an SRE org stops trusting permanently."
            }
          ]
        }
      ],
      "subpages": [
        {
          "id": "why-foundations",
          "kind": "custom",
          "title": "Why this is how agentic engineering has to work",
          "body": "This is the page I would most want to be asked about, because it is where\nopinion turns into architecture.\n\n## The failure mode of most agentic tooling\n\nThe usual arc: a demo is convincing, the tool ships, and then somebody senior\nasks the only question that matters — *how do we know this is right?* At that\npoint the honest answer is that the model said so, and the tool quietly becomes\nsomething people consult for ideas rather than something they act on.\n\nThe trap is that evidence looks like a presentation problem. It is not. If\ncitations are not captured at the moment a fact is extracted, they cannot be\nrecovered later; asking a model to justify an answer it has already produced\ngenerates plausible references rather than real ones.\n\n## Determinism is a debugging property\n\nThe instinct with a capable model is to let it do everything. The result is a\npipeline where every stage can vary, nothing can be unit tested, and a wrong\nanswer cannot be localised — you cannot tell whether extraction, retrieval or\nreasoning was at fault, so you tune the prompt and hope.\n\nSo parsing, extraction, dependency resolution and the failure-mode checks are\nordinary deterministic code. The model is used where judgement is genuinely\nrequired — interpreting prose, reconciling fragments, explaining a finding in\ncontext. That boundary is what makes the system debuggable, and being debuggable\nis what makes it improvable.\n\n## Reproducibility is how you measure anything\n\nIf the same corpus can produce different expert systems on different days, you\nhave lost the ability to distinguish a change in the system from a change in the\nrun. Every quality claim after that point is unfalsifiable, including the ones\nthat are true.\n\n## Scope, and why one big index is the wrong shape\n\nFlattening everything into one index is the fastest way to a demo and the\nslowest way to a trustworthy answer. Scoped systems keep answers precise, make\nfan-out an explicit and bounded operation, and give access control something to\nattach to. In a regulated organisation the last of those arrives on day one, and\nretrofitting partitioning onto a flattened index is a rewrite.\n\n## Recommend, never act — and how that changes\n\nNothing here touches production. That is not timidity; it is sequencing. The\nhonest path to autonomy runs recommend → assist → act, and each step is earned\nagainst an accumulated record of recommendations that turned out to be correct.\n\nThe useful consequence is that the record is being accumulated already: every\nanswer the duty-officer chat gives during a real incident is a prediction that\neither held up or did not. That is the dataset an argument for more autonomy\nwould eventually have to be made from — and building it before making the\nargument is the difference between earning trust and asking for it."
        }
      ]
    },
    {
      "id": "eks-blueprint",
      "roleId": "fcb",
      "owner": "org",
      "title": "Bank-Hardened EKS Blueprint",
      "kind": "pro",
      "org": "First Citizens Bank",
      "year": "2022 – 2025",
      "tags": [
        "eks",
        "kubernetes",
        "cis",
        "gitops"
      ],
      "summary": "Multi-AZ, CIS-benchmark hardened EKS with OPA/Gatekeeper, Karpenter, and automated zero-day node patching.",
      "problem": "Regulated workloads on Kubernetes with no tolerance for drift or zero-day exposure.",
      "impact": "Zero-day patched within hours · <1% node cost overhead · mandatory-gate compliance.",
      "stack": [
        "EKS",
        "Karpenter",
        "Argo CD",
        "OPA / Gatekeeper",
        "Kyverno"
      ],
      "categoryId": "cloud-infrastructure",
      "architecture": null,
      "decisions": [],
      "subpages": []
    },
    {
      "id": "endpoint-hub",
      "roleId": "fcb",
      "owner": "org",
      "title": "VPC Interface-Endpoint Hub",
      "kind": "pro",
      "org": "First Citizens Bank",
      "year": "2023",
      "tags": [
        "aws",
        "networking",
        "finops"
      ],
      "summary": "Replaced thousands of duplicate VPC interface endpoints with one multi-AZ endpoint hub via Route 53 resolver rules.",
      "problem": "VPC endpoint costs were a top-3 AWS line item despite low utilization per endpoint.",
      "impact": "Top-3 AWS line item → negligible. The unit of spend is an interface endpoint in one availability zone — not an endpoint — so a service's endpoint duplicated per VPC multiplies by the VPC count and again by the AZ count, and a single multi-AZ hub reached by Route 53 resolver rules leaves one set. No savings figure is published here: the ranking was measured, the dollar amount never was against a stated baseline.",
      "stack": [
        "Transit Gateway",
        "Route 53 Resolver",
        "Terraform"
      ],
      "charts": [
        {
            "id": "endpoint-ledger",
            "kind": "field",
            "title": "What a VPC interface endpoint bills for, and what a hub withdraws",
            "note": "One square is one interface endpoint provisioned in one availability zone in one VPC — that is the unit AWS bills, which is why duplicating a service's endpoints per VPC multiplies twice. The estate drawn is an ILLUSTRATION at 12 VPCs × 6 interface endpoints × 3 availability zones, sized so the arithmetic is countable off the picture. It is not the bank's estate, and no dollar figure is drawn anywhere.",
            "source": "AWS PrivateLink bills an interface endpoint per availability zone it is provisioned in, per hour, plus data processed — so the billed unit is (endpoint × AZ × VPC), and that is what one square is. Every number here is arithmetic of the drawing: 12 × 6 × 3 = 216 billed squares before, 1 × 6 × 3 = 18 after, 234 squares on the picture because it has to contain both designs to compare them. No savings figure appears here or on this project — the ranking was measured, the amount never was against a stated baseline.",
            "unit": "interface endpoint provisioned in one availability zone",
            "reveal": true,
            "states": {
              "a": "an endpoint set per VPC",
              "b": "one shared endpoint hub"
            },
            "classes": [
              {
                "key": "billed",
                "label": "billed attachment",
                "tone": "on"
              },
              {
                "key": "withdrawn",
                "label": "withdrawn — the attachment, not the service",
                "tone": "off"
              },
              {
                "key": "absent",
                "label": "not part of this design",
                "tone": "off-weak"
              }
            ],
            "groups": [
              {
                "label": "vpc-01",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-02",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-03",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-04",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-05",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-06",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-07",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-08",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-09",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-10",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-11",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "vpc-12",
                "units": [
                  {
                    "a": "billed",
                    "b": "withdrawn",
                    "n": 18
                  }
                ]
              },
              {
                "label": "hub vpc",
                "units": [
                  {
                    "a": "absent",
                    "b": "billed",
                    "n": 18
                  }
                ]
              }
            ],
            "readout": {
              "label": "billed endpoint-AZ attachments",
              "prov": "calc",
              "cite": "12 VPCs × 6 interface endpoints × 3 AZs = 216 before; 1 × 6 × 3 = 18 after — count the solid squares"
            },
            "steps": [
              {
                "id": "before",
                "lit": [
                  "billed"
                ],
                "say": "Every VPC carries its own copy of six interface endpoints, in three availability zones each. Eighteen billed attachments per VPC, twelve times over, and each one is a line on the bill whether anything called through it or not."
              },
              {
                "id": "withdrawn",
                "lit": [
                  "withdrawn"
                ],
                "say": "What the hub withdraws is the ATTACHMENT, not the service. Every VPC still reaches all six services, through Route 53 resolver rules pointing at one shared hub — nothing in the estate loses access, which is why this was a networking change and not a negotiation."
              },
              {
                "id": "hub",
                "lit": [
                  "absent"
                ],
                "say": "The eighteen that remain were not on the picture before: they are the hub's own attachments. That is why 234 squares are drawn and not 216 — a before-and-after has to contain both designs, or the comparison is doing arithmetic the reader cannot check."
              }
            ]
          }
      ],
      "categoryId": "cloud-infrastructure",
      "architecture": null,
      "decisions": [],
      "subpages": []
    },
    {
      "id": "f1n",
      "owner": "mine",
      "title": "f1n — claim-leased environments",
      "kind": "closed",
      "org": "Personal · design complete, building as a platform kit",
      "year": "2026",
      "tags": [
        "finops",
        "aws",
        "platform",
        "governance",
        "kubernetes",
        "go",
        "cuelang"
      ],
      "summary": "A control plane that inverts the default for non-production environments: they are off, and a claim turns one on for a lease that expires by itself. Fixed shutdown schedules assume everyone works the same hours — claims do not, and a start nobody filed becomes a bounded system claim instead of a leak.",
      "problem": "Non-production environments bill for 168 hours a week and are needed for about 40. Fixed schedules are the usual answer, and they break on contact with a global team, a sprint whose load moves from dev to test mid-week, and anyone who starts something by hand at 2am.",
      "impact": "Environments default off · leases expire without anyone remembering · out-of-band starts become bounded system claims · every denial carries a reason code.",
      "stack": [
        "Go",
        "CUE",
        "gRPC / protobuf",
        "PostgreSQL",
        "NATS JetStream",
        "KEDA",
        "AWS",
        "Kubernetes"
      ],
      "categoryId": "personal-platform",
      "relatedRoleIds": [
        "fcb",
        "repay"
      ],
      "architecture": null,
      "decisions": [],
      "charts": [
        {
          "id": "week",
          "kind": "area",
          "title": "One non-prod environment · one week · cumulative cost",
          "note": "This is arithmetic, not a forecast. A business-hours workload needs about 40 hours a week and an environment left running bills for 168. The gap between the two lines is not an estimate of what a tool might achieve — it is the difference between the two policies, and AWS publishes the same numbers.",
          "yMax": 100,
          "xLabels": [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ],
          "series": [
            {
              "label": "Left running",
              "color": "var(--neon-pink)",
              "values": [
                14,
                29,
                43,
                57,
                71,
                86,
                100
              ]
            },
            {
              "label": "Claim-leased",
              "color": "var(--neon-cyan)",
              "values": [
                5,
                10,
                14,
                19,
                24,
                24,
                24
              ]
            }
          ],
          "alt": "Cumulative weekly cost: an environment left running climbs steadily to 100 by Sunday; a claim-leased one climbs only on weekdays and stops at 24.",
          "source": "AWS, Instance Scheduler on AWS — Use cases: “up to 76% cost savings for those instances that are only necessary during regular business hours (weekly utilization reduced from 168 hours to 40 hours)”. Cost indexed so that 100 = the same environment left running all week."
        },
        {
          "id": "resting-state",
          "kind": "fork",
          "title": "The one decision this whole system is on the other side of",
          "question": "Nobody has filed a claim, nobody is in it, and nobody has said to turn it off. What is the environment doing?",
          "note": "The chart above is what the wrong answer costs. This is the answer itself — and the default is marked on the branch this system exists to invert, which is the honest way round. Nobody chose RUNNING. It is what an environment does when it was created and never given a lifecycle.",
          "source": "This project's own summary and problem statement, drawn as the decision they describe: environments default off, a claim turns one on, and the lease expires without anyone remembering it. NO SAVING AND NO PERCENTAGE APPEARS ON THIS FIGURE. The cost side of the argument is the chart above it, whose arithmetic is countable off the picture; this drawing adds no figure of its own, because a fork has no number field. The two cost blocks state what each branch costs when it is wrong, in kind rather than in money.",
          "branches": [
            {
              "key": "on",
              "label": "RUNNING",
              "default": true,
              "is": "Nobody chose this. It is what an environment does when it was created and never given a lifecycle, and it is the resting state of very nearly every non-production estate.",
              "wrong": "It bills for every hour nobody is in it, and the first person to find out is whoever reads the invoice. Nothing failed, nothing alerted, and there is no incident to point at — which is why this one survives so long."
            },
            {
              "key": "off",
              "label": "OFF",
              "is": "The resting state is off, and a claim is the only thing that makes it on — for a lease that expires by itself rather than one somebody has to remember to end.",
              "wrong": "Somebody needs an environment at 2am and it is not there. This system's answer is that the start itself becomes a claim: normalise the activation signal, bound it with a policy TTL, and escalate it when it cannot be mapped to a known environment."
            }
          ],
          "steps": [
            {
              "id": "default",
              "lit": [
                "on"
              ],
              "say": "This is the branch nobody argued for. A schedule is an attempt to move off it on a timer; a claim is an attempt to move off it on demand — and both are answers to the same question."
            },
            {
              "id": "inverted",
              "lit": [
                "off"
              ],
              "say": "Inverting a default is cheap to say and expensive to make safe, and everything else in this project is the safety: acceptance windows, reason codes, drift reconciliation, and a bounded system claim for the start nobody filed."
            }
          ]
        }
      ],
      "subpages": [
        {
          "id": "economics",
          "kind": "custom",
          "title": "The economics",
          "charts": [
            {
              "id": "week",
              "kind": "area",
              "title": "One non-prod environment · one week · cumulative cost",
              "note": "This is arithmetic, not a forecast. A business-hours workload needs about 40 hours a week and an environment left running bills for 168. The gap between the two lines is not an estimate of what a tool might achieve — it is the difference between the two policies, and AWS publishes the same numbers.",
              "yMax": 100,
              "xLabels": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
              ],
              "series": [
                {
                  "label": "Left running",
                  "color": "var(--neon-pink)",
                  "values": [
                    14,
                    29,
                    43,
                    57,
                    71,
                    86,
                    100
                  ]
                },
                {
                  "label": "Claim-leased",
                  "color": "var(--neon-cyan)",
                  "values": [
                    5,
                    10,
                    14,
                    19,
                    24,
                    24,
                    24
                  ]
                }
              ],
              "alt": "Cumulative weekly cost: an environment left running climbs steadily to 100 by Sunday; a claim-leased one climbs only on weekdays and stops at 24.",
              "source": "AWS, Instance Scheduler on AWS — Use cases: “up to 76% cost savings for those instances that are only necessary during regular business hours (weekly utilization reduced from 168 hours to 40 hours)”. Cost indexed so that 100 = the same environment left running all week."
            },
            {
              "id": "share",
              "kind": "share",
              "title": "How much of the bill is non-production",
              "note": "A published median and a regulated bank are not the same population, and the whole of the difference is environment count. A SaaS-native company runs dev, staging and production. A bank runs dev, SIT, UAT, performance, DR-test and often a preview tier per team — each held near production parity, because an auditor expects the environment where a control is tested to resemble the one where it runs.",
              "rows": [
                {
                  "label": "Published fleet median",
                  "sub": "thousands of connected cloud accounts",
                  "segments": [
                    {
                      "label": "Production",
                      "value": 77,
                      "color": "var(--neon-cyan)"
                    },
                    {
                      "label": "Non-production",
                      "value": 23,
                      "color": "var(--neon-pink)"
                    }
                  ],
                  "source": "Vantage, Cloud Cost Report Q1 2025"
                },
                {
                  "label": "Regulated FinTech estate",
                  "sub": "six near-parity non-prod tiers",
                  "mine": true,
                  "segments": [
                    {
                      "label": "Production",
                      "value": 33,
                      "color": "var(--neon-cyan)"
                    },
                    {
                      "label": "Non-production",
                      "value": 67,
                      "color": "var(--neon-pink)"
                    }
                  ],
                  "source": "estimate from regulated estates he has run; no published benchmark reports this split"
                }
              ],
              "source": "The published figure is measured; the second row is an estimate and is labelled as one. Both are shares of the same total, so the bars are directly comparable."
            },
            {
              "id": "returns",
              "kind": "benchmark",
              "title": "What switching non-production off returns",
              "note": "Claim-leasing does not beat a well-tuned schedule on headline savings, and this chart does not claim that it does — both bars below are AWS's own published figures for the schedule. What claim-leasing wins is the set of cases a schedule cannot express.",
              "unit": "%",
              "max": 100,
              "rows": [
                {
                  "label": "Business-hours schedule",
                  "sub": "168 h/week reduced to 40",
                  "value": 76,
                  "source": "AWS, Instance Scheduler on AWS — Use cases"
                },
                {
                  "label": "Business hours vs. 24/7",
                  "sub": "AWS's headline figure",
                  "value": 70,
                  "source": "AWS, Introducing the AWS Instance Scheduler (2018)"
                }
              ],
              "source": "Savings quoted as a share of non-production compute spend. Both figures are AWS's own published ceilings (“up to”) for switching non-production off outside working hours. This chart deliberately carries no figure of Geoff's own: the claim-leasing case made around it is about the cases a schedule cannot express, not about a larger percentage."
            }
          ],
          "body": "The case for claim-leasing is not that it saves more than a schedule. It is\nthat the savings are already sitting there in plain arithmetic, that schedules\ncapture them only for organisations shaped a particular way, and that the\ndefault is the thing worth changing.\n\n## The gap is arithmetic, not a projection\n\nA non-production environment needed during business hours is used for roughly\n40 hours a week. Left alone, it bills for 168. That ratio is not a vendor claim\nor a case study — it is what a week contains, and AWS quotes exactly those two\nnumbers in its own Instance Scheduler documentation, along with the **up to 76%**\nsaving that follows from closing the gap.\n\nWhich is why the chart above has no trend line in it. There is nothing to\nforecast. The only question a platform team actually faces is whether the\ndefault is *on* or *off*, and everything else is a consequence of that choice.\n\n## Why the published median understates this for a bank\n\nVantage's Q1 2025 report puts non-production at **23% of cloud spend** across\nthousands of connected accounts. That number is real, and it is also the wrong\nnumber to plan a regulated estate against, because the median company in that\nsample runs three environments and a bank does not.\n\nCount the tiers a regulated FinTech actually operates: development, system\nintegration test, user acceptance test, a performance tier that has to be\nproduction-sized to be worth anything, a DR tier that exists to be proven, and\nincreasingly a preview environment per team. Six tiers, most of them held near\nproduction parity — because when an auditor asks where a control was tested,\n\"in something a quarter the size of production\" is a finding rather than an\nanswer.\n\nSix near-parity tiers at even a third of production each is already 200% of the\nproduction bill. In the estates I have run, non-production has consistently been\nthe larger half. I have not found a published benchmark that says so, which is\nwhy the second bar in that chart is labelled as my estimate rather than dressed\nup as research. The mechanism, though, is not in doubt: the median is low\nbecause most companies have few environments, and compliance is precisely the\nthing that multiplies environments.\n\n## What that makes non-production worth\n\nPut the two together and the priority inverts. Production optimisation is\nconstrained work — you are trading against latency, availability and blast\nradius, and every change needs a change window and a rollback plan. A\nnon-production environment that nobody is using has no such constraint. Turning\nit off at 7pm costs a developer nothing, because the developer went home.\n\nThis is the part that gets missed when FinOps is framed as rightsizing. The\nlargest uncontested pool of cloud waste in a regulated estate is not\nover-provisioned production instances. It is the second, third and fourth copy\nof production, idle, overnight, every night, in an account nobody reads the bill\nfor.\n\n## Where claims beat schedules\n\nIf the savings are comparable, the argument has to be about coverage, and it is.\n\n- **Global teams.** One schedule window is right for one time zone. Every other\n  office is either paying for hours it does not use or filing tickets to get an\n  environment back.\n- **Sprints move.** Load sits on `dev` early in a sprint and `test` late in it.\n  A schedule that fits week one wastes money in week two, and nobody re-tunes it.\n- **Exceptions eat the value.** The moment a team needs an environment outside\n  the window, someone builds on-demand start automation anyway — at which point\n  you have paid for the claim mechanism and are still running the schedule.\n- **Out-of-band starts leak.** Something started by hand at 2am is invisible to\n  a scheduler that only knows how to stop things on a cron. f1n treats that as a\n  first-class signal: detect the start, convert it into a bounded **SystemClaim**\n  with a policy TTL, or escalate it if it cannot be mapped to a known\n  environment.\n\nThe insight that falls out of that list is the design: if you need on-demand\nstart automation regardless, the cost-optimal default is an always-off schedule\nplus policy-aware on-demand access. Which is a claim."
        },
        {
          "id": "built-twice",
          "kind": "custom",
          "title": "Built twice, then designed",
          "body": "f1n is a design pack rather than a running product, and I would rather say so\nplainly than let a diagram imply otherwise. What is not speculative is the\npattern — I built a version of it twice, at REPAY and then at First Citizens\nBank, and f1n is the generalised form of the thing that worked both times plus\nthe parts that did not.\n\n## What shipped at REPAY\n\nGreen-field AWS, a platform team growing from one engineer to eighteen, and a\nnon-production estate that grew faster than the team watching it. Environments\nwere given a lifecycle instead of an uptime: teams asked for one, got it for a\nbounded window, and the platform took it back without anyone having to remember.\nThe reusable-pattern work that cut cloud migration time from months to a day is\nthe same substrate — environments described once, so they can be stood up and\ntaken down as a unit rather than as a pile of individual resources.\n\n## What shipped at First Citizens Bank\n\nSame pattern, a very different shape of organisation: 100+ AWS accounts, a\nlanding zone, and compliance tiers that could not simply be switched off because\nsomeone thought they looked idle. Non-production lifecycle control was part of\nhow AWS spend came down 30% year over year alongside the FinOps dashboards and\nrightsizing automation. The harder half was never the start/stop mechanism. It\nwas answering \"which resources actually constitute the `uat` environment for\nthis team\" in an estate where two teams never modelled it the same way.\n\n## What the second build taught the design\n\nDoing it twice in two differently-shaped orgs is what turned a script into an\narchitecture, and three specific frustrations became structure:\n\n- **Inventory resolution is the hard problem, so it is a port.** Both orgs\n  needed environment-to-resource mapping and neither could use the other's\n  answer. `InventoryResolver` is an interface with a strategy registry and\n  fallback priority precisely because a single hardcoded discovery assumption is\n  what makes this class of tool undeployable in the next org.\n- **Anything you do not detect, you do not control.** Manual starts were the\n  quiet leak both times. Detection and system-claim conversion is in the design\n  from the start rather than bolted on after the first surprise invoice.\n- **A tool that only says no gets switched off.** Policy simulation, reason\n  codes on every denial, and staged rollout modes exist because compliant\n  behaviour has to be faster than working around it, and because a platform team\n  that cannot explain a denial spends its week explaining denials.\n\n## Where it stands\n\nThe design is complete and locked: eleven accepted decision records, a canonical\nvocabulary, a claim/lease state machine, hexagonal ports for providers,\ninventory and activation signals, and a first spec covering claim lifecycle and\nlease management. It is being built as a kit inside my platform-engineering\nmonorepo, where it governs that platform's own ephemeral environments — vCluster\npreviews, CI capacity, dev environments — so the first production user is me.\n\nNothing above describes running code except the two implementations that\npredate it."
        },
        {
          "id": "how-a-claim-works",
          "kind": "custom",
          "title": "How a claim works",
          "charts": [
            {
              "id": "claim-lifecycle",
              "kind": "cycle",
              "title": "The claim lifecycle, and the six named ways out of it",
              "note": "This replaces the ASCII state diagram that used to sit in the prose below. Replacing it costs nothing — the fence contained no numbers — and it buys two things the fence could not: the exits are drawn AS exits, so a reader can see that most of them are early; and the closing edge carries a verdict, so what actually starts the next round is on the picture instead of three paragraphs down. It also gains a state the fence had no room for: `stop_failed`, which the paragraph beneath the fence names and the fence omits.",
              "source": "This subpage's own state machine and the paragraphs around it, drawn: the six lifecycle states in order, every terminal state named in the prose, and the two keys on the closing edge — a claim somebody files, and an out-of-band start detected and converted into a bounded SystemClaim. NO NUMBER APPEARS ANYWHERE IN THIS FIGURE and the shape has no field for one. There is no duration on any stage, no rate on any exit, and no claim about how often any state is reached — every box is a state this design names, and none of it is a measurement of a running system, because there is not one.",
              "stages": [
                {
                  "key": "scheduled",
                  "label": "scheduled",
                  "via": "a claim is filed, or scheduled ahead of the work it is for",
                  "says": "A claim is a request to activate an environment for a bounded time. Filing one is the only ordinary way into this loop — everything else in the design exists to handle the ways in that are not ordinary."
                },
                {
                  "key": "awaiting_acceptance",
                  "label": "awaiting_acceptance",
                  "via": "an acceptance window opens",
                  "says": "The acceptance window exists so a scheduled claim cannot silently start an estate for a test that got dropped. Nobody confirms, nothing starts — which is the cheapest failure on this whole picture."
                  ,
                  "exits": [
                    {
                      "key": "cancelled_unaccepted",
                      "label": "cancelled_unaccepted",
                      "why": "The deadline passed with no confirmation, so the claim auto-cancels. This is the earliest exit on the diagram and the only one that costs nothing at all."
                    }
                  ]
                },
                {
                  "key": "pending_start",
                  "label": "pending_start",
                  "via": "the resolver maps the environment to concrete resources",
                  "says": "This is where the hard problem lives. Two organisations never model “which resources constitute the uat environment for this team” the same way, which is why inventory resolution is a port with a strategy registry rather than one hardcoded discovery assumption.",
                  "exits": [
                    {
                      "key": "start_failed",
                      "label": "start_failed",
                      "why": "The environment did not come up. It is a named state rather than an error log, because “it did not come up and nobody noticed” is the failure that makes a platform team stop trusting automation.",
                      "then": [
                        {
                          "key": "failed_drift",
                          "label": "failed_drift",
                          "why": "Desired state and provider state disagree, and reconciliation could not close the gap."
                        },
                        {
                          "key": "manual_review",
                          "label": "manual_review",
                          "why": "A terminal-safe place for a human to stand, deliberately not a retry loop."
                        }
                      ]
                    }
                  ]
                },
                {
                  "key": "active",
                  "label": "active",
                  "via": "the lease is running, and it ends on its own",
                  "says": "The lease is the persisted lifecycle contract and the single source of truth about what should be running. It expires without anyone remembering; a release just ends one early. Neither destroys anything.",
                  "exits": [
                    {
                      "key": "expired",
                      "label": "expired",
                      "why": "The lease ran out. This is the normal end, and it is an exit rather than a stage because nothing has to happen for it to be reached."
                    }
                  ]
                },
                {
                  "key": "pending_stop",
                  "label": "pending_stop",
                  "via": "shutdown and scale down — never destroy",
                  "says": "The vocabulary says shutdown and scale down, and never destroy, because a tool that can lose a developer's work will not be trusted with the estate. Cost comes from active runtime, not from resources existing.",
                  "exits": [
                    {
                      "key": "stop_failed",
                      "label": "stop_failed",
                      "why": "NOT IN THE ORIGINAL DIAGRAM, and named in the paragraph directly beneath it. A stop that fails is exactly as interesting as a start that fails, and it now has a box of its own."
                    }
                  ]
                },
                {
                  "key": "stopped",
                  "label": "stopped",
                  "via": "the resting state, and where this loop waits",
                  "says": "Off is not a failure and it is not an end. It is the resting state the whole product exists to make normal, and everything above is the machinery for leaving it safely and returning to it reliably."
                }
              ],
              "close": {
                "verdict": "gated",
                "label": "a claim, filed or detected",
                "detail": "TWO KEYS OPEN THIS LOOP, and the second one is the design. The first is a claim somebody files. The second is a start nobody filed: an activation signal normalised from polling, a cloud event stream or a webhook, and converted into a bounded SystemClaim with a policy TTL. A control plane that only governs the traffic it initiates is governing the wrong set.",
                "exit": {
                  "label": "ESCALATION",
                  "why": "When a detected start cannot be mapped to a known environment it escalates rather than being dropped. The gate has its own way of failing, and it fails loudly."
                }
              },
              "steps": [
                {
                  "id": "happy",
                  "lit": [
                    "scheduled",
                    "awaiting_acceptance",
                    "pending_start",
                    "active",
                    "pending_stop",
                    "stopped"
                  ],
                  "say": "The six stages are the boring half. Read in order they are a request, a confirmation, a start, a lease, a stop and a rest — and none of them is where the engineering is."
                },
                {
                  "id": "exits",
                  "lit": [
                    "cancelled_unaccepted",
                    "start_failed",
                    "failed_drift",
                    "manual_review",
                    "expired",
                    "stop_failed"
                  ],
                  "say": "The failure states are the interesting half. Six named ways out, four of them failures, and every one a state rather than a log line — because “it did not work and nobody noticed” is the outcome this design is built against."
                },
                {
                  "id": "gate",
                  "lit": [
                    "close"
                  ],
                  "say": "And the loop only closes when something opens it. One key is a claim; the other is a start nobody filed, which becomes a bounded system claim or escalates. That second key is the case this product cares most about."
                }
              ]
            }
          ],
          "body": "The whole product is one inversion: an environment's resting state is *off*, and\na claim is the only thing that makes it *on*. Everything else follows from\nhaving to make that safe.\n\nThe failure states are the interesting half. `start_failed`, `stop_failed`,\n`failed_drift` and `manual_review` are named states rather than error logs,\nbecause \"the environment did not come up and nobody noticed\" is the failure mode\nthat makes a platform team stop trusting automation.\n\n## The lifecycle\n\nA claim is a request to activate an environment for a bounded time. Granting one\ncreates a **lease**, which is the persisted lifecycle contract and the single\nsource of truth about what should be running. Leases expire on their own; a\nrelease ends one early. Neither destroys anything — the vocabulary deliberately\nsays *shutdown* and *scale down*, never *destroy*, because a tool that can lose\na developer's work will not be trusted with the estate.\n\n## Claims nobody has to file\n\nScheduled claims cover the predictable case — a load test on Thursday — and\ncarry an acceptance window: if nobody confirms by the deadline, the claim\nauto-cancels rather than silently starting an estate for a test that got\ndropped. Where policy allows, a new claim can supersede or extend an existing\nlease without an operator in the middle.\n\nThe case I care most about is the one nobody files. When a resource starts\noutside f1n — a console click, a pipeline nobody registered, a 2am\ninvestigation — an activation signal is normalised from polling, a cloud event\nstream or a webhook, and turned into a **SystemClaim** bounded by a policy TTL.\nIf the signal cannot be mapped to a known environment it escalates instead of\nbeing dropped. A control plane that only governs the traffic it initiates is\ngoverning the wrong set.\n\n## Drift is assumed, not hoped against\n\nDesired state and provider state diverge — an API call fails, someone stops\nsomething by hand, an autoscaler disagrees. Reconciliation is mandatory rather\nthan a feature: detect the mismatch, remediate it, and escalate explicitly when\nit cannot be remediated. Unresolved drift ends in `manual_review`, which is a\nterminal-safe place for a human, not a retry loop.\n\n## Explaining itself is a requirement\n\nTwo primitives exist purely so people trust the thing.\n\n**Policy simulation** runs the real policy path with no side effects, so a\ndomain admin can see what a change would have done before it does it, and a\ndeveloper can find out why a claim will be denied before filing it.\n\n**Reason codes** are stable, machine-readable identifiers attached to every\ndenial, cancellation and forced action. They surface to the user and to\ntelemetry at once — which means \"what is our top deny reason this month\" is a\ndashboard query, and DX friction becomes a measurable quantity instead of a\ncomplaint in a retro.\n\nSavings are reported the same way: estimated from tags and metadata, then\nreconciled against billing data, with a what-if estimator that returns a range,\na confidence level and its assumptions — and whose predictions are compared\nagainst realised outcomes so the estimator's own error is tracked. A FinOps tool\nthat reports its savings without ever checking them is marketing."
        },
        {
          "id": "design",
          "kind": "design",
          "title": "Design constraints",
          "body": "The constraints below were chosen before implementation, which is the point of\nwriting them down — a decision made under schedule pressure is not a decision.\n\n## Domain first, providers at the edge\n\nGo with DDD and hexagonal boundaries: Claim, Lease, Environment, Resolver and\nProvider are domain language, and no provider-specific logic is allowed in the\ndomain layer. `ResourceProvider` (start/stop/status) and `InventoryResolver`\n(identifier → concrete resources) are ports, so AWS depth can be completed\nwithout AWS assumptions leaking inward and without the next cloud requiring a\nrewrite of the middle.\n\n## Modular monolith, with the exit written down\n\nIt starts as one deployable with strict internal boundaries and versioned\ninternal contracts over gRPC/protobuf. Extraction is allowed only against named\ntriggers — an ownership boundary, sustained load pressure, or a compliance\nisolation requirement — rather than because a context started to look big.\nWriting the trigger down is what stops \"we should split this\" from being an\nargument every quarter.\n\n## CUE for configuration and semantic state\n\nConfiguration and state contracts are CUE-first, with scopes at global, domain\nand environment level and explicit precedence between them. Feature settings are\nstaged mode enums — `disabled`, `observe`, `enforce` — rather than booleans,\nbecause every governance feature needs a period where it reports what it would\nhave done and no boolean has ever expressed that well.\n\n## What is deliberately out of scope\n\n- **Production lifecycle.** f1n does not manage production workloads. Different\n  risk, different approval path, and putting both behind one control plane is\n  how the non-prod use case gets buried in change management.\n- **Replacing Backstage.** It targets a Backstage plugin *and* a standalone UI,\n  because insisting on either one makes it undeployable in half of the orgs that\n  need it.\n- **Every cloud in the first release.** AWS depth before multi-cloud breadth —\n  stated as a sequencing rule so that breadth cannot quietly win an argument\n  against depth.\n- **Destructive teardown.** Cost comes from active runtime, not from resources\n  existing. Shutting down captures nearly all of it at a fraction of the risk of\n  tearing infrastructure down and rebuilding it.\n\n## Invariants that hold regardless\n\n- Every write-path state transition emits an auditable event.\n- Every policy decision emits a stable reason code.\n- Reconciliation must be able to detect and escalate unresolved drift.\n- Out-of-band detections resolve to either a policy-approved system claim or an\n  explicit escalation.\n- Kubernetes scaling routes through KEDA abstractions, never per-workload\n  bespoke logic."
        }
      ]
    },
    {
      "id": "agentic-kit",
      "owner": "mine",
      "title": "agentic-kit",
      "kind": "closed",
      "org": "Personal · in active development",
      "year": "2026",
      "tags": [
        "agentic",
        "go",
        "cuelang",
        "mcp",
        "governance"
      ],
      "summary": "A governed agentic platform in Go and CUE: a real Anthropic LLM client with a conformance suite, a governed agent loop (model turn → tool dispatch → governance screens), an MCP server kit, a fail-closed endpoint-guard (circuit breaker, strike ledger, proof-of-work, budget caps), and a hash-chained evidence/provenance store.",
      "problem": "Raw LLM calls aren't a platform. Putting agents near production in a regulated enterprise needs budgets, injection defense, determinism, and provenance — by construction, not by hope.",
      "impact": "Governed agent loop · record/replay determinism · cost-bounded endpoint guard · CUE-as-contract across the module.",
      "stack": [
        "Go",
        "CUE",
        "Anthropic API",
        "MCP",
        "wazero"
      ],
      "categoryId": "personal-platform",
      "architecture": {
        "title": "agentic-kit — the governed agent loop and what surrounds it",
        "summary": "One stdlib-only Go module in five tiers: narrow foundations, kits that compose them, and a build gate that treats doctrine as code. The agent loop is the product; governance, evidence, telemetry and human approval are seams the caller injects, not a wrapper the kit imposes.",
        "desc": "Six grouped areas: the consumer application that owns main(), untrusted content, the composed kits (agent harness, MCP server, endpoint guard, human-in-the-loop), the stdlib-only foundations they compose, the model and client boundary, and the build gate. Eighteen numbered connections are listed below the diagram.",
        "boundaries": [
          {
            "id": "consumer",
            "name": "Consumer application",
            "trust": "internal",
            "note": "The kit is not a framework: it never owns main(), your loop, or your process model. Every tier is an ordinary importable package."
          },
          {
            "id": "untrusted",
            "name": "Untrusted content",
            "trust": "untrusted",
            "note": "Tool results, fetched pages and public traffic are treated as data, never as instructions."
          },
          {
            "id": "kits",
            "name": "kits — composed workflows",
            "note": "High-order workflows composed from foundations. A kit no real workload consumes is labeled composition unproven, or retired."
          },
          {
            "id": "foundations",
            "name": "foundations — stdlib only",
            "note": "Narrow packages importing only the standard library and their siblings. Each carries a contract next to the Go that mirrors it."
          },
          {
            "id": "providers",
            "name": "Model and client boundary",
            "trust": "third-party",
            "note": "Provider adapters are batteries, not the architecture. One client interface is the contract; model output is not trusted."
          },
          {
            "id": "gate",
            "name": "The gate — one validate task",
            "note": "Formatting, vet, contract vetting including fixtures, race-clean tests across every package, plus a constitution lint. Green is what done means."
          }
        ],
        "components": [
          {
            "id": "app",
            "name": "Your application",
            "kind": "caller",
            "role": "Owns main(), the process model and the composition; imports only what it needs.",
            "note": "Owns main(), the process model and the composition; imports only what it needs.",
            "boundary": "consumer",
            "boundaryId": "consumer",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "toolout",
            "name": "Tool results & fetched content",
            "kind": "untrusted data",
            "role": "Screened before it can re-enter a transcript; fenced between per-wrap delimiters when it is stored.",
            "note": "Screened before it can re-enter a transcript; fenced between per-wrap delimiters when it is stored.",
            "boundary": "untrusted",
            "boundaryId": "untrusted"
          },
          {
            "id": "public",
            "name": "Public endpoint traffic",
            "kind": "untrusted data",
            "role": "Anonymous internet traffic to a hosted prompt — assumed hostile and assumed expensive.",
            "note": "Anonymous internet traffic to a hosted prompt — assumed hostile and assumed expensive.",
            "boundary": "untrusted",
            "boundaryId": "untrusted"
          },
          {
            "id": "harness",
            "name": "agent-harness",
            "kind": "kit",
            "role": "One call: model turn, tool dispatch, governance screens, repeat until a stop condition. Stop causes are values, not exceptions.",
            "note": "One call: model turn, tool dispatch, governance screens, repeat until a stop condition. Stop causes are values, not exceptions.",
            "boundary": "kits",
            "boundaryId": "kits",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "mcpserver",
            "name": "mcp-server",
            "kind": "kit",
            "role": "Serves the same tool registry to MCP clients over two transports sharing one dispatch core; every tool failure is in-band.",
            "note": "Serves the same tool registry to MCP clients over two transports sharing one dispatch core; every tool failure is in-band.",
            "boundary": "kits",
            "boundaryId": "kits",
            "tech": [
              "Go",
              "JSON-RPC 2.0"
            ]
          },
          {
            "id": "guard",
            "name": "endpoint-guard",
            "kind": "kit",
            "role": "Cheapest-first, fail-closed gauntlet in front of a paid model call; a rejected request costs zero model spend.",
            "note": "Cheapest-first, fail-closed gauntlet in front of a paid model call; a rejected request costs zero model spend.",
            "boundary": "kits",
            "boundaryId": "kits",
            "tech": [
              "Go",
              "WASM"
            ]
          },
          {
            "id": "hitl",
            "name": "human-in-the-loop",
            "kind": "kit",
            "role": "The model may only propose typed operations from a whitelist. One applier drives both the preview a human approves and the commit.",
            "note": "The model may only propose typed operations from a whitelist. One applier drives both the preview a human approves and the commit.",
            "boundary": "kits",
            "boundaryId": "kits",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "registry",
            "name": "tool-registry",
            "kind": "foundation",
            "role": "The single tool table. Define a tool once; policy, timeouts, panic recovery and capability declarations are owned here.",
            "note": "The single tool table. Define a tool once; policy, timeouts, panic recovery and capability declarations are owned here.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "llm",
            "name": "client + middleware",
            "kind": "foundation",
            "role": "One interface for every model call, wrapped by cost, telemetry, egress gating and retry — retry innermost, so one logical call stays one event.",
            "note": "One interface for every model call, wrapped by cost, telemetry, egress gating and retry — retry innermost, so one logical call stays one event.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "governance",
            "name": "governance",
            "kind": "foundation",
            "role": "Budget guard, circuit breaker, rate limiter, strike ledger, hashed identity, proof-of-work, topic gate, answer cache, retention rules.",
            "note": "Budget guard, circuit breaker, rate limiter, strike ledger, hashed identity, proof-of-work, topic gate, answer cache, retention rules.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "security",
            "name": "security screens",
            "kind": "foundation",
            "role": "Injection detection, untrusted-content fencing, instruction precedence, deny-by-default tool policy, shape-based redaction, tokenization.",
            "note": "Injection detection, untrusted-content fencing, instruction precedence, deny-by-default tool policy, shape-based redaction, tokenization.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "evidence",
            "name": "evidence & provenance",
            "kind": "foundation",
            "role": "Graded evidence spans carrying source and authorship, conflict detection, append-only journals, a hash-chained event store and anchors.",
            "note": "Graded evidence spans carrying source and authorship, conflict detection, append-only journals, a hash-chained event store and anchors.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "telemetry",
            "name": "telemetry & cost",
            "kind": "foundation",
            "role": "One canonical event shape, per-run trace correlation, and config-driven cost accounting — no price table is shipped.",
            "note": "One canonical event shape, per-run trace correlation, and config-driven cost accounting — no price table is shipped.",
            "boundary": "foundations",
            "boundaryId": "foundations"
          },
          {
            "id": "providers",
            "name": "Provider adapters",
            "kind": "provider",
            "role": "Several real batteries behind one interface — streaming HTTP clients, a cloud-runtime variant with its own credential chain, and CLI-backed subscription lanes — plus a conformance suite each must pass.",
            "note": "Several real batteries behind one interface — streaming HTTP clients, a cloud-runtime variant with its own credential chain, and CLI-backed subscription lanes — plus a conformance suite each must pass.",
            "boundary": "providers",
            "boundaryId": "providers"
          },
          {
            "id": "mcpclients",
            "name": "MCP clients",
            "kind": "client",
            "role": "Editors and agent clients that list and call exactly the tools the agent loop uses.",
            "note": "Editors and agent clients that list and call exactly the tools the agent loop uses.",
            "boundary": "providers",
            "boundaryId": "providers"
          },
          {
            "id": "validate",
            "name": "the validate task",
            "kind": "gate",
            "role": "The contract. Tags are cut only at green gates; two-layer git hooks run fast checks on commit and the whole gate on push.",
            "note": "The contract. Tags are cut only at green gates; two-layer git hooks run fast checks on commit and the whole gate on push.",
            "boundary": "gate",
            "boundaryId": "gate"
          },
          {
            "id": "cue",
            "name": "Data contracts",
            "kind": "contract",
            "role": "A contract per package with fixtures that are themselves vetted; a shape change counts as an API change.",
            "note": "A contract per package with fixtures that are themselves vetted; a shape change counts as an API change.",
            "boundary": "gate",
            "boundaryId": "gate",
            "tech": [
              "CUE"
            ]
          },
          {
            "id": "lint",
            "name": "constitution-lint",
            "kind": "gate",
            "role": "Turns doctrine into build failures: empty require block, catalog freshness, doc coverage, stability coverage, org-agnostic scan, secret scan.",
            "note": "Turns doctrine into build failures: empty require block, catalog freshness, doc coverage, stability coverage, org-agnostic scan, secret scan.",
            "boundary": "gate",
            "boundaryId": "gate"
          },
          {
            "id": "replay",
            "name": "replay cassettes",
            "kind": "foundation",
            "role": "Record a live session once, replay it deterministically with no key and no network; drift fails loudly.",
            "note": "Record a live session once, replay it deterministically with no key and no network; drift fails loudly.",
            "boundary": "gate",
            "boundaryId": "gate"
          }
        ],
        "edges": [
          {
            "from": "app",
            "to": "harness",
            "label": "one governed run call — the kit never owns main()",
            "kind": "call"
          },
          {
            "from": "harness",
            "to": "llm",
            "label": "model turn, through the cost / telemetry / egress / retry stack",
            "kind": "call"
          },
          {
            "from": "llm",
            "to": "providers",
            "label": "one interface; each adapter passes the same conformance suite",
            "kind": "call"
          },
          {
            "from": "harness",
            "to": "registry",
            "label": "tool dispatch; every failure returns in-band, never as a Go error",
            "kind": "call"
          },
          {
            "from": "toolout",
            "to": "security",
            "label": "screened before it can re-enter the transcript",
            "kind": "data"
          },
          {
            "from": "harness",
            "to": "governance",
            "label": "budget charged before every model call, fail-closed",
            "kind": "check"
          },
          {
            "from": "harness",
            "to": "evidence",
            "label": "append-only run journal; hash-chained event store",
            "kind": "data"
          },
          {
            "from": "harness",
            "to": "telemetry",
            "label": "one run id joins harness and model-call events",
            "kind": "data"
          },
          {
            "from": "harness",
            "to": "hitl",
            "label": "the model may only propose a typed operation; it has no write path",
            "kind": "call"
          },
          {
            "from": "hitl",
            "to": "app",
            "label": "dry-run preview for a human, then the same applier commits",
            "kind": "call"
          },
          {
            "from": "mcpserver",
            "to": "registry",
            "label": "the same registry answers listing and call",
            "kind": "call"
          },
          {
            "from": "mcpclients",
            "to": "mcpserver",
            "label": "JSON-RPC over stdio or a single stateless HTTP endpoint",
            "kind": "call"
          },
          {
            "from": "public",
            "to": "guard",
            "label": "every request enters the gauntlet before anything is paid for",
            "kind": "call"
          },
          {
            "from": "guard",
            "to": "governance",
            "label": "breaker, identity, strikes, limits, proof-of-work, topic gate, cache",
            "kind": "check"
          },
          {
            "from": "guard",
            "to": "llm",
            "label": "the paid call happens only if every free layer said yes",
            "kind": "call"
          },
          {
            "from": "replay",
            "to": "llm",
            "label": "the same interface, backed by a committed cassette",
            "kind": "test"
          },
          {
            "from": "validate",
            "to": "cue",
            "label": "every contract and its fixtures vetted",
            "kind": "check"
          },
          {
            "from": "validate",
            "to": "lint",
            "label": "doctrine checked as code, on every change",
            "kind": "check"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "anti-patterns",
          "title": "Anti-patterns",
          "kind": "custom",
          "body": "## The ledger is a file in the repo, not a marketing page\n\nThe kit carries an anti-pattern ledger. Every entry has the same four parts: the failure mode, why it bites, the practice the kit enforces instead, and the packages that implement it — plus an honest status of **shipped**, **partial**, or **roadmap**. The rule that keeps it worth reading is in its own opening paragraph: a practices document that overclaims is itself the anti-pattern. Every package claim in it was checked against source before it was written down.\n\nMost of these are not textbook. They are in the ledger because they happened — to this kit, or to something it was extracted from — and the entry exists because a primitive was added afterwards to make the mistake structurally hard to repeat. Fifteen entries so far.\n\n## Context and memory — where agentic systems rot quietly\n\n**Severing the evidence link to save tokens.** Context fills up, the workload compacts, old turns become a model-written summary, and the originals are discarded. Nothing announces that the system now knows less than it did an hour ago. This is the canonical failure the kit exists to prevent, and the opinion is one sentence: a summary is a *projection over* ground truth, never a replacement. Compaction may shrink what the model sees; it must never shrink what the system knows.\n\nThe mechanism has three parts. Windowing returns an API-valid suffix plus the count of what was dropped, and it will not split a tool call from its result — a window that produces an illegal transcript is not a smaller context, it is a 400 with extra steps. A compaction hook splices a role-safe summary at the cut point. And the compactor that ships for that hook journals every dropped message verbatim *before* it calls a model at all, stamps the template version and prompt hash into the summary as a structured marker, and returns a failure rather than a lossy fallback when the summarizing model errors. The guarantee is preservation and provenance. The package states outright that the *fidelity* of the summary is the model's problem, not the kit's — that disclaimer is marked as one that must be kept visible.\n\n**Memory poisoning.** Untrusted content flows into a persisted store — a vector index, a conversation summary, a retrieved chunk — and re-emerges later as trusted context. The attack is temporal: the injection and the exfiltration happen in different turns, and by then the model cannot distinguish \"the user told me this\" from \"a web page I fetched three turns ago told me this, and I summarized it into working memory.\"\n\nWhat ships: untrusted payloads are fenced between per-wrap unguessable delimiters before they touch any store or summary path; tool results are screened before they re-enter the conversation; and evidence provenance stamps survive compaction, so a retrieved claim still carries whether it came from a primary source or from a prior tool result. What is **not** built, stated in the same entry: a provenance-aware retrieval gate that refuses to re-inject evidence below a grade threshold, and a store-layer policy that rejects fenced untrusted content from entering long-term memory without an explicit declassification step. The anti-pattern is mitigated at the edges and not closed end to end. That entry is marked partial for exactly that reason.\n\n## Claims — where agents lie\n\n**Unsourced assertions and broken evidence links.** The agent asserts; nobody can say where the claim came from, who produced it, or how much of it to believe. Fabricated references pass because nothing checks whether a reference resolves.\n\nThe opinion is evidence before assertion, and it is enforced by refusing to store the alternative. The atomic evidence unit carries an epistemic grade, an author — human, or AI with a full reproduction key — and a click-traceable source locator; validation refuses to accept anything without provenance *as evidence*. Confidence is capped by tier — doc-claimed and SME-stated share one ceiling on purpose, because both are unverified hearsay and the platform refuses confidence 3-of-5 to anything not at least pre-scanned. The ceiling is a deterministic function over the tier, in the scoring package, rather than a sentence in a prompt the model could talk its way past. The honest limit, which the fathom page states from the other side: the cap is opt-in. A caller has to apply it, nothing enforces it at a write path yet, and the design that turns it on structurally so no caller can forget is adopted and unbuilt. On top of that sit two deterministic checks with no model in the loop: one that flags unresolvable or fabricated references, and one that returns allowed / hedge / block on overclaiming. Same input, same verdict, every time — which is the only way a gate is auditable.\n\n**Eval loops that lie.** The subtler version: the thing you built to measure quality is itself unfalsifiable. The evaluation runner in the kit is written against five specific lies, and refuses each by construction rather than by convention — a judge grading its own model family, a verdict that never reached a journal, a budget silently blown mid-run, a \"stable\" result nobody probed for variance, and a run over an empty corpus exiting green. Independence is validated at construction for every judge-lane-and-producer pair, and a violation is fatal; the only way an all-one-family configuration builds at all is to declare the run non-decisive up front, after which no record may be marked decisive. A budget denial mid-run writes error records for every remaining pair instead of truncating silently. An empty bank is a typed refusal, not a pass.\n\nAnd the runner's own doc states the limit as plainly as the guarantees: it proves independence, journaling, budget enforcement and probe wiring. It never proves judge *correctness* — position bias, verbosity bias and style bias all survive family separation.\n\n## Control flow — where agents run away\n\n**Improvised escalation.** \"Try the cheap model, and if it feels wrong, hack in a retry with the big one.\" Escalation accretes as ad-hoc control flow: unauditable, untestable, different in every workload. The kit's answer is that escalation paths are declared data. Model escalation is a ladder of rungs climbed only on an explicit signal carrying an audit reason, and the rung injects its model into the request — which is what lets a ladder compose with any client rather than being welded to one. Refinement loops are bounded by a round count and then flagged as escalated rather than looping. Termination is a value, not an exception.\n\nOne detail carries most of the weight: a model asking to use a tool is a **success**, never an escalation trigger. Treating it as a failure is the single most common way a first agent loop ends up retrying its way through a budget. Escalate on measured quality, not on a stop reason you did not expect. Relatedly, the stop-reason set is treated as open — the kit knows four and treats anything else as \"stopped for a reason this build does not recognise\" rather than falling through a switch.\n\n**Unbounded loops and spend.** An agent loop with no turn cap, calls with no budget, caches and seen-sets that grow forever. The failure mode is a bill or an out-of-memory, discovered afterwards. The rule is charge before the money leaves: the harness charges the budget guard before *every* model call and ends the run with a budget stop on denial. The public-endpoint gauntlet applies the same rule one level down — even its cheap topic-judge call is charged before the judge fires, so a refused charge means the judge never runs. Every cache, queue, seen-set and buffer on the request path has an explicit bound and a stated behavior *at* the bound; append-only ground-truth stores are deliberately unbounded, and that consequence has its own ledger entry rather than being ignored.\n\nThe honest part of that entry is what makes it credible. One per-identity limiter map had an eviction routine that nothing ever called, so it grew for the life of the process. The audit found it; the sidecar now sweeps on a timer; and the entry says plainly that anyone embedding the guard directly has to schedule that sweep themselves, because the kit cannot own a ticker without taking on a runtime dependency. It is written up as the one structure on the hot path that needed explicit wiring instead of being self-bounding.\n\n## Inputs — where agents get owned\n\n**Trusting tool and model output.** Tool results flow back into the conversation unexamined, fetched content is pasted next to instructions, and \"we run it in a subprocess\" gets mistaken for containment. The harness screens every tool result before it re-enters the conversation. A flagged result is *replaced* by an error result naming the detection, so the raw payload provably never enters the transcript; annotating instead is available and is not the default, because detection is pattern-based and best-effort and the default should assume the detector is imperfect. Bounded subprocess execution is labeled resource confinement and explicitly not a sandbox, in its own package documentation, with the list of what remains unrestricted spelled out.\n\n**The lethal trifecta.** A tool that reads untrusted content, a tool that reads private data, and a tool that writes externally. None is dangerous alone; together, one injected payload can read secrets and exfiltrate them inside a single turn with no human checkpoint. The kit's answer is a capability taxonomy declared at *registration*: each tool declares which of the three it exercises, and an absent declaration is treated as **unknown, not clean** — under the strict mode an undeclared tool is assumed to do all three. When the registered toolset's union would complete the trifecta, the registration of the completing tool fails closed with a typed error, before a single token is spent. Overriding requires a named authorizer and a written reason; a bare boolean cannot do it, because provenance is the point of the override.\n\nTwo deliberate choices sit inside that. Enforcement is at registration and not at dispatch, because the trifecta is a property of the assembled toolset rather than of any one call — and registration is the cheapest possible seam. And the taxonomy is self-declared, which the docs state as a limitation in the same breath as the capability: a tool that lies about itself defeats the check entirely. The value is making a *truthfully declared* risk auditable and forcing an explicit, named authorization — not immunity.\n\n**Tool poisoning.** A remote tool server's descriptions are fetched over the network and injected into the agent's context on every listing. Whoever can change those descriptions can hide instructions in what looks like metadata, and the model will read them as instructions. The mechanism: hash each tool's identity, description and input shape at first listing, store the pin, and re-verify on every subsequent listing — because a listing is the only path by which a description enters the model's context. A changed description returns a typed error rather than silently forwarding modified instructions, and rebinding takes an explicit repin call, so drift is visible and auditable instead of absorbed.\n\nThe limits are written down next to it, not below the fold. Call-time does not re-verify the pin — drift between a listing and a call is caught at the *next* listing, and a pre-call check is recorded as an open hardening item whose decision belongs to the owner. And pinning defends against drift after first contact, not against a poisoned introduction: whoever controls the very first listing is trusted from then on.\n\n## Surfaces — where definitions drift\n\n**Tool definition sprawl.** The same tool defined three times — once for the model request, once for the dispatch switch, once for the external listing — and the three diverge on a Tuesday. Define it once. One registration feeds the model request, the loop's dispatch, and the external tool listing. Policy checks, per-tool timeouts and panic recovery are owned in that one place, so every failure mode — unknown tool, policy denial, handler error, panic, timeout, cancellation — reaches the model in-band as an error result rather than as an uncaught Go error or a dead process. Foreign tools bridged in from other servers land in the same table, so all of that governance applies to third-party tools without special-casing.\n\n**Schema and doc drift.** The docs describe one shape, the code another, the stored data a third, and the drift is discovered by an outage rather than by a gate. The contract language owns shape, Go owns behavior, and the gate turns drift into a test failure: contracts are vetted along with their example fixtures, the package catalog is generated from doc comments rather than hand-maintained, and a lint pass turns eleven constitutional promises into build failures — including that the package count printed in the README matches the count derived from source, that every package is classified in the stability table, that every exported identifier has a doc comment, and that no organization-specific token or secret-shaped string exists anywhere in the tree.\n\nWhat that gate cannot catch is a hand-written status paragraph going stale, and that is exactly where the last drift showed up: a status line in the ledger describing a capability as not-yet-built after the implementation had shipped and been checked into the tracking ledger. Mechanical checks catch mechanical drift. Prose still needs a reader.\n\n## Process — where the discipline dies\n\n**Live-API-only testing.** If the only way to exercise the agent is against the real API, it is slow, flaky, expensive and unrunnable in CI — so it stops being run. The ladder is deterministic below the top rung. A scripted double that *rejects requests a live client would refuse*, so a test cannot pass a request the real API would 400. Record/replay cassettes with request-hash matching, so prompt or schema drift fails loudly instead of quietly replaying an answer to a question you no longer ask. An exported conformance suite that any new client implementation must pass, so a second provider adapter cannot quietly mean something different. And exactly one paid rung, gated on a key and skipped cleanly without one — never part of the gate.\n\n**Invisible runs.** The agent ran; nobody can say what it did, what it cost, or which model call belonged to which run. One canonical event shape, one run identity minted by the loop and adopted from context when one exists, so loop events and model-call events join. Instrumentation emits exactly one event per *logical* call, with retry sitting innermost and attempts surfacing as an attribute — so dashboards keep a stable shape during a retry storm, which is precisely when you are looking at them. Cost accounting ships **no price table**, on the grounds that a stale embedded price is worse than none.\n\n**Governance as the thing you remember to add later.** The scaffolder that generates a new consumer project emits the governed composition by default; the bare loop is behind an explicit minimal flag. Defaults are policy. If the fast path is ungoverned, the fast path is what ships.\n\n**Kits nobody consumes.** The sprawl anti-pattern the kit measured on itself: a composition layer with no real consumer is a demo with a package name. The response was to make the label public — any kit still at zero consumers is marked composition-unproven in its own documentation — and to order the build queue by pull, so no new zero-consumer package lands while a consumer-proven ask with a hand-rolled implementation is still open.\n\n## What the ledger refuses to say\n\nEvery entry ends with a status, and three of the fifteen are partial rather than shipped. That is the part that makes the other twelve usable. A ledger where everything is green is a ledger nobody checked."
        },
        {
          "id": "human-in-the-loop",
          "title": "Human in the loop",
          "kind": "custom",
          "charts": [
            {
              "id": "escalation-ladder",
              "kind": "ladder",
              "title": "What it costs to answer, and what each tier may conclude",
              "note": "Three tiers, most expensive first. A query climbs only when the tier below it returns something that is not an answer. The bottom rung is warmed by the top one: every escalation to a human writes a gap record, and projections over those records make the fast tier answer more next time — so the ladder gets cheaper by being used.",
              "source": "The argument of this page, drawn as a ladder. NO RUNG CARRIES A COUNT, A LATENCY OR A MEASURED POSITION: the ordering is by what a tier may conclude, which is a property of the design, and the spacing between rungs is not measured. Every rung's text is drawn from this page's own prose.",
              "scaleLabel": "what this tier is allowed to conclude",
              "rungs": [
                {
                  "key": "human",
                  "label": "A HUMAN",
                  "gloss": "the only tier that may conclude absence",
                  "is": "The query reaches a person. This is the only tier whose answer can settle the difference between 'we did not find it' and 'it is not there'.",
                  "cost": "A timeout here fails closed to unresolved, never to absent. Human capacity is the system's real ceiling, and the tier is finite in a way the two below it are not.",
                  "climb": "exhaustive search returned nothing — and nothing is not the same as not there."
                },
                {
                  "key": "search",
                  "label": "EXHAUSTIVE SEARCH",
                  "gloss": "can find; cannot conclude absence",
                  "is": "The full search runs against the corpus. It can answer 'found'. On its own it cannot answer 'absent', and the type system refuses to let it pretend otherwise.",
                  "cost": "Slow enough that a person waits for it, and a negative result from it is still not a verdict — which is the whole reason the rung above exists.",
                  "climb": "the cache missed, and an empty cache is a miss rather than a conclusion."
                },
                {
                  "key": "cache",
                  "label": "FAST CACHE LOOKUP",
                  "gloss": "signal only, never a verdict",
                  "is": "A projection over answers already given, warmed by the gap records the human tier writes to an append-only log.",
                  "cost": "A cache hit is signal only and never a verdict. This rung is the cheapest and it is allowed to conclude nothing at all."
                }
              ],
              "steps": [
                {
                  "id": "floor",
                  "lit": [
                    "cache"
                  ],
                  "say": "The cheapest tier is deliberately the least authoritative. A hit here is a signal that speeds up the answer, not the answer."
                },
                {
                  "id": "distinction",
                  "lit": [
                    "search",
                    "human"
                  ],
                  "say": "The distance that matters is here. One of these can tell you it found nothing; only the other can tell you there is nothing to find — and that is exactly the difference a tired reviewer collapses at 6pm."
                },
                {
                  "id": "loop",
                  "lit": [
                    "human",
                    "cache"
                  ],
                  "say": "The ladder pays for itself in one direction: every climb to a human writes a gap record, and projections over those records warm the bottom rung — so the human's answer lowers the cost of the next question."
                }
              ]
            }
          ],
          "body": "## The insight this is built on\n\nTwo agents writing paragraphs can contradict each other completely and nothing in the system knows. The contradiction is real, it is load-bearing, and it is invisible — because prose has no join key. Nothing can be compared, so nothing can disagree, so no question is ever raised.\n\nTwo agents writing *typed, graded, provenanced* assertions against the same subject anchor produce something a machine can notice. The disagreement becomes a value with a kind and a severity. \"Should a human look at this?\" stops being a judgment call somebody has to remember to make and becomes a query over the artifacts the run already produced.\n\nThat is the whole thesis. Human-in-the-loop is not a modal dialog bolted onto a pipeline. It is a property of the shapes the pipeline writes down.\n\n## The model proposes. It never writes.\n\nThe write path is the sharpest expression of it. In the human-in-the-loop engine, the model may only propose *typed operations* from a whitelist. The engine dry-runs a proposed operation against a clone of application state and produces a preview: a human-readable summary of what it would do, plus the before-and-after deltas on a set of named gauges — the numbers a reviewer actually cares about, moved.\n\nThe load-bearing invariant is that **the same applier function drives both the preview and the commit**. Preview runs it on a clone; apply runs it on live state. There is no serialization step, no re-parse, no second implementation of \"what this operation means\" — so there is no window in which what a human approved could diverge from what lands. The end-to-end scenario asserts this directly: the preview summary references the same value the commit actually wrote.\n\nThe whitelist is the second half of the same idea. The set of allowed operation kinds is a single value that feeds **both** the enumeration the model sees in its tool schema **and** the guard the engine consults. The allowed set and the schema the model is shown cannot drift, because they are the same list. A disallowed operation fails at the guard on both paths — preview and apply — before it can reach the applier at all. And a rejected or invalid operation previews *with its reason*, so the interface can explain why it cannot be applied rather than offering an approve button that will fail.\n\nThe engine is deliberately transport- and storage-agnostic. The consuming application parses tool calls into operations, owns the approval endpoint, and owns the lock and persistence around the commit. That is a stated boundary rather than a gap — but it means the kit makes no promise about anyone's approval UI, and says so.\n\nThis composition is proven, not asserted: a seeded end-to-end blueprint wires document extraction, the governed agent loop and this engine together, with the model side fully scripted so it runs with no API key. Its tests assert that the budget was charged once per turn, that the journal recorded the run, that the preview matched the commit, that untouched fields stayed untouched, and that two identical runs produce identical reports under the race detector.\n\n## What surfaces the right question at the right moment\n\nAsking a human is cheap. Asking a human *the right question, about a specific thing, at the moment it is answerable* is the hard part, and every mechanism below exists to produce that.\n\n**Conflict detection over graded claims.** A conflict taxonomy operates on assertions and evidence spans that carry a grade, an author and a declarant — deliberately separate from the older, impoverished graph type that performs no tier-aware reasoning. It emits typed conflict kinds with a deterministic severity, computed so the *stronger* side dominates: a documentary source contradicting anything scores high regardless of what it contradicts, while two weak sources disagreeing scores low. That ordering is what makes a review queue meaningful rather than alphabetical.\n\nThe detail I care most about is what it does when it finds nothing. A conflict detector's worst outcome is a silent false negative — zero conflicts because the two sides were keyed in different namespaces and never joined at all. So the result carries join statistics, and a degenerate zero-join over non-empty inputs is distinguishable from genuine agreement. The structure reports its own failure to work.\n\n**Confidence ceilings by tier.** Confidence is derived from evidence count and agreement, and the maximum a tier permits is a deterministic function over that tier — a number computed from data, not a sentence in a prompt. That is what makes \"the model sounded sure\" answerable rather than persuasive. The part I will not overstate: applying the cap is the caller's move. It is not enforced at any write path yet, and the design that turns it on structurally is adopted and not built — the fathom page says the same thing from the consuming side, where the ceiling function is called zero times.\n\n**A deterministic honesty verdict.** Allowed, hedge, or block, with no model in the loop. Same input, same verdict. A gate that is itself a model is a gate you cannot audit.\n\n**The escalation ladder.** Fast cache lookup, then exhaustive search, then a human. Its invariants are the interesting part: a cache hit is *signal only* and never a verdict; an empty cache is a miss, never a conclusion; and a timeout at the human tier fails closed to *unresolved*, never to *absent*. The difference between \"we did not find it\" and \"it is not there\" is exactly the difference a tired reviewer collapses at 6pm, and the type system refuses to collapse it.\n\nEvery escalation to a human writes a gap record to an append-only log. Projections over those records warm the fast tier for next time — so the human's answer becomes a *signal* that lowers the cost of the next search without ever being allowed to substitute for it. Warmed entries are documented as signal-only and are invalidated by any change under the concern's declared constraints. That is the flywheel: human attention is the scarcest input, so the system is built to spend less of it over time without ever pretending it spent none.\n\n**Typed concerns, not comments.** A concern flag carries a type, a severity, the specific target it applies to, and a written rationale. A flag names the node it is about, so the question put to a human is about one paragraph or one field — not about a document. The review queue orders by severity first and insertion order second, so the ordering is deterministic and two runs present the same work in the same sequence.\n\n**An event-sourced claim lifecycle.** Claims move through proposed, supported, refuted, uncertain and superseded as an append-only, hash-chained event log, with the current view derived by projection. Every event carries an author — a human, or an AI with its full reproduction key. So \"who changed their mind, when, and on the basis of what\" is a query, and a claim's history survives the loss of any projection.\n\n## Where this is honest about not being finished\n\nThe generic ask-and-answer elicitation primitive is labeled **composition unproven** in its own package documentation: no consumer has wired it into a workflow. The one real workload that needed elicitation built a domain-specific layer with typed card kinds, field validation, criticality ordering and a ledger-backed status machine — and the kit refuses to absorb that shape, because doing so would drag organization-specific types into a library whose whole premise is that it carries none. If a second consumer ever needs a generic version, that package is the natural home. Until then it is provisional and says so.\n\nThe escalation *interface* and its record types live in the foundations; the propose-preview-approve-commit wiring that satisfies it deliberately does not, because foundations may not import the composition layer. That is a layering rule, and the consequence — the consumer assembles the last mile — is documented at the seam rather than papered over.\n\nAnd the honest framing of the whole page: none of this makes a human *right*. It makes the question specific, the disagreement visible, the approved effect identical to the committed effect, and the answer attributable afterwards. Those are the four things that were missing."
        },
        {
          "id": "security-governance",
          "title": "Security & governance",
          "kind": "custom",
          "body": "## Fail closed is a design law, not a setting\n\nThe rule is that gates err toward refusal, and the interesting part is how many separate places had to agree to it before it meant anything.\n\n**At startup.** The production sidecar refuses to boot on a missing or placeholder identity salt, on proof-of-work enabled without a long-enough secret, on an unnamed model, or on an unset credential environment variable — each with an error naming exactly what to set. A demo mode exists and skips those checks, which is precisely why it is a separate mode rather than a fallback. A system that degrades into demo mode when misconfigured is not fail-closed; it is fail-quiet.\n\n**At the edge of a request.** The body cap is applied before any JSON is decoded, so an oversized body gets a templated refusal and never reaches a parser, let alone a model. Server timeouts are set against slow-reader and slow-loris shapes. The same cap is enforced by the library itself, so a hand-wired deployment that skips the sidecar is still capped by default.\n\n**On the wire.** An oversized protocol message is answered with an explicit parse error and a resync to the next message boundary — and when a clean resync is impossible, the server fails closed rather than guess at where the next message starts. Ambiguous transport state is treated as a security condition, not a parsing inconvenience.\n\n**On egress.** The egress middleware passes every outbound text-bearing field through a caller-supplied transform before the client sees it, and any transform error aborts the call — the inner client is never invoked. Its documentation puts it bluntly: a gate that degrades to pass-through on error is not a gate. It also gates by *field* rather than by declared block type, so a mislabeled block cannot smuggle text past, and it deliberately does not string-transform structured payloads, because blindly rewriting JSON corrupts it and a token substituted inside a JSON string silently changes what a tool does.\n\n**On the answer path.** If the judge or the model errors or is unavailable, the answer is deny. Errors must never become a bypass.\n\n## Bounding spend before the money leaves\n\nThe economics of an internet-facing prompt are the whole problem: people ask it things it should not answer, bots hammer it, and the bill is the attack surface. The gauntlet in front of a paid call is ordered free-to-expensive and short-circuits at the first refusal, so a rejected request costs nothing in model spend.\n\nThe ordering choices are the design. Proof-of-work runs *before* the topic gate, because verifying one signature is cheaper than any embedding call — so a bot has to burn CPU before it can trigger even the cheap layer. The challenge itself is minted and signed server-side over the nonce, difficulty and expiry, so a client cannot forge one; verification authenticates the signature in constant time, enforces a difficulty floor and the expiry, *then* checks the work, *then* checks replay — so a forged challenge claiming zero difficulty and a far-future expiry is rejected outright, and failed attempts never consume a nonce. The replay set is bounded and fails closed: entries evict only once their challenge has expired, and at the cap with nothing evictable, verification is refused rather than weakened.\n\nThe primary bill cap is deliberately **not** per-identity blacklisting. Addresses rotate; blacklists lose. The thing that makes a bill un-blowuppable is an aggregate budget that trips on the first of request-rate, daily-request or daily-spend limits and then opens a breaker so *everyone* gets a polite refusal until cooldown. The per-identity strike ledger still exists, and it is genuinely useful for honest repeat offenders and for having an auditable record — but it is secondary, and the docs say so rather than selling it as the defense.\n\nTwo details show the rule being applied to itself. First, the only model spend a *rejected* request can cause — an ambiguous question escalating to a small judge — is charged to the budget before the judge fires, and a refused charge means the judge is never called and the breaker force-opens. The attacker does not decide how many refusals you pay for; the budget does. Second, the honest caveat sits in the same paragraph: embedding-similarity calls are still uncharged. They are an order of magnitude cheaper than a judge call, but they are not zero, and pretending otherwise would be the kind of rounding that turns into an incident.\n\nEvery outcome of the gauntlet is a labeled counter, so the refusal *mix* is observable — not just the total. And the whole policy layer compiles to WebAssembly, which means the same audited code can run in the pod or be pushed to an edge worker to reject cheap junk before it reaches the origin. The boundary is stated: a browser-side check is a local pre-check only and proves nothing to anyone, because only the server holds the signing secret.\n\n## Provenance you can verify without trusting the system that produced it\n\n**A hash-chained event store** is the system of record: each entry commits to its predecessor, so a chain can be verified offline without trusting any projection or secondary store. The threat model is written into the package doc rather than inferred — verification detects any edit by a party who cannot recompute the hash, and any reordering, middle-drop or sequence gap. It does **not** detect an authorized rewrite by a holder who recomputes the whole chain, nor tail truncation, because dropping the last few entries yields a valid shorter chain. Catching either requires anchoring the head hash and the entry count somewhere external. Naming the two attacks a hash chain does not stop is what makes the ones it does stop believable.\n\n**Anchoring** closes exactly that gap, and its privacy design is the reason it is a separate primitive. Content hashes are batched into a Merkle tree; the inclusion proof for one item reveals only the path of sibling hashes to the root, so a single item can be proven to have existed at anchor time without revealing anything about the others in the batch. Proof-of-time is explicitly *not* self-asserted — it relies on an external authority, and the submission to that authority is an adapter concern rather than something the kit pretends to be.\n\n**A reproduction key on every AI-authored artifact** — model, prompt hash, params hash, input digest — rides every span, decision and prose node, so a claim traces back to what produced it rather than to a commit range.\n\n**Evidence spans** carry grade, author and locator, and the validation step refuses to store as evidence anything without provenance. That refusal is the enforcement; nothing downstream has to remember to check.\n\n## The one deletion story, and what it does not cover\n\nAppend-only stores are append-only by design — replay requires an unbroken record — and the consequence is that personal data written into them cannot be removed. That was documented as a limitation before it was a capability, which is the right order.\n\nWhat ships now is crypto-erasure, and its scope is narrower than the phrase suggests. Values routed through the tokenization vault are encrypted under a per-namespace key; destroying that key makes the stored ciphertext permanently unrecoverable while the audit log of tokenize and detokenize actions — including the denied ones — stays intact. A separate, pure retention evaluator takes caller-supplied rules and an inventory and returns which namespaces are due for which action: shred, flag for human review, or report. The foundation decides; the caller executes. Adapters that claim to implement shreddable storage have to pass an importable conformance suite, so \"we implemented shred\" is a test result rather than a claim.\n\nThe limit is stated everywhere it matters: this covers only what was routed through tokenization *before* it was written. Anything that went straight into a journal, ledger, event store or cassette has no deletion path at all. The guidance to an adopter under a real erasure obligation is correspondingly blunt — route it through the vault before it touches anything append-only, because nothing else here can forget.\n\n## Governance applied to the kit itself\n\nThe same posture points inward. A lint pass inside the build gate turns eleven constitutional promises into build failures, and two of them are security controls in their own right: a whole-tree scan for well-known secret shapes, and a whole-tree scan for organization-specific tokens. Both read the on-disk tree rather than consulting version control, so a file that never got committed is still scanned. The secret scan carries a planted-positive canary test — a check that has never been proven to fire is not a check.\n\nThat is the through-line for this whole page. Fail-closed is not a configuration value someone can flip; budget enforcement is not a dashboard; and provenance is not a log appended at the end. Each one is a property of where the seam was cut, which is why they survive contact with a workload that did not read the documentation.\n\n*The threat model — what a malicious prompt or tool result can and cannot reach, and the explicit list of what is not guaranteed — has its own page.*"
        },
        {
          "id": "governance",
          "title": "Threat model & limits",
          "kind": "custom",
          "body": "## What is mitigated, and tested\n\nThe threat model answers one question: what can a malicious prompt, a malicious tool result, or a misconfigured caller actually reach. These are the shipped mitigations, not a wish list.\n\n- **Prompt-injection screening.** Untrusted content is scanned against a data-driven rule set — callers supply the rules, nothing organization-specific is hard-coded — and when a detector is wired, every tool result is screened before it re-enters the conversation. Recall is 22 of 22 on the kit's own seeded corpus, and the same paragraph says that corpus is necessarily finite.\n- **Untrusted-content fencing.** External content is fenced between per-wrap unguessable delimiters, so a fake closing fence forged by the content itself carries the wrong value and stays inert data.\n- **Instruction precedence.** System above developer above user above untrusted, enforced in how the kit's own code treats content by tier.\n- **Redaction before the model.** Recognizable secret shapes are redacted before content reaches an LLM, and the redaction executor was fuzz-hardened to a true fixpoint after a real single-pass leak was found. One shared rule engine sits under all four scanners, so it is one audited engine rather than four independent ones.\n- **Deny-by-default tool execution.** Where a policy is wired, a tool with no policy match is denied, not permitted, and every dispatch failure surfaces in-band to the model rather than as an uncaught error.\n- **Lethal-trifecta blocking.** Tools declare whether they read untrusted content, read private data, or write externally. A missing declaration is treated as unknown, not clean. When the registered toolset would complete the trifecta, registration fails closed before a token is spent, and overriding requires a named authorizer and a reason.\n- **Tool-description pinning.** An MCP server's tool descriptions enter the model's context on every listing, so each is hashed at first listing and re-verified on every subsequent one. A changed description returns a typed error instead of silently forwarding a modified instruction; rebinding requires an explicit repin, so drift is visible and auditable.\n- **Audit trail.** An append-only, hash-chained event store; append-only claim and correction ledgers; and a reproduction key on every AI-authored artifact — model, prompt hash, params hash, input digest — so a claim traces back to what produced it. The MCP call log records metadata only unless payload logging is explicitly opted into, and then the log is treated as sensitive.\n\n## What is explicitly not guaranteed\n\nThe ceiling on every claim above is a single belief: no capability theater. Unpacked concretely:\n\n- Fencing and instruction precedence are defense-in-depth, not a security boundary. A sufficiently persuasive payload inside a fence can still influence what the model does; the fences make the attempt visible and consistently handleable, not impossible.\n- Bounded subprocess execution is resource confinement, not a sandbox. The child runs with the host's full ambient authority — filesystem, network, memory, CPU, privileges — bounded only in wall-clock time and captured output bytes. Real isolation needs OS primitives a stdlib-only kit deliberately does not provide.\n- Redaction is best-effort shape matching. Encoded secrets, secrets split across segments and novel formats pass straight through untouched.\n- Append-only stores have no general deletion story. The one exception is narrower than it sounds: values routed through the tokenization vault can be crypto-erased by destroying the per-namespace key, which covers only what went through that step. Anything written directly into a journal, ledger, event store or cassette has no deletion path at all.\n- The capability taxonomy is self-declared. A tool that lies about what it reads defeats the check entirely. The mechanism's value is making a truthfully declared risk auditable and forcing a named, provenance-bearing override — it cannot see a capability an author hid.\n- Description pinning defends against drift after first contact, not against a poisoned introduction. Whoever controls the very first listing is trusted from then on.\n- Trifecta detection runs once, at registration, for the whole toolset. That is a deliberate seam — the trifecta is a property of the assembled toolset, not of any single call — and it means a runtime capability change is not re-evaluated.\n\n## If you need more, you add it yourself\n\nThe document ends by telling an adopter what to build rather than pretending it is covered: put a real OS-level sandbox around anything whose blast radius matters; route regulated data through the vault *before* it touches anything append-only, so there is something to erase later; add the specific attack patterns and secret shapes your own threat model requires, because the shipped rules are a starting catalog and not a certification; audit or conservatively over-declare the capabilities of tools you do not control.\n\nThe same honesty applies to data handling in the ordinary case. Identity is a salted hash, so no raw address or personal data is stored — but the violation ledger is append-only by design, snapshots persist it across restarts, and there is no per-identity erasure. Deleting the state file is today's only eraser, and the doc says exactly that.\n\n## Why the limits are written down\n\nA limits list is not modesty. It is what makes the rest of the claims checkable. If the document that tells you recall is 22 of 22 on a named corpus also tells you the corpus is finite, you can calibrate — and if it did not, you could not trust the first number either.\n\nThat is the whole bet: in a foundation, overclaiming is a defect class equal to a failing test. This is the enforcement."
        },
        {
          "id": "prompt-prose-audience",
          "title": "Prompts, prose & audience",
          "kind": "custom",
          "body": "## A prompt is an artifact, not a string literal\n\nThe anti-pattern is unaudited prompt drift: prompts get edited in place, outputs change quietly, and nobody can say which prompt produced which artifact or re-run the old one. The fix is to make a prompt a *named, versioned template rendered against typed parameters*, and to make rendering emit three things alongside the text — a hash of the rendered prompt, the template version, and a hash of the parameters.\n\nThose three values map one-to-one onto the authorship record that rides every AI-produced evidence span, decision and prose node. That is the whole mechanism, and it is deliberately small: the reason it exists is that the authorship record had fields for a reproduction key and nothing in the tree could produce them. Now \"which prompt produced this paragraph, at which version, with which parameters\" is answerable from the artifact itself rather than from commit archaeology.\n\nTwo choices in that package are worth the space:\n\n- **A missing parameter is an error at render time, not an empty string in the prompt.** Rendering is strict about keys. That one decision removes a whole class of silent quality regressions — the kind where a template quietly renders a sentence fragment for a week and the output gets subtly worse in a way no test notices.\n- **There is deliberately no prompt registry.** Callers own storage and lookup. A registry is a storage decision, and the kit does not make storage decisions on behalf of consumers; the coupling to the provenance record is one-way and optional, so a consumer that never records provenance never touches it.\n\nThe compaction summarizer is the worked example of the whole pattern eating its own cooking: it ships its own versioned template, stamps the version into the summary marker it writes into the transcript, and its documentation instructs a maintainer to bump the version on any change that would alter model output.\n\nThe honest status: **drift is attributable today, not auto-detected.** The reproduction keys are shipped end to end. The regression harness that would catch quality drift is a separate thing — the evaluation runner — and it is classified experimental with a single self-hosted subscriber, because an evaluation harness with no corpus and no user is a demo. Knowing *which* prompt produced a bad answer is solved. Being told automatically that answers got worse is not.\n\n## Prose is a graph with provenance, not a blob of text\n\nGenerated prose in this kit is not a string that comes back from a model. It is a set of traceable nodes, and each node carries the evidence references that contributed to it, a redaction flag with a written reason when it has been redacted, and a marker for whether a correction has invalidated it.\n\nThe order of operations is the design:\n\n- **A plan before generation.** An ordered set of sections, each with a title and a stated authoring intent. Generation follows the plan; it does not discover a shape. Duplicate titles and empty intents are refused at validation, so the plan is a contract rather than a suggestion.\n- **Redaction before the model sees the request.** The request text is passed through the pre-model gate first, not after.\n- **Parsing into nodes, then citation.** Citations are rendered deterministically and — this is the part most systems skip — they can be *parsed back*. The round trip is the point: a citation that can only be printed is decoration, while one that can be read back and resolved is a link.\n- **Per-node policy evaluation, then typed concerns.** Each node is evaluated independently, and a violation raises a concern flag naming the specific node, its severity and the rationale.\n- **A publishability gate at the end.** Output is not publishable because it reads well. It is publishable because a weighted gate passed and the flag set is empty.\n- **Regeneration as an append-only log.** A correction carries an identifier and the set of nodes it invalidates; the regeneration log records the chain, so a paragraph that changed can be traced to the correction that changed it and the unaffected nodes are provably untouched.\n\nThe same discipline shows up on the assembly side. Context assembly is deterministic and budget-bounded: segments carry a priority, and the lowest priority truncates first. Which segment got dropped is a property of the data, not of whichever code path happened to run that day.\n\n## Audience — two different things, deliberately kept apart\n\nMost systems conflate \"who is this for\" as *tone* with \"who is this for\" as *permission*. The kit separates them, and is explicit about which one is enforced.\n\n**Audience as intent is an input, and only an input.** The section plan's intent field and the generation request's audience tier shape what the model is asked to produce, and the tier is surfaced on the generated nodes and carried into citations. Its own documentation calls it informational. It is not an enforcement mechanism, and treating it as one would be exactly the capability theater the kit treats as a defect class.\n\n**Audience as posture is a policy, and it is enforced.** What may appear for a given audience is decided against ordered posture levels — open, internal, restricted, secret — with caller-supplied rules naming which terms activate at which threshold. Nothing organization-specific is hard-coded; an organization adds a rule by writing validated data.\n\nThe boundary between those two packages is drawn on purpose and stated in the docs: **posture evaluation decides and never rewrites.** It returns whether a segment is allowed as-is and which terms must be redacted. Actually stripping the content is a different responsibility living on the security side — a pre-model gate that redacts recognizable secret shapes, and an executor that applies a compiled policy to a fixpoint, proven idempotent under repeated application after a real single-pass leak was found and fuzz-tested against. Deciding and executing are different jobs, and fusing them is how a redaction policy becomes untestable.\n\nThat separation generalizes past prose. The egress middleware is the same idea at the client boundary: one transform, applied to every outbound text field, in one place, instead of remembering to do it at every call site. It gates by field rather than by declared block type so a mislabeled block cannot slip through, refuses rather than passing through on error, and deliberately leaves structured payloads alone because blindly rewriting JSON corrupts it — a redaction label inserted mid-document breaks parsing, and a token substituted inside a JSON string silently changes what a tool does.\n\nAnd the limit, stated as plainly as the capability: shape-based redaction is best-effort. Encoded secrets, secrets split across fields and novel formats pass straight through. The rules are caller data precisely so a workload can add what its own threat model requires — the shipped set is a starting catalog, not a certification.\n\n## What audience shaping is today, and what it is not\n\nToday, audience shaping in the kit is **policy plus intent**: a posture that governs what may appear, and an intent that governs what the model is asked for. There is also a typed card generator that shapes extracted document content according to a declared archetype — a governed, field-by-field projection rather than free prose — which is the closest shipped thing to \"one source, several shaped outputs.\"\n\nWhat does **not** exist is a renderer that takes one governed artifact and projects it into several audience-specific versions with their postures applied per version and the citations rewritten to match. The pieces are deliberately positioned for it — the nodes carry their evidence references and redaction provenance, the posture levels are ordered, the citation renderer round-trips, and the regeneration log is append-only. **The design intent is that a per-audience projection becomes a pure function over that graph.** It is direction, not something running, and it will land the way everything else in this kit lands: when a real workload names itself the subscriber and shapes it against real requirements."
        },
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "charts": [
            {
              "id": "run-loop",
              "kind": "cycle",
              "title": "One call, three stages, and six ways for a run to end",
              "note": "The loop is one function. What is worth looking at is the middle stage, which has NO exit at all — every failure mode there comes back into the conversation as an error result rather than leaving the loop. And the closing edge is gated rather than solid, because the loop repeats until a stop condition and the stop conditions are values a caller gets back, not exceptions a caller has to catch.",
              "source": "This project's own architecture, drawn: “The agent harness is a single Run(ctx, input): model turn, then tool dispatch, then governance screens, repeat until a stop condition,” and “Termination is a value, not an exception. A run ends completed, max-turns, budget, refusal, max-tokens or canceled. A Go error means infrastructure failed — and the transcript is still returned with it.” The single early exit is drawn on the strength of a second stated fact: the budget guard is charged BEFORE every model call and a denial ends the run with a budget stop. NO NUMBER APPEARS ON THIS FIGURE AND THE SHAPE HAS NO FIELD FOR ONE — no stage duration, no turn count, no rate at which any exit is taken, and no claim about how the six stop reasons are distributed in practice.",
              "stages": [
                {
                  "key": "turn",
                  "label": "MODEL TURN",
                  "via": "context in; a message or a tool call out",
                  "says": "Two dependencies are required for this loop to exist at all — an LLM client and a tool registry. Everything else is a seam the caller injects, and a nil seam turns that feature off. Nothing is hard-wired into the loop.",
                  "exits": [
                    {
                      "key": "budget",
                      "label": "budget",
                      "why": "The one early exit on the picture. The budget guard is charged BEFORE the model call, so a denial ends the run without a token being spent — and it ends it with a value, not an exception."
                    }
                  ]
                },
                {
                  "key": "dispatch",
                  "label": "TOOL DISPATCH",
                  "via": "one registry validates the call, owns the timeout, and recovers the panic",
                  "says": "THIS STAGE HAS NO EXIT, ON PURPOSE. Unknown tool, policy denial, handler error, panic, timeout, cancellation — every one of them reaches the model in-band as an error result, never as an uncaught Go error and never as a crashed process. Nothing here leaves the loop; it all comes back as something the model can read."
                },
                {
                  "key": "screens",
                  "label": "GOVERNANCE SCREENS",
                  "via": "results are screened before they re-enter the conversation",
                  "says": "A flagged tool result is replaced by an error result, so the raw payload provably never enters the transcript. Blocking is the default here because detection is pattern-based and best-effort, and the honest place for a best-effort check is in front of the thing it is protecting."
                }
              ],
              "close": {
                "verdict": "gated",
                "label": "no stop condition met",
                "detail": "Termination is a value, not an exception. A run ends completed, max-turns, budget, refusal, max-tokens or canceled — six values, every one an ordinary return. A Go error means infrastructure failed, and even then the transcript comes back with it. Provider stop reasons are treated as an open set: the kit knows four and treats anything else as “stopped for a reason this build does not recognise” rather than as a value it can fake.",
                "exit": {
                  "label": "THE RUN ENDS",
                  "why": "completed · max-turns · budget · refusal · max-tokens · canceled. The caller gets a transcript in every one of those cases, which is what makes a failed run debuggable rather than merely failed."
                }
              },
              "steps": [
                {
                  "id": "shape",
                  "lit": [
                    "turn",
                    "dispatch",
                    "screens"
                  ],
                  "say": "One call, three stages, repeat. The whole product is this loop, and its two required dependencies are the only two things a caller cannot switch off."
                },
                {
                  "id": "inband",
                  "lit": [
                    "dispatch"
                  ],
                  "say": "Look at the stage with nothing beside it. Every way tool dispatch can fail returns to the model as an error result — so the loop's most failure-prone step is the one with no exit at all."
                },
                {
                  "id": "early",
                  "lit": [
                    "budget"
                  ],
                  "say": "The only early exit is money, and it fires before the call rather than after it. A budget stop is what a run RETURNS, not what it throws."
                },
                {
                  "id": "ends",
                  "lit": [
                    "close"
                  ],
                  "say": "And the loop closes only while no stop condition is met. Six of them, all values — which is why a caller of this harness writes a switch statement rather than a recover block."
                }
              ]
            }
          ],
          "body": "## Five tiers, and imports only point down\n\nThe tree is 190 Go packages in one module whose `go.mod` has no `require` block — zero external Go dependencies. The layering is a rule, not a description:\n\n- **foundations** — narrow, stdlib-only packages: the durable nouns. Evidence, provenance, governance, security, telemetry, cost, retrieval, review, prose, the LLM client.\n- **kits** — high-order workflows composed from foundations: the agent harness, the MCP server, the endpoint guard, investigation, human-in-the-loop.\n- **runtimes** — policy enforcement and credential-resolution substrates.\n- **surfaces** — human- and developer-facing interfaces, including a schema-driven form engine and its editor layer.\n- **toolchains** — the canonical CUE schemas, generators, and materialization.\n\nFoundations import only the standard library and sibling foundations. Kits compose foundations. Nothing imports upward from a kit back into a foundation. All five tiers are ordinary importable packages — the tier names a package's *role* in the layering, not its visibility.\n\nAnything organization-specific — sensitivity catalogs, redaction rules, taxonomies, provider tables — is validated CUE data, never hard-coded Go. That is what makes the kit org-agnostic in a way that survives contact with a second organization.\n\nOne more fact worth stating plainly, because it shaped every convention above: the kit is developed almost entirely by AI agents. The rules are strict because the authors are fast.\n\n## The loop is the product, and it is one call\n\nThe agent harness is a single `Run(ctx, input)`: model turn, then tool dispatch, then governance screens, repeat until a stop condition. Two dependencies are required — an LLM client and a tool registry. Everything else is a seam the caller injects: budget guard, injection detector, telemetry sink, run journal. A nil seam turns that feature off. Nothing is hard-wired into the loop.\n\nTwo properties matter more than the loop itself:\n\n- **Transcript invariants are structural.** Role alternation and exact tool-call/tool-result pairing are owned by the conversation primitive, so a malformed transcript is unrepresentable rather than \"validated\".\n- **Termination is a value, not an exception.** A run ends completed, max-turns, budget, refusal, max-tokens or canceled. A Go error means infrastructure failed — and the transcript is still returned with it.\n\nProvider stop reasons are treated as an open set: the kit knows four and treats anything else as \"stopped for a reason this build does not recognise\". Unknown provider content blocks are carried verbatim and echoed back untouched — which is why thinking-model blocks survive multi-turn round trips through a package that does not model them.\n\n## One tool table, two surfaces\n\nA tool is defined once — a definition plus a Go handler — and that single registration feeds the model request, the harness's dispatch, and an MCP server's tool listing. Policy checks, per-tool timeouts and panic recovery are owned in the registry, so every failure mode (unknown tool, policy denial, handler error or panic, timeout, cancellation) reaches the model in-band as an error result, never as an uncaught Go error or a crashed process.\n\nThe same registry is what foreign MCP tools are bridged into, so all existing governance applies to third-party tools without special-casing.\n\n## Governance sits inside the loop, not around it\n\n- The budget guard is charged **before** every model call. A denial ends the run with a budget stop, not an exception — and the charge is an honest pre-call estimate, paired with usage-based actuals from the cost middleware.\n- Tool results are screened before they re-enter the conversation. A flagged result is replaced by an error result, so the raw payload provably never enters the transcript. Blocking is the default because detection is pattern-based and best-effort.\n- Tools declare their capabilities at registration. When a toolset's declared capabilities would complete the lethal trifecta — reads untrusted content, reads private data, writes externally — registration fails closed before a single token is spent, and overriding requires a named authorizer and a stated reason. A bare boolean cannot bypass it.\n\n## A gauntlet in front of a public endpoint\n\nThe endpoint-guard kit orders its layers free to expensive and short-circuits at the first refusal, so a rejected request costs nothing in model spend: body cap, circuit breaker, hashed identity, strike ledger, rate limits, proof-of-work, topic gate, answer cache — and only then the paid call. The proof-of-work challenge is signed server-side, so clients cannot mint or tamper with one, and its replay seen-set is bounded and refuses rather than weakens when it fills.\n\nThe primary bill cap is deliberately not per-identity blocking — addresses rotate — it is a global budget that trips the breaker for everyone until cooldown. Even the topic gate's judge call is budget-charged before it fires, so a refused charge means no call at all. The honest caveat is in the same document: embedding-similarity calls are still uncharged, an order of magnitude cheaper than a judge call but not free.\n\nEverything lives inside one process: no external cache, no captcha vendor, no external rate limiter, with an optional local snapshot so a restart does not forget the blocklist and the budget.\n\n## The same policy at the edge\n\nEvery governance package is pure Go that compiles to WebAssembly, so the audited policy can run in the pod, at an edge worker, or in the browser. The shipped example puts the proof-of-work solver in the browser and a cheap prefilter at the edge. The boundary is stated rather than blurred: the browser-side check proves nothing to anyone else, because only the server holds the signing secret — server-side verification is authoritative.\n\n## Testing is a ladder; only the top rung costs money\n\nA scripted mock client where the tools genuinely execute, then committed replay cassettes matched by request hash so prompt or schema drift fails loudly instead of lying, then an exported conformance suite that any new client implementation must pass, then one live smoke test that skips cleanly without a key and is never part of the gate.\n\n## What the gate proves\n\nThe validation task is formatting, vet, contract validation over every schema *and its fixtures*, and race-detector tests across every package, plus the constitution lint that turns doctrine into build failures. Two-layer git hooks run the fast checks on commit and the whole gate on push. Tags are cut only at green gates — which is what makes a tag safe to build on."
        },
        {
          "id": "design",
          "title": "Design constraints",
          "kind": "design",
          "body": "## Zero external dependencies — and what it cost to keep\n\nThe root module has no require block. The reason is not aesthetic: a kit meant to be embedded in everything may depend on nothing, or it hands every consumer a potential dependency conflict and forfeits WebAssembly portability.\n\nThat promise was breached exactly once. Two document-format handlers needed third-party parsers, the require block grew, and four documents went on promising zero deps. The repair was to decide whether the rule was constitution or marketing — it was constitution — move the dependency-bearing handlers into nested modules, and make the rule mechanical so prose could never drift from reality again. The cost is stated rather than hidden: those nested modules carry their own tags and their own release cadence.\n\n## CUE owns the shape; Go owns the behavior\n\nEvery foundation ships a contract file next to the Go that mirrors it. CUE is a language where a type is a value and a value is a type, and the only operation is unification: merge two constraints, fail if they contradict. There is no inheritance and no last-writer-wins, only narrowing — which is exactly what a platform that prizes determinism wants. It buys four things Go structs alone cannot:\n\n- Constraints, not just field names: non-empty string, one of these five values, a list of at least one element, a number in a range.\n- Build-time validation, in a pre-commit hook, long before runtime.\n- Configuration as validated data — an organization adds a rule by writing data that must unify with the schema, so the platform stays general-purpose without hard-coding anyone's catalog.\n- Executable fixtures: positive examples the compiler checks, so a schema change that breaks a real example fails at commit time.\n\nDefinitions are closed, so a misspelled field is an error rather than a silently dropped value — the whole class of \"I set the config key and nothing happened\" bugs mostly disappears. And because CUE owns shape, a schema change *is* an API change: field removal, type narrowing or a newly required field is breaking even when no Go signature moves.\n\n## Determinism is the default; nondeterminism is injected\n\nClocks, randomness, network, subprocesses and model calls all live behind seams. Library code takes an injected clock function; a bare call to the system clock in library code is a defect, not a style preference. Tests are table-driven, sleep-free, network-free and race-clean. Anything that ran once must be replayable — cassettes for model calls, append-only journals and a hash-chained event store for state, golden tests for outputs.\n\nThe justification is operational, not ideological: a harness you cannot replay is a harness you cannot debug, regress or trust.\n\n## Fail closed, spend bounded\n\nGates err toward refusal. If a trust decision cannot be made — partition, schema mismatch, exhausted budget — the call does not execute. Every paid call is budgeted before it is made. Every cache, queue, seen-set, buffer and loop on the request path has an explicit bound and an explicit behavior at that bound, while the append-only ground-truth stores are deliberately unbounded because that is their job.\n\nWhere the rule was not actually true, it is written down rather than quietly patched: one per-identity limiter map had an eviction method that was never called, so the map grew for the life of the process. The fix, the wiring it required, and the fact that callers embedding the kit directly must schedule it themselves are all documented in the anti-pattern ledger.\n\n## Honest contracts: the non-guarantees are load-bearing\n\nNo capability theater. The untrusted-content wrapper is defense-in-depth, not a security boundary. Bounded subprocess execution is resource confinement, not a sandbox. Redaction is best-effort shape matching. Append-only stores have no deletion story. Overclaiming is treated as a defect class equal to a failing test, because it is how trust in a foundation dies.\n\nIn practice that reads as a discipline rather than a disclaimer. A detector's recall is quoted as a real number against a named seeded corpus, and the very next sentence says the corpus is finite. A capability taxonomy is called self-declared, and the doc says plainly that a tool which lies about itself defeats the check.\n\n## Capabilities land when a workload pulls for them\n\nSpeculative abstraction is junk even when it sounds visionary. Patterns that are obviously coming get written into a roadmap with a subscribe-when trigger and are deliberately *not* built; they graduate when a real workload names itself the subscriber and shapes them against real requirements. The build queue is pull-ordered — no new zero-consumer package lands while a consumer-proven ask with a hand-rolled implementation is still open — and extraction only counts as done when the donor deletes its copy.\n\nThe counterweight is recorded honestly: at the last audit, roughly half the library packages had no consumer anywhere. That measurement is why the rule exists.\n\n## The junk gate\n\nA change may land only with a contract where the shape is data, deterministic race-clean tests pinning its central claim, docs that state its non-guarantees as plainly as its guarantees, either a real consumer or a named future workload that pulls for it, and the full gate green. \"Looks done\" is the enemy — the most dangerous artifact in a foundation is a half-baked capability that demos well.\n\n## Stability is a classification, not a stamp\n\nEvery package under the five library roots is classified stable, experimental or internal-ish, with a written rationale for each — 124 stable at the sign-off snapshot, the rest flagged as still-moving or as narrow plumbing. Pre-1.0, stable packages may still break, but never silently: a migration note and a ledger update ship in the same commit. Exported sentinel values and typed error structs are part of that contract.\n\nThe audit that produced the table also produced an uncomfortable result and left it visible: a package classified experimental had picked up a live downstream consumer, which means that consumer has no compatibility promise. The row was not quietly upgraded to make the conflict go away — it was flagged for an explicit decision."
        }
      ]
    },
    {
      "id": "fathom",
      "owner": "mine",
      "title": "fathom",
      "kind": "closed",
      "org": "Personal · in active development",
      "year": "2026",
      "tags": [
        "code-intelligence",
        "go",
        "mcp",
        "developer-tools"
      ],
      "summary": "A multi-repo code-intelligence engine that extracts symbols and call edges into evidence records and answers concern-scoped queries — blast radius, callers/callees, cross-repo symbol search, staleness. Ships as a Go library, a CLI, and an MCP server that editors and AI agents query for code facts.",
      "problem": "Coding agents waste tokens and make mistakes when they can't see how a large codebase actually fits together. They need fast, evidence-tiered answers, not a blind grep.",
      "impact": "Multi-tool MCP surface · hash-gated incremental ingestion · native Go AST + tree-sitter · auto-refresh on HEAD drift. Every channel is instrumented, including against itself.",
      "stack": [
        "Go",
        "SQLite (WAL)",
        "tree-sitter",
        "MCP",
        "CUE"
      ],
      "charts": [
        {
            "id": "claim-freshness",
            "kind": "span",
            "title": "What the citation sweep proves, and where the chain begins",
            "note": "Five stages, left to right, from a governing document to an answer. Two bands are bounded — they cover an interval and claim nothing outside it. The third is drawn at the same weight and the same length with no end ticks at all, because nothing bounds it.",
            "source": "This project's own design record for the claims stratum: every claim cites the source lines it restates; a post-ingest sweep re-hashes those lines and flips the claim's status; a citation that drifts but resolves to exactly one new location is re-anchored with an audit entry, and zero or several matches fall through to stale; a stale claim is served flagged, never silently served and never silently dropped. The bands restate those guarantees. No number is drawn, and this shape has no number field.",
            "nodes": [
              {
                "id": "n1",
                "kicker": "01 · THE SOURCE",
                "title": "DOCUMENT",
                "s1": "a standard, an ADR, a rule"
              },
              {
                "id": "n2",
                "kicker": "02 · THE COMPILE",
                "title": "CLAIM",
                "s1": "cited to source lines"
              },
              {
                "id": "n3",
                "kicker": "03 · THE CHANGE",
                "title": "RE-INGEST",
                "s1": "cited lines re-hashed"
              },
              {
                "id": "n4",
                "kicker": "04 · THE SWEEP",
                "title": "STATUS",
                "s1": "re-anchored, or stale"
              },
              {
                "id": "n5",
                "kicker": "05 · THE ANSWER",
                "title": "SERVED",
                "s1": "with tier and staleness"
              }
            ],
            "spans": [
              {
                "id": "A",
                "from": "n3",
                "to": "n5",
                "kind": "bounded",
                "label": "WHAT THE SWEEP PROVES",
                "proves": "That a claim's cited lines are unchanged since it was compiled — or that they are not, and the claim now says so at the point of use. A stale claim is served flagged, because an agent that saw a rule yesterday should see 'that rule is stale' today, not absence."
              },
              {
                "id": "B",
                "from": "n2",
                "to": "n5",
                "kind": "bounded",
                "label": "WHAT THE CITATION REQUIREMENT PROVES",
                "proves": "That every claim names the lines it restates, so a claim whose citation no longer resolves is flagged rather than served. A claim is only as good as its anchors, and the anchors are checkable without trusting the compiler that wrote them."
              },
              {
                "id": "C",
                "from": "n1",
                "label": "WHAT NOTHING HERE PROVES",
                "proves": "That the document was right. The chain begins at what a source says, not at whether it is true — a confidently wrong standard compiles into a confidently wrong claim, and that claim verifies perfectly for as long as the wrong lines stay put."
              }
            ],
            "steps": [
              {
                "id": "bounded",
                "lit": [
                  "A",
                  "B"
                ],
                "say": "Both bounded bands are about the same thing from two directions: a claim that has drifted from its source is detectable, and detection happens at the point of use rather than in a report somebody reads later."
              },
              {
                "id": "open",
                "lit": [
                  "C"
                ],
                "say": "The unbounded band is the honest limit of any provenance system. Verification proves custody, not correctness — and a system that draws that band is easier to trust than one that leaves it off."
              }
            ]
          },
        {
          "id": "instruments",
          "kind": "diagram",
          "component": "FathomInstrumentStrip",
          "title": "What the index knows about this codebase, and what it knows about itself",
          "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Four numbers this project's own tooling prints about itself. The first two are the capability. The second two are one story: a measurement that came back unflattering, and the change it caused. What is deliberately not here is a result. The counterfactual arm that would say whether any of this saves anyone time is running as this page is published — the channels are switched OFF for a budgeted run of sessions so that there is something to compare against — and it has so far admitted zero comparable observations. Until it does, there is no effect size and no direction claimed anywhere on this page.",
          "source": "sqlite3 over workspace/db/fleet.sqlite (typed_edges, observations) and mcp-calls.jsonl read directly and grouped by tool · run 2026-08-13 between 01:07Z and 01:09Z · n=1 developer, 1 machine · counts, not rates · volume is not adoption and is not benefit: no saving is claimed in this figure and none has been measured."
        }
      ],
      "categoryId": "personal-platform",
      "architecture": {
        "title": "Code-intelligence engine: deterministic index, governed claims, forced delivery",
        "desc": "Three strictly separated layers turn a corpus into evidence observations and answer concern-scoped queries. A second stratum compiles governing documents into cited, tiered claims stored beside the index. Both are delivered through channels ranked by force — a blocking gate and injected hooks first, the pulled tool surface second — because the measured share of agent-chosen tool calls was 0–7%. Every channel is instrumented, because a delivery channel that can go dark unnoticed is not a channel.",
        "boundaries": [
          {
            "id": "corpus",
            "name": "Corpus",
            "trust": "external, read-only",
            "note": "Anything a connector can walk: git repositories and non-git document trees. The corpus stays outside the store; the store carries extracted observations, line-anchored citations, and the watermark needed to detect corpus drift."
          },
          {
            "id": "engine",
            "name": "Engine — three layers (ADR-001)",
            "trust": "deterministic",
            "note": "\"Each layer is independently testable and replaceable. The query layer never touches a network; the pipeline never knows where bytes came from.\" Reasoning runs at compile time; a query is a deterministic join."
          },
          {
            "id": "store",
            "name": "Store",
            "trust": "one writer, many readers",
            "note": "Pure-Go SQLite in WAL mode — the only on-disk backend since ADR-020, and the only one compiled in at all since ADR-025. Claims live in additive tables beside observations, never inside them, because re-ingest purges observations destructively. The file itself is the shippable unit, and its format is a normative spec with its own falsifiability tests."
          },
          {
            "id": "channels",
            "name": "Delivery channels — ranked by force",
            "trust": "configuration, not agent habit",
            "note": "Channels are ranked blocking gate > injected context > pulled tool call > passive docs. The daemon listens on loopback and is unauthenticated by design; a named surface filters and flags traffic, and the record says so plainly — surfaces are ergonomics and measurement, never a security boundary."
          },
          {
            "id": "consumer",
            "name": "Consumer",
            "trust": "agent session",
            "note": "A coding-agent session in an indexed repository. It encounters the engine whether or not it chooses to."
          }
        ],
        "components": [
          {
            "id": "repos",
            "name": "Repos & governing docs",
            "kind": "corpus",
            "boundary": "corpus",
            "boundaryId": "corpus",
            "role": "Code repositories plus the slow-churn documents that govern them — standards, decision records, plans.",
            "note": "Code repositories plus the slow-churn documents that govern them.",
            "tech": [
              "git",
              "non-git doc trees"
            ]
          },
          {
            "id": "connector",
            "name": "Connector SPI",
            "kind": "layer 1",
            "boundary": "engine",
            "boundaryId": "engine",
            "role": "Discover and fetch sources behind one interface. Three implementations: local disk, a hosted forge through its CLI, and a deterministic fixture connector that is the backbone of the test strategy. Each returns a watermark — a repository head where one exists, a content-addressed manifest hash otherwise — so freshness works on non-code corpora too.",
            "note": "Discover/Fetch behind one interface; the fixture implementation is the backbone of the test strategy.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "fusion",
            "name": "Fusion pipeline",
            "kind": "layer 2",
            "boundary": "engine",
            "boundaryId": "engine",
            "role": "Three passes — filter, parallel fetch, then a sequential post-fetch that re-imposes input order so a parallel fetch still produces a deterministic result. Fingerprints, hash-gates, purges and budget-gates before extraction. Dispatch is by what a file actually is, not by what its extension suggests.",
            "note": "Filter, parallel fetch, deterministic post-fetch; hash-gated and budget-gated.",
            "tech": [
              "Go",
              "tree-sitter",
              "wazero/WASM"
            ]
          },
          {
            "id": "compiler",
            "name": "Semantic-layer compiler",
            "kind": "LLM, compile-time",
            "boundary": "engine",
            "boundaryId": "engine",
            "role": "Compiles governing document sections into governed claims. Incremental by per-section digest, redaction-gated, budget-gated with a mandatory dry-run estimate, and verified at compile time — a claim whose citations or scopes do not resolve is rejected. A layer is a pack of data with its own evaluation fixtures and kill gate, never Go code.",
            "note": "Compiles governing docs into cited claims; estimate first, verify anchors, reject what does not resolve.",
            "tech": [
              "Go",
              "CUE"
            ]
          },
          {
            "id": "query",
            "name": "Knowledge query layer",
            "kind": "layer 3",
            "boundary": "engine",
            "boundaryId": "engine",
            "role": "Concern-scoped, evidence-tier ranked, staleness-aware. Every query names a concern; every result carries a staleness assessment and surfaces contradiction pairs.",
            "note": "Concern-scoped, tier-ranked, staleness-aware; never touches a network.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "index",
            "name": "Deterministic index",
            "kind": "observations",
            "boundary": "store",
            "boundaryId": "store",
            "role": "The scraped stratum: symbols, typed call edges, routes, specs cited, complexity — cheap, incremental, provable. Fingerprints are held separately so they can be cleared independently.",
            "note": "Symbols, call edges, routes, spec references — cheap, incremental, provable.",
            "tech": [
              "SQLite (WAL)"
            ]
          },
          {
            "id": "claims",
            "name": "Governed claims",
            "kind": "semantic layers",
            "boundary": "store",
            "boundaryId": "store",
            "role": "The reasoned stratum: content-addressed claims with citations, evidence tier, scope and status. Superseded claims are status-flipped, never deleted. The per-run compile ledger and an append-only claim-event log travel in the same file.",
            "note": "Cited, tiered claims with status; the compile ledger and claim-event log travel with them.",
            "tech": [
              "SQLite (WAL)",
              "CUE"
            ]
          },
          {
            "id": "modhost",
            "name": "Module host",
            "kind": "read-only federation",
            "boundary": "store",
            "boundaryId": "store",
            "role": "The same daemon mounting several conforming store files read-only as one surface — not a second engine. A store that is not conforming, or conforms below the level required, is refused loudly at mount rather than silently degraded. Every federated answer carries its owning module's identity, and can never read fresher than its least-fresh contributor. External adoption of the format is at zero and is not claimed otherwise.",
            "note": "Mounts N conforming stores read-only; conformance checked at mount, provenance on every answer.",
            "tech": [
              "Go",
              "SQLite (WAL)"
            ]
          },
          {
            "id": "gate",
            "name": "Verify gate",
            "kind": "blocking",
            "boundary": "channels",
            "boundaryId": "channels",
            "role": "Checks that a task claimed done is backed by index evidence, at session end, pre-push and in CI. Fails open on operational error, closed on evidence; CI fails closed on both.",
            "note": "Session end, pre-push and CI. Fails open on operational error, closed on evidence.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "hooks",
            "name": "Session / edit / guard / stop hooks",
            "kind": "injected",
            "boundary": "channels",
            "boundaryId": "channels",
            "role": "Configuration-forced injection at the decision moments that previously had no forced channel: session start, before an edit to an explicitly guarded scope, after every edit, and at session end. Silent when there is nothing to say, and never blocking on infrastructure. Bound module rules ride the same payload, module-tagged.",
            "note": "Injected at session start, before a guarded edit, after every edit, at session end. Silence is free.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "mcp",
            "name": "MCP tool surface",
            "kind": "pulled",
            "boundary": "channels",
            "boundaryId": "channels",
            "role": "JSON-RPC over stdio or a loopback HTTP daemon, with path-scoped surfaces per audience — including a scoped module surface. The secondary pull path; an off-surface call executes and is flagged rather than refused, because a rejection teaches abandonment.",
            "note": "stdio or loopback HTTP daemon; path-scoped surfaces; every call logged.",
            "tech": [
              "MCP",
              "JSON-RPC 2.0",
              "SSE"
            ]
          },
          {
            "id": "cli",
            "name": "CLI & Go client",
            "kind": "operator",
            "boundary": "channels",
            "boundaryId": "channels",
            "role": "Every capability is a scriptable verb first — ingest, compile, verify, layer and module authoring, research, metrics — with the Go client as the importable equivalent. A surface-only capability is treated as a defect.",
            "note": "Verb-first: every UI capability is a scriptable command before it is a screen.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "instruments",
            "name": "Instruments",
            "kind": "measurement",
            "boundary": "channels",
            "boundaryId": "channels",
            "role": "A per-call log carrying tool, service, surface, latency and origin; a per-channel beat log giving injection coverage a real denominator; payload-cost accounting recorded at emit time; daily rollups, metrics verbs and a status endpoint. An absent instrument prints a named reason, never a zero.",
            "note": "Call log with origin, channel beats, payload cost, rollups — an absent instrument names its reason.",
            "tech": [
              "Go",
              "JSONL"
            ]
          },
          {
            "id": "agent",
            "name": "Coding-agent session",
            "kind": "client",
            "boundary": "consumer",
            "boundaryId": "consumer",
            "role": "An agent working in an indexed repository. It receives injected context and blocking verdicts by configuration, and may additionally pull from the tool surface.",
            "note": "Receives forced channels by configuration; the tool surface is optional.",
            "tech": [
              "Claude Code",
              "Codex"
            ]
          }
        ],
        "edges": [
          {
            "from": "repos",
            "to": "connector",
            "label": "Discover / fetch",
            "protocol": "local disk · forge CLI · fixtures",
            "kind": "read"
          },
          {
            "from": "connector",
            "to": "fusion",
            "label": "Source references, then bytes",
            "kind": "data"
          },
          {
            "from": "fusion",
            "to": "index",
            "label": "Hash-gated observations — an unchanged file costs one compare",
            "kind": "write"
          },
          {
            "from": "repos",
            "to": "compiler",
            "label": "Governing document sections, digest-gated",
            "kind": "read"
          },
          {
            "from": "compiler",
            "to": "claims",
            "label": "Cited, tiered claims; dry-run estimate mandatory before any spend",
            "kind": "write"
          },
          {
            "from": "fusion",
            "to": "claims",
            "label": "Post-ingest sweep re-hashes cited lines, re-anchors or flips status",
            "kind": "write"
          },
          {
            "from": "index",
            "to": "query",
            "label": "Deterministic join at query time",
            "kind": "read"
          },
          {
            "from": "claims",
            "to": "query",
            "label": "Claims served with tier and status — never silently",
            "kind": "read"
          },
          {
            "from": "claims",
            "to": "modhost",
            "label": "Mounted read-only; non-conforming stores refused, never degraded",
            "kind": "read"
          },
          {
            "from": "query",
            "to": "gate",
            "label": "Per-task verdicts citing file and line",
            "kind": "call"
          },
          {
            "from": "query",
            "to": "hooks",
            "label": "Obligations payload, capped and silent when clean",
            "kind": "call"
          },
          {
            "from": "modhost",
            "to": "hooks",
            "label": "Bound module rules, module-tagged, in the same capped payload",
            "kind": "call"
          },
          {
            "from": "query",
            "to": "mcp",
            "label": "Typed results carrying a staleness report",
            "kind": "call"
          },
          {
            "from": "modhost",
            "to": "mcp",
            "label": "A scoped module surface, provenance on every answer",
            "kind": "call"
          },
          {
            "from": "cli",
            "to": "query",
            "label": "Operator verbs: ingest, compile, verify, module authoring, metrics",
            "kind": "call"
          },
          {
            "from": "gate",
            "to": "agent",
            "label": "Blocks a claimed-done task the index cannot prove",
            "kind": "control"
          },
          {
            "from": "hooks",
            "to": "agent",
            "label": "Injected at the decision moment, before or after the tool runs",
            "kind": "control"
          },
          {
            "from": "mcp",
            "to": "agent",
            "label": "Pulled — measured at roughly 2% of daemon traffic",
            "kind": "call"
          },
          {
            "from": "hooks",
            "to": "instruments",
            "label": "One beat per edit seen, answered, served — the coverage denominator",
            "kind": "data"
          },
          {
            "from": "mcp",
            "to": "instruments",
            "label": "One record per call: tool, surface, latency, origin, off-surface flag",
            "kind": "data"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "problem",
          "title": "The problem",
          "kind": "custom",
          "charts": [
            {
              "id": "dispatch",
              "kind": "diagram",
              "component": "FathomDispatchProof",
              "title": "One symbol, asked twice",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] A grep for VerifyPlan returns the string. It cannot tell you which implementation this function's call sites actually reach, because the name of the thing that runs is not in the file that runs it — that fact lives in the type graph. This is the smallest complete example of what an index answers that a text search structurally cannot, at any model quality.",
              "source": "grep -rn 'VerifyPlan' --include='*.go' . and grep -rn 'func (.*) Contradictions()' --include='*.go' ., both in the fathom repository; caller and dispatch counts from typed_edges in workspace/db/fleet.sqlite · run 2026-08-13T01:08Z · n=1 developer, 1 machine · every number here is reproducible in three commands."
            },
            {
              "id": "orphans",
              "kind": "benchmark",
              "title": "1,966 functions, 33 candidates, and where the index hands off",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Every non-test function and method in fathom's own tree is 1,966 symbols. Asking the call graph which of them is never the target of any edge — direct or interface-dispatch — leaves 33. That is 98.3% of a code review eliminated by one query. The last step is not a query: reading the 33, 22 are explained by Go language rules the call graph does not model, and 11 are worth opening. The third bar is a band because that classification is a person's reading, not a measurement.",
              "unit": "",
              "max": 33,
              "rows": [
                {
                  "label": "No inbound call edge of any kind",
                  "sub": "not a direct target, not a dispatch target",
                  "value": 33,
                  "mine": true,
                  "source": "typed_edges over service_id='fathom', all kinds"
                },
                {
                  "label": "Explained by a Go rule the graph does not model",
                  "sub": "flag.Value on 4 flag types ×9 · error Unwrap ×3 · fmt.Stringer ×2 · main and init ×4 · Server.handle* reached through a method-value dispatch table at internal/mcp/dispatch.go:78 ×4",
                  "value": 22,
                  "mine": true,
                  "source": "read by hand, 2026-08-13 — a classification, not a measurement"
                },
                {
                  "label": "Still standing — a person has to read these",
                  "sub": "11 if every classification above holds; 33 if none of it does",
                  "lo": 11,
                  "hi": 33,
                  "mine": true,
                  "source": "the band is the disagreement between the index's answer and mine"
                }
              ],
              "source": "sqlite3 workspace/db/fleet.sqlite over observations (source_kind in GoFunc, GoMethod; source_ref not like '%_test.go') minus every distinct to_symbol in typed_edges · run 2026-08-13T01:08Z · n=1 developer, 1 machine · counts, not rates · the bars share a scale of 33, and the 1,966 → 33 collapse is stated in words rather than drawn, because on a 1,966-wide axis the second and third bars are 1.7% slivers · CAVEAT, and it is on the figure for a reason: 1,534 of fathom's own edges have a target the index could not resolve, so a symbol reached only through one of those would land in the 33. The index states that it could not resolve them rather than counting them as zero."
            }
          ],
          "body": "## Where an agent's budget actually goes\n\nAn agent dropped into a large repository does not spend most of its tokens writing code. It spends them rediscovering facts the repository already knows: where a symbol is defined, who calls it, what a change will touch, which tests cover it, and — the expensive one — which rules govern the file it is about to edit.\n\nThe tool it reaches for is grep. Grep answers a text question with text. It has no notion of a caller, a callee, a package boundary, or a second repository. It cannot rank an answer by how it was established, cannot tell you the answer is out of date, and cannot tell you two sources disagree. A single \"where is this handled?\" therefore decomposes into a search plus four to six file reads — five to twenty thousand tokens — to answer a question the index answers in one hop at three hundred to eight hundred.\n\nThe baseline that started this project was measured, not assumed: a day of instrumented work in an indexed repository recorded 193 grep calls and zero index calls. Across a longer window, the share of discovery actions the agent chose to route through the index sat between zero and seven percent.\n\n## The second failure is worse than the token bill\n\nRediscovery is expensive. Editing against rules nobody told you about is wrong.\n\nEvery team hand-maintains agent-instruction files, standards, decision records and plans that describe what the code is obliged to do. Those documents rot silently. They are never scoped — the agent sees all of them or none of them — never cited, and never expire. A paragraph that stopped being true six months ago reads exactly like a paragraph that is still binding.\n\nAnd the checkbox at the end of the task is a claim, not a fact. Every shipped spec-driven-development tool lets the agent self-report \"done\"; none of them checks that claim against a code index. A plan can be fully ticked and half true.\n\n## What changes when the agent has a map\n\nThree things change, and they are different in kind.\n\n**Discovery gets cheap and structural.** Every query names a concern; the engine filters observations to that concern, ranks them, and truncates. That scoping alone measured roughly a 77% token reduction against dumping a service's whole symbol list. One neighbourhood call returns a definition with its direct callers, its direct callees and its related tests. \"Who, anywhere in the fleet, calls this?\" becomes a single query across repository boundaries — something the harness has no native capability for at all.\n\n**Answers carry their own epistemics.** Every record is stamped with an evidence tier, so a fact extracted from code outranks a claim made in a document, and no amount of documentation raises the ceiling. Every response carries a staleness assessment — which sources, how old, and whether re-ingest is recommended. Symbol lookup is tiered and says which tier matched, and a miss returns suggestions instead of an empty result. Two records asserting incompatible things about the same symbol are surfaced as a contradiction rather than resolved by luck.\n\n**\"Done\" becomes checkable.** A plan task claimed complete is verified against the index — the symbol exists, a test statically reaches it, no contradiction stands — with file-and-line citations, at push time and in CI. The gate caught three over-claims by its own author on its first run.\n\n## The part that got measured, and did not go as planned\n\nThe original pitch was that index-first discovery would cost about a tenth of a grep-and-read sweep. A benchmark was built specifically to falsify that, with the failure criterion registered in advance. It fired. Fifteen real tasks, two agent arms: equal success on both, 1.38× aggregate token reduction, 2.81× mean wall-time reduction. Real, and nowhere near the claim. The ×10 form of the sentence was retracted in every document that had made it.\n\nA second benchmark ran on the engine's own home turf — index-native tasks it should win most easily. It did not win decisively either: equal success, a slight token premium. That result was written down too.\n\nOnly after the causal fixes those benches identified — a bounded raw-text read on the agent surface, real line extents on document sections, and a set of payload corrections — did a re-run of the same unchanged criteria pass: 13 of 13 successes against 11 of 13, at 0.570× the tokens and about a third fewer turns. The lookup benchmark improved to a 1.96× reduction, still under the pre-registered bar, so the ×10 retraction stands. The honest pitch is: strictly better answers at roughly half the tokens, two to three times faster, plus governed capabilities no grep loop has and which neither bench measured.\n\n## The finding that reshaped the product\n\nThe most consequential measurement was not about tokens at all. Across a week of real production traffic — 7,466 tool calls — the tools the agent *chose* to call accounted for about 1.7%. The single most-called tool was the daemon's own identity lookup, which is hook plumbing.\n\nThe conclusion drawn was not \"push harder on the tools.\" It was that a tool an agent may choose to call is a zero-moat position, because the harness owns default policy. Delivery became **configuration, not agent habit**, with channels ranked by force: a blocking gate beats injected context beats a pulled tool call beats passive documentation.\n\nIn that same production week the forced half measured 91% injection coverage — 4,106 edits seen, 3,753 answered, 1,966 carrying a governing rule — at a median 130 ms and a 95th percentile of 1.54 s, with the verification gate catching 57 failing rows. The pulled half stayed at ~2%. The record calls that split a product truth, not a measurement artifact."
        },
        {
          "id": "how-it-works",
          "title": "How it works",
          "kind": "custom",
          "charts": [
            {
              "id": "channels",
              "kind": "gateflow",
              "title": "Six channels ranked by force — the five that push, and what each one moved",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Ordered by how hard each one can push, not by how important it is. Three are injected and cannot be declined; two are gates that can refuse. The boxes are drawn in force order, left to right, and the sixth channel is drawn nowhere: it would sit between the first and second gate here, it is the pulled index-navigation surface — the one channel an agent may decline — and it carries 1.5% of the traffic in the figure below. The asymmetry is the design position — a tool an agent may choose is a zero-moat position — and the volumes on this diagram are what it is based on.",
              "stages": [
                { "id": "open", "label": "session opens" },
                { "id": "pre", "label": "about to edit" },
                { "id": "post", "label": "edit landed" },
                { "id": "close", "label": "session closes" },
                { "id": "push", "label": "git push" },
                { "id": "ci", "label": "CI" }
              ],
              "gates": [
                {
                  "id": "brief",
                  "label": "session brief",
                  "border": "weakest of the six — informs · no call-log entry, because it is a hook beat and not an MCP tool",
                  "detail": "A dated, generated paragraph at session start: which service this directory is, whether the index is fresh at HEAD, which plans are open.",
                  "checks": [
                    { "what": "It cannot refuse anything", "why": "which is why it is first on a ladder ordered by force rather than by importance" },
                    { "what": "This is where a hand-written CLAUDE.md is closest to doing the same job", "why": "the gain is that this one is dated and checked against the code, and a written file is neither — freshness, not capability" }
                  ]
                },
                {
                  "id": "guard",
                  "label": "pre-edit guard · 6,197 checks → 47 payloads",
                  "border": "warns · 99.2% of checks cost one local pattern test and no daemon call",
                  "detail": "Fires before the edit tool runs. A path that matches no guarded scope never reaches the daemon.",
                  "checks": [
                    { "what": "6,197 checks produced 47 payloads in seven days", "why": "silence is free by construction, not by tuning" },
                    { "what": "93 further payloads were suppressed as duplicates", "why": "a channel that repeats itself trains an agent to skim it" }
                  ]
                },
                {
                  "id": "oblig",
                  "label": "post-edit obligations · 7,024 injections",
                  "border": "delivers · 829 edits seen, 829 answered, 136 carrying a rule",
                  "detail": "Fires after the edit lands, carrying the rules that govern the file just touched. Capped, and silent when there is nothing to say.",
                  "checks": [
                    { "what": "7,024 injections in the lifetime call log; 136 of 829 edits carried a rule in the last seven days", "why": "two different windows, both labelled — the face number is lifetime, the ratio is seven days" },
                    { "what": "Delivery is the fact; obedience is not claimed", "why": "fathom's own guardrail on this counter — rules delivered is a fact about fathom, mistake prevented would be a claim about the agent" }
                  ]
                },
                {
                  "id": "stop",
                  "label": "session-end verify",
                  "border": "refuses · fathom's own flywheel calls this loop IDLE",
                  "detail": "The gate exists and works. fathom's own flywheel reports that it has never run in a recorded session, and prints the one-line remedy.",
                  "checks": [
                    { "what": "fathom flywheel: \"the gate has never run in a recorded session, so catches are unknown — not zero\"", "why": "the tool says this about itself, in those words; a force ladder that omitted it would be a capability diagram pretending to be a measurement" }
                  ]
                },
                {
                  "id": "gate",
                  "label": "push + CI gate · verify_plan 5,074 calls",
                  "border": "strongest of the six — blocks · fails OPEN on operational error, CLOSED on evidence; CI closed on both",
                  "detail": "Re-checks every plan box an author has ticked against the index before the push lands, and again in CI.",
                  "checks": [
                    { "what": "110 refusals across 3,081 instrumented calls", "why": "2,010 older rows carry no verdict field and are excluded rather than counted as zero — the denominator and the exclusion ship in the same sentence as the number" },
                    { "what": "Third-busiest tool in the whole log, and almost none of it was chosen", "why": "volume concentrated in a handful of sessions is a volume number, not a coverage number" }
                  ]
                }
              ],
              "source": "fathom metrics channels, the 7 days to 2026-08-13T00:42:20Z, and fathom instrument --adoption at 2026-08-13T00:43Z (channel and gate counters are their own 7-day window and are not re-read per figure) · n=1 developer, 1 machine · counts, not rates · the measurement arm was re-armed OFF at 2026-08-12T21:25:12Z with 40 sessions of budget, and channels are silenced by design during an OFF window, so these counts will fall for reasons that have nothing to do with use."
            },
            {
              "id": "traffic",
              "kind": "share",
              "title": "Who actually calls fathom",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Every call the daemon logged. The hooks carry the traffic; the navigation index — the part that took the most work — is chosen for 1.5% of it. The second row is the subset an agent chose for itself, on its own scale, and it is what happened next: a bounded raw read was added to the agent surface after the first finding, and it now outdraws the entire navigation family 3.31 to 1.",
              "rows": [
                {
                  "label": "All 23,316 calls",
                  "sub": "2026-07-07 → 2026-08-13",
                  "mine": true,
                  "source": "mcp-calls.jsonl, grouped by tool",
                  "segments": [
                    { "label": "automatic — hooks, gates, identity", "value": 20907, "color": "var(--neon-purple)" },
                    { "label": "read_source — bounded raw read", "value": 1166, "color": "var(--neon-cyan)" },
                    { "label": "index navigation", "value": 352, "color": "var(--neon-amber)" },
                    { "label": "everything else", "value": 891, "color": "var(--line-strong)" }
                  ]
                },
                {
                  "label": "The 1,518 calls an agent chose",
                  "sub": "read_source against the whole navigation family",
                  "mine": true,
                  "source": "same log, agent-selectable tools only",
                  "segments": [
                    { "label": "read_source — bounded raw read", "value": 1166, "color": "var(--neon-cyan)" },
                    { "label": "index navigation", "value": 352, "color": "var(--neon-amber)" }
                  ]
                }
              ],
              "source": "mcp-calls.jsonl in the fathom workspace, read directly and grouped by tool · run 2026-08-13T01:08Z · 23,316 calls over 26 active days · n=1 developer, 1 machine · counts, not rates · segments sum to the log's own total exactly: 20,907 + 1,166 + 352 + 891 = 23,316, and the renderer rounds each segment label to a whole percent, so the bar reads 90 / 5 / 2 / 4 while the precise shares are 89.67 / 5.00 / 1.51 / 3.82 · automatic = list_services + obligations + verify_plan; list_services alone is 8,809 calls, 38% of the log, and is identity plumbing serving every channel rather than a tool any agent chose · the log's own `surface` field is blank on 95.6% of rows, so it cannot partition the log; segmentation is by tool identity with the membership of all four lists declared in docs/plans/fathom-visuals.md §5.3. fathom's own instrument reports 960 calls on the agent surface using that field — a different and much smaller count, from a field that is mostly empty."
            },
            {
              "id": "one-observation",
              "kind": "anatomy",
              "title": "One observation, field by field — and the field that lives somewhere else",
              "note": "The atomic record is stated in the prose below as one comma-run, which is a sentence a reader skims. Here it is with the job of each field written out. The last row is not in the sentence at all: it is a field the record deliberately does not carry, drawn as a rule rather than left off, and the page states the reason.",
              "source": "The specimen is this page's own sentence, quoted exactly and not paraphrased — the observation is “the service it belongs to, the concern it is scoped to, an anchor of file and line, what kind of thing it is, the evidence tier that produced it, the symbol, a human-readable statement of the fact, a content hash, its outbound call edges and its complexity.” The reasons under the parts are read out of the surrounding sections of the same page, and the absent row quotes it directly: “Claims live in additive tables beside observations, never inside them, because re-ingest purges observations destructively and the contradiction scan is blind to record kind.” NOTHING HERE IS COUNTED OR MEASURED. An anatomy makes no magnitude claim and this one makes none — no record count, no ingest timing, no coverage figure. The measured numbers for this system are on the other figures on this project, each carrying its own denominator and its own exclusions.",
              "specimenKind": "string",
              "specimen": [
                {
                  "t": "the service it belongs to, the concern it is scoped to",
                  "part": "scope"
                },
                {
                  "t": ", an anchor of file and line",
                  "part": "anchor"
                },
                {
                  "t": ", what kind of thing it is",
                  "part": "kind"
                },
                {
                  "t": ", the evidence tier that produced it",
                  "part": "tier"
                },
                {
                  "t": ", the symbol",
                  "part": "symbol"
                },
                {
                  "t": ", a human-readable statement of the fact",
                  "part": "say"
                },
                {
                  "t": ", a content hash",
                  "part": "hash"
                },
                {
                  "t": ", its outbound call edges and its complexity",
                  "part": "graph"
                }
              ],
              "parts": [
                {
                  "key": "scope",
                  "label": "the service, and the concern",
                  "why": "Two fields doing one job: they say where this record belongs. Every query names a concern and the engine filters to it before it scores anything, which is what makes a query cheap rather than exhaustive — and it is where the measured token reduction actually comes from."
                },
                {
                  "key": "anchor",
                  "label": "an anchor of file and line",
                  "why": "Root-relative, never machine-local. That single choice is what makes the store portable: moving or shipping a corpus is one metadata update rather than a rewrite of every row."
                },
                {
                  "key": "kind",
                  "label": "what kind of thing it is",
                  "why": "One shape holds a Go function, a Python class, a cluster workload, a schema definition or a document section. The kind is a field precisely so the record does not have to be a different shape per language."
                },
                {
                  "key": "tier",
                  "label": "the evidence tier that produced it",
                  "why": "The field that stops a document out-ranking the code. A fact extracted from code beats a claim made in a document and no quantity of documents raises the ceiling, because the ordering lives in the data rather than in a heuristic that could be argued with."
                },
                {
                  "key": "symbol",
                  "label": "the symbol",
                  "why": "What a person would call the thing. Resolution is tiered — exact, then case-insensitive, then substring — and the answer reports which tier matched, so a fuzzy hit never reads like an exact one."
                },
                {
                  "key": "say",
                  "label": "a human-readable statement of the fact",
                  "why": "A record nobody can read is a record nobody can check. This is the part that appears in an answer; everything else on the list is what makes the answer worth trusting."
                },
                {
                  "key": "hash",
                  "label": "a content hash",
                  "why": "The whole of incremental re-ingest, in one field. A file whose hash is unchanged is skipped, which is why re-ingesting a fifteen-thousand-file repository where fourteen-nine hundred files are unchanged is near-free rather than merely faster."
                },
                {
                  "key": "graph",
                  "label": "its outbound call edges, and its complexity",
                  "why": "The two derived fields, and the two that a text search cannot produce at all. Call edges turn “who calls this?” into a join; complexity is what makes “what will this change touch?” answerable before the change is made."
                },
                {
                  "key": "claim",
                  "label": "a claim about this record",
                  "present": false,
                  "why": "Drawn as a rule because the page states the reason rather than leaving it to be guessed: “Claims live in additive tables beside observations, never inside them, because re-ingest purges observations destructively and the contradiction scan is blind to record kind — a claim stored there would be destroyed by a routine re-ingest or false-positived against a function signature.” Same store, separate tables, same query engine on top."
                }
              ],
              "steps": [
                {
                  "id": "where",
                  "lit": [
                    "scope",
                    "anchor"
                  ],
                  "say": "Where it belongs, and where it came from. These two are what let a query filter before it scores, and what let a whole corpus move without breaking a single citation."
                },
                {
                  "id": "trust",
                  "lit": [
                    "tier",
                    "hash"
                  ],
                  "say": "Two fields that are about trust rather than content. One says how the fact was established; the other says whether it is still true. Neither of them exists in a grep result, and that is the argument for the whole record."
                },
                {
                  "id": "absent",
                  "lit": [
                    "claim"
                  ],
                  "say": "And then the field that is not here. A claim about this record lives in a different table on purpose — store it in this one and a routine refresh deletes it."
                }
              ]
            }
          ],
          "body": "## Stage one: bytes to evidence\n\nA connector abstracts where source comes from — a local tree, a hosted repository through its CLI, or a deterministic fixture corpus — behind two operations, discover and fetch. Nothing downstream knows which one it is talking to.\n\nThe fusion pipeline runs three passes. Filter is sequential and drops vendored trees, generated files and anything the ignore rules exclude. Fetch is parallel into pre-allocated slots; the first error is taken by an atomic compare-and-swap and workers drain rather than being cancelled mid-flight. Post-fetch is sequential again, deliberately re-imposing the original input order so that a parallel fetch still produces a deterministic result.\n\nIn that third pass each file is fingerprinted, compared against its stored hash, and skipped if unchanged; a changed file has its stale records purged first; the run aborts cleanly if pending bytes would exceed the configured budget. The target is stated as a number rather than an adjective: re-ingesting a fifteen-thousand-file repository where fourteen-nine hundred files are unchanged must be near-free — hash compares only.\n\nExtraction is per-language and unsentimental about it. Go goes through the standard library's own parser, because the standard parser is strictly better than a generic grammar for Go and there is no reason to pay a runtime cost for a worse answer. Configuration and infrastructure formats — infrastructure-as-code, cluster manifests, schema definitions, module manifests, Markdown — get their own native parsers rather than being force-fitted into a code grammar. Everything else runs on tree-sitter: newer languages on a pure-Go WebAssembly runtime, admitted one language at a time only after clearing a calibration corpus against the incumbent; nine older ones still on native bindings, which are now the only reason the full binary needs a C toolchain at all. The store itself needs none.\n\nA later correction pass made the index honest about what it was reading: one registry as the single source of language identity, dispatch by a content-and-path classifier that recognizes what a file actually is rather than what its extension suggests, and an additive typed-edge pass that resolves ambiguous method calls into edges that carry a kind — direct, interface dispatch as an edge set, or unresolved — without mutating the syntax-derived contract underneath.\n\n## The atomic record\n\nEverything extracted lands as an **observation**: the service it belongs to, the concern it is scoped to, an anchor of file and line, what kind of thing it is, the evidence tier that produced it, the symbol, a human-readable statement of the fact, a content hash, its outbound call edges and its complexity. That record is the unit the whole system trades in — one shape for a Go function, a Python class, a cluster workload, a schema definition or a document section.\n\nEvidence tiers are inherited from the governed-evidence platform this engine is built on, not invented here: extracted-from-code, pattern-matched, stated-in-a-document, said-by-a-human, inferred — each with a confidence ceiling. A code fact never outranks a document claim by accident, because the ordering is in the data.\n\n## Stage two: the query model\n\nEvery query names a **concern**. The engine filters to that concern, scores by keyword or blended semantic overlap, and truncates to a top-N. Forcing the caller to be specific is treated as the point rather than a cost: it is what keeps results relevant and what produced the measured token reduction.\n\nOn top of that sit the shapes an agent actually needs: symbol resolution that tries exact, then case-insensitive, then substring and reports which tier matched; a symbol's neighbourhood — definition, direct callers, direct callees, related tests — in one call; bidirectional call trees at bounded depth; blast radius and test impact for a proposed change; the same questions asked across repository boundaries; a budget-bounded context pack that reports what it dropped to fit; and a bounded, line-numbered raw read for the case where the agent genuinely needs the current text at a cited line.\n\nThree properties make those answers different from search results. Every result carries a staleness assessment, because silent staleness is a correctness trap for a machine consumer. Incompatible claims about the same symbol surface as contradiction pairs. And every response that could mislead carries its markers — tier, staleness flag, how the match was made, the corpus watermark it was answered from.\n\nThe query layer never touches a network. Reasoning happens when a layer compiles; a query is a deterministic join.\n\n## Stage three: compiling what governs the code\n\nA whole class of knowledge is invisible to a scraper, because producing it requires reasoning rather than parsing: what a file is obliged to do, why it is shaped this way, what a prior review already found here. That is the second stratum, and it is compiled, not retrieved.\n\nThree sentences discipline it. *Meaning is compiled* — a layer is a build target over a corpus, incremental by input digest, budgeted with an estimate before and real usage after, and versioned so that prompt plus model plus inputs give a reproducible identity. *Reasoning at compile time, determinism at query time.* *A claim is only as good as its anchors* — every claim cites the source lines it restates and the code scope it governs, and a claim whose citations or scopes do not resolve is rejected at compile time rather than served hopefully. That last rule is not fastidiousness: the surveyed base rate for citation errors in frontier models is 15–20%, so compile-time anchor verification is mandatory or the whole stratum is untrustworthy.\n\nClaims live in additive tables beside observations, never inside them, because re-ingest purges observations destructively and the contradiction scan is blind to record kind — a claim stored there would be destroyed by a routine re-ingest or false-positived against a function signature. Claim identity is content-addressed; a superseded claim is status-flipped, never deleted, because audit history is cheap now and unrecoverable later.\n\nFreshness runs on two mechanisms because they cover different windows: a token-free sweep after every ingest that re-hashes each claim's cited lines, and a status check at query time. A drifted citation whose original text now resolves to exactly one new location is re-anchored automatically with an audit entry; zero matches or several fall through to stale. A stale claim is served **flagged** — never silently served, never silently dropped, because an agent that saw a rule yesterday should see \"that rule is stale\" today, not absence.\n\nA layer ships as a pack of data — a validated manifest, a content-addressed prompt, corpus selectors, labelled evaluation fixtures with deliberate scope traps, and a kill gate — never as Go code. Four packs ship in the binary today: per-file obligations, architectural constraints from decision records, plan-task bindings, and review findings. A project adds its own by installing a directory. The admission bar is precision at or above 0.90 and recall at or above 0.75 against its own fixtures, scored against a real model, with the run recorded. Two of the shipped packs scored 1.00 on both. One — the findings pack — has not cleared its gate; the first real run aborted before scoring on an unrelated defect, the failure was filed rather than glossed, and the tier promotion that depends on it stays switched off.\n\n## Stage four: delivery, ranked by force\n\nThe engine ships three surfaces — an importable client, a command-line binary, and an MCP server over stdio or a loopback HTTP daemon with path-scoped surfaces per audience. Every capability is a scriptable verb first; a surface-only capability is treated as a defect.\n\nThe load-bearing decision is the admission that surfaces are not enough. Channels are ranked: **blocking gate**, then **injected context**, then **pulled tool call**, then **passive documentation**.\n\n- At **session start**, an index status and operating primer, about eighty tokens.\n- **After every edit**, the obligations governing the edited file, capped at roughly 150 tokens, with zero output when there is nothing to say — injection is affordable precisely because silence is free.\n- **Before** an edit to a scope the project has explicitly declared guarded, the same payload arrives ahead of the tool call, with the author's own one-line note first. Non-matching files cost one local pattern test and no daemon call at all. This channel injects and never blocks; an edit-time denial would train agents to route around it.\n- At **session end**, tasks claimed complete this session that fail verification are surfaced — advisory by default, blocking by opt-in.\n- At **push and in CI**, the gate. It fails *open* on operational error and *closed* on evidence: a claimed task that failed verification blocks the push; an unreachable daemon warns loudly and lets it through, because a gate that blocks a push over a dead background service punishes the wrong behaviour. CI fails closed on both, because CI owns determinism and builds its own index.\n- The **pull surface** remains, curated to sixteen tools for the agent path with the full registry one endpoint away. An off-surface call still executes and is flagged in the log rather than rejected, because a rejection teaches abandonment, which looks identical to no-demand in the data.\n\n## What it costs\n\nCompilation reads slow-churn governing documents, so a full compile of a repository is single-digit cents, a code commit costs nothing to recompile — claims join to code by scope at query time rather than being recompiled against it — and a documentation edit costs pennies through per-section digest gating. Spend is ledgered per run from real provider-reported usage, not heuristics, and a dry-run estimate is mandatory before any spending path. Six provider lanes are supported, two of them drawing on an existing subscription rather than a metered key; an unrecognized lane is a typed configuration error listing all six, never a silent fallback. Government-cloud deployments are profiles over the existing cloud lanes — a region, an endpoint, a deployment name — not modes and not a separate code path, and the configuration doc says so in those words.\n\nCosts scale with change size, never repository size. That is a structural property of where the claims are anchored, not an aspiration."
        },
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "charts": [
            {
              "id": "layering",
              "kind": "diagram",
              "component": "FathomLayeringMatrix",
              "title": "Every call edge in this repository, by direction",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] All 12,222 direct call edges the index holds for fathom's own tree, bucketed by the caller's top-level directory and the callee's. Three of the nine directions carry none. That is a measured zero over the whole repository rather than a sample, and an exhaustive negative is the answer shape a text search cannot produce and the node graph below this figure cannot draw — on a node graph an absent arrow and an unmodelled one look identical.",
              "source": "sqlite3 workspace/db/fleet.sqlite: typed_edges where service_id='fathom' and kind='direct', caller directory taken from from_file, callee directory resolved through the modal package→directory map in observations · run 2026-08-13T01:08Z · n=1 developer, 1 machine · counts, not rates · both marginals close on 12,222 exactly and no target went unresolved in this projection · the three zeros are independently reproducible without the index: grep -rl 'fathom/pkg/' internal/ --include='*.go' and the same for /cmd/ under internal/ and under pkg/ all return nothing, while the one non-zero direction they check against, grep -rl 'fathom/internal/' pkg/, returns 13 files."
            }
          ],
          "body": "## Two names, one engine\n\nThe repository shipped under an earlier name and was renamed. The reason is written down in the decision record: *\"A sextant navigates by surface sightings; a fathom measures depth. The product's differentiation is no longer only navigation (where is the symbol) but governed depth (what governs this file, why, and how sure are we).\"* The rename landed in the same change as the semantic-layers design, so the name and the architecture say the same thing. The old name survives only in historical records — changelog entries, journals, dogfood notes — because those describe past events.\n\nIt also bit back, which is recorded rather than tidied away: the rename left one repository's directory name pointing at a service that no longer existed, and rule injection was silently dead there for six days while probe traffic looked healthy. The fix made the daemon's own repository-to-service mapping authoritative instead of guessing from a directory name, and the incident became the evidence for a standing rule that every measurement channel ships with an \"is anything flowing?\" assertion.\n\n## Three layers, strictly separated\n\nThe founding decision is a boundary, not a feature. A **connector interface** abstracts the source: discover, then fetch. A **fusion pipeline** turns source references into bytes, then into evidence observations in the store. A **knowledge query layer** turns the store into typed results per query or tool call. The stated reason is short: *\"Each layer is independently testable and replaceable. The query layer never touches a network; the pipeline never knows where bytes came from.\"*\n\nThree connectors exist: local disk, a hosted forge through its CLI, and a deterministic fixture connector over invented, org-neutral test data. That last one is not an afterthought — the record calls it *\"the backbone of the TDD strategy\"*, because the entire fusion and query stack is exercised against fixed fixture data with no network and no credentials.\n\nThe pipeline runs three passes: sequential filter, parallel fetch into pre-allocated slots with the first error taken by an atomic compare-and-swap, then a sequential post-fetch that deliberately re-imposes input order so a parallel fetch still yields a deterministic result. That third pass fingerprints each file, skips it if unchanged, purges its stale records if changed, and aborts the run if pending bytes would exceed a configured budget. The target is a number: *\"Re-ingesting a 15k-file repo where 14.9k files are unchanged must be near-free (hash compares only).\"*\n\nExtraction is per-language and unsentimental. Go goes through the standard library's own parser — *\"Go AST is strictly better than tree-sitter for Go code, so no WASM/CGO cost is paid there.\"* Other languages go through tree-sitter, newer ones on a pure-Go WebAssembly runtime and nine older ones still on native bindings, each language admitted only after it clears a calibration corpus. Infrastructure and configuration formats use their own native parsers rather than being force-fitted into a code grammar.\n\nEvery query names a **concern**. The engine filters to it, scores by keyword or semantic overlap, and truncates. Every result carries a staleness assessment, and the engine surfaces contradiction pairs — two records asserting incompatible things about the same symbol.\n\n## Two strata: what the code is, and what governs it\n\nThe knowledge model is explicitly two strata. The **deterministic index** is scraped: symbols, call edges, routes, spec references, complexity — cheap, incremental, provable. **Semantic layers** are reasoned: compiled claims over governing documents, carrying citations, evidence tiers and staleness.\n\nThree sentences discipline the second stratum. *Meaning is compiled* — a layer is a build target over a corpus, not a retrieval pipeline: incremental by input digest, budgeted with an estimate before and real usage after, and versioned so prompt plus model plus inputs give a reproducible identity. *Reasoning at compile time, determinism at query time.* *A claim is only as good as its anchors* — every claim cites the source lines it restates and the code scope it governs; broken citations flag the claim rather than silently serving it.\n\nClaims deliberately do **not** live in the observations table. Re-ingest purges observations destructively, and the contradiction scan is blind to record kind — so a claim stored there would be destroyed by a routine re-ingest, or false-positived against a function signature. Same store, separate tables, same query engine on top. Claim identity is content-addressed; a superseded claim is status-flipped rather than deleted, because *\"audit history is cheap now and unrecoverable later.\"*\n\nFreshness uses two mechanisms because they cover different windows: a token-free sweep after every ingest that re-hashes each claim's cited lines and flips its status, and a status check at query time. When a citation drifts but its original text resolves to exactly one new location, the sweep re-anchors it and appends an audit entry; zero or several matches still fall through to stale. A stale claim is served **flagged** — never silently served, never silently dropped, because *\"an agent that saw a rule yesterday should see 'that rule is stale' today, not absence.\"*\n\n## The store is the module\n\nPortability is a birth property of the schema, not a later feature. Connectors emit root-relative anchors; the store never records a machine-local absolute path. Moving or shipping a corpus is one metadata update. Freshness is domain-neutral: the connector interface returns a repository head when one exists and a content-addressed manifest hash otherwise, so a non-code corpus — a standards folder, a findings export — can still say whether it is stale.\n\nThe contract is a named test rather than a paragraph: build a store on one corpus, move the corpus, remap the root, and check that symbols answer, citations resolve, the watermark reads fresh rather than falsely drifted, and re-ingest is fully hash-gated. *\"That test is the publishable meaning of 'portable store'.\"*\n\nThat is what makes an **expert module** a configuration rather than a second product: one store file containing the deterministic index, the compiled claims and their links, its own audit trail — a per-run compile ledger and an append-only claim-event log — and its own identity in the form of corpus root, watermark and layer versions. *\"The store file is the product; the binary is its reference reader.\"* What distinguishes it from a chatbot with a folder of documents is that every answer carries why it should be trusted, when it stopped being sure, and what it was compiled from.\n\nThat format is now written down as a normative spec rather than a phrase in a roadmap: a file container, two native format-identity markers, required tables per conformance level, anchor rules, watermark semantics, a closed evidence-tier vocabulary and claim-lineage rules including refutation durability. Every requirement carries either a named test or an explicit unenforced marker — including one test that diffs the spec's own required-schema table against the live schema, so the document cannot drift from the binary that implements it without something failing. The honest gaps are written into the spec itself, notably that the reference implementation has no read-only open path yet.\n\n## Federation, internally\n\nOn top of that spec sits a **module host**: the same daemon mounting several conforming store files read-only, as one surface. Not a new binary and not a second engine — the multi-store query path is built on the cross-repository graph machinery that already generalized over several services' stores. A store that is not conforming, or is conforming below the level the host requires, is refused loudly at mount rather than silently degraded. Every federated answer carries the identity of the module it came from alongside the tier and staleness a single store already had to carry, and a federated answer can never read fresher than its least-fresh contributing module.\n\nThe binding half is consumer-side and explicit: a repository opts in to a module through a committed, reviewable declaration, optionally narrowing which paths it applies to and what minimum tier it will accept. Central mounting makes a module *available*; only the repository's own binding makes it *apply*. Bound module rules then ride the same injected channel the repository's own rules do, module-tagged, with repository rules keeping priority within the payload cap and displacement counted separately for each.\n\nThe entry condition for external federation — real outside consumers targeting the format — is unmet, at zero, and is not claimed otherwise anywhere in the record. The host was built internally, deliberately and on the record, as the thing that could *generate* that evidence rather than as a claim that it had arrived.\n\n## Surfaces, channels, and instruments\n\nThree surfaces ship: an importable client, a command-line binary, and an MCP server over stdio or a loopback daemon with path-scoped surfaces per audience. Every capability is a scriptable verb first; a surface-only capability is treated as a defect.\n\nDelivery is **configuration, not agent habit**, with channels ranked by force: **blocking gate** > **injected context** > **pulled tool call** > **passive docs**. A gate at push and in CI refuses a task claimed done that the index cannot prove. Hooks inject at session start, before an edit to an explicitly guarded scope, after every edit, and at session end. The pull surface remains as the secondary path, curated to sixteen tools for the agent registration with off-surface calls executed and flagged rather than refused.\n\nMeasurement is part of the architecture rather than a report bolted on. Every tool call is logged with its tool, service, surface, latency, error and — after a deliberate repair — its **origin**, so gate and hook plumbing is separable from genuine agent tool-picking. Every channel emits a beat, so coverage has a denominator: injections divided by edits actually seen. Payload sizes are recorded at emit time, so the cost side of the ledger is real. Daily rollups, a set of metrics verbs covering spend, traffic, channel health, interventions and time series, and a status endpoint read from that same data. The discipline attached to all of it is that an absent instrument prints a named reason, never a zero.\n\n## What it refuses to be\n\nThe standing non-goal list is part of the architecture: no domain connectors, no web-scale code search, no editor language services, no embeddings-first chat, no multi-tenant hosting. No tool joins a surface without call-log justification. Every layer ships with its consumer, its evaluation fixtures and a kill gate. And costs scale with change size, never repository size."
        },
        {
          "id": "design",
          "title": "Design constraints & tradeoffs",
          "kind": "design",
          "charts": [
            {
              "id": "refusals",
              "kind": "diagram",
              "component": "FathomHonestyLedger",
              "title": "What fathom refuses to report about itself",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Five counters fathom keeps about its own effect. Two of them print a named reason instead of a zero, because a zero from an instrument that was never wired is indistinguishable from a zero from an instrument that measured nothing. The reasons are the figure. The divider is drawn from the data, not fixed: a third counter was refusing when this page was designed and reports a number now.",
              "source": "fathom metrics interventions, the 7 days to 2026-08-13T00:42:20Z, reasons quoted from the tool and trimmed only for length · n=1 developer, 1 machine · counts, not rates · the reported rows are counts of delivery and refusal events, not of outcomes: delivery is the fact, obedience is not claimed."
            },
            {
              "id": "gate-direction",
              "kind": "fork",
              "title": "The same gate, two failure directions, and neither one is a default",
              "question": "The gate cannot return a verdict — the daemon is unreachable, and no evidence was read either way. Does the push land?",
              "note": "Both branches ship. The push gate takes the first and CI takes the second, on the same failure, deliberately. That is why nothing on this figure is marked as the default: neither direction is where this lands when nobody decides, and both are where it lands because somebody did.",
              "source": "This page's own paragraph, drawn: “The push gate fails open on operational error and closed on evidence. CI fails closed on both, because CI owns determinism and builds its own index,” together with the constraint that produced it — a forced channel that lies or blocks for infrastructure reasons “gets uninstalled within a week,” and “a gate that blocks a push over a dead background service punishes the wrong behaviour.” NO RATE, NO REFUSAL COUNT AND NO CATCH COUNT APPEARS ON THIS FIGURE. The refusal counts this project reports live on the other figures with their own denominators and exclusions; a fork has no number field at all, and the two blocks below say what each direction costs when it is wrong rather than how often it is.",
              "branches": [
                {
                  "key": "open",
                  "label": "IT LANDS — FAIL OPEN",
                  "is": "What the push gate does when the failure is operational. It warns loudly and lets the push through, because a gate that blocks a push over a dead background service punishes the wrong behaviour — and a forced channel that blocks for infrastructure reasons gets uninstalled within a week.",
                  "wrong": "An unproven claim reaches the branch with nothing on the developer's machine having caught it. This branch is only safe as half of a pair: the claim being made is that the next gate catches it, which is why the other branch has to exist somewhere."
                },
                {
                  "key": "closed",
                  "label": "IT IS REFUSED — FAIL CLOSED",
                  "is": "What both surfaces do when the failure is evidence rather than infrastructure, and what CI does in either case — because CI owns determinism and builds its own index rather than trusting a daemon it did not start.",
                  "wrong": "Somebody correct is stopped by an operational fault they did not cause, at the moment they were trying to ship. On a laptop that is a channel people learn to route around; in CI it is the price of a build nobody has to argue about."
                }
              ],
              "steps": [
                {
                  "id": "open",
                  "lit": [
                    "open"
                  ],
                  "say": "This is the branch that looks like weakness and is not. The design constraint it serves is written down as a constraint rather than a risk: a channel that blocks for infrastructure reasons gets uninstalled."
                },
                {
                  "id": "closed",
                  "lit": [
                    "closed"
                  ],
                  "say": "And this is the same gate refusing. The direction is chosen per surface rather than per product — which is exactly why the line under this figure says no branch is the default."
                }
              ]
            }
          ],
          "body": "## The constraint that shaped everything: it has to be believable\n\nThis is a system whose entire product is being trusted about code. So the design is organised less around capability than around the ways a system like it dies. The design record names them explicitly, from the external survey: embeddings-first context engines get retracted; freshness kills compiled knowledge, and nobody attaches per-artifact staleness to it; coverage-first ontologies die before delivering anything; knowledge with no consuming tool stalls; and even citation-bearing frontier models mis-cite at a 15–20% rate, so compile-time anchor verification is mandatory rather than optional.\n\nThe conclusion is narrow, and stated as a correction of emphasis rather than a boast: the differentiator is not *having* compiled knowledge — everyone will have that. It is **governance**: provenance tiers on every answer, machine-checked contradiction against the deterministic index, honest per-claim staleness, costed compilation, and telemetry-gated existence.\n\n## Fourteen laws, written down and applied\n\nThe doctrine is a numbered list that later designs cite by number. The ones that bite hardest:\n\n- **Determinism first.** Validated rules and pure analyzers wherever possible; a model only at the semantic margin, always evaluation-gated.\n- **Never silent.** Cited refusals beat confident fabrication — including \"empty config reads as clean.\"\n- **Consolidate, don't grow.** No net tool growth; every addition rides a forced channel. Two tools have been added to the curated agent surface since it was founded, each with measured evidence for the addition rather than a hunch.\n- **Minimal theater.** Every move carries a kill criterion, or an explicit done-when-stamped terminal state.\n- **Activation is stamped, never prose-documented.** One feature sat inert for fourteen days and the flip date was never recorded, which destroyed the ability to distinguish no-demand from no-connection. Operator-run activation now writes a stamp the moment it happens, and plans reference stamps, not memory.\n- **Instruments get existence checks.** An adoption metric whose traffic source can silently vanish is theater.\n- **Kill clocks require a consumer population.** Zero-call evidence gathered while the intended consumers were deliberately paused proves exposure-zero, not demand-zero. Until qualifying traffic exists, a tool is *held as unmeasured*, never killed.\n- **Verb-first surfaces.** Every capability is a scriptable command before it is a screen; screens render state and dispatch verbs.\n- **The advisor recommends; the gate decides.** Agentic judgement is served with tier and citation and can never promote a readiness level. Promotion is deterministic criteria only — *\"the trust boundary that keeps 'agentic advising' from becoming vibes with a progress bar.\"*\n- **No saving is claimed without a counterfactual.** A token number is a *cost* until something establishes what would have happened otherwise.\n- **User scope may add defaults; only project scope may govern.** A machine-level file may contribute additive defaults and the operator's own notes; it may never narrow, weaken or widen committed governance — and every contribution is disclosed at the point of use, because *\"an undisclosed global is indistinguishable from a bug.\"*\n- **Confidence is capped by verification depth, not by assertion.** No quantity of documents or model output raises a ceiling; compilation cannot manufacture confidence, and re-running the same prompt on the same corpus is not corroboration.\n\n## Retraction as a design practice\n\nThe most unusual thing in these documents is how much of them is a record of the author disproving his own claims.\n\nThe original pitch was that index-first discovery would cost roughly a tenth of the tokens of a grep-and-read sweep. A benchmark was built with its failure criterion registered in advance. It measured equal task success on both arms at 1.38× aggregate token reduction and 2.81× mean wall-time reduction — real, and nowhere near the claim. The criterion fired, and the ×10 form of the sentence was **retracted in every document that made it**, replaced by a standing bar of equal-or-better task success at measurably lower tokens and wall time.\n\nA second benchmark then ran on the system's own home turf — the index-native tasks it should win most easily. It did not win decisively: equal success, a slight token premium. That was written down too, with the surviving pitch stated as \"equal answers, cheaper on some tasks, faster overall, with governance itself unmeasured by this bench.\" Only after causal fixes did a re-run of the same unchanged criteria pass, at strictly better success and roughly half the tokens — and the corpus revision for that re-run was committed *before* the run, as the registration proof.\n\nThe same discipline applies to instruments. A metric with no reachable signal prints a named reason, never a zero. Fields that can be absent are paired with a note that is always populated, so a present value with an empty note is a real measurement and a missing value always carries its reason. A shareable evidence bundle was audited, found to emit all-zero groups for instruments it had never actually read — indistinguishable from measured zero coverage — and restructured so an unread instrument is structurally absent rather than falsely zero.\n\nAnd when asked for a \"how many times did it save you from a mistake\" counter, the answer in the design record is a refusal: that number cannot be produced honestly, because it requires knowing what the agent *would* have done. What shipped instead is an interventions table counting only mechanism-verifiable events, each labelled by its mechanism — unproven \"done\" claims refused by the gate, findings raised then reconciled, non-conforming artifacts refused, governed edits with rules delivered, guarded edits pre-warned. *\"'Rules delivered' is a fact about fathom; 'mistake prevented' is a claim about the agent. We report the first.\"*\n\nThe same rule now governs the token story. A production week can say what governance *cost* per edit, because payload sizes are recorded at emit time. It cannot say what governance *saved*, because nothing establishes the counterfactual. The A/B protocol that would establish it is pre-registered in the design record — the protocol exists as text; the experiment has not been run — and the kill criterion attached to it is blunt: if the experiment shows the channels on being no better than off, every production savings claim gets retracted wherever it appears.\n\n## Staleness has four classes, each with an owner\n\nStaleness is treated as the way the whole design dies, so every class of drift gets a detector, a remediation and an honest surface: the index lagging commits, handled by an auto-refresh on head drift; the index lagging uncommitted local edits, handled by a per-file content hash at edit time with the payload saying so; the running binary lagging the code; and compiled claims lagging their corpus, handled by the post-ingest citation sweep plus a query-time status check. Then there is the meta-class the program was bitten by directly — instrument staleness, where an adoption script silently measured nothing after a rename — which is why every measurement channel now ships with an existence check.\n\nAn honest example of the machinery working against its author: a fleet-wide re-sweep against a read-only copy of the live store checked 340 claims, found 73 whose citations were wrong, and healed exactly zero of them — because every one of those claims predated the change that stores the cited text alongside its hash, so they can go stale but can never re-anchor until the next recompile. That degradation is written down as expected honesty, not a regression, along with the operator-visible consequence: dozens of rules that used to serve unflagged will start serving flagged, because the sweep is finally telling the truth about citations that were already wrong.\n\n## Honest failure beats eager enforcement\n\nA forced channel that lies or blocks for infrastructure reasons *\"gets uninstalled within a week\"* — treated as a design constraint, not a risk. So hooks never block on infrastructure; a down daemon degrades to an honest one-line notice or to silence, never an error and never a stall. The push gate fails **open** on operational error and **closed** on evidence. CI fails closed on both, because CI owns determinism and builds its own index. Pre-edit guidance is inject-only even though the hook mechanism could deny the call, because *\"an edit-time deny would train agents to route around the channel.\"* Intercepting the agent's most reflexive actions was rejected outright, with named revival evidence recorded in case telemetry ever justifies a hint — never a block.\n\n## Restraint as a recorded decision\n\nSeveral decisions are records of *not* building something, which is the harder thing to write down.\n\nA four-stratum taxonomy for pluggable content was adopted as **vocabulary layered onto mechanisms that already exist** — total implementation cost, one additive defaulted schema field — on the reasoning that two existing packs had already sat evaluation-perfect with zero production claims for weeks: *\"a pack library, or a fourth pack type, built ahead of a named consumer is theater, not progress.\"*\n\nTwo separate reuse opportunities from the sibling platform were read in full and then declined in writing, each with the forgone engineering named as accepted debt rather than quietly dropped. The reasoning in one is worth the whole exercise: adopting the shared kit would still have required building the surface, group, prompt and resource layer on top of it, so *\"adoption relocates work rather than removing it.\"*\n\nAnd every deferred piece of machinery — a generic layer runtime, a claim-lifecycle state machine, persisted vectors, a new evidence tier for compiled claims — is deferred **with named revival evidence**: the specific observation that would justify building it. Nothing is rejected; things are held until something makes them true.\n\n## The gap the design is currently pointing at\n\nThe confidence ceilings are documented in the domain model and enforced nowhere: the ceiling function exists in the shared platform and this engine calls it zero times. The review that found it did not soften it — it named it as the program's recurring failure mode, machinery built and never switched on. The design that turns the cap on structurally, at the write path rather than by caller discipline, is adopted and is where this is going next; it is a switch-on with an entry condition of none, and until it lands the ceilings remain documentation rather than enforcement. Writing that down is the point: a cap that is documented but unenforced is the defect being fixed, not a feature being announced.\n\n## What would falsify this\n\nThe design record ends with its own falsification conditions, kept deliberately. If the portability round-trip cannot hold without breaking existing queries, the \"store is the module\" commitment needs a migration story before anything external ships. If a compiled layer fails its precision gate on the author's own corpus, no external module is credible and the layer program stops at deterministic claims. And if serving claims from a non-code corpus demands engine special cases, the corpus-agnostic commitment was wrong and must be redesigned — which is exactly why a real non-code corpus was put in the first scope, to force that answer early."
        },
        {
          "id": "direction",
          "title": "Where this is going",
          "kind": "custom",
          "charts": [
            {
              "id": "bars",
              "kind": "cards",
              "min": 240,
              "title": "Six open questions, and the bar each one has to clear",
              "note": "[n=1 · one developer · one machine · 26 active days, 2026-07-07 → 2026-08-13] Everything on this page is intent rather than behaviour, so each item is written as the criterion that would settle it rather than as a plan. The first card is the one currently running, and it has no result.",
              "cards": [
                {
                  "id": "arm",
                  "tone": "amber",
                  "label": "THE A/B, RUNNING NOW",
                  "what": "The arm is OFF as of 2026-08-12T21:25:12Z, with 40 sessions of budget left. 34 rows since; 0 admissible; 34 excluded for coverage.",
                  "why": "Bar: one admissible paired observation on each arm. There is no effect size, no direction and no comparison — fathom's own flywheel calls this loop OPEN and says an open loop collects nothing while looking healthy from the producing side."
                },
                {
                  "id": "retraction",
                  "tone": "amber",
                  "label": "THE ×10 CLAIM",
                  "what": "Pre-registered, fired its own failure criterion, retracted everywhere it appeared.",
                  "why": "Bar: the pre-registered threshold, unchanged. The re-run improved to 1.96× and still missed it, so the retraction stands."
                },
                {
                  "id": "module",
                  "tone": "purple",
                  "label": "THE MODULE AS A PRODUCT",
                  "what": "Studio and web renderer: designed, not built.",
                  "why": "Bar: a scripted cold run from folder to servable verdict in one sitting."
                },
                {
                  "id": "advisor",
                  "tone": "purple",
                  "label": "THE GAP ADVISOR",
                  "what": "Designed, not built. The trust boundary was designed before the feature.",
                  "why": "Bar: the advisor recommends and the gate decides — one of the fourteen laws, and the thing that would make an advisor safe to ship."
                },
                {
                  "id": "chat",
                  "tone": "purple",
                  "label": "GOVERNED CHAT",
                  "what": "Contract written before implementation. Read-only before writable is a launch law, and no read-only open path exists today.",
                  "why": "Bar: an uncited sentence is a type error, not a warning."
                },
                {
                  "id": "adoption",
                  "tone": "amber",
                  "label": "EXTERNAL ADOPTION",
                  "what": "Zero, and not claimed otherwise anywhere on this site.",
                  "why": "Bar: a third party builds a module and serves it without the author in the loop."
                }
              ],
              "source": "fathom arm and fathom flywheel, both run 2026-08-13T00:42Z; every other row is this project's own written design record · n=1 developer, 1 machine · no result is claimed in either direction for the A/B, because none has been measured."
            },
            {
              "id": "authoring-flywheel",
              "kind": "cycle",
              "title": "The flywheel this design is built toward, and the edge that does not exist yet",
              "note": "Every other figure on this project draws something that runs. This one draws something that does not — and it draws it at the same weight, because a caveat reads as a hedge and an unterminated edge reads as a fact. Five stages that are real as a design, and a closing edge with no arrowhead and no terminus, because nothing carries the last stage back to the first.",
              "source": "This subpage's own paragraph, drawn: “consumption failures are the authoring backlog. Every refusal, every stale-citation serve, every low-tier answer is a structured record of what was asked, what was searched, and why it failed. The design captures those locally and consent-first and surfaces them beside the deterministic gaps, so the author sees 'this many questions died in this scope this month,' fixes sources, recompiles, and watches the same question answer with a fresh citation.” And the sentence immediately after it, which is why the loop is drawn open: “Today it is a design with an evaluation gate attached to it and no code behind it.” NOTHING ON THIS FIGURE IS MEASURED. No failure count, no scope, no month and no rate — the quoted sentence's “this many” is a placeholder in a design document, and it is not filled in here because there is nothing yet to fill it with.",
              "stages": [
                {
                  "key": "ask",
                  "label": "A QUESTION IS ASKED",
                  "via": "of a module, through the host",
                  "says": "The ordinary way in, and the only one. Nearly all of this traffic leaves immediately by the exit beside it — the loop is built out of what is left.",
                  "exits": [
                    {
                      "key": "answered",
                      "label": "IT ANSWERS, CITED AND FRESH",
                      "why": "The success path, and the one this whole engine already does. A question that answers never enters the loop below, which is why the loop is a picture of failures rather than of use."
                    }
                  ]
                },
                {
                  "key": "fail",
                  "label": "THE ANSWER FAILS",
                  "via": "a refusal · a stale-citation serve · a low-tier answer",
                  "says": "Three different failures, and the design's claim is that all three are the same event: somebody needed something the module could not honestly give them. That is the reframe the whole flywheel rests on."
                },
                {
                  "key": "record",
                  "label": "THE FAILURE IS RECORDED",
                  "via": "what was asked, what was searched, and why it failed",
                  "says": "A refusal is treated as a product surface rather than an error state: here is what was searched, here is why it cannot be answered, here is the one action that would fix it. That third part is what makes the record actionable instead of merely sad."
                },
                {
                  "key": "backlog",
                  "label": "THE AUTHOR READS THE BACKLOG",
                  "via": "beside the deterministic gaps, on the authoring surface",
                  "says": "This is the stage that makes authoring and consumption one product instead of two. The author is not guessing what to cover next; the consumers already said, by failing."
                },
                {
                  "key": "recompile",
                  "label": "SOURCES ARE FIXED; THE MODULE RECOMPILES",
                  "via": "and the same question is asked again",
                  "says": "Compilation is incremental by input digest and budgeted with an estimate before and real usage after, so this stage has a price a person can see before they pay it. That part exists today."
                }
              ],
              "anytime": [
                {
                  "key": "noconsent",
                  "label": "CAPTURE DECLINED",
                  "why": "The design captures these locally and consent-first, so a failure nobody agreed to record is not recorded — and never reaches the backlog. A flywheel with an opt-in first stage is a slower flywheel, and that trade is in the design rather than discovered later."
                }
              ],
              "close": {
                "verdict": "none",
                "detail": "The design ends with the author watching the same question answer with a fresh citation. Nothing in the shipped binary carries stage five back to stage one — in this project's own words, it is “a design with an evaluation gate attached to it and no code behind it.” The edge is drawn at the same length and the same weight as a closed one so that the absence is a mark on the picture rather than a sentence somebody has to find."
              },
              "steps": [
                {
                  "id": "idea",
                  "lit": [
                    "ask",
                    "fail",
                    "record",
                    "backlog",
                    "recompile"
                  ],
                  "say": "Five stages, and the idea behind them is the sharpest one in this program: consumption failures ARE the authoring backlog. Every refusal is a structured record of what somebody needed and could not get."
                },
                {
                  "id": "out",
                  "lit": [
                    "answered"
                  ],
                  "say": "The one exit is success, and it is where nearly all the traffic goes. That is worth saying out loud, because a diagram made entirely of failures can be mistaken for a system that mostly fails."
                },
                {
                  "id": "open",
                  "lit": [
                    "close"
                  ],
                  "say": "And now look at the return edge. No arrowhead, no terminus, same weight as a closed one — because nothing carries the last stage back to the first, and drawing it closed would have been the easiest lie available on this page."
                }
              ]
            }
          ],
          "body": "## Read this section differently from the others\n\nEverything on the other pages describes behaviour that exists. This page is the opposite: it is the direction, and every item on it is labelled as such. Nothing here is running. Where a thing is partly built, the line between the built part and the intended part is drawn explicitly, because the whole product is an argument about not overstating what is known.\n\nThe floor it builds on, in one paragraph and in the present tense: the index, the query layer, the claims stratum with its compile-time verification and its post-ingest sweep, the four semantic-layer packs, the forced channels — session brief, post-edit injection, guarded pre-edit injection, the push and CI gate, the session-end check — the curated agent surface, the instrumentation with origin tagging and per-channel beats, the read-only module host over conforming store files, the module authoring verbs with a machine-checked readiness ladder, and the two format specs with their falsifiability tests. That is what the direction below extends.\n\n## The unit of product is the module, and the next work is making one authorable\n\nThe engine already treats a store file as a self-contained artifact: index, claims, links, audit trail and identity in one file, with a spec that says what conformance means and tests that keep the spec from drifting from the binary. The command-line half of authoring one — declare, attach sources, map the deterministic gaps, compile, evaluate, get a verdict against a four-rung readiness ladder, package — exists today.\n\n**The direction is to make that path reachable by someone who will never read a spec.** The design commissions an interactive studio over exactly those verbs, then a server-rendered web rendering of the same state machine, on a rule written into the doctrine to keep it honest: every capability is a scriptable verb first, and the surfaces render state and dispatch verbs rather than owning logic. Neither surface is built. The exit criterion for the first one is deliberately embarrassing to fake — a scripted cold run has to go from a folder of sources to a servable verdict in one sitting, with every promotion criterion machine-checked; the second one is entry-gated on the first, because the state machine has to exist before it gets a second renderer.\n\n**The gap advisor is designed and not built, and its trust boundary is designed first.** The intent is a model pass that reads a module's declared scope and its corpus map and proposes what the module claims to cover but has nothing to say about — every proposal cited to what was actually searched, tiered, and killable by the same evaluation discipline as any other layer. The rule it is built under is already law: the advisor recommends, the gate decides. Agentic judgement can never promote a module's readiness level; promotion stays deterministic criteria only.\n\n## The flywheel the design is built toward\n\nThe sharpest idea in the program is not built yet and is worth stating as an intention rather than a capability: **consumption failures are the authoring backlog.** Every refusal, every stale-citation serve, every low-tier answer is a structured record of what was asked, what was searched, and why it failed. The design captures those locally and consent-first and surfaces them beside the deterministic gaps, so the author sees \"this many questions died in this scope this month,\" fixes sources, recompiles, and watches the same question answer with a fresh citation.\n\nThat loop is what would make authoring and consumption one product instead of two. Today it is a design with an evaluation gate attached to it and no code behind it.\n\n## Governed chat, and what it must owe the reader\n\nThe direction for consumption is a chat experience over the module host — with the contract written before the implementation, which is the part worth reading. The intended contract is that retrieval happens through the host, every claim in an answer must carry its citation with tier and staleness, and zero retrieved evidence must produce a refusal rather than an answer from the model's prior. The response type is meant to make an uncited sentence a type error rather than a runtime check.\n\nThe refusal is treated as a product surface rather than an error state: here is what was searched, here is why it cannot be answered, here is the one action that would fix it — which is what feeds the flywheel above. None of that is running. The answer loop belongs in the sibling governed-agent platform rather than here, so that this engine stays a substrate and does not grow a chat protocol of its own; any MCP-speaking client is meant to be a frontend to the same surface.\n\nHosting is gated on a law written before any hosting exists: **a hosted surface ships read-only before it ships writable.** Authentication and read-only enforcement are launch requirements rather than later hardening — not a thirty-day clock, a precondition. The reference implementation's own honest gap is written into the spec: there is no genuinely read-only open path today, because opening a store always runs its schema setup. Closing that is a prerequisite, and it is named as one.\n\n## Turning on the cap that is already documented\n\nThe evidence-tier ceilings are documented in the domain model and enforced nowhere — the ceiling function lives in the shared platform and this engine calls it zero times. The adopted design turns it on structurally at the write path, so no future caller can forget it, and sharpens it in two ways that are the interesting part.\n\nFactual claims get ceilings by verification depth: executed evidence above type-resolved evidence above parsed evidence above pattern matches above what a document asserts. Normative claims — obligations, decisions, standards — get a different ladder, because no execution proves an *ought*; their evidence is that an authority wrote them down, and the top rung has a precise meaning that is not \"a document says so twice\": a normative claim reaches it only when **a machine check enforces the rule**. That is design intent. None of it is wired yet, and the record says so in the same sentence that proposes it.\n\n## Making the token claim answerable\n\nThe cost side is instrumented: payload sizes are recorded at emit time, a session ledger joins them, and the report says what governance spent per edit. The savings side is deliberately blank, because the law says a token number is a cost until something establishes what would have happened otherwise.\n\nThe experiment that would establish it is pre-registered as text and has not been run. Its kill criterion is already written: if the channels-on arm shows no better than the channels-off arm after enough sessions, every production savings claim gets retracted wherever it appears. That is where the tokenomics story goes next — not to a bigger number, to an answerable question.\n\n## Extraction and distribution\n\nTwo mechanical directions, both with named triggers rather than dates. Cross-file caller resolution currently has real depth in one language; extending it to the languages an outside adopter would actually bring is demand-driven rather than scheduled, and the record already corrected an over-claim in its own documentation on exactly this point. And the binary still needs a C toolchain, now solely because nine language extractors ride native bindings; the store no longer does, and proved it by building and passing race-enabled tests with the C toolchain disabled. Moving those nine onto the pure-Go engine is what makes cross-compiled single-binary releases possible, and it is a separate slice whose trigger has not fired.\n\n## The bar for the whole thing\n\nExternal adoption is at zero and is not claimed otherwise. The entry condition for federation as an external story — real outside consumers targeting the published format — is written down, unmet, and repeated in every document that touches it. The module host was built internally as a deliberate schedule override, recorded as an override rather than as evidence that the condition had fired, on the reasoning that dogfooding it is how the condition could ever be reached.\n\nThe direction ends where the product's own doctrine points: the platform event is a third party building a module and serving it to their own consumers without the author in the loop. Everything above exists to make that event boring. Until it happens, the honest description is a substrate with a proven forced-delivery loop, a measured benchmark win on its own turf, a documented format, and a queue of designs whose entry conditions are written down before the code is."
        }
      ]
    },
    {
      "id": "app-kit",
      "owner": "mine",
      "title": "app-kit",
      "kind": "closed",
      "org": "Personal · early, active development",
      "year": "2026",
      "tags": [
        "platform",
        "go",
        "cuelang",
        "templ",
        "no-node"
      ],
      "summary": "A personal product platform that underpins my apps, with no Node in the build chain: a CUE-driven design-token pipeline (emits @theme CSS, DTCG JSON, and Go constants), a library of pure-Go SVG visualization components, and an MCP server that makes a licensed component library queryable by coding agents.",
      "problem": "When agents generate most of the UI, consistency is the scarce resource. Humans and agents both need one set of paved roads — tokens, components, an app contract — or every screen drifts.",
      "impact": "CUE → CSS/Go token pipeline · golden-tested SVG components · Tailwind v4 with no Node · MCP component catalog.",
      "stack": [
        "Go",
        "CUE",
        "templ",
        "Tailwind v4",
        "SQLite",
        "MCP"
      ],
      "charts": [
        {
            "id": "token-pipeline",
            "kind": "fanout",
            "title": "One token schema, three emitted forms",
            "note": "The kit's design tokens are declared once in CUE and emitted into three shapes that different consumers need. The interesting edge is the one coming back: what decides that the three emitted forms are still the schema's, after somebody has edited a stylesheet by hand.",
            "source": "This project's own summary: a CUE-driven design-token pipeline that emits @theme CSS custom properties, DTCG-format JSON and Go constants. The return edge is drawn as a build gate because the emitted files are golden-tested — a regenerated file that differs from the committed one fails the build. Stated from the project's design record; no drift rate is claimed and none was measured.",
            "direction": "emit",
            "reveal": true,
            "origin": {
              "label": "tokens.cue",
              "sub": "one schema, version-controlled beside the code it governs"
            },
            "forms": [
              {
                "key": "css",
                "label": "@theme CSS custom properties",
                "sub": "what a browser reads"
              },
              {
                "key": "dtcg",
                "label": "DTCG-format JSON",
                "sub": "what design tooling reads"
              },
              {
                "key": "go",
                "label": "Go constants",
                "sub": "what a server-rendered component reads"
              }
            ],
            "check": {
              "verdict": "fails-build",
              "label": "golden diff in CI",
              "detail": "Regenerate, compare against what is committed, fail on a difference. That is what makes 'one source of truth' a property of the build rather than a description of the intent."
            },
            "steps": [
              {
                "id": "why",
                "lit": [
                  "css",
                  "dtcg",
                  "go"
                ],
                "say": "Three consumers that cannot share a file format: a browser, a design tool and a Go compiler. The pipeline exists because the alternative is three hand-maintained copies of the same palette."
              },
              {
                "id": "gate",
                "lit": [
                  "check"
                ],
                "say": "Nothing above this line stops the three from drifting. The gate does — and it is the only part of the diagram that is a guarantee rather than a convenience."
              }
            ]
          }
      ],
      "categoryId": "personal-platform",
      "architecture": {
        "title": "app-kit — the platform contract",
        "summary": "Every kit app is one Go http.Handler tree on a loopback listener. Shells are chrome pointed at that URL, the event spine drives the render loop, and the kit's own decisions ship as a queryable surface for coding agents.",
        "desc": "Four groupings: the contracts-and-build layer that compiles before anything runs, a kit app as a single Go binary, the shells that are chrome over it, and the agent knowledge surface. Every connection is numbered and listed below the diagram.",
        "boundaries": [
          {
            "id": "authoring",
            "name": "Contracts and build",
            "trust": "authored once",
            "note": "Schemas, tokens and templates are compiled ahead of run time. No Node in any toolchain, ever."
          },
          {
            "id": "app",
            "name": "A kit app — one Go binary",
            "trust": "loopback only",
            "note": "One http.Handler tree bound to 127.0.0.1 on an OS-chosen port. Web, desktop and cloud are the same binary."
          },
          {
            "id": "shells",
            "name": "Shells — chrome only",
            "trust": "swappable",
            "note": "A shell owns the window, not the app. No app code may depend on shell-specific bindings, IPC or events."
          },
          {
            "id": "agents",
            "name": "Agent knowledge surface",
            "trust": "local, stdio",
            "note": "The kit's component vocabulary and its decisions, queryable from inside whatever project an agent is working in."
          }
        ],
        "components": [
          {
            "id": "cue",
            "name": "CUE schemas",
            "kind": "source of truth",
            "boundary": "authoring",
            "boundaryId": "authoring",
            "role": "Single authoring home for every contract the kit ships",
            "note": "App manifest, config, design tokens, component metadata, bus subjects — each authored exactly once.",
            "tech": [
              "CUE"
            ]
          },
          {
            "id": "gen",
            "name": "Codegen driver",
            "kind": "go program",
            "boundary": "authoring",
            "boundaryId": "authoring",
            "role": "Emits every downstream form of the contracts",
            "note": "Go types, a design-token bundle and theme CSS from one source. Output is committed; CI fails on a dirty regeneration.",
            "tech": [
              "Go",
              "CUE"
            ]
          },
          {
            "id": "css",
            "name": "Pinned CSS binary",
            "kind": "checksum-pinned",
            "boundary": "authoring",
            "boundaryId": "authoring",
            "role": "Builds app CSS without a JavaScript toolchain",
            "note": "A standalone executable verified by SHA-256 per platform. A mismatch is a hard build failure, not a warning.",
            "tech": [
              "Tailwind v4 standalone"
            ]
          },
          {
            "id": "templ",
            "name": "templ components",
            "kind": "compiled to go",
            "boundary": "authoring",
            "boundaryId": "authoring",
            "role": "Turns markup into compiler-checked Go",
            "note": "Templates compile to Go, so a template referencing a field that does not exist is a compile error.",
            "tech": [
              "templ",
              "Go"
            ]
          },
          {
            "id": "listener",
            "name": "Loopback listener",
            "kind": "net/http",
            "boundary": "app",
            "boundaryId": "app",
            "role": "The app's only transport",
            "note": "Binds loopback on an ephemeral port and serves before any shell exists, so a shell can never navigate to a dead port.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "authgate",
            "name": "Launch-token auth",
            "kind": "middleware",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Bootstraps trust into the local origin",
            "note": "A single-use launch token is exchanged for a session cookie; every other route needs that cookie, and the Host header is checked.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "sse",
            "name": "SSE render loop",
            "kind": "hypermedia",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Streams idempotent snapshots to each tab",
            "note": "One long-lived stream per tab renders the whole region; commands are short POSTs that return almost nothing.",
            "tech": [
              "Datastar",
              "templ"
            ]
          },
          {
            "id": "spine",
            "name": "Event and state spine",
            "kind": "embedded broker",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Tells the renderer that state changed",
            "note": "In-process, no sockets. A key-value watch firing is what triggers a re-render, across handlers, tabs and windows.",
            "tech": [
              "NATS JetStream"
            ]
          },
          {
            "id": "store",
            "name": "Durable store",
            "kind": "embedded sql",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Relational truth that must survive",
            "note": "Single file through a cgo-free driver, with ordered, forward-only embedded migrations and a pre-upgrade snapshot.",
            "tech": [
              "SQLite"
            ]
          },
          {
            "id": "caps",
            "name": "Capability interface",
            "kind": "shell-agnostic",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Native features without a shell dependency",
            "note": "Windows, dialogs, tray, secrets, updates — asked for by name, answered with a truthful support level.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "ui",
            "name": "Component library",
            "kind": "templ + tokens",
            "boundary": "app",
            "boundaryId": "app",
            "role": "The visual vocabulary every app composes from",
            "note": "Kit components styled only from token roles, so a theme change never edits a component.",
            "tech": [
              "templ",
              "CUE tokens"
            ]
          },
          {
            "id": "viz",
            "name": "SVG visualization",
            "kind": "pure go",
            "boundary": "app",
            "boundaryId": "app",
            "role": "Charts and meters with no client library",
            "note": "Every function returns a plain SVG string, escaped internally, with colors resolved from the same token roles.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "desktop",
            "name": "Desktop shell",
            "kind": "webview window",
            "boundary": "shells",
            "boundaryId": "shells",
            "role": "Window chrome, packaging, signing, verified updates",
            "note": "Points a webview at the loopback URL. Its asset transport carries only a bootstrap page and error chrome.",
            "tech": [
              "Wails v3"
            ]
          },
          {
            "id": "tab",
            "name": "Browser tab",
            "kind": "zero install",
            "boundary": "shells",
            "boundaryId": "shells",
            "role": "The permanently supported tier",
            "note": "The ultimate hedge: if every shell fails, the app still runs. It self-terminates when its last stream closes.",
            "tech": [
              "any browser"
            ]
          },
          {
            "id": "cloud",
            "name": "Cloud deployment",
            "kind": "same binary",
            "boundary": "shells",
            "boundaryId": "shells",
            "role": "The same handler tree, deployed",
            "note": "A non-loopback bind is refused unless the manifest explicitly configures real authentication.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "assistant",
            "name": "The Assistant",
            "kind": "mcp server",
            "boundary": "agents",
            "boundaryId": "agents",
            "role": "Makes kit knowledge ambient in any project",
            "note": "One binary, stdio by default. Search-then-get tools; no tool ever dumps a catalog into a context window.",
            "tech": [
              "Go",
              "MCP"
            ]
          },
          {
            "id": "index",
            "name": "Component index",
            "kind": "embedded sqlite",
            "boundary": "agents",
            "boundaryId": "agents",
            "role": "Answers component queries in microseconds",
            "note": "Structural filters plus keyword ranking over a licensed corpus, compiled ahead of time and shipped inside the binary.",
            "tech": [
              "SQLite",
              "FTS5"
            ]
          },
          {
            "id": "decisions",
            "name": "Decision corpus",
            "kind": "adrs + patterns",
            "boundary": "agents",
            "boundaryId": "agents",
            "role": "Serves the reasoning, not just the code",
            "note": "The register, the decision records and the pattern docs, exposed as both tools and stable resource URIs.",
            "tech": [
              "Markdown",
              "MCP resources"
            ]
          },
          {
            "id": "agent",
            "name": "Coding agent",
            "kind": "mcp client",
            "boundary": "agents",
            "boundaryId": "agents",
            "role": "The kit's other first-class user",
            "note": "Any agent in any project, wired up by a committed config file it finds at that repo's root.",
            "tech": [
              "MCP"
            ]
          }
        ],
        "edges": [
          {
            "from": "cue",
            "to": "gen",
            "label": "authored once, emitted many ways"
          },
          {
            "from": "gen",
            "to": "ui",
            "label": "Go token constants + theme CSS"
          },
          {
            "from": "css",
            "to": "ui",
            "label": "app CSS, built with no Node"
          },
          {
            "from": "templ",
            "to": "ui",
            "label": "typed, compile-checked markup"
          },
          {
            "from": "authgate",
            "to": "listener",
            "label": "guards every route",
            "protocol": "session cookie"
          },
          {
            "from": "listener",
            "to": "store",
            "label": "command POSTs write durable truth"
          },
          {
            "from": "listener",
            "to": "spine",
            "label": "and the reactive state behind it"
          },
          {
            "from": "spine",
            "to": "sse",
            "label": "watch fires; snapshot re-renders"
          },
          {
            "from": "sse",
            "to": "ui",
            "label": "renders the whole region, idempotently"
          },
          {
            "from": "desktop",
            "to": "listener",
            "label": "webview points at the loopback URL",
            "protocol": "HTTP + SSE"
          },
          {
            "from": "tab",
            "to": "listener",
            "label": "same URL, zero install",
            "protocol": "HTTP + SSE"
          },
          {
            "from": "cloud",
            "to": "listener",
            "label": "same handler tree, real auth",
            "protocol": "HTTP + SSE"
          },
          {
            "from": "caps",
            "to": "desktop",
            "label": "capability calls; support level declared"
          },
          {
            "from": "agent",
            "to": "assistant",
            "label": "search-then-get",
            "protocol": "MCP over stdio",
            "direction": "both"
          },
          {
            "from": "assistant",
            "to": "index",
            "label": "structural filters + keyword ranking"
          },
          {
            "from": "assistant",
            "to": "decisions",
            "label": "decisions served as resources"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "body": "## The invariant everything else hangs off\n\nEvery kit app is one Go `http.Handler` tree, served by a real listener bound to loopback on a port the OS picks. Shells — a desktop window, a browser tab, a cloud deployment — are chrome pointed at that URL. No app code may depend on shell-specific bindings, IPC or events.\n\nThat is not an aesthetic preference. The obvious alternative, serving the app through a webview's request-interception layer, fails on dated upstream facts: on Windows the webview accumulates an entire response before delivering it, so a long-lived event stream never emits a single event; Android's interception drops `fetch()` POST bodies; the asset server rejects WebSocket upgrades outright; and progressive delivery over custom schemes on macOS is undocumented behavior that happens to work. Three of four targets break the transport the UI is built on. Working today by accident is not a foundation.\n\nThe loopback listener is what is left when you take the platform facts seriously, and it pays for itself: web, desktop and cloud become literally one binary, and swapping the shell is a chrome change rather than a rewrite.\n\n### Boot order is part of the contract\n\n- The listener is bound and serving **before** any shell exists, so \"the shell navigated to a dead port\" is not a failure mode that can occur.\n- Binding an ephemeral port makes port conflicts structurally impossible — the OS picks a free one and reports it back.\n- A single-instance lock forwards a second launch, with its arguments and any deep link, into the live instance and exits. A stale lock is detected by probing it, not by trusting it.\n- In browser-tab mode nothing owns the process lifetime, so the kit counts open streams: zero streams starts a grace timer, any new stream cancels it, and the timer firing is a clean shutdown rather than a zombie server on a random port.\n\n### The render loop\n\nThe backend owns all state. The DOM is a projection, never a store. A command is a short POST that mutates server state and returns almost nothing; the domain write lands in the event spine; the per-tab stream's watch fires; the page re-renders as one idempotent snapshot; the client morphs the DOM against it. Signals hold only ephemeral client interaction — a form draft in flight, an open menu, a highlighted row.\n\nThere is no optimistic UI. On loopback the round trip is sub-millisecond, and showing anything but server truth would be a latency hack for latency that does not exist.\n\nThe payoff is that reconnection, multi-tab convergence and long-running job progress are not features anyone builds. They fall out of idempotent snapshots plus one watch.\n\n### Three data homes, one rule\n\n- Durable relational truth is single-file SQLite through a cgo-free driver, with ordered, forward-only embedded migrations and a pre-upgrade snapshot instead of down migrations.\n- Reactive state is an in-process key-value bucket on the embedded spine, whose watchers are what drive re-renders.\n- Bulk analytical artifacts are columnar files, regenerable from source.\n- The rule of thumb is stated once and cited everywhere: if losing it would hurt, the relational store; if a restart may rebuild it, the key-value bucket; if it is columnar bulk for tools to chew on, the artifact layer. A datum never lives in two stores, and derived copies declare their source and get rebuilt rather than edited.\n\n### Shells answer honestly\n\nApp code never imports a shell. It asks the kit for a capability — windows, dialogs, tray, notifications, clipboard, secrets, file scopes, deep links, updates, power events — and gets one of three answers: supported, degraded, or absent. Getters never return nil, so app code never nil-checks; it checks the level only when behavior actually depends on it.\n\nThe app manifest declares which capabilities are required and which are optional, and boot fails fast — with the relevant matrix row in the error — when a required one is absent on the current shell. Because the matrix is itself typed data, \"does this app run in the cloud tier?\" can be answered without booting anything.\n\n### Contracts before code\n\nEvery schema is authored once, in CUE, in a subset that collapses to concrete Go types. One generator emits Go type declarations, a design-token bundle in the W3C interchange format, and the theme CSS the styling binary consumes. Generated output is committed and CI fails on any diff, so a clean checkout builds without running the schema toolchain at all. At runtime the evaluator is embedded and the app validates its own manifest and config at startup.\n\nThe two layers are deliberate. Generated types can only ever be **too loose**, never wrong, and the runtime check catches what the types do not — which is what makes depending on an experimental type generator survivable.\n\n### The knowledge surface\n\nThe third pillar is a single MCP binary that makes the kit's own knowledge queryable from inside whatever project an agent is working in: component search over an index compiled ahead of time and shipped inside the binary, pattern guidance, design tokens, project audits, and the decision corpus served as both tools and stable resource URIs.\n\nIt owns no pipeline — it is a query head over artifacts built earlier. Semantic ranking is an enhancement, never a dependency: when no local embedding service is reachable, search degrades to keyword plus structural filters and says so in the response rather than failing.\n\n### Why failures are boring\n\nBecause the app is a real HTTP server rendering idempotent snapshots, most failure modes collapse into the same recovery: reconnect and re-render. A crashed webview relaunches at a fresh URL and the snapshot repaints exactly where the user was. A suspended laptop reconnects on the client's built-in retry. A missing webview runtime falls back to a browser tab in the same process, because \"no chrome\" must never mean \"no app\". The recovery story is the architecture, not bolted-on code."
        },
        {
          "id": "design",
          "title": "Constraints and tradeoffs",
          "kind": "design",
          "body": "## Two languages, and no third\n\nAll logic is Go. All schemas are CUE. Nothing else is a source language in the kit or in any app built on it. JavaScript never enters as source and is never built by a toolchain — it arrives only as vendored, version-pinned, embedded artifacts that record upstream version, source URL and checksum alongside the file. CSS comes from a standalone binary pinned by SHA-256 per platform and verified on every run, where a mismatch is a hard build failure rather than a warning. A package manifest appearing in a kit repo is a build failure by policy, with exactly one sanctioned exception: the browser-driven visual-regression harness, quarantined by path inside a pinned CI container.\n\nWhat this buys is the only thing it was meant to buy. A kit app builds on a clean machine with two commands — fetch and verify the pinned tools, then compile — and produces the same bits. There is no install step whose output depends on the day you ran it, no lockfile drift, no transitive dependency tree to audit.\n\n### What it costs, written down by the decision that chose it\n\n- The Go UI ecosystem is a fraction of the JavaScript one. Some problems with off-the-shelf answers elsewhere get solved in-house here.\n- There is no living-style-guide tool for server-rendered Go, so the kit builds its own — which is also its visual-regression baseline and its acceptance harness.\n- Rich client widgets — canvas editors, advanced charts — require either an approved vendored island or doing without.\n- The tripwire is explicit: the **second** time a product feature is rejected solely because the island contract cannot express it, that earns a superseding decision record scoping a real exception, rather than cheating quietly.\n\n### The escape-hatch ladder\n\nInteractivity that server-rendered attributes cannot express climbs one rung at a time, and each rung has an admission test. Failing the test means staying on the rung below and simplifying the design.\n\n- **L0, pure attributes.** Where everything starts and where roughly ninety percent of screens end.\n- **L1, inline expressions.** Purely ephemeral view manipulation, one line, no state outliving the element — deleting it loses polish, not correctness.\n- **L2, a vendored island as a web component.** Props in via attributes, events out as custom events, one pinned file. The island is a leaf: it may not fetch, route, own durable state, or know URLs. Everything crosses the bridge.\n- **L3, a dedicated page with custom JavaScript.** Rare, and it must write its own mini decision record naming what it gives up — snapshot convergence, multi-tab — and its exit plan.\n\n### Anti-patterns are numbered so reviews can cite them\n\n- Signals as a state store, which rebuilds a single-page app inside the hypermedia layer and forks truth away from the server.\n- Per-keystroke POSTs without debounce. Loopback is fast; it is not free.\n- Optimistic UI, against both the framework's stance and a sub-millisecond round trip.\n- Client-side routing inside an app that has a real server. The browser already has a router, and every URL is a server render.\n- JSON APIs for your own UI — a second rendering engine and a schema to drift. An external API is a product decision, not a UI shortcut.\n\n### Agent legibility wins ties\n\nThe kit treats agents as first-class users, not as an audience that also happens to read the docs. Every schema is machine-readable, all kit knowledge is queryable, decision records are written for mid-task model consumption, and every scaffolded app ships a committed agent briefing plus the assistant connection so a fresh session in a fresh checkout is productive without a human priming it.\n\nThe tiebreaker is written down so it can be cited in review: when a design choice trades human convenience against agent legibility, **agent legibility wins** — the human has agents, and the agents do not have the human's memory.\n\nThe honest price sits in the same record: the docs are the API, so doc rot is platform rot. It gets CI teeth rather than good intentions — internal link checking as a hard failure, regeneration cleanliness, a missing upgrade note failing a release, and scaffold tests asserting the generated project actually contains what it promises.\n\n### Context is a budget, not a vibe\n\nAn assistant that floods a model's context is worse than no assistant — the motivating case is a documented deployment that burned 143k of a 200k-token window on tool schemas alone, before the first user query. So the return-shape rules are binding on every current and future tool:\n\n- Lists return names and one-line summaries with pagination and a has-more flag. Never source.\n- Full content comes back only by exact identifier, one item per call. No tool accepts a list of names for content retrieval.\n- Findings and steps are structured objects with stable identifiers, so agents can act on them without re-parsing prose.\n- Any response produced under fallback declares that it was.\n- Tool descriptions are capped at two sentences, and the total schema cost for the whole server is measured in CI — exceeding the ceiling is a release blocker, not a warning.\n\nThe friction is deliberate. An agent that wants five components makes five calls and feels the cost; that is the budget signal working.\n\n### Component sourcing has a priority order\n\n- Kit components first. If the kit almost has it, extend the kit — that is the propagation flywheel, not a detour.\n- The licensed commercial corpus is design vocabulary to **adapt**, never markup to paste with raw palette classes, and it ships in nothing that could ever be opened.\n- Permissively licensed component libraries are vendored into the kit once, adapted to kit tokens, and owned from then on. Upstream divergence is accepted; that is what owning your code means.\n- Never a runtime import of a third-party component library, and never CSS or JavaScript from a CDN. A component the kit did not absorb is a component the kit does not have yet.\n\n### A threat model sized to the actual threat\n\nThe baseline defends against other local processes probing the loopback port, malicious web pages mounting cross-site or DNS-rebinding attacks against a local server, untrusted content rendered into pages, tampered updates, and secrets leaking through config files or agent context. It explicitly does **not** defend against a compromised OS user account, hostile multi-tenant deployment, or a targeted attacker with local execution. Kit apps run on the owner's machines for the owner, and the baseline is sized to that and nothing more.\n\nTwo consequences of that scoping are worth naming. Secrets live in the OS keychain and config holds references, never values — which is as much an agent decision as a security one, because agents read and quote config files and must have nothing quotable. And the reactive layer requires an eval-permitting content-security policy with no nonce path available; that is accepted deliberately and documented, rather than pretended away, and what makes it acceptable is that no third-party script ever loads.\n\n### Propagation is a versioning problem\n\nOne repo, one module, semver tags from the root. Apps depend on the kit at an exact tag and adopt an improvement with a dependency bump plus an upgrade note — and every minor ships one, even when its entire body is \"no app action required\", because the upgrade tool needs something to anchor to.\n\nCopy-and-own scaffolding was rejected at the kit-to-app boundary for a specific reason: copied code receives no fixes, and templates rotting is the failure the kit was founded against. The same model is correct at the third-party-to-kit boundary, where material is vendored once, into one place, with one owner."
        }
      ]
    },
    {
      "id": "cue-wasm",
      "owner": "mine",
      "title": "cue-wasm",
      "kind": "oss",
      "org": "Open Source · published to npm",
      "year": "2026",
      "tags": [
        "cuelang",
        "webassembly",
        "typescript",
        "react"
      ],
      "summary": "A WebAssembly wrapper around the official CUE Go API that brings CUE unification, validation, and export to the browser and Node. Uses phased loading — a lightweight reader WASM for instant interactivity, then warms the full evaluator in the background — and ships React hooks with Web Worker + IndexedDB support.",
      "problem": "CUE has minimal first-party browser support, so building interactive CUE tooling on the web usually means a server round-trip.",
      "impact": "Published npm package · phased reader/engine loading · React hooks · dockerized playground.",
      "stack": [
        "Go (WASM)",
        "TypeScript",
        "React",
        "Web Workers"
      ],
      "github": "github.com/GeoffMillerAZ/cue-wasm",
      "categoryId": "open-source",
      "architecture": {
        "title": "cue-wasm runtime model",
        "desc": "Four zones: the host thread that orchestrates, an optional worker that hides download and compile latency, two WASM artifacts built from one Go source, and the sandboxed module that is the only place CUE semantics live.",
        "boundaries": [
          {
            "id": "host",
            "name": "Host thread — browser or Node",
            "note": "The consuming app plus the JavaScript tooling layer. Orchestration only: it prepares state and manages lifecycle, and never re-implements CUE semantics."
          },
          {
            "id": "worker",
            "name": "Web Worker (phased path)",
            "note": "Where the browser build compiles and runs the module when the phased loader is used, so evaluation never blocks the main thread."
          },
          {
            "id": "delivery",
            "name": "Published artifacts",
            "trust": "public",
            "note": "Two binaries built from the same Go source by a build tag. Browser builds resolve them from version-pinned CDN URLs by default; every path is overridable."
          },
          {
            "id": "wasm",
            "name": "Go WASM module",
            "trust": "sandboxed",
            "note": "The semantic authority. It sees only the overlay it is handed; a local-file-inclusion regression test in the standard test run pins that."
          }
        ],
        "components": [
          {
            "id": "app",
            "name": "Consuming application",
            "kind": "React / Node / browser JS",
            "boundary": "host",
            "boundaryId": "host",
            "tech": [
              "JavaScript",
              "React"
            ],
            "role": "Owns the CUE it wants evaluated. Talks to the tooling layer, never to the binary directly.",
            "note": "Owns the CUE it wants evaluated. Talks to the tooling layer, never to the binary directly."
          },
          {
            "id": "react",
            "name": "CueProvider / useCue",
            "kind": "React helper",
            "boundary": "host",
            "boundaryId": "host",
            "tech": [
              "React"
            ],
            "role": "Holds one instance and its loading state; a flag selects the phased worker path.",
            "note": "Holds one instance and its loading state; a flag selects the phased worker path."
          },
          {
            "id": "workspace",
            "name": "Workspace",
            "kind": "JS tooling",
            "boundary": "host",
            "boundaryId": "host",
            "tech": [
              "JavaScript"
            ],
            "role": "Virtual multi-file project: normalizes paths, tracks roots versus dependencies, catches path errors before the boundary is crossed.",
            "note": "Virtual multi-file project: normalizes paths, tracks roots versus dependencies, catches path errors before the boundary is crossed."
          },
          {
            "id": "loader",
            "name": "Loader",
            "kind": "JS entry point",
            "boundary": "host",
            "boundaryId": "host",
            "tech": [
              "JavaScript"
            ],
            "role": "Branches on browser versus Node, then either instantiates the engine directly or starts the phased sequence.",
            "note": "Branches on browser versus Node, then either instantiates the engine directly or starts the phased sequence."
          },
          {
            "id": "wm",
            "name": "Worker manager",
            "kind": "JS bridge",
            "boundary": "host",
            "boundaryId": "host",
            "tech": [
              "JavaScript"
            ],
            "role": "One promise per message: assigns an id, matches the reply, resolves or rejects the caller.",
            "note": "One promise per message: assigns an id, matches the reply, resolves or rejects the caller."
          },
          {
            "id": "cueworker",
            "name": "CUE worker",
            "kind": "Web Worker",
            "boundary": "worker",
            "boundaryId": "worker",
            "tech": [
              "JavaScript",
              "WebAssembly"
            ],
            "role": "Instantiates the reader first, warms the engine behind it, and refuses evaluation calls until the engine is live.",
            "note": "Instantiates the reader first, warms the engine behind it, and refuses evaluation calls until the engine is live."
          },
          {
            "id": "idb",
            "name": "IndexedDB module cache",
            "kind": "browser storage",
            "boundary": "worker",
            "boundaryId": "worker",
            "tech": [
              "IndexedDB"
            ],
            "role": "Stores module bytes keyed by package version and phase, so a repeat visit skips download and compilation.",
            "note": "Stores module bytes keyed by package version and phase, so a repeat visit skips download and compilation."
          },
          {
            "id": "reader",
            "name": "Reader build",
            "kind": "wasm artifact",
            "boundary": "delivery",
            "boundaryId": "delivery",
            "tech": [
              "Go",
              "WebAssembly"
            ],
            "role": "Syntax, formatting and symbols. About 5.2MB raw, under 1MB with Brotli.",
            "note": "Syntax, formatting and symbols. About 5.2MB raw, under 1MB with Brotli."
          },
          {
            "id": "engine",
            "name": "Engine build",
            "kind": "wasm artifact",
            "boundary": "delivery",
            "boundaryId": "delivery",
            "tech": [
              "Go",
              "WebAssembly"
            ],
            "role": "Full evaluator: unification, validation, export. About 27.1MB raw, around 6MB compressed.",
            "note": "Full evaluator: unification, validation, export. About 27.1MB raw, around 6MB compressed."
          },
          {
            "id": "bridge",
            "name": "CueWasm bridge",
            "kind": "syscall/js adapter",
            "boundary": "wasm",
            "boundaryId": "wasm",
            "tech": [
              "Go"
            ],
            "role": "The only code that imports syscall/js. Maps JS values to Go calls and returns promises.",
            "note": "The only code that imports syscall/js. Maps JS values to Go calls and returns promises."
          },
          {
            "id": "core",
            "name": "Core service",
            "kind": "pure Go",
            "boundary": "wasm",
            "boundaryId": "wasm",
            "tech": [
              "Go"
            ],
            "role": "Unify, validate, export, parse, format, symbols. No WASM imports, so it unit-tests on the host OS.",
            "note": "Unify, validate, export, parse, format, symbols. No WASM imports, so it unit-tests on the host OS."
          },
          {
            "id": "cuego",
            "name": "CUE Go API",
            "kind": "upstream dependency",
            "boundary": "wasm",
            "boundaryId": "wasm",
            "tech": [
              "Go"
            ],
            "role": "The official cuelang.org/go module — the single source of semantic truth, pinned in go.mod.",
            "note": "The official cuelang.org/go module — the single source of semantic truth, pinned in go.mod."
          }
        ],
        "edges": [
          {
            "from": "app",
            "to": "react",
            "label": "mounts the provider, reads instance and loading state",
            "kind": "call"
          },
          {
            "from": "app",
            "to": "workspace",
            "label": "adds files, marks entry points, gets an overlay back",
            "kind": "call",
            "direction": "both"
          },
          {
            "from": "react",
            "to": "loader",
            "label": "direct load, or the phased loader when the worker flag is set",
            "kind": "call"
          },
          {
            "from": "workspace",
            "to": "loader",
            "label": "overlay and entry points for each evaluation",
            "kind": "data"
          },
          {
            "from": "loader",
            "to": "wm",
            "label": "starts the phased sequence in the browser",
            "kind": "call"
          },
          {
            "from": "wm",
            "to": "cueworker",
            "label": "one promise per message, matched by id",
            "kind": "postMessage",
            "protocol": "postMessage"
          },
          {
            "from": "cueworker",
            "to": "idb",
            "label": "module bytes cached by version and phase",
            "kind": "cache",
            "direction": "both"
          },
          {
            "from": "cueworker",
            "to": "reader",
            "label": "loaded first — syntax, formatting and symbols are live immediately",
            "kind": "fetch"
          },
          {
            "from": "cueworker",
            "to": "engine",
            "label": "warmed in the background; until it lands, evaluation calls fail explicitly",
            "kind": "fetch"
          },
          {
            "from": "loader",
            "to": "engine",
            "label": "Node reads the engine off disk — no phasing, no network latency to hide",
            "kind": "load"
          },
          {
            "from": "cueworker",
            "to": "bridge",
            "label": "calls the exposed global; errors come back as JSON with position",
            "kind": "call"
          },
          {
            "from": "bridge",
            "to": "core",
            "label": "JS values in, Go types out",
            "kind": "call"
          },
          {
            "from": "core",
            "to": "cuego",
            "label": "compile, unify, validate, export",
            "kind": "call"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "body": "## Two layers, one hard line\n\nThe design doc calls the split **Authority vs Intelligence**. The Go module compiled to WebAssembly is the authority: the single source of truth for unification, validation and export. The JavaScript layer is orchestration — virtual file paths, AST navigation, IDE integration — and the React helper is lifecycle: one instance, and the loading state around it.\n\nThe rule that falls out of that is the whole design: JavaScript never re-implements CUE semantics. It prepares state, crosses the boundary, and reports what came back.\n\n## Inside the module\n\nA simplified hexagonal split, for one specific reason. `syscall/js` only exists in a WASM build, so anything entangled with it can only be tested in a browser-like environment. The core is therefore pure Go wrapping the official CUE Go API with no WASM imports at all, and the adapter is the only code that touches `syscall/js` — it maps JS values to Go calls and hands back promises.\n\nThe bridge exposes one global with seven methods: `unify`, `validate`, `export`, `parse`, `format`, `getSymbols`, `version`. That list is the entire API surface.\n\n`unify` is the one worth reading closely. It takes an overlay — a map of absolute virtual paths to CUE content — plus an optional list of entry points and optional `key=value` tags for `@tag` injection. It returns a JSON string: either the unified result, or a structured error carrying message, line, column and file.\n\n## The tooling layer\n\n`Workspace` is the glue that prepares state for the crossing. It normalizes paths so everything starts at the root, tracks which files are entry points rather than dependencies so the load call can be narrowed to what matters, and catches path errors on the JavaScript side before the boundary is crossed at all.\n\nThe React helpers own the instance and its loading state and expose the same method set the bridge does, plus the flag that chooses the phased path.\n\n## Loading\n\nThree paths, and they differ by environment:\n\n- **Node** — read the engine binary off disk and instantiate it. No phasing; there is no network latency to hide.\n- **Browser, direct** — fetch the engine binary and instantiate it on the main thread.\n- **Browser, phased** — a worker instantiates the reader immediately, warms the engine behind it, and caches the module bytes in IndexedDB keyed by version and phase.\n\nOn the phased path the manager is a promise per message: it assigns an id, the worker answers with that id, and the manager resolves or rejects the matching caller.\n\nWhile the engine is still warming, evaluation calls do not queue. They fail with an explicit message saying the full engine is required — from the worker, and from the reader build's own Go stubs if a caller reaches them another way.\n\n## One source, two binaries\n\nThe build compiles the same entry point twice: once with a reader build tag, once without. In the reader build, unify, validate and the evaluating exports are replaced by stubs that return that structured \"requires the full engine\" message. The parser, formatter and symbol walker sit outside the tag, so they exist in both binaries and cannot drift apart. One exception is deliberate: exporting to formatted CUE is only formatting, so the reader handles it.\n\nSizes are documented rather than guessed — the reader is about 5.2MB raw and under 1MB with Brotli; the engine is about 27.1MB raw and around 6MB compressed."
        },
        {
          "id": "design",
          "title": "Design",
          "kind": "design",
          "body": "## The constraint everything answers to\n\nThe full CUE evaluator is around 30MB. That one number drives the loading design, the packaging design and, indirectly, the API surface. Every significant decision in this project is a response to it.\n\n## Bundlers must never see the binary\n\nThe named risk is a \"bundling accident\": someone imports the library the ordinary way and a 30MB binary lands in their JavaScript bundle. So the binary is never importable in a form a bundler can inline. It is fetched as an external asset — `fetch` in the browser, a file read in Node — and the package's `exports` map keeps the JavaScript entry points and the WASM asset on separate specifiers. The tooling import is documented at roughly 10KB and the loader at roughly 2KB.\n\nThe cost of that choice is that the asset has to be resolvable at runtime. That is why browser builds default to version-pinned CDN URLs instead of asking every consumer to copy binaries into their static assets — and why every one of those paths is overridable for anyone who cannot reach a third-party CDN.\n\n## Time to interactive is the metric\n\nThe performance playground rates results against RAIL bands rather than raw milliseconds: under 100ms is imperceptible, 100–300ms is responsive, 300–1000ms is noticeable but acceptable for background initialization, and past a second is lag worth fixing.\n\nAgainst those bands: a cold start is one to three seconds of download plus compile, and a hot start off the IndexedDB byte cache is under 50ms. The guide pushes the rest of the budget onto the server — preload hints so the download starts before the JavaScript is parsed, Brotli or gzip on `.wasm`, and immutable cache headers, which are only safe because the URLs carry the version.\n\n## The tradeoffs, stated plainly\n\n- Reader-first means a window where evaluation is genuinely unavailable. It errors explicitly instead of queueing, because a silent queue turns a loading state into a mystery.\n- The engine sees only the overlay it is handed, so there is no on-disk module resolution. That is the sandbox guarantee and the limitation, and they are the same property.\n- Worker plus IndexedDB is opt-in, not the default, because it changes the threading model of the host app.\n- No runtime npm dependencies, Node 18 or newer, React as a peer dependency rather than a bundled one.\n\n## What v1 had to mean\n\nThe polish tracker starts with a gap analysis written against community needs rather than the original use case: users need JSON, YAML and formatted CUE, not just one output; TypeScript types are non-negotiable; \"invalid config\" is not an error report without a line and column; and WASM is heavy, so the size has to be measured and published rather than hand-waved. Each of those became a tracked task with a status, including the binary-size measurement.\n\nThe verification surface matches that posture. The standard run is five suites — loader and worker unit logic, integration, a security regression test, an examples check and an edge-case and concurrency pass — with a Docker suite on top. CI gates on a Go lint job, then builds the WASM and runs the suite across Node 18, 20 and 22, with the Docker suite running once on the newest.\n\n## What is deliberately not built\n\nThe roadmap names four extensions and none of them are shipped: an HTTP or gRPC server wrapping the same core, so non-Go services can validate config as a sidecar or a central CI gate; a small single-binary CLI focused on data manipulation; a WASI target so the same binary runs under a server-side runtime for plugin sandboxing; and a language server over WASM for browser editors.\n\nThey are listed here because of what they say about the core: each is planned as another adapter around the existing pure-Go logic, which is the payoff the hexagonal split was chosen for."
        }
      ]
    },
    {
      "id": "pulumi-stateful-string",
      "owner": "mine",
      "title": "Pulumi Provider: Stateful String",
      "kind": "oss",
      "org": "Open Source",
      "year": "2024",
      "tags": [
        "pulumi",
        "go",
        "iac"
      ],
      "summary": "A Pulumi native provider for a string resource that stays stable across plan/apply and only changes when explicit trigger keys change — solving the 'stable-until-triggered' IaC problem that Pulumi's built-in Random resource doesn't, without forcing replacement of dependent resources.",
      "problem": "Some configuration values (generated secrets, UUIDs) must stay constant until a specific rotation trigger changes — but standard resources replace on any config change.",
      "impact": "Native provider with diff logic · multi-language SDKs (Go / TS / Python / C#) · reproducible devbox build.",
      "stack": [
        "Go",
        "Pulumi Go Provider SDK",
        "devbox"
      ],
      "github": "github.com/GeoffMillerAZ/pulumi-provider-stateful-string",
      "categoryId": "open-source",
      "architecture": {
        "title": "How a deployment reaches the trigger comparison",
        "summary": "One Go binary served over Pulumi's provider protocol, with the SDKs and examples generated from that same binary and the resource exercised in-process by tests.",
        "desc": "Ten numbered connections across three lanes: the deployment run, the provider process, and the build and verification path that generates the SDKs and drives the resource lifecycle.",
        "boundaries": [
          {
            "id": "b-deploy",
            "name": "Deployment run",
            "label": "Deployment run",
            "note": "What the operator runs. The engine executes the program and drives the resource lifecycle."
          },
          {
            "id": "b-provider",
            "name": "Provider process",
            "label": "Provider process",
            "note": "A separate process the engine launches and speaks the provider protocol to."
          },
          {
            "id": "b-build",
            "name": "Build and verification",
            "label": "Build and verification",
            "note": "Not on the deployment path. Generates the SDKs and examples from the built binary and exercises the resource without a cloud."
          }
        ],
        "components": [
          {
            "id": "c-cli",
            "name": "Pulumi CLI and engine",
            "label": "Pulumi CLI and engine",
            "kind": "external",
            "boundary": "b-deploy",
            "boundaryId": "b-deploy",
            "role": "Runs the program and calls the provider for preview and apply.",
            "note": "Runs the program and calls the provider for preview and apply.",
            "tech": [
              "Pulumi"
            ]
          },
          {
            "id": "c-program",
            "name": "IaC program",
            "label": "IaC program",
            "kind": "user code",
            "boundary": "b-deploy",
            "boundaryId": "b-deploy",
            "role": "Declares a StatefulString with a string and a map of trigger keys.",
            "note": "Declares a StatefulString with a string and a map of trigger keys.",
            "tech": [
              "YAML",
              "TypeScript",
              "Go",
              "Python",
              ".NET"
            ]
          },
          {
            "id": "c-binary",
            "name": "Provider binary",
            "label": "Provider binary",
            "kind": "go binary",
            "boundary": "b-provider",
            "boundaryId": "b-provider",
            "role": "One main() that serves the provider over Pulumi's provider protocol.",
            "note": "One main() that serves the provider over Pulumi's provider protocol.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "c-infer",
            "name": "Schema inference layer",
            "label": "Schema inference layer",
            "kind": "pulumi-go-provider",
            "boundary": "b-provider",
            "boundaryId": "b-provider",
            "role": "Derives the resource schema from the Go argument and state structs; folds the provider module into index.",
            "note": "Derives the resource schema from the Go argument and state structs; folds the provider module into index.",
            "tech": [
              "pulumi-go-provider"
            ]
          },
          {
            "id": "c-resource",
            "name": "StatefulString resource",
            "label": "StatefulString resource",
            "kind": "resource",
            "boundary": "b-provider",
            "boundaryId": "b-provider",
            "role": "Implements Create, Update and Diff. The other optional lifecycle hooks are not implemented.",
            "note": "Implements Create, Update and Diff. The other optional lifecycle hooks are not implemented.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "c-trigger",
            "name": "Trigger comparison",
            "label": "Trigger comparison",
            "kind": "shared function",
            "boundary": "b-provider",
            "boundaryId": "b-provider",
            "role": "Compares old and new trigger maps key by key and returns the detailed diff and the next state together.",
            "note": "Compares old and new trigger maps key by key and returns the detailed diff and the next state together.",
            "tech": [
              "Go"
            ]
          },
          {
            "id": "c-codegen",
            "name": "SDK codegen",
            "label": "SDK codegen",
            "kind": "make target",
            "boundary": "b-build",
            "boundaryId": "b-build",
            "role": "Runs pulumi package gen-sdk against the built binary, once per language, after wiping the target directory.",
            "note": "Runs pulumi package gen-sdk against the built binary, once per language, after wiping the target directory.",
            "tech": [
              "Make",
              "Pulumi"
            ]
          },
          {
            "id": "c-sdks",
            "name": "Generated SDKs",
            "label": "Generated SDKs",
            "kind": "go · ts · python · .net",
            "boundary": "b-build",
            "boundaryId": "b-build",
            "role": "Typed clients regenerated from the binary. Both properties are required in every language.",
            "note": "Typed clients regenerated from the binary. Both properties are required in every language.",
            "tech": [
              "Go",
              "TypeScript",
              "Python",
              ".NET"
            ]
          },
          {
            "id": "c-tests",
            "name": "In-process test server",
            "label": "In-process test server",
            "kind": "go test",
            "boundary": "b-build",
            "boundaryId": "b-build",
            "role": "Hosts the same Provider() the binary serves and drives Create, Update and Diff through table-driven cases.",
            "note": "Hosts the same Provider() the binary serves and drives Create, Update and Diff through table-driven cases.",
            "tech": [
              "Go",
              "testify"
            ]
          },
          {
            "id": "c-ci",
            "name": "CI workflow",
            "label": "CI workflow",
            "kind": "github actions",
            "boundary": "b-build",
            "boundaryId": "b-build",
            "role": "Builds, installs, stands the example stack up and down, then regenerates the examples — on push, PR and nightly.",
            "note": "Builds, installs, stands the example stack up and down, then regenerates the examples — on push, PR and nightly.",
            "tech": [
              "GitHub Actions"
            ]
          }
        ],
        "edges": [
          {
            "from": "c-cli",
            "to": "c-program",
            "label": "runs the program, collects the declared resources"
          },
          {
            "from": "c-cli",
            "to": "c-binary",
            "label": "provider protocol"
          },
          {
            "from": "c-binary",
            "to": "c-infer",
            "label": "registers one resource"
          },
          {
            "from": "c-infer",
            "to": "c-resource",
            "label": "dispatches Create, Update, Diff"
          },
          {
            "from": "c-resource",
            "to": "c-trigger",
            "label": "the only place a change is decided"
          },
          {
            "from": "c-codegen",
            "to": "c-binary",
            "label": "reads the schema from the built binary"
          },
          {
            "from": "c-codegen",
            "to": "c-sdks",
            "label": "regenerates four language SDKs"
          },
          {
            "from": "c-sdks",
            "to": "c-program",
            "label": "typed client the program imports"
          },
          {
            "from": "c-tests",
            "to": "c-resource",
            "label": "drives the lifecycle in-process, no cloud"
          },
          {
            "from": "c-ci",
            "to": "c-cli",
            "label": "stands the example stack up and tears it down"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "body": "## One binary, one idea\n\nEverything in the runtime path is a single Go program. Its `main()` does exactly one thing: serve the provider over Pulumi's provider protocol. The engine launches it, talks to it for the length of a deployment, and every decision worth reading about happens in `provider/provider.go`.\n\nThe repo starts from Pulumi's provider boilerplate — the Makefile, the deployment templates and the scaffolding are theirs. The two files that carry the actual idea are `provider/provider.go` and `tests/provider_test.go`.\n\n## The schema is the Go types\n\nThe provider registers one resource through the `infer` layer of `pulumi-go-provider`. There is no hand-written schema document: the argument struct and the state struct are the schema.\n\n```\ntype StatefulStringArgs struct {\n    String   string            `pulumi:\"string\"`\n    Triggers map[string]string `pulumi:\"triggers\"`\n}\n```\n\nThe state struct embeds the args and adds nothing else, so `string` and `triggers` are both inputs and outputs — the value handed in is the value read back out. A module map folds `provider` into `index`, which is why the token every SDK sees is `statefulString:index:StatefulString` rather than something nested.\n\nBoth fields are plain, non-pointer values carrying pulumi tags, which makes them required everywhere downstream. The generated Go client returns `invalid value for required argument` and the TypeScript client throws `Missing required property` before a deployment ever reaches the provider process.\n\n## One comparison, two callers\n\n`Diff` and `Update` do not each hold their own opinion about what changed. Both call the same function, and that function returns three things at once: whether any trigger moved, the per-key detailed diff, and the arguments that should become the next state.\n\nThat is the design in one line. Preview and apply cannot disagree, because there is only one code path that decides.\n\n## The diff contract\n\n```\nstring     triggers        HasChanges   DetailedDiff\n---------  --------------  -----------  ----------------------\nsame       same            false        none\nchanged    same            false        none\nsame       value moved     true         triggers.KEY\nchanged    value moved     true         string, triggers.KEY\nchanged    key added       true         string, triggers.KEY\nchanged    key removed     true         string, triggers.KEY\n```\n\nRead the second row twice. A changed `string` with an unchanged trigger map is not a change. The engine is told there is nothing to do, and if `Update` runs anyway it returns the old string with the new trigger map.\n\nTrigger keys are compared one at a time — added, changed, removed — and each becomes its own `triggers.` entry keyed by the trigger name. The preview therefore names the exact key that caused a rotation instead of showing the whole map as dirty. The `string` entry only ever joins that list once a trigger has already moved.\n\nNothing in the table produces a replacement. The detailed diff emits add, update and delete kinds only; there is no replace path in the provider at all.\n\n## Four SDKs, generated from the built binary\n\nCodegen runs against the compiled provider, once per language: Go, TypeScript, Python and .NET. The binary is the source of truth for the schema, so the SDKs cannot drift away from the Go types — regenerating is the only way to change them, and the build deletes each SDK directory before it regenerates it.\n\nThe examples work the same way. One YAML program is written by hand; the per-language example programs are produced from it by `pulumi convert`. One program to maintain, four languages to demonstrate.\n\n## How it is proven\n\nThe tests host the provider in-process — no cloud, no CLI, no stack. A test server is constructed from the same `Provider()` the shipped binary serves, and the cases drive `Create`, `Update` and `Diff` directly through Pulumi property maps.\n\nThey are table-driven and named for the transition being asserted: `String Change__Triggers Same`, `String Same__Triggers Add and Delete Key and Update Value`. Every row of the contract above is a row in that table. `Update` is tested independently of `Diff`, so it cannot quietly rely on `Diff` having filtered the call out first.\n\nCI closes the loop end to end. On every push, every pull request and a nightly schedule, the workflow builds the provider inside Pulumi's own devcontainer image, installs it, stands the example stack up against a local file backend, tears it down again, and regenerates the multi-language examples. A break in the codegen or in the example programs fails the build rather than a user."
        },
        {
          "id": "design",
          "title": "Design",
          "kind": "design",
          "body": "## The resource does not generate anything\n\nThe string is an input. `Create` stores what it was handed and uses the resource's Pulumi name as the id — no randomness, no derivation, no hidden source of truth. That is what makes the behavior worth having: the value comes from wherever the caller wants it to come from, and the resource's only job is deciding *when* that value is allowed to move.\n\n## Triggers are required, not optional\n\n`triggers` is a non-pointer map with a pulumi tag, so it is a required argument in all four generated SDKs. There is no no-triggers mode where the resource quietly degenerates into a plain string. Taking this resource means taking the rotation contract with it.\n\n## The cost of the contract\n\nThe tradeoff is real, and it is the interesting part. Editing the string in your program and running a deploy does nothing: no diff, no warning, no output change. The trigger map is the only thing that can move the value. That means:\n\n- The stored value can legitimately differ from the value written in the program, and that is not drift — it is the point.\n- Anyone reading the program has to know the rule, or they will conclude the deploy is broken.\n- Recovering from a wrong value means touching a trigger, not fixing the literal.\n\nThe test suite asserts that behavior by name, so it is a decision rather than an oversight. It trades obviousness for stability. A resource that respected the literal would be easier to explain and useless for the job.\n\n## Nothing is replaced\n\nThe detailed diff is built from three kinds only — add, update, delete — and `Update` mutates state in place. There is no replacement path anywhere in the provider, so nothing downstream gets torn down because a trigger moved.\n\n## Validation was written and backed out\n\nAn input `Check` existed. It would have rejected a missing `string` or a missing `triggers` with named check failures, and it was removed in the final commit, whose message is *removing check for now*. It is still in the file, commented out, next to the recorded actual `CheckResponse` captured while working on it, along with its matching commented-out test cases.\n\nThe practical effect is that required-ness is enforced one layer out, in the generated SDKs, and the provider accepts what reaches it. `Delete` and `Read` are not implemented either. The implemented surface is `Create`, `Update` and `Diff`; the file's own comment lists the rest of the optional lifecycle hooks that were left alone.\n\n## The environment is part of the deliverable\n\nA provider that only builds on the author's laptop is not a provider anyone can pick up, so the toolchain is declared rather than assumed:\n\n- `devbox.json` names the packages — Go, Pulumi, the Pulumi Python package, pre-commit — and `devbox.lock` records the resolved versions.\n- The dev container definition is regenerated from those same two files by `devbox generate devcontainer`, so the container installs what the shell installs.\n- pre-commit runs hygiene hooks on the way in, including `detect-private-key`, a large-file check and merge-conflict and symlink checks.\n- CI builds inside Pulumi's published devcontainer image, so the build environment is upstream's rather than a hand-rolled one.\n\nThe nightly schedule is the part that earns its keep. The build container is tracked at `latest` and the provider is pinned against `pulumi-go-provider` and the Pulumi SDK, so a scheduled run is how toolchain drift surfaces without waiting for someone to push."
        }
      ]
    },
    {
      "id": "geoffmiller-cloud",
      "owner": "mine",
      "title": "geoffmiller.cloud",
      "kind": "closed",
      "org": "Personal · in active development",
      "year": "2026",
      "tags": [
        "cuelang",
        "go",
        "agentic",
        "resume-as-data"
      ],
      "summary": "This system. A CUE-typed 'super résumé' that compiles into a public persona-lensed résumé site plus a private studio for honest, evidence-backed job-search tooling — built on my own Go/CUE/agentic platform, with a governed chat that answers only from the fact base.",
      "problem": "Recruiters want one answer: does this candidate fit this JD? Make that trivial — and prove the agentic engineering by handing them a governed agent instead of claiming it.",
      "impact": "Persona-lensed interactive résumé · CUE single source of truth · governed JD-chat (in progress) · public/private fact-base wall.",
      "stack": [
        "Go",
        "CUE",
        "templ",
        "Datastar",
        "Anthropic",
        "AWS Lambda"
      ],
      "charts": [
        {
          "id": "what-the-gates-catch",
          "kind": "coverage",
          "title": "Five defects this site has actually shipped, and what caught them",
          "note": "Rows are real defects that reached this repository; columns are the checks that exist. A filled cell is the check that catches that defect. A dashed rule is a check that runs and does not catch it — drawn as a rule and not left blank, because a blank cell reads as an oversight rather than as a result. A slashed cell is stronger: that check CANNOT catch it, and the cell says why. Read the last column first.",
          "source": "Every row is a defect recorded in this repository's own history and every column is a command in its Taskfile. The two `cannot` cells quote the reason from the checker written afterwards: tools/site/tokens.go states that a dangling custom property produces no browser warning, no linter warning and no review finding, and that three of them were live for months. The `spa:motion` column did not exist until the visualisation kit's motion rules were written down, which is why the bottom row had nothing to be caught by. THE FIGURE COUNTS NOTHING — it is a statement about which check sees which failure, not a count of how often any of them fired.",
          "rowsLabel": "the defect",
          "totalsLabel": "defects this check does not catch",
          "cellLabels": {
            "stopped": "catches it",
            "past": "runs, and does not catch it",
            "cannot": "cannot catch it, by construction"
          },
          "columns": [
            {
              "id": "build",
              "label": "spa:check",
              "sub": "compiled JS vs its JSX"
            },
            {
              "id": "tokens",
              "label": "spa:tokens",
              "sub": "dangling var(--x)"
            },
            {
              "id": "contrast",
              "label": "spa:contrast",
              "sub": "palette pairs vs AA"
            },
            {
              "id": "resume",
              "label": "resume:verify",
              "sub": "cue vet + the quote gate"
            },
            {
              "id": "motion",
              "label": "spa:motion",
              "sub": "motion nobody can cancel"
            },
            {
              "id": "review",
              "label": "human review",
              "sub": "reading the diff"
            }
          ],
          "rows": [
            {
              "id": "d1",
              "label": "a var(--x) nothing declares",
              "un": [
                "build",
                "contrast",
                "resume",
                "motion"
              ],
              "cannot": {
                "review": "The browser does not warn, the linter does not warn, and the declaration is silently dropped — so the page renders, wrongly, and the diff looks correct. Three of these were live for months: 19 pills with no border, 19 avatars with no ring, chips rendering square, and 16 connector paths not drawn at all."
              },
              "why": "An undefined custom property does not fall back. It makes the declaration invalid at computed-value time, which unsets the property — and for a shorthand, unsets all of it."
            },
            {
              "id": "d2",
              "label": "compiled JS stale against its JSX",
              "un": [
                "tokens",
                "contrast",
                "resume",
                "motion"
              ],
              "cannot": {
                "review": "The reviewer is reading the .jsx. The stale artifact is the .js beside it, which nobody opens and which is what the browser actually runs."
              },
              "why": "The site ships compiled siblings, so the source being right is not the same fact as the bundle being right."
            },
            {
              "id": "d3",
              "label": "a palette pair below AA",
              "un": [
                "build",
                "tokens",
                "resume",
                "motion",
                "review"
              ],
              "why": "Measurable from the literal hex in the stylesheet, which is why it is a gate rather than a judgement call. It stayed invisible to review because every reviewer had the same monitor."
            },
            {
              "id": "d4",
              "label": "a pull quote drifting from its letter",
              "un": [
                "build",
                "tokens",
                "contrast",
                "motion",
                "review"
              ],
              "why": "The two mismatches this rule has ever caught were both a straight apostrophe standing in for a curly one — invisible to a reader comparing by eye, and invisible to any checker that normalised them, which is why the comparison is byte-for-byte."
            },
            {
              "id": "d5",
              "label": "an animation with no reduced-motion cancel",
              "un": [
                "build",
                "tokens",
                "contrast",
                "resume",
                "review"
              ],
              "why": "Nothing checked this at all until the visualisation kit's motion rules made it a gate. Two infinite animations ran on every page of the site, uncancelled, for months — one of them in the sidebar footer, on screen the entire time."
            }
          ],
          "steps": [
            {
              "id": "review",
              "lit": [
                "review"
              ],
              "say": "Read the right-hand column first. Human review catches none of the five — and for two of them it cannot, which is a different and much stronger statement than that it happened not to."
            },
            {
              "id": "each",
              "lit": [
                "build",
                "tokens",
                "contrast",
                "resume",
                "motion"
              ],
              "say": "Each gate catches exactly one row and misses the rest. That is the argument for four narrow checks rather than one broad one: a check that could catch everything would first have to know what everything is."
            },
            {
              "id": "last",
              "lit": [
                "d5"
              ],
              "say": "The bottom row is the newest, and it is why this figure exists. It had no column at all until the motion rules were written down — and an unchecked class of defect looks exactly like an absent one."
            }
          ]
        },
        {
          "id": "prov-grammar",
          "kind": "anatomy",
          "title": "The three ways a number is allowed onto this site, and the fourth slot that is empty",
          "note": "This is the rule every other figure here obeys, drawn from the code that enforces it. Switch the specimen and the underline under the key redraws in the style that category actually uses — so this figure is an instance of the thing it explains. The fourth position on the switch is a dashed rule you cannot click, because there is no fourth category to put in it.",
          "source": "The specimen is `VK_PROV`, quoted exactly from `spa/components/VizKit.jsx` in this repository: three entries, three lines, nothing paraphrased and nothing added. Each variant of this figure is one of those lines. THE FIGURE ASSERTS NO NUMBER AND HAS NO FIELD FOR ONE — an anatomy makes no magnitude claim, and this one is about how a number is permitted to be printed rather than about any number in particular. The three underlines beneath the keys are drawn with the same border styles the kit uses for a real provenance mark, so what you see here is what you see under a figure.",
          "specimenKind": "record",
          "variants": [
            {
              "key": "src",
              "label": "src",
              "says": "Solid underline: somebody else published it. Publisher, title, year, what was measured in the source's own terms, and a URL somebody actually fetched.",
              "specimen": [
                { "t": "src:", "part": "src" },
                { "t": "  { word: " },
                { "t": "\"a published source, named and fetched\"", "part": "word" },
                { "t": ", pre: " },
                { "t": "\"\"", "part": "pre" },
                { "t": " }," }
              ],
              "parts": [
                {
                  "key": "src",
                  "label": "the category key",
                  "why": "A number that names this category is claiming somebody else published it. Its underline is SOLID — and a solid underline under a number anywhere on this site means the same thing every time."
                },
                {
                  "key": "word",
                  "label": "the words printed under the figure",
                  "why": "Printed verbatim in the key strip beneath every chart that uses this category. A reader is never told the rule separately; the figure tells them, in the category's own words, every time it draws one."
                },
                {
                  "key": "pre",
                  "label": "the prefix on the working",
                  "why": "Empty. A published source does not need the figure to speak in the first person — the publisher's name is already in the citation."
                }
              ]
            },
            {
              "key": "calc",
              "label": "calc",
              "says": "Dotted underline: you can count it off the picture. This is the only category where the reader does not have to trust anybody, including the author.",
              "specimen": [
                { "t": "calc:", "part": "calc" },
                { "t": " { word: " },
                { "t": "\"arithmetic of the drawing — countable off the picture\"", "part": "word" },
                { "t": ", pre: " },
                { "t": "\"\"", "part": "pre" },
                { "t": " }," }
              ],
              "parts": [
                {
                  "key": "calc",
                  "label": "the category key",
                  "why": "This one claims nothing but arithmetic: a hostile reader can count it off the drawing and check it without leaving the page. Its underline is DOTTED, which is what a dotted underline means everywhere on this site."
                },
                {
                  "key": "word",
                  "label": "the words printed under the figure",
                  "why": "Printed verbatim in the key strip beneath every chart that uses this category — and this is the sentence that tells a reader they are allowed to disagree by counting."
                },
                {
                  "key": "pre",
                  "label": "the prefix on the working",
                  "why": "Empty. Arithmetic somebody can redo does not need a first-person prefix; the citation is the sum itself."
                }
              ]
            },
            {
              "key": "own",
              "label": "own",
              "says": "Dashed underline: it is Geoff's own figure and it says so out loud, in front of the citation, before you reach the number.",
              "specimen": [
                { "t": "own:", "part": "own" },
                { "t": "  { word: " },
                { "t": "\"a labelled estimate or Geoff's own target\"", "part": "word" },
                { "t": ", pre: " },
                { "t": "\"Geoff's own figure — \"", "part": "pre" },
                { "t": " }," }
              ],
              "parts": [
                {
                  "key": "own",
                  "label": "the category key",
                  "why": "The honest slot for an estimate or a target. Its underline is DASHED — the same dash this kit uses for anything unbounded or unverified, at number scale rather than at line scale."
                },
                {
                  "key": "word",
                  "label": "the words printed under the figure",
                  "why": "Printed verbatim in the key strip beneath every chart that uses this category. It is the least flattering of the three sentences and it is printed at the same size as the other two."
                },
                {
                  "key": "pre",
                  "label": "the prefix on the working",
                  "why": "NOT empty, and this is the whole reason the field exists. “Geoff's own figure — ” is stuck in front of the citation, so a labelled estimate announces itself even to a reader who skipped the key strip entirely."
                }
              ]
            },
            {
              "key": "fourth",
              "present": false,
              "why": "there is no fourth category. VK_PROV has exactly three keys, and a number naming anything else does not print at all — the gate returns null and the figure shows the label with no number beside it."
            }
          ],
          "steps": [
            {
              "id": "words",
              "lit": [
                "word"
              ],
              "say": "Switch the specimen and read the three sentences: published, countable, his own. Those are the exact words that appear under a figure — and there is no fourth one to read."
            },
            {
              "id": "prefix",
              "lit": [
                "pre"
              ],
              "say": "Two of the three prefix nothing. The third prints “Geoff's own figure — ” in front of the working, so an estimate announces itself to a reader who never looked at the key."
            }
          ]
        }
      ],
      "categoryId": "personal-platform",
      "architecture": {
        "title": "geoffmiller.cloud — one fact base, two faces",
        "summary": "One CUE module holds the career fact base and projects it twice: a curated public subset that the static site and the public chat are built from, and a full private record that only the local studio reads. Between the fact base and anything published sits a deterministic build pipeline that refuses to ship a line it cannot trace back to a fact.",
        "desc": "One CUE module holds the career fact base and projects it twice: a curated public subset that the static site and the public chat are built from, and a full private record that only the local studio reads. Between the fact base and anything published sits a deterministic build pipeline that refuses to ship a line it cannot trace back to a fact.",
        "boundaries": [
          {
            "id": "core",
            "name": "Career fact base",
            "trust": "internal",
            "note": "One CUE module. Everything in the repository is derived from it, and nothing downstream reads it directly — every consumer reads a projection."
          },
          {
            "id": "build",
            "name": "Build pipeline",
            "trust": "internal",
            "note": "Deterministic and hash-gated. Runs locally and in CI with no key, no network and no browser."
          },
          {
            "id": "public",
            "name": "Public web",
            "trust": "public",
            "note": "Everything here is world-readable by design and contains only the public projection."
          },
          {
            "id": "studio",
            "name": "Private studio",
            "trust": "restricted",
            "note": "Local-only. Bound to loopback, never deployed, and the only half that sees applications, mail and objectives."
          }
        ],
        "components": [
          {
            "id": "factbase",
            "name": "Career Fact Base",
            "kind": "store",
            "role": "Typed facts — claim, source, defensibility grade, visibility — and the only source of truth in the repository.",
            "tech": [
              "CUE"
            ],
            "boundary": "core",
            "boundaryId": "core",
            "note": "Typed facts — claim, source, defensibility grade, visibility — and the only source of truth in the repository."
          },
          {
            "id": "public-projection",
            "name": "Public projection",
            "kind": "artifact",
            "role": "The curated public subset, and the only data a public build is permitted to read.",
            "tech": [
              "CUE",
              "JSON"
            ],
            "boundary": "core",
            "boundaryId": "core",
            "note": "The curated public subset, and the only data a public build is permitted to read."
          },
          {
            "id": "private-projection",
            "name": "Private projection",
            "kind": "artifact",
            "role": "The full record for the private studio; generated on demand and never committed.",
            "tech": [
              "CUE",
              "JSON"
            ],
            "boundary": "core",
            "boundaryId": "core",
            "note": "The full record for the private studio; generated on demand and never committed."
          },
          {
            "id": "resumegen",
            "name": "Résumé renderer",
            "kind": "job",
            "role": "Renders every persona view into machine and human formats, skipping any cell whose input hash has not changed.",
            "tech": [
              "Go",
              "templ",
              "headless Chrome"
            ],
            "boundary": "build",
            "boundaryId": "build",
            "note": "Renders every persona view into machine and human formats, skipping any cell whose input hash has not changed."
          },
          {
            "id": "resumecheck",
            "name": "Defensibility check",
            "kind": "job",
            "role": "A build gate with no model calls: every rendered line must trace back to the projection, or the build fails.",
            "tech": [
              "Go"
            ],
            "boundary": "build",
            "boundaryId": "build",
            "note": "A build gate with no model calls: every rendered line must trace back to the projection, or the build fails."
          },
          {
            "id": "contentgen",
            "name": "Content compiler",
            "kind": "job",
            "role": "Compiles the CUE content graph and its Markdown bodies into one committed artifact, failing on every broken cross-reference at once.",
            "tech": [
              "CUE",
              "Markdown",
              "Go"
            ],
            "boundary": "build",
            "boundaryId": "build",
            "note": "Compiles the CUE content graph and its Markdown bodies into one committed artifact, failing on every broken cross-reference at once."
          },
          {
            "id": "sitegen",
            "name": "Static site build",
            "kind": "job",
            "role": "Writes every published page from a single route table that the dev server also mounts, so the two cannot drift.",
            "tech": [
              "Go",
              "templ",
              "Tailwind"
            ],
            "boundary": "build",
            "boundaryId": "build",
            "note": "Writes every published page from a single route table that the dev server also mounts, so the two cannot drift."
          },
          {
            "id": "bundle",
            "name": "Published bundle",
            "kind": "artifact",
            "role": "The static site as published: pages, one stylesheet, and the downloadable résumé set.",
            "tech": [
              "GitHub Pages"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "The static site as published: pages, one stylesheet, and the downloadable résumé set."
          },
          {
            "id": "spa",
            "name": "React front end",
            "kind": "client",
            "role": "The front end that has served the site since June, recovered from its deployed artifact and now committed as source.",
            "tech": [
              "React (CDN, no build step)"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "The front end that has served the site since June, recovered from its deployed artifact and now committed as source."
          },
          {
            "id": "chatui",
            "name": "Chat panel",
            "kind": "client",
            "role": "The Go site's only JavaScript: a persona-scoped question box that renders answers as text nodes, never as markup.",
            "tech": [
              "vanilla JS"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "The Go site's only JavaScript: a persona-scoped question box that renders answers as text nodes, never as markup."
          },
          {
            "id": "chatapi",
            "name": "Chat entry point",
            "kind": "gateway",
            "role": "The public entry point for questions; nothing that costs money runs until the caps have been applied.",
            "tech": [
              "API gateway"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "The public entry point for questions; nothing that costs money runs until the caps have been applied."
          },
          {
            "id": "chatfn",
            "name": "Chat answerer",
            "kind": "service",
            "role": "Answers only from the public facts bundled into it, single-turn, with capped input and output length.",
            "tech": [
              "Go",
              "scale-to-zero function"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "Answers only from the public facts bundled into it, single-turn, with capped input and output length."
          },
          {
            "id": "guardstate",
            "name": "Guard and cache state",
            "kind": "store",
            "role": "Rate-limit counters and the answer cache, held outside the process so the deployment is safe to run as more than one instance.",
            "tech": [
              "managed key-value store"
            ],
            "boundary": "public",
            "boundaryId": "public",
            "note": "Rate-limit counters and the answer cache, held outside the process so the deployment is safe to run as more than one instance."
          },
          {
            "id": "studioapp",
            "name": "Studio (loopback)",
            "kind": "service",
            "role": "The private career command center: one handler tree bound to loopback behind a per-launch token, never a public interface.",
            "tech": [
              "Go",
              "templ",
              "Datastar"
            ],
            "boundary": "studio",
            "boundaryId": "studio",
            "note": "The private career command center: one handler tree bound to loopback behind a per-launch token, never a public interface."
          },
          {
            "id": "studiodb",
            "name": "Studio store",
            "kind": "store",
            "role": "CGO-free SQLite holding the application pipeline and the fact-base working state.",
            "tech": [
              "SQLite (CGO-free)"
            ],
            "boundary": "studio",
            "boundaryId": "studio",
            "note": "CGO-free SQLite holding the application pipeline and the fact-base working state."
          },
          {
            "id": "model",
            "name": "Anthropic API",
            "kind": "external",
            "role": "Composes an answer from the fact block it is handed, and sees nothing else.",
            "tech": [
              "Anthropic"
            ],
            "note": "Composes an answer from the fact block it is handed, and sees nothing else."
          }
        ],
        "edges": [
          {
            "from": "factbase",
            "to": "public-projection",
            "label": "curated public subset",
            "kind": "data"
          },
          {
            "from": "factbase",
            "to": "private-projection",
            "label": "full record, never committed",
            "kind": "data"
          },
          {
            "from": "public-projection",
            "to": "resumegen",
            "label": "four persona views",
            "kind": "data"
          },
          {
            "from": "resumegen",
            "to": "resumecheck",
            "label": "no artifact publishes untraced",
            "kind": "control"
          },
          {
            "from": "resumecheck",
            "to": "bundle",
            "label": "downloadable résumé set",
            "kind": "data"
          },
          {
            "from": "contentgen",
            "to": "sitegen",
            "label": "one committed content artifact",
            "kind": "data"
          },
          {
            "from": "sitegen",
            "to": "bundle",
            "label": "every page from one route table",
            "kind": "data"
          },
          {
            "from": "chatui",
            "to": "chatapi",
            "label": "one question, no history",
            "kind": "sync"
          },
          {
            "from": "spa",
            "to": "chatapi",
            "label": "same endpoint, older front end",
            "kind": "sync"
          },
          {
            "from": "chatapi",
            "to": "chatfn",
            "label": "caps applied before anything paid",
            "kind": "control"
          },
          {
            "from": "chatfn",
            "to": "guardstate",
            "label": "counters and answer cache",
            "kind": "data"
          },
          {
            "from": "chatfn",
            "to": "model",
            "label": "public facts plus the question",
            "kind": "sync"
          },
          {
            "from": "private-projection",
            "to": "studioapp",
            "label": "local read only",
            "kind": "data"
          },
          {
            "from": "studioapp",
            "to": "studiodb",
            "label": "pipeline and working state",
            "kind": "data"
          }
        ]
      },
      "decisions": [],
      "subpages": [
        {
          "id": "architecture",
          "title": "Architecture",
          "kind": "architecture",
          "body": "## One fact base, two faces\n\nEverything here derives from one CUE module. It holds the career fact base — granular facts, each carrying its claim, its source, a defensibility grade and a visibility level — and it is the only source of truth in the repository. Two export expressions project it: a curated public subset and the full private record. Nothing downstream reads the module itself; every consumer reads a projection.\n\nThe public face is a static site. The private face is a local-only studio for running the job search. They never share a data path. They share a source.\n\n## The wall is a projection, not a filter\n\nThe public export names exactly what it removes: applications and job-description text, mail, objectives and salary, internal annotations, any fact not marked public, model and prompt metadata, the private fact graph, and the evidence a fact would need to be upgraded. The private export is generated on demand and never committed.\n\nThe point of two expressions rather than one export plus a downstream filter is that privacy stops being a runtime behaviour. The public build embeds only the public projection, so there is nothing private in the artifact for anything — including a prompt injection against the chat — to reach.\n\nOne deliberate inclusion: a certification still in progress ships in the public set, explicitly labelled as in progress. The wall is about what is private, not about what is flattering.\n\n## Honesty is enforced in the build, not in review\n\nThe résumé pipeline is a chain of small binaries, and the interesting one is the check at the end. It runs with no model calls at all: every non-trivial prose line in every rendered artifact has to trace back to something in the public projection — the contact block, the summary, a responsibility, an education entry, a certification, a competency — or the build fails. It also refuses to publish a fact whose grade is inferred, and it enforces the invariant that `geoffmiller.cloud` appears in every format, human and machine.\n\nRenders are hash-gated. The input hash for a view-and-format cell covers the facts that view selects, the view's configuration and the renderer version, so a run rebuilds only what actually changed and logs what it skipped rather than silently truncating.\n\nA second layer of gates does use a model — ATS conformance and presentation review — under a hard process-wide spend ceiling. Those are opt-in and local. The gate that runs in CI is the deterministic one, so continuous integration needs no key, no network and no browser.\n\n## The site is generated from one route table\n\nContent is authored as CUE plus Markdown and compiled by a separate build binary into a single committed JSON artifact: export the graph, render the Markdown, validate the cross-references CUE deliberately does not, drop drafts, and report every problem at once rather than one exit code at a time. The site binary embeds that artifact and knows nothing about CUE or Markdown, which keeps its module buildable from a clean checkout with no sibling repositories on disk.\n\nEvery published page is enumerated once, in one table, and both consumers read it — the static generator writes each entry to disk and the dev server mounts each entry as a handler. The obvious alternative, a list of writes in the generator and a parallel list of handlers in the server, drifts in exactly one direction: the page works locally and is simply absent from the deploy.\n\n## Two front ends, stated plainly\n\nThe front end serving the site today is React loaded from a CDN with no build step. Its source existed in no repository until it was recovered from its own deployed artifact and committed here. The Go and templ site is its successor and is where new work happens. Both are in the repository, and describing only the second one would be a tidier story and a false one.\n\n## The chat is a separate, guarded path\n\nThe chat is the one thing on the public site that costs money to answer, so it does not run inside the static bundle. A small scale-to-zero function sits behind an API gateway; its key lives in encrypted parameter storage; its rate-limit counters and answer cache live in a managed key-value store rather than in process memory, which is what makes the deployment safe to run as more than one instance.\n\nThe client is the only JavaScript on the Go site: no framework, no build step, no dependency. It never assigns model output to `innerHTML` — the answer is generated in part from visitor input, so it is untrusted, and the small Markdown subset it supports builds DOM nodes instead. While waiting it escalates its status line, because the round trip is genuinely a few seconds and a silent spinner reads as broken. With scripting disabled, the block explains how to reach Geoff instead of rendering a dead input.\n\n## The private half\n\nThe studio is a web application that is never on the web. It binds one handler tree to the loopback interface on an ephemeral port, prints a one-shot launch token that is exchanged for a session cookie, and guards the Host header. Storage is CGO-free SQLite in WAL mode with a single writer, so the binary needs no system library and no C toolchain.\n\nIt is designed as the only writer of the fact base. Corrections are made to facts and documents are regenerated — never the other way round, because a hand-edited document drifts from the source the moment it is saved."
        },
        {
          "id": "design",
          "title": "Design",
          "kind": "design",
          "body": "## The constraints are chosen, and they are the design\n\n- **No Node, anywhere in a build chain.** Go, CUE and JSONL only. JavaScript enters a build only as a vendored, version-pinned embedded file; the stylesheet is produced by a checksum-pinned standalone Tailwind binary and committed.\n- **CUE is the contract.** Schema, site content, design tokens and the career fact base are all CUE, validated before anything renders.\n- **The private half is local-first.** Loopback, SQLite, no server, no cloud, no exceptions.\n- **Cost is a design input.** The public chat has to be structurally incapable of running up a bill.\n- **Public data is a projection, not a permission.** Two exports, not one export and a filter.\n\n## Committed artifacts, and the staleness they invite\n\nTwo generated things are committed rather than rebuilt in CI: the stylesheet and the compiled content. That is a deliberate trade. It keeps the site module buildable from a clean checkout with no Node, no sibling repository and no workspace file — the invariant CI enforces on every deploy, and one that has broken this repository's CI twice.\n\nThe cost is that a committed artifact can go stale silently. It already did. The stylesheet fell behind the templates and an architecture diagram shipped as a grid of solid black rectangles, because every fill and stroke utility resolved against a sheet that had never defined those custom properties, and an invalid fill computes to black. It read as a design problem rather than a build problem.\n\nThe fix was not a resolution to be more careful. The CSS build now writes directly into the directory the embed actually reads, so the hand-copy step that was skipped no longer exists, and a test fails when any literal class used in a template has no matching selector in the stylesheet that ships. It runs under plain `go test`, in an environment where Tailwind cannot run at all.\n\n## Retrieval: none, deliberately\n\nThe original chat design specified a retrieval index with top-K queries, a concern router and a citation lookup endpoint. The public fact base is about twenty-seven facts and under two thousand tokens. Retrieval is an optimisation for a problem this system does not have, so every fact goes into the prompt on every call: no recall risk, no top-K tuning, and the model can cite anything it is given.\n\nThe interface stays in place so growth is a swap rather than a rewrite, with the threshold for tripping it written down — roughly a hundred and fifty facts. When it trips, the first upgrade is lexical rather than semantic, because this corpus is domain jargon and lexical matching is stronger there.\n\nTwo smaller corrections came out of the same review, and both are the kind that fail silently rather than loudly: the model the original design named had already been retired, and prompt caching would have been accepted and done nothing, because the prefix sits far below the minimum cacheable size. Neither would have produced an error.\n\n## The expensive risk is not the bill\n\nRanked by impact rather than likelihood, the worst outcome for a public chat is not a surprise invoice. It is a screenshot of the assistant saying something ugly under Geoff's name. That needs no exploit, and it cannot be recalled.\n\nThat ranking sets the controls. Refuse rather than improvise: no fact, say so plainly — the honesty rule that governs the résumé governs the chat. Off-topic questions are redirected gracefully rather than punished, because a confused visitor is not an attacker and treating them as one is its own failure. A jailbreak attempt gets the same friendly redirect as an off-topic question: no accusation, no block notice, nothing to learn from. Injection screening runs ahead of the paid call. A kill switch disables the endpoint without a redeploy.\n\nThe cost controls sit underneath all of that: per-identity and global request caps, an answer cache, a concurrency cap, a capped output length, a capped input length, and a monthly budget alarm. The single-turn request shape is load-bearing — no history is accepted or sent, so per-call cost cannot grow. If multi-turn is ever added, that control dies and the cost model has to be redone.\n\n## Tailoring is selection, never invention\n\nThe generation design treats a tailored résumé as a selection problem over true facts. Every line carries the facts behind it, and a defensibility loop runs before anything renders: deterministic checks first, at zero cost, then two competing-incentive reviewers — one defending the draft as a recruiter would, one attacking it as a skeptical interviewer would. The loop exits when they agree, or it stops and hands the unresolved objections back as work for a human rather than blocking forever.\n\nThe bar it enforces is not \"impressive\". It is that Geoff could defend the line in an interview room. There is no need to stretch, so the system's job is to find the true best-fit story for a role, not to manufacture one.\n\n## A deploy that deleted the only copy\n\nThe publish workflow force-replaced its target branch on every push. That is the right shape for an artifact mirror and the wrong shape when the target holds the only copy of something. A routine push replaced the branch that had been serving the site, and that front end's source existed in no repository — the deployed artifact was the source.\n\nIt was recoverable, from a dangling commit. The change was not a note to be careful next time: the push trigger is gone, publishing is manual, and the condition for re-enabling it is written into the workflow — what gets published has to be what should be live, and the force-replace has to be gone or the target has to stop being the sole copy of anything.\n\n## Where the design and the running system disagree\n\nWorth stating, because a portfolio that only shows the tidy version is not evidence of anything.\n\n- The decision register lists every entry as proposed, pending sign-off, while several of those decisions are already enforced by the build.\n- The front end serving the site today is CDN React with no build step, which is not what the design says the site is. The Go and templ successor is built and is where new work lands.\n- The studio is designed as the only writer of the fact base. Today the facts are authored directly in CUE and the studio reads them.\n- The architecture document assigns the loopback server, the app shell and the kanban board to the platform library this project is built on. That library has not shipped them, so they live here, deliberately isolated, to be deleted when it does.\n\n## The contribute-back rule\n\nGeneric goes to the platform; brand and domain stay here. The loopback server, the app shell, the command palette, the kanban board and the card primitives are all built in this repository to graduate out of it. Everything résumé-shaped — persona lenses, fact surfaces, the brand token set — stays. It is written down as a hard requirement rather than a preference, because the payoff only exists if the rule is applied when applying it is inconvenient."
        }
      ]
    }
  ],

  /* ---------- Specializations ----------------------------------------------

     Five capability pages plus an index. Placed AFTER `projects:` on purpose:
     resume-core's site-parity gate gives the LAST role a scan window that runs
     from its header to the literal string "\n  projects:", so anything shaped
     like a résumé bullet written above this point is counted as a printed claim
     that the CUE fact base must also make. Nothing below `projects:` is inside
     any scan window. Nothing in here uses the keys `tag:` or `text:` either,
     for the same reason — evidence pointers use `bulletTag` and `match`.

     WHY THE PROOF MIX IS DECLARED PER PAGE, NOT DERIVED
     ---------------------------------------------------
     Each record DECLARES which evidence rails it renders (`proof.rails`) and
     `ProofRail` renders exactly those, in that order, and nothing else. A rail
     that resolves to nothing renders NOTHING — no heading, no placeholder, no
     panel explaining what is not there. Silence is the correct treatment for an
     absence on a page whose reader is deciding whether to hire him.

     HOW `proof.testimony` IS SELECTED — AND THE BUG THAT SHAPED IT
     ---------------------------------------------------------------
     It used to be matched on THEME. That was wrong, and it was wrong in a way
     that looked like honesty: the theme vocabulary was built for the
     recommendations page filter and contains no `devex`, `cicd`, `governance`
     or `compliance` tag at all, so four of these five pages matched nothing and
     each rendered a panel announcing that nobody had corroborated the work. The
     letters were never the problem. The vocabulary was. Read the text of the
     nineteen letters and the material is plainly there.

     So the picks are now EDITORIAL and stored as data: an ordered list of
     { recId, quote } per specialization. `quote` is the exact span to render.

     LEADING AND BUILDING COUNT EQUALLY HERE. Read that before you narrow this
     list. A recommender who says Geoff LED the cost-optimization initiatives,
     DROVE the Kubernetes adoption, RAN the migration or GREW the team that did
     the work is corroborating this capability just as much as one who names the
     mechanism underneath it — because he did both, and the distinction between
     "stood next to the outcome" and "stood next to the machinery" is invented.
     An earlier version of this file drew exactly that distinction and threw
     away real evidence to keep it. Do not helpfully re-narrow this: if a
     hiring manager reading the quote beside that page would think "yes, that is
     relevant", it belongs.

     Two guarantees survive, and both are invisible to the reader:
       · a rendered quote must be an exact substring of the stored verbatim
         `text` of its recommendation — asserted at render time, in the browser,
         by `resolveTestimony` in Specializations.jsx. A quote that fails is
         dropped, so a paraphrase of a named third party is unrepresentable.
       · one quote per person per page, so one verbose recommender cannot fill
         a rail.
     The recommendation records themselves are never edited to fit a page.

     PLACEHOLDER SAFETY — AND WHAT IS *NOT* A PLACEHOLDER
     ----------------------------------------------------
     Most numbers below are INVENTED DRAFT CONTENT for Geoff to replace. Each of
     those carries `placeholder: true` and a `source` string that says so in
     words. `SpecMetric` refuses to render a metric with no `source`, so a
     number cannot reach the page without a provenance line under it — the same
     rule VizFrame states for charts, made structural instead of conventional.

     Two exceptions exist, and they are exceptions in both directions:

       · every tile on `governance` is a count over an artifact plus the tool
         run that validated it, so those are `placeholder: false` too — with
         source lines that say the repository is not public and that the count
         is reported rather than demonstrated.
       · `cicd` declares no `metrics` rail at all. Every CI figure worth having
         would be invented, and four placeholder tiles is a weaker opening than
         none, so the page has no slot to put a number in.

     Because of the first of those, the page banner's lede is overridable per record:
     `placeholderLede` replaces the shell's default "every figure on this page
     is placeholder content", which on those pages would be false. A banner that
     disclaims a real number is exactly as dishonest as a number with no source.

     REFERENCE CONVENTIONS — all existing, none invented
     ---------------------------------------------------
       projects   →  { id: "<project id>" }        as `projectId` elsewhere
       articles   →  { id: "<article id>" }        as `series.ref` elsewhere
       roles      →  { roleId: "<role id>" }       as `roleId` elsewhere
       claims     →  claimIds: ["<claim id>"]      as recommendations do
       recs       →  by THEME and by CLAIM, never by recommendation id: those
                     ids are person slugs, and coupling a capability page to a
                     named individual breaks when that entry is removed.

     Role bullets have no ids anywhere in this file — every one of them is
     { tag, depth?, text }. So a bullet is referenced by `roleId` + `bulletTag`
     + `match`, where `match` is a distinctive SUBSTRING of the bullet. The
     component finds the bullet and renders the REAL text from `roles`; if no
     bullet contains the substring, that pointer is dropped. Same guarantee as
     the recommendation pullQuotes: the renderer has no source of text other
     than SITE_DATA, so a drifted or invented quote is unrepresentable.        */
  specializations: [
    {
      id: "finops",
      name: "FinOps",
      eyebrow: "Specialization 01",
      kicker: "Cost as a platform property",
      tone: "cyan",
      icon: "zap",
      pageComponent: "SpecFinOps",
      tagline: "Cloud spend comes down when the platform takes it down — not when a spreadsheet asks a team to.",
      standfirst: "PLACEHOLDER STANDFIRST. The FinOps work is mechanical, not motivational: waste is deleted by a control loop that runs whether or not anyone is watching the bill. Geoff to rewrite.",
      /* The one visual that IS the argument. The page builder defines this
         component and assigns it to window; `SpecSignature` looks it up by name
         and wraps it in VizFrame, exactly as NamedDiagram does for charts. */
      signature: {
        component: "FinOpsSignature",
        title: "Waste, and the loop that removes it",
        note: "PLACEHOLDER — the shape is right, the numbers are drafts.",
        source: "PLACEHOLDER DIAGRAM — illustrative. Draft pending Geoff's review; no figure here is a published or audited number.",
      },
      /* The utilization argument's two visuals. They live in a SECOND file —
         components/SpecFinOpsUtil.jsx — and publish themselves on window, so the
         page late-binds them by name here exactly as `signature` does above. A
         renamed or unloaded component therefore degrades to the section's prose
         instead of throwing a ReferenceError through the whole page.

         WHAT IS A DRAWING AND WHAT IS A CLAIM. The ledger's billed field is
         arithmetic of its own picture — six environments × four six-hour blocks ×
         fourteen days — and a hostile reader can count it, the same defence the
         216 endpoint-AZs already earned. WHICH blocks are lit is the cadence, and
         the cadence is not measured. It is Geoff's own estimate, and it carries
         the same labelling the 67% non-production row carries on the f1n share
         chart, in the same words, for the same reason.

         `placeholder: true` is load-bearing rather than decorative: the page
         renders `note` + `source` above the ledger only while this flag is set.
         The day the cadence is replaced by a measurement, the flag comes off and
         the caveat goes with it — there is no second place to remember. */
      utilization: {
        placeholder: true,
        components: { ledger: "UtilizationVisual", reductio: "ScheduleReductio" },
        note: "The picture below is the only invented thing in this section. Its field of squares is arithmetic of the drawing — six environments, four six-hour blocks a day, fourteen calendar days, and an environment left running bills every one of them — and the sourced savings figures are in the benchmark chart further down. Which squares are lit is not a measurement:",
        source: "Geoff's own figure — estimate from regulated estates he has run; no published benchmark reports per-tier non-production utilization at this resolution.",
      },
      /* The hydration threshold, in a FOURTH file — components/SpecFinOpsEnv.jsx
         — bound by name exactly as `utilization` above, and degrading the same
         way if the script is not registered.

         WHAT IS A DRAWING AND WHAT IS A CLAIM, again. The field is arithmetic of
         the picture — three copies, each billing twenty-four hours a day for
         seven days — and a hostile reader can count it. The dashed diagonal is
         neither a drawing fact nor a measurement: it is a stated convention of
         the illustration, which is why the picture prints the wedge around it and
         says that moving the ratio moves the count. The hydration times are the
         only figures that are neither, and they are Geoff's target and an
         illustrative comparator, labelled as such here and on the drawing.

         `placeholder: true` is load-bearing rather than decorative: the page
         renders `note` + `source` above the visual only while this flag is set,
         so the caveat has one home and comes off with the flag. */
      environments: {
        placeholder: true,
        components: { threshold: "HydrationThreshold" },
        note: "The picture below has one figure in it that is not arithmetic of the drawing. Its field — three copies, each billing twenty-four hours a day for seven days — is countable off the picture, and the dashed diagonal is a stated convention of the illustration rather than a claim about anyone's tolerance. The hydration times are not measurements:",
        source: "Geoff's own target — fifteen minutes is the time-to-usable he aims for; no published benchmark reports environment hydration times, and nothing on this page claims fifteen minutes has been achieved and measured. The four-hour comparator is an illustrative input, not a measurement of anyone's pipeline.",
      },
      /* The rate argument's two visuals, in a THIRD file —
         components/SpecFinOpsRate.jsx — bound by name exactly as `utilization`
         above, and for the same reason: an unregistered script degrades that
         section to its prose rather than throwing through the whole page.

         There is deliberately no `placeholder` flag here, and that is the point
         of the section. The breakeven figure is the one visual on the site whose
         numbers a reader can redo rather than have to trust: u* = 1 − d is a
         division, and every dollar on the chart is a published rate multiplied
         by the hours a term contains. A Draft badge on it would say the opposite
         of what it is. The pool cloud carries its own reconstruction badge from
         inside the component, where the reconstruction actually happens. */
      rate: {
        components: { breakeven: "BreakevenVisual", spotcloud: "SpotPoolCloud" },
      },
      placeholder: true,
      placeholderNote: "Every number on this page is a draft. The mechanism described is real; the figures attached to it have not been reconciled against a bill, a report or an audit.",
      proof: {
        /* The declared proof mix. ProofRail renders these rails, in this order,
           and nothing else. A rail that resolves to nothing renders nothing. */
        rails: ["metrics", "roles", "testimony", "projects", "articles"],
        metrics: [
          {
            id: "yoy",
            value: "30", unit: "%",
            label: "AWS spend, year over year",
            sub: "sustained across the multi-account estate",
            placeholder: true,
            source: "PLACEHOLDER — draft figure. The 30% YoY reduction is claimed on the First Citizens and REPAY roles; this tile still needs the cost report it came from before it can cite one.",
          },
          {
            id: "endpoint",
            value: "$500K", unit: "/yr",
            label: "Run-rate removed by one hub",
            sub: "thousands of duplicate interface endpoints → one multi-AZ hub",
            placeholder: true,
            source: "PLACEHOLDER — draft figure, deliberately round. The role bullet says \"hundreds of thousands annually\"; the exact number has not been published and this tile must not invent it.",
          },
          {
            id: "accounts",
            value: "100", unit: "+ accounts",
            label: "Under continuous cost policy",
            sub: "guardrails in the landing zone, not in a monthly review",
            placeholder: true,
            source: "PLACEHOLDER — draft figure. Account count is claimed on the First Citizens role; the share of them under automated cost policy has not been measured.",
          },
          {
            id: "ttw",
            value: "2", unit: "weeks",
            label: "Median waste detected → waste gone",
            sub: "anomaly to merged change",
            placeholder: true,
            source: "PLACEHOLDER — invented. No such measurement exists yet. Left in as a slot because it is the number that would actually prove the claim.",
          },
        ],
        /* roleId + bulletTag + a distinctive substring. The component renders
           the real bullet text out of `roles`, never this file's copy of it. */
        roles: [
          { roleId: "fcb",   bulletTag: "finops", match: "Cut AWS spend 30% YoY",
            why: "The headline claim, on the role that owns it." },
          { roleId: "fcb",   bulletTag: "finops", match: "single multi-AZ endpoint hub",
            why: "A top-3 line item removed by an architecture change, not a negotiation." },
          { roleId: "fcb",   bulletTag: "finops", match: "claim-based lifecycle control",
            why: "Idle non-prod stopped being a discipline problem and became a lease." },
          { roleId: "fcb",   bulletTag: "finops", match: "reading the bill rather than the architecture",
            why: "How the work is actually found. This is the method, stated plainly." },
          { roleId: "repay", bulletTag: "finops", match: "Established FinOps automation",
            why: "The same result at a different company, four years earlier — which is what makes it a practice rather than an incident." },
        ],
        /* Ordered picks — see the note above `specializations:`. `quote` is the
           exact span to render and is asserted at render time to be a substring
           of that recommendation's stored `text`. `why` is the SELECTION
           RATIONALE, kept so whoever edits this next knows why each span was
           chosen; it is deliberately NOT rendered — the reader gets the words
           and the person, not an argument about why the words count. */
        testimony: {
          picks: [
            { recId: "zenul-pomal",
              quote: "His initiatives included environment claim, leveraging cloud elasticity to scale down lower environments during off-hours, right-sizing resources, and optimizing VPC endpoints and firewalls. These efforts resulted in significant cost savings for the organization.",
              why: "Names the actual levers — environment claim, off-hours scale-down, right-sizing, VPC endpoints — and the savings; the most specific cost evidence in the corpus, from an Executive Director above him." },
            { recId: "atif-siddiqui",
              quote: "One of his other, standout achievements was conception through the implementation of Environment Claim Automation; a solution, that optimized resources' usage across non-production environments.",
              why: "Independent corroboration of the same mechanism this page argues from — conceived and implemented, not just sponsored — and the most recent letter that names it." },
            { recId: "avi-harari",
              quote: "Geoff led multiple projects in the areas of serverless, cost optimization, disaster recovery and observability which we collaborated on.",
              why: "Cost optimization named as work he led, from outside the company: the AWS technical account manager who was on the other side of those projects." },
            { recId: "sam-towne",
              quote: "Geoff managed a team of cloud automation engineers while leading multiple enterprise-wide technology programs like kubernetes adoption and cloud cost control initiatives.",
              why: "Cost control as a standing enterprise-wide program run by a team he built, not a one-off cleanup — from an engineer he hired into it." },
          ],
        },
        projects: [
          { id: "endpoint-hub", why: "The endpoint consolidation, written up as a system." },
          { id: "f1n",          why: "Environment claims, generalized into a control plane." },
          { id: "landing-zone", why: "The account structure the cost policy runs inside." },
        ],
        articles: [
          { id: "finops-event-driven", why: "The argument in long form: FinOps as an event-driven system." },
        ],
      },
    },
    {
      id: "devx",
      name: "DevX",
      eyebrow: "Specialization 02",
      kicker: "The paved road, and who is standing on it",
      tone: "purple",
      icon: "layers",
      pageComponent: "SpecDevX",
      tagline: "A platform team that reviews every change is a queue. The work is making the fast path the compliant one.",
      standfirst: "PLACEHOLDER STANDFIRST. Developer experience here means lead time, self-service and ownership — measured at the team that ships, not at the team that builds the tooling. Geoff to rewrite.",
      /* Retitled 2026-08-07 to match what the component actually draws. The
         record used to promise a before/after with timings on it; DevXSignature
         draws neither — it draws one row per class of mistake, terminating with
         an ✕ on the border that makes that mistake unavailable, and bar length
         is REACH rather than time. The page was overriding title and note
         locally to compensate, which left the data and the render disagreeing.
         The source line is not a placeholder disclaimer any more because there
         is no figure in the diagram to disclaim — it says so instead. */
      signature: {
        component: "DevXSignature",
        title: "The promotion border: what each gate makes impossible",
        note: "Every gate is annotated with the class of mistake it eliminates rather than with what it improves. Select a border, or any single line, to see the mechanism behind it.",
        source: "MECHANISM DIAGRAM — no figure is drawn here. Bar length is reach, not time: how far a change can carry a mistake before something deterministic refuses it. The gates and their checks are the ones described on the Agentic Coding Harness project record.",
      },
      placeholder: true,
      /* REWRITTEN when section 04 landed, and it was a blocker rather than a
         polish item. This record carried no `placeholderLede`, so the shell's
         default rendered "Every figure on this page is placeholder content." —
         and `placeholderNote` opened "Every number on this page is a draft."
         Both became false the moment a section of published, linked, dated
         third-party measurements shipped above them, and a banner that
         disclaims a real number is exactly as dishonest as a number with no
         source. Written in the shape the `secops` record already uses below:
         Not a draft: … A draft: … */
      placeholderLede: "The sources in sections 04, 05 and 06 are real. Most of the figures elsewhere on this page are placeholder content.",
      placeholderNote: "Not a draft: every figure in section 04. Each one is somebody else's published measurement — named, dated, and linked to a source a reader can open in one click, together with what that source actually measured and the argument against it. Not a draft either: the counts in sections 05 and 06, which are computed from those drawings and countable off them, and section 05's own sources, which are Nix's and Jetify's published documentation cited the same way. Section 05 draws no duration and no frequency at all, and says so in the column where a number would go. A draft: the standfirst, the section prose, and the throughput multiplier, the lead-time range and the four tiles below — each of which is a claim about Geoff's own work, and each of which is marked.",
      proof: {
        rails: ["metrics", "roles", "testimony", "projects", "articles"],
        metrics: [
          {
            id: "leadtime",
            value: "6–12 wk", unit: "→ days",
            label: "Feature lead time after decomposition",
            sub: "monolithic repo → team-owned repos with gates",
            placeholder: true,
            source: "PLACEHOLDER — draft figure. The range is claimed on the First Citizens role; the delivery data behind it has not been attached to this page.",
          },
          {
            id: "drift",
            value: "75", unit: "%",
            label: "Documentation drift, cut",
            sub: "Backstage IDP + documentation-as-code",
            placeholder: true,
            source: "PLACEHOLDER — draft figure. Claimed on the REPAY role; the measurement method is not recorded and this tile should not imply one.",
          },
          {
            id: "selfserve",
            value: "30", unit: "teams",
            label: "Self-serving through the paved road",
            sub: "onboarding without a platform-team ticket",
            placeholder: true,
            source: "PLACEHOLDER — draft figure, deliberately round. Thirty product teams appear in the SVB integration write-up; how many onboarded without a ticket has not been counted.",
          },
          {
            id: "migration",
            value: "1", unit: "day",
            label: "Cloud migration, per workload",
            sub: "from months, via reusable patterns",
            placeholder: true,
            source: "PLACEHOLDER — draft figure. Claimed on the REPAY role as \"months to one day\"; no per-workload record has been published.",
          },
        ],
        roles: [
          { roleId: "fcb",   bulletTag: "platform", match: "Decomposed a monolithic repo into team-owned repos",
            why: "Ownership moved first; the tooling followed. The lead-time change is the visible half." },
          { roleId: "fcb",   bulletTag: "platform", match: "CODEOWNERS is a social contract with a syntax",
            why: "Why the gates stuck: everyone was inside them, including the platform team." },
          { roleId: "repay", bulletTag: "platform", match: "Launched Backstage IDP and Documentation-as-Code",
            why: "The developer portal, and the docs that stopped drifting away from it." },
          { roleId: "repay", bulletTag: "platform", match: "Reusable patterns cut cloud migration time",
            why: "Patterns are the product. A migration is then a configuration, not a project." },
          { roleId: "fcb",   bulletTag: "sec", match: "override-as-code",
            why: "The escape hatch has an owner, an expiry and a diff — which is what keeps the fast path honest." },
          { roleId: "fcb",   bulletTag: "lead", match: "founded the Cloud Community of Practice",
            why: "The part that does not appear as a number: knowledge left the platform team." },
        ],
        /* No `developer-experience` theme exists in the vocabulary, which is why
           the theme-matched version of this rail found nothing. The letters are
           full of it: a platform built to be extended, tooling and practice
           adoption, and reducing complexity for the engineer in front of him. */
        testimony: {
          picks: [
            { recId: "naresh-jayaram",
              quote: "He is always to looking to push the boundaries and set the stage for a platform that is extensible and future-ready while effectively addressing the problems of today.",
              why: "A platform built to be extended by the people standing on it — the paved-road claim, stated by a principal engineer who consumed it." },
            { recId: "praveen-sondur",
              quote: "Whether it was introducing new cloud-native tools or piloting DevOps best practices, his excitement for innovation was contagious.",
              why: "Tooling and practice adoption for engineers, from a direct report, in the most recent cohort of letters." },
            { recId: "abhilash-panickar",
              // Was a mid-sentence clipping starting lowercase ("on the Enterprise Cloud
              // Platform team where he provided…"). Exact-substring compliant but it read as
              // a fragment in a quote card. This span is a whole sentence AND closer to what
              // this page argues: making the complex thing simple for the engineer in front
              // of you is the paved road, stated by the manager he reported to.
              quote: "Geoff has the uncanny ability to find simple solutions to complex problems.",
              why: "Names the platform organisation and his remit inside it, from the manager he reported to — the most senior vantage available on this page." },
            { recId: "ryan-hairston",
              quote: "The breadth and scope of his knowledge is highly technical while still being able to bring down the simplicity for explanation purposes.",
              why: "Reducing complexity for the engineer in front of him is the whole job on this page; said by a software engineer on his team, 2025." },
          ],
        },
        projects: [
          { id: "app-kit", why: "A component kit built so two applications stop reinventing the same chrome." },
          { id: "fathom",  why: "Code intelligence for agents and humans — the index that replaces exploratory grep." },
          { id: "agentic-kit", why: "The harness that makes a repository legible to whoever, or whatever, arrives next." },
        ],
        articles: [
          { id: "shift-left-vs-shift-luck", why: "Shifting left without a paved road just moves the failure earlier." },
          { id: "why-app-kit-agentic-era",  why: "Why a shared kit matters more, not less, once agents write the markup." },
        ],
      },
    },
    {
      id: "agentic",
      name: "Agentic Engineering",
      /* `eyebrow` is a hard-coded string that agrees with the index card's
         COMPUTED watermark only while this record stays third of five. Section
         order is unchanged by the 2026-08-08 restructure, so it stays — but it is
         a coupling, and reordering the collection without editing this line puts
         two different numbers on one card. */
      eyebrow: "Specialization 03",
      kicker: "Repeatable work gets a harness. Open work gets a gate.",
      /* tone stays "accent". The pink lane in BOTH visuals reads
         var(--spec-tone, var(--accent)) and never --neon-pink; changing this
         recolours both drawings at once and silently desynchronises every legend
         that calls that lane "pink". */
      tone: "accent",
      icon: "sparkles",
      pageComponent: "SpecAgentic",
      tagline: "How much freedom an agent gets is decided by how repeatable the work is. Whatever freedom is left gets constrained at the other end — which is why the assistant on this site cannot fabricate a quote.",
      standfirst: "Three kinds of agentic work, and they are not the same job. When a task is identical on every project — wiring a repository into a platform, onboarding, adoption — I encode the process, and the agent decides almost nothing. When the task varies but the standards do not, I write the standards once, compose them into every harness, and the agent decides how. When the task is genuinely open, the process cannot be encoded, so the output is: what may be rendered as somebody's words, and where it came from. The judgment is not which of these is best. It is which one the work in front of you has earned.",
      signature: {
        component: "AgenticSignature",
        title: "Where the model is, and where it is not",
        note: "The right-hand case from section 01, wire by wire. The process could not be fixed, so the output was: the model writes the prose and can suppress a quote, and it has no path that makes one.",
        source: "MECHANISM DIAGRAM — no figure is drawn here, and there is nothing in it to measure. The retrieval path that decides who gets quoted runs in this browser with no model in it, and the quoted span is re-checked against the stored record at render. Both are verifiable in this page's own source — spa/components/Recommendations.jsx and spa/components/Specializations.jsx — which is why this is the one case on the page you can check without taking anybody's word for it. The build gate that keeps the stored records honest is credited in section 04 and not here, because a build gate is exactly the thing a reader has to take on trust.",
      },
      /* Cleared 2026-08-08. The three placeholder metric tiles are gone (one of
         them, `gates: 100%`, said "invented" in its own source line), the
         standfirst and both signature strings are written, and every figure now on
         the page is arithmetic of something printed on the page or is labelled as
         Geoff's own count. The section-wide `specializations` feature flag is a
         separate switch and stays off. */
      placeholder: false,
      proof: {
        /* The one page whose strongest evidence is not a metric or a quote. The
           `live` rail points at the running artifact the reader is already in,
           and it leads because of that. */
        rails: ["live", "metrics", "roles", "testimony", "projects", "articles"],
        live: {
          title: "The thing itself",
          /* This body says the quote is re-checked IN THE BROWSER, and that is
             still the precise claim: resolveTestimony() re-runs the substring
             test before drawing anything, which is what a reader can verify in
             the page source they are already standing in.
             It deliberately does not lean on the build gate. That gate now
             exists — gates.CheckRecommendationQuotes, resumecheck check 8 of 8,
             added 2026-08-07 — and section 02 credits it. But this rail's whole
             argument is "check it yourself, here, now", and a build gate is
             exactly the kind of thing a reader has to take on trust. Two
             independent guarantees, described where each of them actually
             holds. */
          body: "This site's chat answers from a client-side index of the same records the rest of the site renders. Retrieval happens in this browser. Attributed quotes are spans selected FROM stored recommendation text and re-checked in the browser as exact substrings of it before they render, so the model is never in the quoting path — a fabricated quote is not unlikely here, it is unrepresentable. That is a claim about agentic engineering that can be checked in the page source rather than believed.",
          cta: { label: "Ask it something", route: "chat" },
          source: "Verifiable in this repository: spa/components/Recommendations.jsx (theme and claim retrieval, quote selection) and spa/data.js (the records both read). Not a placeholder.",
          placeholder: false,
        },
        /* All three tiles rewritten 2026-08-08. SpecMetric renders anything
           carrying value + label + source, so the restraint is on the author and
           not on the component: every tile below is either a structural property,
           a count labelled as Geoff's own, or arithmetic that is re-derived rather
           than typed in. Nothing here is a percentage, a multiplier or a token
           count — see docs/specializations-claim-verdicts.md, the Agentic section,
           for the exclusion ledger and why each excluded figure is a trap. */
        metrics: [
          {
            id: "fabrication",
            value: "0", unit: "",
            label: "Model-authored attributed quotes",
            sub: "there is no code path that produces one",
            source: "A structural property, not a sample. The model has no path that produces attributed text: the four mechanisms are named in the ledger on this page and the retrieval path is in this page's own source. Nothing was counted, because there is nothing to count.",
          },
          {
            id: "systems",
            value: "3", unit: "in production",
            label: "Agentic systems I built, running at PayPal",
            sub: "expert systems, incident tooling, GameDay scoring",
            source: "Geoff's own count, and the one figure on this page you cannot check. These are employer-internal: I can say what they do and how they are constrained, not show you the code. Nothing else on this page depends on it.",
          },
          {
            id: "fleet",
            value: "13", unit: "repositories",
            label: "Carrying the byte-identical skill set",
            sub: "one embedded source, eight skills, rendered per harness",
            /* RE-DERIVED 2026-08-08, and it did not match the figure this tile was
               drafted with. Fifteen repositories carry the set; hashing each one's
               eight SKILL.md files puts 13 on one hash and 2 on another. Both
               halves are published, because the 2 are the argument: drift across a
               fleet is what the reconcile layer computes, and a page that rounded
               13 up to 15 would be hiding its own evidence for it.

               DIRECTION CORRECTED 2026-08-12 — the first draft of this line said
               the 13 were "at the current version" and the 2 "one version behind",
               and re-deriving it against the embedded source proved the opposite:
               the 2 match dist/agents/skills/ at HEAD and the 13 are a version
               behind on one skill (fathom-impact). The larger group was the stale
               one. That is left in rather than tidied away, because a fleet figure
               that assumes the majority is current is exactly the assumption the
               reconcile layer exists to refuse. Re-derive before editing this
               line; do not adjust it to match a recollection. */
            source: "Reproducible arithmetic, re-derived at publish time rather than typed in: shasum every fathom SKILL.md in each repository under my fleet and group by digest. 15 repositories carry the set, 8 skills each; 13 share one digest and 2 share another. The 2 match the embedded source at HEAD; the 13 are a version behind on one skill — so the larger group is the stale one, which is precisely the drift the reconcile layer exists to compute, and it is reported rather than rounded away.",
          },
          /* REMOVED 2026-08-08: a `gates: 100%` tile — "Agent changes behind an
             approval gate". Its own source line read "PLACEHOLDER — invented".
             The gates are claimed on the PayPal role; no coverage figure exists,
             and on a page whose entire subject is structural impossibility, one
             invented percentage costs the credibility of everything beside it.
             Not replaced: the mechanism is argued in section 02, where it is
             countable, and a mechanism does not need a denominator. */
          /* REMOVED 2026-08-07: a "Recommendations mentioning AI — 1 of 19"
             tile. It was arithmetic over this file and it was accurate, but a
             tile whose entire content is how little corroboration exists is an
             argument against the page it sits on, made to the one reader who is
             deciding whether to hire him. Its sub-line also said this page
             "argues from the artifact instead", which stopped being true the
             moment the testimony rail below started resolving. Not replaced. */
        ],
        roles: [
          /* Two of these `why` strings bind the résumé line to a POSITION on the
             gradient in section 01, so the rail reads as evidence for the page's
             actual thesis rather than as five adjacent facts. */
          { roleId: "paypal", bulletTag: "ai",   match: "Lead and specialize in agentic software engineering",
            why: "The middle position, on the résumé: spec first, agent in the middle, gate at the end." },
          { roleId: "paypal", bulletTag: "ai",   match: "Built the expert systems Command Center duty officers query",
            why: "The right-hand position at production scale — an open question, an answer that carries its sources." },
          { roleId: "paypal", bulletTag: "lead", match: "AI Super Users group",
            why: "Policy and direction for enterprise AI use, not just usage of it." },
          { roleId: "paypal", bulletTag: "lead", match: "GameDay tooling that ingests incident logs",
            why: "Agentic scoring against artifacts the organisation already produces." },
          { roleId: "fcb",    bulletTag: "ai",   match: "AI governance board",
            why: "The guardrail side of the same skill, two years earlier, inside a bank." },
        ],
        /* The narrowest of the five, and deliberately so: three picks, not four.
           Nobody has written a letter about the PayPal agentic work itself — it
           started Oct 2025 and the most recent letter on file is Jul 2025 — but
           the pattern this page is the current instance of is corroborated:
           AI integrated into working systems, an unfamiliar technology turned
           into solutions, and architecture led rather than advised. */
        testimony: {
          picks: [
            { recId: "kimly-ly",
              quote: "His strategic understanding of cloud infrastructure—particularly within AWS and Azure—is matched by a strong grasp of AI technologies, which he seamlessly integrates into practical solutions.",
              why: "The one letter that speaks to AI directly, and it says the thing this page argues: the AI sits inside working systems, not beside them." },
            { recId: "naresh-jayaram",
              quote: "His considerable knowledge and experience in different aspects of Cloud and Core Platform engineering and his zeal to explore newer technologies opened a wider horizon for solutions.",
              why: "Adopting an unfamiliar technology and turning it into solutions is the pattern this page is the current instance of." },
            { recId: "antonio-tamer",
              quote: "He has led the architecture of several systems and his ideas are truly innovative and forward thinking.",
              why: "Led the architecture of systems — plural — from an engineer who followed him across two companies." },
          ],
        },
        projects: [
          { id: "commandcenter-tools", why: "The suite: five parts, built to work together, in production at PayPal." },
          { id: "agentic-harness",     why: "The harness, and the meta-harness that builds harnesses." },
          { id: "es-builder",          why: "Compiles a codebase into a queryable expert system." },
          { id: "fathom",              why: "The index an agent reads instead of grepping." },
        ],
        articles: [
          { id: "why-agentic-kit",               why: "Why the harness exists at all." },
          { id: "hexagonal-agentic-engineering", why: "Ports and adapters, for systems where one adapter is a model." },
          { id: "cue-for-agentic-engineering",   why: "Typed configuration as the contract an agent cannot drift away from." },
        ],
      },
    },
    /* ---- 04 · CI/CD ------------------------------------------------------

       NO METRICS RAIL, AND THAT IS THE DECISION. Every CI figure worth having
       here — reuse rate, cache hit rate, wall-clock reduction, cold-start time
       — would be invented. Four placeholder tiles is a weaker opening than
       none, so `proof.rails` simply does not declare `metrics` and the page has
       no slot to put a number in. `placeholderLede` says so above the fold, so
       the draft banner is not read as "the numbers are drafts" on a page that
       has no numbers.

       The signature follows the DevXSignature precedent: where the visual is a
       mechanism diagram with no figure in it, `source` says that in words
       rather than carrying a placeholder disclaimer about figures that are not
       there. A disclaimer implies a number is coming later; this one is not.  */
    {
      id: "cicd",
      name: "CI/CD",
      eyebrow: "Specialization 04",
      kicker: "The pipeline is a scheduling problem",
      tone: "blue",
      icon: "share",
      pageComponent: "SpecCICD",
      tagline: "Waiting for a runner is not a CI problem. It is a capacity problem — and the whole plan is knowable before the first job starts.",
      standfirst: "PLACEHOLDER STANDFIRST. A pipeline enumerates itself before it executes: the jobs, their order, and the shape of machine each one needs are all available at t=0. Everything on this page follows from spending that knowledge on capacity up front instead of discovering it half-way through a run. Geoff to rewrite.",
      signature: {
        component: "CICDSignature",
        title: "What descends, and what never needs to",
        note: "A deliberately thin vendor runner over a cluster you are already paying for, and the plan that falls between them. Every tile is coloured and coded by its execution class, because routing is a type: a fork's untrusted input descends into gVisor for what it is, not because a node happened to have room. Switch between a first run and a one-file change, and watch what stops descending.",
        source: "MECHANISM DIAGRAM — no figure is drawn here, and none is implied. The counts are the drawing's own and can be counted off it: 42 tiles, 42 free cells, and 6 left after a one-file change. They are labelled illustrative because there is no measured DAG behind this page, and no wall-clock, cache-hit rate or cold-start time appears anywhere on it. The execution classes, and the typed gate that refuses an unlisted one, belong to the CUE pipeline generator — the build where a non-compliant pipeline does not fail review, it fails to compile.",
      },
      placeholder: true,
      placeholderLede: "The writing on this page is a draft. The absence of numbers is not.",
      placeholderNote: "A draft: the standfirst, the section prose and the labels inside the diagram, all pending Geoff's review. Not a draft: the decision to publish no CI figure at all. No reuse rate, cache-hit rate, wall-clock reduction or cold-start time appears here, because none of them has a measurement behind it and four invented tiles would be a weaker opening than none. The résumé lines below are rendered verbatim from the role record and are not drafts either.",
      proof: {
        /* No `metrics` rail — see the note above the record. No `live` rail
           either: the running artifact belongs to Agentic Engineering, and a
           second page pointing at the same demo would be borrowing its
           evidence rather than presenting its own. */
        rails: ["roles", "testimony", "projects", "articles"],
        roles: [
          { roleId: "ews", bulletTag: "platform", match: "immutable CI/CD pipelines",
            why: "Immutable, and therefore re-runnable — the earliest version of the argument that a build's output should depend on its inputs and on nothing else." },
          { roleId: "ews", bulletTag: "sre", match: "blue-green rollouts",
            why: "Delivery risk moved into the mechanism. A rollout you can reverse is a different engineering problem from a rollout you have to get right." },
          { roleId: "repay", bulletTag: "platform", match: "Secure EKS with GitOps, admission control, and autoscaling",
            why: "Deployment and the capacity that runs it were already one system here. Everything on this page is that idea taken further." },
          /* Deliberately the same bullet DevX cites, with a different reading of
             it. DevX's consequence is that ownership moved; this page's is the
             gate mechanics. Two pages may point at one résumé line — what they
             may not do is make the same argument out of it. */
          { roleId: "fcb", bulletTag: "platform", match: "CODEOWNERS is a social contract with a syntax",
            why: "The gate mechanics rather than the ownership story: a required check is only required if the path that runs it cannot be gone around, and this file is what decides which checks a given change has to clear." },
          { roleId: "thinkvine", bulletTag: "platform", match: "Converted legacy infrastructure to Terraform IaC with CI/CD",
            why: "The oldest one here, and the same move: a deployment stopped being a procedure someone performed and became an artifact something ran." },
        ],
        /* The page whose old rail was the loudest absence panel on the site, on
           the theory that these recommenders "stood next to the outcome and not
           next to the scheduler underneath it". That distinction was invented.
           The words "pipeline" and "CI/CD" do not appear in the letters, but
           automation that removes manual steps from delivery does, and so does
           the Kubernetes strategy this page's capacity argument runs on. */
        testimony: {
          picks: [
            { recId: "praveen-sondur",
              quote: "A strong advocate for automation, Geoff led several initiatives that significantly reduced manual overhead and improved operational efficiency.",
              why: "Automation that removes manual steps from how work gets delivered, led by him — the argument of this page in a colleague's words, and the most recent one." },
            { recId: "jim-shingler",
              quote: "Geoff is a true expert in cloud computing technologies, particularly in AWS, Kubernetes, and Terraform. His extensive knowledge of these platforms has been instrumental in our SVB's success in moving to the cloud.",
              why: "Names the exact stack this page's pipeline runs on — Kubernetes and Terraform — from an Executive Director watching the migration land." },
            { recId: "rick-mulder",
              quote: "Geoff and I worked together on a project to architect Silicon Valley Bank's Kubernetes strategy on AWS.",
              why: "CI capacity is a Kubernetes scheduling problem here because he architected the Kubernetes strategy; a peer on that project says so." },
          ],
        },
        projects: [
          { id: "eks-blueprint", why: "The cluster the runners land on. CI capacity is a Kubernetes scheduling problem here because CI was put on Kubernetes." },
          { id: "cue-wasm",      why: "The CUE evaluator, in a browser. Whatever refuses a malformed pipeline in CI can refuse it in an editor, which is the cheapest place there is to find one." },
          { id: "geoffmiller-cloud", why: "This site. Its build is a single Go step with a check task that fails when the committed output has drifted from its source — the same hermetic argument, at the smallest scale it can be made at." },
        ],
        articles: [
          { id: "cue-for-agentic-engineering", why: "Typed configuration as the contract a pipeline is generated against — which is what makes a pipeline reviewable as data rather than as a script somebody edited by hand." },
        ],
      },
    },
    /* ---- 05 · Compliance & Governance ------------------------------------

       THE ONE PAGE WHOSE NUMBERS ARE NOT DRAFTS. Every tile below is
       `placeholder: false`, because each is a count over an artifact that
       exists plus the tool run that validates it — not an outcome, not a
       benefit, and above all not an audit-reduction figure. There is
       deliberately no findings-prevented, controls-inherited, ATO-duration or
       audit-hours-saved number anywhere in this record, and there must never
       be one: the audit cross-section is a scope identity, not a measurement.

       The 67-manual tile is the point of the rail. A compliance deliverable
       that publishes its own uncovered set is the only kind whose covered set
       means anything, and that asymmetry is the argument the whole page rests
       on. It is not a caveat attached to the other three tiles; it is a peer
       of them, which is why it renders as one.

       Because these counts are real, the page-level banner must not claim they
       are drafts — hence `placeholderLede`, which overrides the shell's default
       "every figure on this page is placeholder content" lede. Getting that
       wrong in the other direction (a banner that disclaims a real number) is
       just as dishonest as a number with no source.                          */
    {
      id: "governance",
      name: "Compliance & Governance",
      eyebrow: "Specialization 05",
      kicker: "One control, many enforced forms",
      tone: "red",
      icon: "shield",
      pageComponent: "SpecGovernance",
      tagline: "A control that is written down is a document. A control that compiles into an admission decision is a control.",
      standfirst: "Every control on this page exists at five different moments — as a type, as a plan, as an API call, as an object about to be stored, and as a fact recorded after the event. Four of those moments can refuse. One can only report. This page is about where the refusals go, what walks past each one anyway, and what it takes to prove afterwards that any of it happened.",
      signature: {
        component: "GovernanceSignature",
        title: "One control, and everything it is at the same time",
        note: "The whole of NIST 800-171 Rev 2, one square per clause, in the coverage state the pack's own register assigns it — enforced, detected, partial, or done by a human. Select any coverage state to see which half of the standard it is. Then one clause is opened out into every form the platform enforces it in: an admission policy, a config rule, an SCP, an entry in a machine-readable plan.",
        source: "MECHANISM DIAGRAM — no figure is drawn here, and deliberately so: there is no findings-prevented, controls-inherited, audit-duration or hours-saved number on this page. The cross-section is a scope identity, not a measurement. Any count the picture labels is one of the four in the numbers rail on this page, each of which arrives with the tool run that validates it; the drawing introduces nothing of its own.",
      },
      placeholder: true,
      placeholderLede: "The counts on this page are real. The writing around them is a draft.",
      placeholderNote: "Not a draft: the four counts in the numbers rail, each counted from the policy-pack repository with the tool run that checks it named beside it — nor the two mechanism sections, whose every external claim is quoted from a primary source that was fetched and read on 2026-08-12 and is linked from the page. Still a draft: the prose in cards 3, 4 and 6 of “How I work on this”, and the last two paragraphs of “What is built”, pending Geoff's review. And deliberately absent, in draft or otherwise, is any audit-reduction figure — no findings prevented, no controls inherited, no ATO duration, no audit hours saved. None of that is measured here, so none of it is published.",
      proof: {
        rails: ["metrics", "roles", "testimony", "projects", "articles"],
        /* Counts, not outcomes. Each tile answers "how many of this thing
           exist, and what checked them" — a question an artifact can settle —
           rather than "what did it save", which it cannot. The repository is
           not public, so every source line says whose count this is instead of
           implying the reader can run it. */
        metrics: [
          {
            id: "policies",
            value: "20", unit: "ClusterPolicies",
            label: "Kyverno policies that deny at admission",
            sub: "the deny message carries the control ID that refused the change, so whoever hits it can read why",
            placeholder: false,
            source: "Counted 2026-08-07 from the policy-pack repository: 20 Kyverno ClusterPolicies, with `kyverno test` passing 36 of 36 cases. The repository is not public, so this is a count Geoff reports from his own artifact rather than one you can run yourself — stated with its method so it can be asked about.",
          },
          {
            id: "automated",
            value: "30", unit: "controls",
            label: "Controls the cloud automation actually covers",
            sub: "8 enforced at admission · 22 detected by config rules — two different guarantees, added up once and only here",
            placeholder: false,
            source: "From the pack's own coverage table, counted 2026-08-07. Enforcement refuses the change and detection reports it afterwards — two different guarantees, added together here and nowhere else. The rules underneath them are the ones validated by `opa test` (78 of 78) and cfn-lint (10 of 10) in the same repository, which is not public: reported rather than demonstrated.",
          },
          {
            id: "manual",
            value: "67", unit: "controls",
            label: "Controls it does not cover at all",
            sub: "plus 13 more covered only in part. The pack ships a section headed “Not covered” and this is what is inside it.",
            placeholder: false,
            source: "From the same coverage table, counted 2026-08-07. Published here for the same reason it is published there: a compliance deliverable that states its own uncovered set is the only kind whose covered set can be believed.",
          },
          {
            id: "oscal",
            value: "110", unit: "requirements",
            label: "Implemented-requirements in a machine-readable plan",
            sub: "OSCAL 1.1.2 — a system security plan a tool can read, rather than a document somebody re-types each cycle",
            placeholder: false,
            source: "Counted 2026-08-07 from the OSCAL 1.1.2 system security plan in the same repository. OSCAL is NIST's published format for this; the count is of implemented-requirement entries in that file, and is again reported rather than demonstrated.",
          },
        ],
        roles: [
          { roleId: "fcb", bulletTag: "sec", match: "Enforced policy-as-code gates for continuous FFIEC",
            why: "The claim this page exists to explain, and continuous is the load-bearing word in it: a check that runs at audit time is a report, and a check that runs at admission time is a control." },
          { roleId: "fcb", bulletTag: "platform", match: "OPA/Gatekeeper",
            why: "The admission half, on the cluster itself. It refuses the workload; it does not file a finding about it." },
          { roleId: "fcb", bulletTag: "sec", match: "Integrated DevSecOps toolchain",
            why: "Supply chain inside the delivery path rather than in a quarterly scan — dependency and static analysis as gates, not as a report somebody reads later." },
          { roleId: "fcb", bulletTag: "sec", match: "override-as-code",
            why: "Risk acceptance as a reviewed artifact rather than a conversation. The value is not the flexibility; it is that six months later every exception has a diff, a reviewer and a date attached to it." },
          { roleId: "fcb", bulletTag: "sec", match: "compromise with a security team",
            why: "How it was actually negotiated, in his own words. The hard controls survived because there was a legitimate route through them." },
          /* Kept, and qualified in the `why` rather than quietly dropped. The
             claim is true and self-reported, and the roles rail has no source
             line of its own — so the qualification has to live here or it does
             not exist. A page about evidence cannot present an unassessed claim
             as though it were an assessment. */
          { roleId: "repay", bulletTag: "cloud", match: "passed PCI with zero criticals",
            why: "Self-reported, and worth saying so plainly: no assessment report is published alongside this and no assessor is named. It belongs on a résumé. It is not evidence in the way the counts above are." },
        ],
        /* Two picks, and two is the honest number here — the shortest rail of
           the five rather than a padded one. What the letters actually carry is
           the design goal (a hardened and compliant platform, led by him) and
           the regulated estate the controls have to hold in. That is relevant
           evidence, and the fact that Atif Siddiqui is himself the CISSP in that
           pair makes his sentence stronger, not disqualifying. */
        testimony: {
          picks: [
            { recId: "atif-siddiqui",
              quote: "Geoff's mastery with Kubernetes was instrumental in leading the design of Kubernetes in AWS as a hardened and compliant Platform.",
              why: "Hardened and compliant, as the design goal he led toward — from a CISSP who worked on the platform for four years, and the most recent letter on file." },
            { recId: "zenul-pomal",
              quote: "Geoff's in-depth knowledge of AWS facilitated seamless migrations, including internet-facing applications with intricate ingress/egress configurations and integrations with various financial institutions.",
              why: "Internet-facing workloads, controlled ingress/egress and bank-to-bank integrations: the regulated estate these controls have to hold in, described by an Executive Director." },
          ],
        },
        projects: [
          { id: "landing-zone",    why: "The estate the gates run across — 100+ accounts, with the compliance checks living in the account structure rather than in a review meeting." },
          { id: "eks-blueprint",   why: "Admission control on the cluster itself: CIS-benchmark hardening, and OPA/Gatekeeper deciding at the door." },
          /* The harness project record already draws the governance gate in
             position inside a delivery flow. Referenced, not redrawn — a second
             drawing of one mechanism is how two pages start disagreeing. */
          { id: "agentic-harness", why: "Its gate diagram already draws the governance gate in position, inside a real delivery flow. It is drawn once, there, rather than drawn again here." },
        ],
        articles: [
          { id: "shift-left-vs-shift-luck",    why: "An auditor is the second-worst person to discover a control gap. The worst is a customer." },
          { id: "cue-for-agentic-engineering", why: "A control expressed as a type has a property that prose does not: “TODO” is not a member of the enum." },
        ],
      },
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

  /* ---------- Resource groups ---------- */
  /* One per `cat` in `resources` below, in reading order. `id` must equal a
     record's `cat` — the page groups with `filtered.filter(r => r.cat === g.id)`.
     Grouping used to key on `kind`, which is gone: every record here is a
     YouTube channel, so `kind` carried zero bits and painted every card the
     same accent. When a book or a podcast comes back, add a `medium` field
     THEN — a field with one value across every row does not earn its place.

     The cut is who is talking and what they do with evidence, which is the
     only axis that actually separates these eighteen. Splitting "from the
     maintainers" off "from the vendor" is the sharpest distinction on the
     page: the Kubernetes project posts SIG Node's working meeting the day it
     happened, argument included; NVIDIA posts a keynote replay. Both are
     "official", and collapsing them would throw that away. */
  resourceGroups: [
    { id: "hands-on",    title: "Hands on the tools", order: 1,
      dek: "Independent engineers who run the thing on camera, including the part where it breaks." },
    { id: "keeping-up",  title: "Keeping up", order: 2,
      dek: "Someone else reads the firehose: new research, industry news, and how a spec actually works." },
    { id: "maintainers", title: "From the maintainers", order: 3,
      dek: "The projects publishing their own record — unedited SIG meetings and full conference talks, speaker and employer named." },
    { id: "vendor",      title: "From the vendor", order: 4,
      dek: "First-party channels. The fastest way to see what shipped, read with the obvious discount." },
    { id: "shows-work",  title: "Shows their work", order: 5,
      dek: "Nothing here is about my job. They're on the list because each one puts its evidence on screen — the sources list under the video, a field of competitors bought rather than sent, the correction published when an earlier episode turned out to be wrong." },
  ],

  /* ---------- Resources ---------- */
  /* Eighteen YouTube channels. Record shape:

       id         slug. Stable, never rendered. The React key used to be the
                  synthesised `kind + ":" + title`; a ?resource= deep link or an
                  entity-card contributor would both need a real one.
       title      the channel's REAL display name, not the handle — "Kubernetes",
                  not "Kubernetes Community"; "Louis Rossmann", not "Rossmann
                  Group"; "Google for Developers", not "Google Developers".
       by         only where it differs from the title AND tells you something.
                  Omitted on NVIDIA, Dagger, Kubernetes and the rest, where it
                  would restate the title.
       url        non-negotiable. A page of eighteen channels with no way to
                  open one is a list of assertions.
       cat        the shelf; must match a resourceGroups id.
       tags       stored BARE and prefixed to `topic:*` inside getTags, exactly
                  as the radar computes `ring:` / `cat:` rather than storing
                  them. Keeps the data readable and keeps "kubernetes" out of
                  the projects' "Cloud & platform" facet.
       note       one or two sentences, from the channel's own About text or its
                  recent uploads. NEVER from memory. Where the channel's own
                  words say it best they are quoted.
       showsWork  OPTIONAL one-line evidence claim, and optional on purpose:
                  it is what keeps the page honest. NVIDIA, Google for
                  Developers, A Cloud Guru and Techquickie have no such line in
                  their material and so carry none here — a card with no line
                  makes no claim. Same for DevOps & AI Toolkit, AI News &
                  Strategy Daily, Dagger and PulumiTV, where nothing sourceable
                  was found; see docs note in the commit rather than inventing
                  one.

     Two channels from the original nineteen are not here:
       ChefSteps  — cut. Its About text is subscription marketing and its newest
                    video resolves to a Studio Pass trial plus two of the
                    company's own appliances for sale. It is a vendor channel
                    whose product is the recipe paywall and the Joule, so it
                    cannot sit on the evidence shelf, and it would have been the
                    only record needing a one-item `topic:food` tag.
       Techquickie — kept, but on "Keeping up" rather than the evidence shelf:
                    LMG-produced weekly explainers that assert a mechanism
                    rather than demonstrate one, with no sourcing found. It
                    doesn't need the thesis to belong on a tech page. */
  resources: [
    /* ----- Hands on the tools ----- */
    {
      id: "devops-toolkit",
      title: "DevOps & AI Toolkit",
      by: "Viktor Farcic",
      url: "https://www.youtube.com/@DevOpsToolkit",
      cat: "hands-on",
      tags: ["ai-agents", "cloud-delivery"],
      note: "Tool-by-tool walkthroughs aimed squarely at the day job: “what works well, what doesn’t work, why you should choose one tool over the other, and how to get up-to-speed quickly.” The current run is mostly AI agents meeting the delivery pipeline — sandboxing them, short-lived tokens, why one poisoned agent infects a swarm — alongside a standing DevOps Q&A.",
    },
    {
      id: "indydevdan",
      title: "IndyDevDan",
      url: "https://www.youtube.com/@indydevdan",
      cat: "hands-on",
      tags: ["ai-agents"],
      note: "“On this channel we think, plan, and build.” Agentic coding worked end to end — Claude Code hooks, sub-agents, plan mode, context engineering, and a local MLX stack.",
      showsWork: "The channel states its own rule: “Do what you share. I don’t share anything on this channel I’m not betting on with my time, energy and money.”",
    },

    /* ----- Keeping up ----- */
    {
      id: "two-minute-papers",
      title: "Two Minute Papers",
      url: "https://www.youtube.com/@TwoMinutePapers",
      cat: "keeping-up",
      tags: ["ai-agents", "science"],
      note: "One recent AI or graphics result per video, a few a week — DeepMind, OpenAI, NVIDIA and Anthropic work summarised for people who will not read the preprint. The entire About text is the catchphrase: “What a time to be alive!”",
      showsWork: "Every description carries a “The paper is available here” block linking the primary source — the arXiv preprint or the lab’s own research post, not a news article about it.",
    },
    {
      id: "nate-b-jones",
      title: "AI News & Strategy Daily",
      by: "Nate B Jones",
      url: "https://www.youtube.com/@NateBJones",
      cat: "keeping-up",
      tags: ["ai-agents"],
      note: "A twenty-year product leader posting daily: “weekly AI strategy breakdowns (no buzzwords), coding & prompting workflows and automation guides, future-of-work insights for decision-makers, frameworks from real AI implementations.” The channel’s stated job is cutting through AI hype for people who have to make decisions about it.",
    },
    {
      id: "techquickie",
      title: "Techquickie",
      by: "Linus Media Group",
      url: "https://www.youtube.com/@techquickie",
      cat: "keeping-up",
      tags: ["hardware", "consumer", "vfx"],
      note: "Short weekly explainers on one piece of technology at a time — how DLSS, FSR and XeSS actually work, why the fastest memory isn’t in your PC, what’s wrong with end-to-end encryption. Its own pitch: “everything from the latest USB specs to how Wi-fi works on airplanes.”",
    },
    {
      id: "a-cloud-guru",
      title: "A Cloud Guru",
      url: "https://www.youtube.com/@acloudguru",
      cat: "keeping-up",
      tags: ["cloud-delivery"],
      note: "The “AWS This Week” / “Azure This Week” / “GCP This Month” digests — a standing weekly read of what each cloud actually shipped. Archive only: nothing new in three years, and the last video, “We’re taking the party to Pluralsight!”, is the announcement that it stopped.",
    },

    /* ----- From the maintainers ----- */
    {
      id: "kubernetes",
      title: "Kubernetes",
      url: "https://www.youtube.com/@KubernetesCommunity",
      cat: "maintainers",
      tags: ["cloud-delivery"],
      note: "The project’s own recording feed rather than a highlights reel: SIG and working-group meetings posted as they happen, several a day — SIG Node, SIG Network, SIG Release, SIG Autoscaling, WG Checkpoint Restore. The About text points contributors at kubernetes.dev.",
      showsWork: "Meetings go up whole and timestamped — “SIG Node Meeting for 2026-08-11” — the day they happened, argument included, instead of being edited into a talk.",
    },
    {
      id: "cncf",
      title: "CNCF",
      by: "Cloud Native Computing Foundation",
      url: "https://www.youtube.com/@cncf",
      cat: "maintainers",
      tags: ["cloud-delivery"],
      note: "The full KubeCon + CloudNativeCon archive — every keynote and session published after the event — plus end-user talks from the companies running it, Mercedes-Benz Tech Innovation and Intuit among them. Stated purpose: “educational and informative content on cloud native computing.”",
      showsWork: "Talks are published in full with the speaker and their employer named in the title, so a claim can be traced to the person who made it and the system they made it about.",
    },

    /* ----- From the vendor ----- */
    {
      id: "nvidia",
      title: "NVIDIA",
      url: "https://www.youtube.com/@NVIDIA",
      cat: "vendor",
      tags: ["ai-agents", "hardware"],
      note: "First-party GTC keynote replays and platform launches — Vera Rubin, Cosmos, DSX — from a company that describes itself as “a full-stack computing infrastructure company with data-center-scale offerings that are reshaping industry.”",
    },
    {
      id: "google-for-developers",
      title: "Google for Developers",
      url: "https://www.youtube.com/@GoogleDevelopers",
      cat: "vendor",
      tags: ["ai-agents"],
      note: "Google’s developer-facing channel: Gemini launches, API and framework walkthroughs — the Interactions API, WebMCP, Angular — and a monthly Google Developer News roundup. Its own line is “the latest in Google technology — from AI and cloud, to mobile and web.”",
    },
    {
      id: "dagger",
      title: "Dagger",
      url: "https://www.youtube.com/@dagger-io",
      cat: "vendor",
      tags: ["ai-agents", "cloud-delivery"],
      note: "The channel for Dagger itself — “an open-source runtime for composable workflows” aimed at CI/CD and AI agents. Most of the catalogue is community demos, module walkthroughs and community-call recordings rather than product marketing, but it is still the vendor’s channel.",
    },
    {
      id: "pulumi-tv",
      title: "PulumiTV",
      url: "https://www.youtube.com/@PulumiTV",
      cat: "vendor",
      tags: ["ai-agents", "cloud-delivery"],
      note: "Pulumi’s own channel: infrastructure as code in TypeScript, Python, Go, C# and Java “instead of domain-specific languages like HCL or YAML.” Short worked examples and product launches — the non-product content is still Pulumi-framed.",
    },

    /* ----- Shows their work ----- */
    {
      id: "kurzgesagt",
      title: "Kurzgesagt – In a Nutshell",
      url: "https://www.youtube.com/@kurzgesagt",
      cat: "shows-work",
      tags: ["science", "medicine"],
      note: "Animated science explainers from “a team of illustrators, animators, number crunchers and one dog who aim to spark curiosity about science and the world we live in” — physics, biology, medicine and the very long term.",
      showsWork: "Every video ships a public “Sources & further reading” document, and when the first Ozempic episode did not hold up they published a corrected version of it rather than a footnote.",
    },
    {
      id: "mark-rober",
      title: "Mark Rober",
      url: "https://www.youtube.com/@MarkRober",
      cat: "shows-work",
      tags: ["science"],
      note: "“Former NASA engineer. Current CrunchLabs founder and friend of science.” Nine years at NASA JPL, seven of them on the Curiosity rover, then five at Apple’s Special Projects Group — now large engineering builds filmed doing whatever they actually do.",
      showsWork: "The glitter-bomb series is six numbered revisions of the same device, each episode showing what the previous one got wrong.",
    },
    {
      id: "project-farm",
      title: "Project Farm",
      by: "Todd",
      url: "https://www.youtube.com/@ProjectFarm",
      cat: "shows-work",
      tags: ["science", "consumer"],
      note: "One person running head-to-head tests of named consumer products — batteries, hand tools, motor oils, adhesives — and reporting which ones actually performed.",
      showsWork: "Patreon support is what lets him decline sponsorships and promotional units, so the field under test is bought rather than supplied by the brand being judged.",
    },
    {
      id: "chubbyemu",
      title: "Chubbyemu",
      by: "Dr. Bernard and a team of physicians",
      url: "https://www.youtube.com/@chubbyemu",
      cat: "shows-work",
      tags: ["medicine"],
      note: "“We tell stories in medicine” — variations on cases the team or their colleagues have seen, walked from presenting symptoms through the mechanism to the diagnosis.",
      showsWork: "Each video carries a Selected References list of the actual literature — Creutzfeldt and Jakob 1920 in the original German, Gajdusek in the NEJM — and names the physician who reviewed it.",
    },
    {
      id: "louis-rossmann",
      title: "Louis Rossmann",
      url: "https://www.youtube.com/@rossmanngroup",
      cat: "shows-work",
      tags: ["hardware", "consumer"],
      note: "Component-level logic-board repair filmed step by step, alongside the right-to-repair argument that came out of it: “willful actions from manufacturers to limit access to parts & schematics.” Currently a long run on state 3D-printing bills and who is lobbying for them.",
      showsWork: "Claims get read against the document — a Bosch parts sheet checked against what the EU rules actually require, a warranty claim followed all the way to a specific $1,234.04 refund.",
    },
    {
      id: "captain-disillusion",
      title: "Captain Disillusion",
      url: "https://www.youtube.com/@CaptainDisillusion",
      cat: "shows-work",
      tags: ["vfx"],
      note: "Frame-by-frame debunks of viral video, plus the CD/ series on the artefacts that give a fake away — blur, shutter speed, interlacing. “In a world where the content of digital images and videos can no longer be taken at face value, an unlikely hero fights for the acceptance of truth.”",
      showsWork: "When an earlier explanation turned out to be wrong, the correction shipped as its own episode — “CD / Interlacing ADDENDUM” — rather than a quiet edit to the original.",
    },
  ],

  /* ---------- About Me ---------- */
  about: [
    { id: "family",    title: "Dad mode",         body: "Four kids. Most of my weekend build-time is a kid on one knee pointing at which wire goes where.", icon: "users" },
    { id: "bjj",       title: "Brazilian Jiu-Jitsu", body: "White belt energy, permanent. BJJ is the best debugging practice I know — you think your position is great until someone shows you why it isn't.", icon: "shield" },
    { id: "latin",     title: "Latin dancing",    body: "Salsa, Bachata, Merengue, Cha-Cha. It keeps me fluent in a thing that's not keyboard-shaped.", icon: "music" },
    { id: "rc",        title: "RC drones + monster trucks", body: "Anything with a brushless motor and a receiver. I like the tuning loop — telemetry, tweak, fly again. Same loop, smaller stakes.", icon: "drone" },
    { id: "ai",        title: "Tinkering with AI", body: "Nights and weekends: building agentic harnesses, poking MCP servers, wiring small models into weirder workflows. This site is part of that.", icon: "sparkles" },
    { id: "build",     title: "Workshop",         body: "I build and fix things with the kids. No great woodworker, but a lot of time on 'why did that break' conversations — which is most of engineering.", icon: "tool" },
  ],
};

/* ---------------------------------------------------------------------------
   Organisation logos.

   A manifest of what is ON DISK in spa/assets/orgs — nothing aspirational. An
   entry here is a promise that the file exists; a stale entry renders a broken
   image where the OrgMark monogram would have been perfectly fine, which is a
   worse outcome than having no logo at all. Provenance, licence, and the
   judgement calls (Arizona's state seal, AWS's logo rule, the retired SVB
   brand, Anthropic's in-progress certification) are recorded in
   spa/assets/orgs/SOURCES.md. Read that before adding, removing or moving one.

   SITE-ONLY. These never reach the résumé renderers or the ATS PDF — those
   build from resume-core CUE and never read spa/. An ATS parses text; a logo
   in that PDF is dead weight at best.

   Shape, and why:

     variants: []            a LIST, not a keyed object, because the same kind
                             legitimately exists twice — Anthropic ships a Slate
                             icon and an Ivory icon, and both are the icon.
       .kind                 "wordmark" | "icon" | "mono"
       .on                   "light" | "dark" | "any" — which background the
                             artwork is LEGIBLE against. Measured by rendering
                             each file on #ffffff and #12101a and looking at it,
                             not inferred from the file name. UTI's own file is
                             called "…-White…" and is in fact dark navy.
       .file                 filename under spa/assets/orgs/
     alsoKnownAs: []         org strings as they actually appear elsewhere in
                             this file. Matching is EXACT (after light
                             normalisation) and never fuzzy: "SVB / First
                             Citizens Bank" names two employers and no single
                             logo is honest for it, so it deliberately matches
                             nothing and falls back to the monogram.
     caution                 a display question a human should answer. Surfaced,
                             not silently enforced.

   Orgs with no entry are intentional, not missing: ThinkVine, OWNZONES and
   J-Curve have no live source anywhere (checked); the Arizona Dept. of
   Administration is barred by statute (A.R.S. § 41-130); AWS is omitted on
   AWS's own trademark rule. All four cases are argued in SOURCES.md.
   --------------------------------------------------------------------------- */
/* Every variant carries `w`/`h` — the artwork's own intrinsic size, read off the
   SVG viewBox or the PNG header, never guessed. Two things need it:

     1. OrgLogo emits them as the <img> width/height attributes, so the browser
        knows the aspect ratio before the bytes arrive and reserves the right
        box. Without it a lazy-loaded wordmark is zero-wide until it lands and
        everything after it slides sideways on load.
     2. A caller can cap a mark's WIDTH (OrgLogo's maxWidth prop). Scaling a
        wordmark to fit a fixed slot needs its ratio in advance, and reading it
        back off the DOM would mean reading it after the load this is meant to
        pre-empt.

   These are ratios, not render sizes: keep them exactly as the file says, and
   if a file is ever replaced, re-measure rather than reusing the old pair. */
window.ORG_LOGOS = {
  "PayPal": {
    variants: [
      { kind: "wordmark", on: "light", file: "paypal-wordmark.svg",         w: 135, h: 48 },
      { kind: "mono",     on: "dark",  file: "paypal-wordmark-reverse.svg", w: 135, h: 48 },
      { kind: "icon",     on: "any",   file: "paypal-icon.svg",             w: 48,  h: 48 },
    ],
  },

  "First Citizens Bank": {
    variants: [
      { kind: "wordmark", on: "light", file: "first-citizens-bank-wordmark.png", w: 512, h: 76 },
      { kind: "icon",     on: "any",   file: "first-citizens-bank-icon.png",     w: 80,  h: 80 },
    ],
  },

  "Silicon Valley Bank": {
    /* Retired brand — SVB failed in March 2023 and is now a First Citizens
       division. Shipped anyway: it is a real employer, the résumé already says
       so in text, and the mark's owner today is a company Geoff also worked
       for. This is the April 2022 mark, the last one SVB used as an
       independent bank. See SOURCES.md for the era swap. */
    variants: [
      { kind: "wordmark", on: "light", file: "silicon-valley-bank-wordmark.svg", w: 503.47, h: 99.79 },
    ],
    /* Two recommendations say "SVB / First Citizens Bank". OrgLogo.orgPrimary
       resolves that to "SVB", so the initialism has to be a name the manifest
       knows — same idiom as NIU and UTI below, and it keeps aliasing in the one
       place aliases live rather than in a second table inside the resolver. */
    alsoKnownAs: ["SVB"],
  },

  "REPAY": {
    /* 8:1, and roughly the right-hand third of that is the words "Realtime
       Electronic Payments" — REPAY's published logo IS the tagline lockup.
       Re-checked 2026-08-12: repay.com serves exactly one logo file sitewide,
       this one, and has no newsroom or media-kit page. So there is no
       tagline-free wordmark to prefer, and cropping one out of this is the
       re-crop the top of OrgLogo.jsx forbids. The tagline stops being readable
       well before the sizes this site uses; a caller putting this in a small
       slot gets a wide quiet block, not a legible strapline. */
    variants: [
      { kind: "wordmark", on: "light", file: "repay-wordmark.png", w: 813, h: 102 },
    ],
  },

  "Early Warning Services": {
    /* Their site serves ONLY the reversed artwork; the positive paths 404. On a
       light surface this goes on a dark chip or falls back to the monogram. */
    variants: [
      { kind: "wordmark", on: "dark", file: "early-warning-services-wordmark-reverse.svg", w: 842.49, h: 150 },
    ],
    alsoKnownAs: ["Early Warning Services, LLC", "Early Warning"],
  },

  "Bank of America": {
    /* No reversed lockup: the one their site serves is a sprite-sheet window
       that renders as a red bar on its own, and re-viewBoxing it would be
       altering the mark. Icon only, on dark. */
    variants: [
      { kind: "wordmark", on: "light", file: "bank-of-america-wordmark.svg", w: 231, h: 24 },
      { kind: "icon",     on: "any",   file: "bank-of-america-icon.png",     w: 192, h: 192 },
    ],
  },

  "Northern Illinois University": {
    /* NIU's standards: full lockup only (never the shield alone without
       approval), never altered, never locked up against another logo. */
    variants: [
      { kind: "wordmark", on: "light", file: "northern-illinois-university-wordmark.png",         w: 260, h: 100 },
      { kind: "mono",     on: "dark",  file: "northern-illinois-university-wordmark-reverse.svg", w: 245, h: 90 },
    ],
    alsoKnownAs: ["NIU"],
  },

  "Universal Technical Institute": {
    variants: [
      { kind: "wordmark", on: "light", file: "universal-technical-institute-wordmark.svg", w: 133, h: 60 },
    ],
    alsoKnownAs: ["UTI"],
  },

  "Geek Squad": {
    /* Current (c. 2017) badge, not the 2001–2006 one Geoff worked under —
       same convention every career surface uses. The badge has its own light
       keyline so it survives on dark, though the black field softens. */
    variants: [
      { kind: "wordmark", on: "any", file: "geek-squad-wordmark.svg", w: 105.2, h: 65.7 },
    ],
  },

  "Anthropic": {
    variants: [
      { kind: "wordmark", on: "light", file: "anthropic-wordmark.svg",         w: 590, h: 68 },
      { kind: "mono",     on: "dark",  file: "anthropic-wordmark-reverse.svg", w: 590, h: 68 },
      { kind: "icon",     on: "light", file: "anthropic-icon.svg",             w: 92,  h: 64 },
      { kind: "icon",     on: "dark",  file: "anthropic-icon-reverse.svg",     w: 92,  h: 64 },
    ],
    caution: "Anthropic is only in this data as the issuer of a certification " +
             "marked In Progress. An issuer's logo beside a credential reads as " +
             "'they conferred this'. Recommend text-only until it is awarded — " +
             "the asset is here so that day is a one-line change.",
  },
};

/* ---------------------------------------------------------------------------
   Feature-flag override — local and by-URL preview of an OFF feature.

   This has to live at the BOTTOM OF THIS FILE and nowhere else. index.html
   loads data.js in <head>; Shell.js computes NAV and Boot.js computes
   ENABLED_ROUTES at script-eval time, in <body>. An override that runs after
   those two scripts is a no-op, and there is no other file that runs before
   them. `featureOn()` is untouched — it still reads only window.SITE_FEATURES;
   this rewrites that object before anyone reads it.

   Three ways in, in precedence order:

     1. ?ff=specializations   turn a flag on for this load, and remember it in
                              sessionStorage so client-side navigation and a
                              hard reload of the deep link both keep working.
                              Repeatable: ?ff=a&ff=b.
     2. ?ff=off               clear every remembered override.
     3. localhost / 127.0.0.1 / *.local / file: / dev.geoffmiller.cloud
                              everything is on by default, because a flag that is
                              only previewable by editing this file gets edited
                              and then committed by accident.

                              dev.geoffmiller.cloud is on this list because it
                              EXISTS to preview unreleased work — requiring ?ff=
                              there made the review URL something you had to
                              remember rather than something you could bookmark.
                              It is a separate published target (repo geoff-dev)
                              from the apex, so this cannot leak: turning a flag
                              on for dev has no effect on geoffmiller.cloud,
                              which still gets nothing unless it asks by URL.

   Nothing here can turn a flag OFF that data.js has ON — this only ever writes
   `true`, so it cannot be used to hide something in production.
   --------------------------------------------------------------------------- */
(function () {
  try {
    var host = String(location.hostname || "");
    // Exact-match the dev host. A /^dev\./ or .includes("dev") test would also
    // match a production hostname that merely began with or contained "dev",
    // which is the kind of near-miss that quietly ships an unreleased section.
    var isLocal = location.protocol === "file:" ||
                  host === "localhost" || host === "127.0.0.1" || host === "[::1]" ||
                  host === "" || /\.local$/.test(host) ||
                  host === "dev.geoffmiller.cloud";

    var remembered = [];
    try { remembered = JSON.parse(sessionStorage.getItem("ff") || "[]") || []; } catch (_) {}

    var asked = [];
    try { asked = new URLSearchParams(location.search).getAll("ff"); } catch (_) {}

    if (asked.indexOf("off") >= 0 || asked.indexOf("none") >= 0) {
      remembered = [];
      try { sessionStorage.removeItem("ff"); } catch (_) {}
    } else if (asked.length) {
      asked.forEach(function (f) { if (f && remembered.indexOf(f) < 0) remembered.push(f); });
      try { sessionStorage.setItem("ff", JSON.stringify(remembered)); } catch (_) {}
    }

    if (isLocal) {
      Object.keys(window.SITE_FEATURES).forEach(function (k) { window.SITE_FEATURES[k] = true; });
    }
    remembered.forEach(function (f) {
      if (Object.prototype.hasOwnProperty.call(window.SITE_FEATURES, f)) window.SITE_FEATURES[f] = true;
    });
  } catch (_) {
    /* A preview convenience must never be able to break the site. */
  }
})();
