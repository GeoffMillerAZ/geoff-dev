# Geoffrey Miller

Phoenix, AZ | [https://geoffmiller.cloud](https://geoffmiller.cloud) | [linkedin.com/in/geoff-e-miller](https://linkedin.com/in/geoff-e-miller) | [github.com/GeoffMillerAZ](https://github.com/GeoffMillerAZ)

_View: leadership_

## Summary

Cloud infrastructure and site reliability engineering leader in regulated financial services. Led a 12-person bank platform team through the Silicon Valley Bank transition. At PayPal, taught SRE engineers to design AI workflows with deterministic checks, human review and traceable evidence. Built Fathom, a local Go tool that gives coding agents repository evidence through the Model Context Protocol.

## Experience

### PayPal — Senior Manager, Site Reliability Engineering
_Scottsdale, AZ | 10/2025 - 11/2026_

- Taught brown-bag sessions across the SRE organization on AI harness design, including how to make model output inspectable and which decisions to enforce in code.
- Built a PayPal Command Center prototype that brought parallel P0/P1 investigations into one timeline. Incident leads could follow each investigation and inspect its supporting evidence in one place.
- Wrote a prototype coding harness in Go and CUE for Claude Code. It carried plans, implementation results and validation evidence between stages, routed ambiguous results to an engineer and preserved corrections for subsequent runs.
- Created local simulations of PagerDuty, Slack and Microsoft Teams so engineers could exercise incident workflows without calling live services.
- Built GameDay tooling that analyzed exercise logs and chat transcripts to give participants individualized feedback on their incident response.
- Led work to modernize SRE metrics collection.

### First Citizens Bank — Senior Manager, IT (Cloud Infrastructure)
_Tempe, AZ | 03/2023 - 06/2025_

- Architected and delivered a secure multi-account AWS Landing Zone (100+ accounts) with centralized logging, IAM federation, and policy-as-code guardrails enabling 30+ product teams.
- Led FinOps program; reduced AWS spend 30% year-over-year via dashboards, automated rightsizing, and savings-plan optimization.
- Architected event-driven, claim-based lifecycle control for non-production environments — environments default off and activate against bounded, self-expiring claims instead of fixed shutdown schedules — cutting non-production spend 70%+.
- Replaced thousands of duplicate VPC interface endpoints with a single multi-AZ endpoint hub — a top-3 line item → negligible.
- Designed hybrid connectivity with AWS Direct Connect, Azure ExpressRoute, and Megaport for sub-5ms latency.
- Guided the team through the Silicon Valley Bank → First Citizens Bank integration, including platform migrations.
- Led and mentored a 12-member cloud platform engineering team; founded the Cloud Community of Practice.
- Enforced continuous FFIEC, PCI-DSS, and SOC 2 compliance via policy-as-code gates (Sentinel, OPA) integrated into CI/CD.
- Engineered bank-hardened EKS platform — multi-AZ, CIS-hardened, OPA/Gatekeeper, Karpenter, automated zero-day patching.
- Decomposed monolithic repo into team-owned repos with CODEOWNERS and mandatory gates; lead time 6–12 weeks → days.
- Integrated a DevSecOps toolchain (Sentinel, Snyk, static and SCA scanning) into CI/CD.
- Introduced an 'override-as-code' workflow putting risk acceptance and governance logic in Git, so every exception carries a tracked, peer-reviewed audit trail.
- Consolidated VPC-per-service sprawl into a shared-services hub with Transit Gateway, Route 53 resolver rules and centralized interface endpoints — hundreds of VPCs to a few network segments.
- Served on the bank's AI governance board — crafted secure onboarding patterns for GenAI/ML tools.

### Silicon Valley Bank — Director, IT (Cloud Infrastructure)
_Tempe, AZ | 07/2021 - 03/2023_

- Led cloud infrastructure engineering for the bank, establishing AWS platform standards that carried forward into First Citizens Bank.

### REPAY (Realtime Electronic Payments) — Cloud Infrastructure Lead / Solutions Architect
_Tempe, AZ | 10/2017 - 07/2021_

- Joined as a Senior DevOps Engineer. Built a greenfield AWS platform with Terraform, Packer and Kubernetes and led it through a PCI assessment with zero critical findings.
- Launched Backstage Internal Developer Platform and Documentation-as-Code; cut documentation drift 75%.
- Grew infrastructure and SRE organization from 1 engineer to 18 across SRE, ops, and platform development.
- Established FinOps automation cutting AWS spend 30% year-over-year.
- Built the first version of environment claims — non-production stacks defaulted off and came up against a bounded, self-expiring claim.
- Built reusable landing-zone patterns reducing cloud migration onboarding from months to a single day.
- Deployed Prometheus / Loki / Grafana observability stack with 24/7 PagerDuty on-call.
- Built secure EKS with GitOps, admission control, and multi-dimensional autoscaling.

### Early Warning Services (Zelle) — DevOps Engineer (Contract)
_Scottsdale, AZ | 01/2017 - 10/2017_

- DevOps engineering at Early Warning Services — the bank-owned network that operates Zelle — during the launch period.
- Built immutable CI/CD pipelines and containerized microservices supporting daily releases.
- Automated blue/green deployments and A/B testing to reduce deployment risk.

### ThinkVine — Principal Cloud Architect
_Phoenix, AZ | 04/2016 - 01/2017_

- Migrated Windows and Linux workloads to AWS, converting legacy infrastructure to Terraform IaC with CI/CD.

### OWNZONES Media Network — Lead DevOps Engineer
_Scottsdale, AZ | 04/2016 - 07/2016_

- Designed green-field AWS infrastructure for video workloads using S3 lifecycle policies and Glacier archival to optimize storage cost.

### State of Arizona, Dept. of Administration — Applications Developer
_Phoenix, AZ | 01/2015 - 04/2016_

- Introduced Git source control and automated unit testing to mainframe COBOL systems.

### Northern Illinois University — Undergraduate and Graduate Teaching Assistant
_DeKalb, IL | 01/2012 - 01/2015_


### Bank of America — Mainframe Technical Analyst Intern
_,  | 06/2013 - 08/2014_


### Universal Technical Institute — Help Desk Manager
_Phoenix, AZ | 01/2010 - 12/2010_


### J-Curve Technologies — Help Desk Manager
_Phoenix, AZ | 01/2009 - 01/2010_


### Bank of America — Systems Support Analyst
_Phoenix, AZ | 01/2006 - 01/2009_


### Geek Squad — Desktop Repair
_,  | 01/2001 - 01/2006_


## Skills

- Team Leadership & Mentoring
- Platform Engineering
- Cloud Architecture (AWS primary)
- FinOps & Cloud Cost Optimization
- SRE & Incident Management
- Compliance (FFIEC / PCI-DSS / SOC 2)
- Agentic Engineering & MCP
- Kubernetes / CNCF
- GitOps & IaC (Terraform / Pulumi)
- DevSecOps & Policy-as-Code

## Education

**Northern Illinois University** — M.S. Computer Science (01/2015)
  - Emphasis: Network Programming & Database Systems

**Northern Illinois University** — B.S. Computer Science (01/2013)
  - Magna Cum Laude
  - Upper Division Honors
  - Emphasis: Mainframes
  - GPA: 3.75

