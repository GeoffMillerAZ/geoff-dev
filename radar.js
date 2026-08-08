/* radar.js — GENERATED. Do not edit; edit resume-core/radar/*.cue and run
   `task radar:render`.

   A sidecar, loaded after data.js and before Boot.js. It is separate from
   data.js on purpose: that file is 5,800 lines of résumé and this one churns
   every time a verdict is re-examined.

   Everything Geoff has not personally ratified was dropped in Go before this
   file was written — it is not hidden here, it is absent. window.RADAR.meta
   publishes how many records that is. */
(function () {
  window.RADAR = {
    "meta": {
      "asOf": "2026-08-07",
      "lastPass": "2026-07-30",
      "nextPass": "2026-10-30",
      "authored": 24,
      "published": 12,
      "held": 12,
      "watchCount": 6,
      "moveCount": 1,
      "categories": [
        {
          "id": "aws",
          "title": "AWS substrate",
          "count": 4
        },
        {
          "id": "runtime",
          "title": "In-cluster runtime",
          "count": 3
        },
        {
          "id": "config",
          "title": "Config \u0026 build",
          "count": 3
        },
        {
          "id": "k8s",
          "title": "Kubernetes core \u0026 cost",
          "count": 2
        }
      ],
      "ringCounts": {
        "adopt": 8,
        "avoid": 4
      },
      "basisCounts": {
        "built": 3,
        "evaluated": 1,
        "researched": 8
      }
    },
    "blips": [
      {
        "id": "eks-pod-identity",
        "name": "EKS Pod Identity",
        "aliases": [
          "Pod Identity",
          "IRSA"
        ],
        "researchId": "eks-pod-identity",
        "category": "aws",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Pod Identity is the default; IRSA survives only for Fargate.",
        "why": "Every reason IRSA outlived Pod Identity has closed except one, and that one has a public issue number: the Pod Identity agent is a DaemonSet and Fargate cannot run DaemonSets. Everything else — cross-account, managed add-ons, ABAC by session tag — now works, and Pod Identity drops the per-cluster OIDC provider and the trust-policy dance that made IRSA expensive at fleet scale. The right move is not a migration ceremony but a default: new platform, start Pod Identity-native, keep an IRSA capability in the model strictly for the exception, and let that path stay dormant.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0007",
              "title": "EKS Pod Identity native; IRSA dormant",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0007-pod-identity.md",
              "private": true
            }
          ]
        },
        "blastRadius": "medium",
        "revisitWhen": [
          "containers-roadmap #2274 closes and Fargate gets a Pod Identity path",
          "a non-EKS cluster joins the fleet, which puts IRSA back in play"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0007-pod-identity.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "3 vendor announcements · 1 issue thread · 1 practitioner · 1 project-docs page"
      },
      {
        "id": "karpenter",
        "name": "Karpenter",
        "aliases": [
          "Karpenter"
        ],
        "researchId": "karpenter",
        "category": "aws",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Adopt the pin and the release notes, not the project.",
        "why": "Every minor since v1.6 moved something load-bearing, and each of them is an infrastructure change rather than a chart bump: ODCR default-on, a five-way IAM policy split, a drift-hash change that makes every existing node read as drifted, a new required EC2 permission. So the adoption is of a pinned v1.14.x plus the discipline of reading each upgrade guide — and of encoding the IAM and EventBridge requirements as data, so a minor bump can flag the new infrastructure it needs instead of failing quietly at 3am. Pin Bottlerocket by alias rather than floating latest, so a node OS rollout is an explicit drift event: exactly the control Auto Mode would have taken away.",
        "asOf": "2026-07-29",
        "basis": "built",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "projects",
            "sources",
            "decisions"
          ],
          "projects": [
            {
              "id": "eks-blueprint",
              "why": "Karpenter is in this project's shipped stack — the bank-hardened EKS blueprint it ran node autoscaling on.",
              "title": "Bank-Hardened EKS Blueprint"
            }
          ],
          "decisions": [
            {
              "id": "ADR-0008",
              "title": "Karpenter everywhere + static NodePools for durability",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0008-nodes-karpenter-static.md",
              "private": true
            }
          ]
        },
        "counterpoint": "Cluster Autoscaler is boring, and nobody's fleet ever drifted because of a hash change. If your node shapes are uniform, the pin tax buys you nothing.",
        "blastRadius": "high",
        "revisitWhen": [
          "a minor release changes drift hashing again",
          "CapacityBuffers leaves v1beta1",
          "the spot interruption queue stops being a manual wiring step"
        ],
        "maturity": {
          "stage": "GA, v1 API stable since Aug 2024",
          "on": "2026-07-29"
        },
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0008-nodes-karpenter-static.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 5,
        "sourceMix": "2 project-docs pages · 2 vendor releases · 1 practitioner"
      },
      {
        "id": "aws-audit-manager",
        "name": "AWS Audit Manager",
        "aliases": [
          "Audit Manager"
        ],
        "researchId": "aws-audit-manager",
        "category": "aws",
        "claimType": "verdict",
        "ring": "avoid",
        "verdictLine": "Not adoptable at all — maintenance mode, closed to new customers 30 Apr 2026.",
        "why": "This is the rare avoid that needs no argument about fit: a new platform physically cannot onboard. The interesting part is what replaces it. Build the compliance-evidence story out of primitives that are not going anywhere — Config with scoped rules and conformance packs as the control-evaluation substrate, Security Hub for posture aggregation, CloudTrail to S3 for immutable evidence — and treat compliance mappings as data the platform generates rather than as a bought abstraction. If a certification programme later demands a GRC product, that is a partner-tool decision, not a substrate one.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0015",
              "title": "Policy: CUE-authored, CEL-first; Audit Manager pivot",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0015-policy-cel-first.md",
              "private": true
            }
          ]
        },
        "blastRadius": "low",
        "revisitWhen": [
          "AWS reverses the closure, which has happened to other services before",
          "a certification programme demands a named GRC product rather than evidence"
        ],
        "maturity": {
          "stage": "maintenance mode; closed to new customers",
          "on": "2026-04-30"
        },
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0015-policy-cel-first.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 4,
        "sourceMix": "2 vendor announcements · 1 issue thread · 1 practitioner"
      },
      {
        "id": "eks-auto-mode",
        "name": "EKS Auto Mode",
        "aliases": [
          "Auto Mode",
          "EKS AutoMode"
        ],
        "researchId": "eks-auto-mode",
        "category": "aws",
        "claimType": "verdict",
        "ring": "avoid",
        "verdictLine": "Removes AMI selection, Karpenter config and add-on versions — and charges 10-12% for it.",
        "why": "The entire premise of this platform is owning the node layer: self-managed Karpenter pinned to a specific v1.14.x, Bottlerocket version pinning through amiSelectorTerms aliases, custom Bottlerocket settings, a spot strategy, and every controller delivered as an OCI artifact. Auto Mode removes exactly those control points and bills a per-instance management fee on top of EC2 for doing so — charged even on spot capacity, which is a real tax on a spot-heavy CI fleet. It stays in the model as an escape hatch (a cluster-class flag) for a future low-ops cluster; it is not the substrate.",
        "scope": "as the substrate for a platform whose whole design is owning the node layer",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0006",
              "title": "EKS baseline: 1.35, no Auto Mode, minimal managed add-ons, Bottlerocket",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0006-eks-baseline.md",
              "private": true
            }
          ]
        },
        "counterpoint": "For teams without platform engineers it is genuinely good, and it's the direction AWS invests in.",
        "dissentsFrom": "The mainstream 2026 read is that Auto Mode is the sensible default for new EKS clusters.",
        "blastRadius": "medium",
        "exitPlan": "Modeled as a cluster-class flag, so turning it on for a low-ops cluster later is a data change rather than a re-architecture.",
        "revisitWhen": [
          "the management fee changes, or stops applying to spot capacity",
          "custom EC2NodeClass support lands so AMI pinning survives Auto Mode",
          "a cluster tier appears that has no platform engineer attached to it"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0006-eks-baseline.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "3 vendor announcements · 2 project-docs pages · 1 practitioner"
      },
      {
        "id": "istio-ambient",
        "name": "Istio ambient",
        "aliases": [
          "Istio",
          "ambient mesh",
          "ztunnel"
        ],
        "researchId": "istio-ambient",
        "category": "runtime",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Ambient as the default for a new platform — with the multicluster caveat stated, not buried.",
        "why": "Starting a 2026 greenfield on sidecars buys a guaranteed migration later, a per-pod proxy cost forever, and injection and upgrade churn in between. Ambient gives mTLS and L4 authorization everywhere at near-zero cost, with waypoints only where L7 policy is actually needed. The tradeoff is real and it is not hidden: if you needed one flat multi-cluster mesh with Stable-grade cross-cluster traffic management today, sidecar is still the conservative call, because ambient multicluster is Beta. This platform's topology does not need a federated flat mesh on day one — inter-cluster traffic can transit gateways — so the caveat is survivable here and might not be somewhere else.",
        "scope": "for a greenfield platform whose topology does not need a flat multi-cluster mesh on day one",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0012",
              "title": "Istio ambient + Gateway API only",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0012-mesh-ambient-gateway-api.md",
              "private": true
            }
          ]
        },
        "counterpoint": "For a flat multi-cluster mesh needing Stable-grade cross-cluster traffic management today, sidecar is still the conservative call, and ambient multicluster being Beta is the reason.",
        "blastRadius": "high",
        "revisitWhen": [
          "ambient multi-network multicluster reaches Stable",
          "a requirement for mesh federation arrives before it does"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0012-mesh-ambient-gateway-api.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 7,
        "sourceMix": "4 vendor releases · 1 practitioner · 1 project-docs page · 1 vendor announcement"
      },
      {
        "id": "kyverno-cel",
        "name": "Kyverno (CEL types only)",
        "aliases": [
          "Kyverno",
          "ValidatingAdmissionPolicy",
          "VAP"
        ],
        "researchId": "kyverno-cel",
        "category": "runtime",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Kyverno 1.17+, CEL policy types only — a JMESPath ClusterPolicy in 2026 is instant tech debt.",
        "why": "The adoption is narrower than it sounds, and the narrowing is the whole point. Hard platform invariants that must survive Kyverno being down — deny privileged, enforce runtimeClass, allowlist the registry — belong in native ValidatingAdmissionPolicy: in-tree, no webhook in the request path, no availability dependency. Everything that needs mutation, generation, image-signature verification, an exceptions workflow or fleet reporting stays in Kyverno. Since both are CEL now, the expression corpus is shared and one config language can emit either, so this is a division of labour rather than two tools. Writing a JMESPath ClusterPolicy today is writing something with a published removal date on it.",
        "asOf": "2026-07-29",
        "basis": "built",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "projects",
            "sources",
            "decisions"
          ],
          "projects": [
            {
              "id": "eks-blueprint",
              "why": "Kyverno is in this project's shipped stack, alongside the OPA/Gatekeeper generation it was brought in to replace.",
              "title": "Bank-Hardened EKS Blueprint"
            }
          ],
          "decisions": [
            {
              "id": "ADR-0015",
              "title": "Policy: CUE-authored, CEL-first; Audit Manager pivot",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0015-policy-cel-first.md",
              "private": true
            }
          ]
        },
        "blastRadius": "high",
        "revisitWhen": [
          "Kyverno v1.20 lands and removes JMESPath ClusterPolicy for real",
          "policy-reporter closes the native-VAP results gap, which changes the reporting split",
          "MutatingAdmissionPolicy covers enough that the Kyverno half shrinks again"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0015-policy-cel-first.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 8,
        "sourceMix": "3 vendor releases · 2 project-docs pages · 1 issue thread · 1 practitioner · 1 vendor announcement"
      },
      {
        "id": "backstage",
        "name": "Backstage",
        "aliases": [
          "Backstage",
          "backstage"
        ],
        "researchId": "backstage",
        "category": "runtime",
        "claimType": "verdict",
        "ring": "avoid",
        "verdictLine": "The ports were the product; the engine was optional.",
        "why": "The headless posture was real — stable REST surfaces, a new-backend-only plugin model, even MCP exposure — so the wager was worth taking, and it was taken as an experiment written to settle it rather than as an opinion. What the experiment returned: docs left for source markdown in git, search left because ours has to enforce an existence-hiding rule Backstage's cannot, the permission framework was never used, catalog ingestion left because entities are generated from the same block that generates everything else. What remained was scaffolder task state and a catalog store with an HTTP API, and a four-state proposal aggregate deleted the first while git-generated entities deleted the second. The decisive fact is structural: Backstage's actual product is its plugin ecosystem, and that is reachable only through the React frontend the design had already declined to ship.",
        "scope": "as a headless backend behind a custom portal — the only posture that was ever on the table",
        "asOf": "2026-07-30",
        "basis": "evaluated",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0019",
              "title": "Portal: headless Backstage backend + Go overlay",
              "status": "superseded",
              "date": "2026-07-29",
              "supersededBy": "ADR-0059",
              "repo": "platform-engineering",
              "path": "docs/adr/0019-portal-headless-backstage.md",
              "private": true
            },
            {
              "id": "ADR-0059",
              "title": "The Backstage verdict: the ports were the product, the engine was optional",
              "status": "accepted",
              "date": "2026-07-30",
              "repo": "platform-engineering",
              "path": "docs/adr/0059-the-backstage-verdict.md",
              "private": true
            }
          ]
        },
        "counterpoint": "If you are going to run the React frontend, most of this reverses: the plugin ecosystem is genuinely the best thing in the category and nothing here argues otherwise.",
        "dissentsFrom": "Backstage is the default answer to \"we need an internal developer portal\", and for teams that will run its UI it probably still is.",
        "blastRadius": "medium",
        "exitPlan": "The catalog port survives the verdict unchanged — the adapter left, the seam stayed.",
        "revisitWhen": [
          "the plugin ecosystem becomes reachable without the React frontend",
          "a tenant need appears that the generated-entity model genuinely cannot express"
        ],
        "moves": [
          {
            "on": "2026-07-29",
            "from": "none",
            "to": "trial",
            "kind": "narrowed",
            "because": "The radar confirmed headless Backstage was a supported posture rather than a hack, so the wager was worth taking — and phase 2a was written specifically to settle it: build the ports first, run the portal on a fake adapter, and find out how much of Backstage's value survives the coupling rule.",
            "stance": "sourced",
            "evidence": {
              "rails": [
                "decisions"
              ],
              "decisions": [
                {
                  "id": "ADR-0019",
                  "title": "Portal: headless Backstage backend + Go overlay",
                  "status": "superseded",
                  "date": "2026-07-29",
                  "supersededBy": "ADR-0059",
                  "repo": "platform-engineering",
                  "path": "docs/adr/0019-portal-headless-backstage.md",
                  "private": true
                }
              ]
            },
            "decision": {
              "id": "ADR-0019",
              "title": "Portal: headless Backstage backend + Go overlay",
              "repo": "platform-engineering",
              "path": "docs/adr/0019-portal-headless-backstage.md",
              "private": true
            }
          },
          {
            "on": "2026-07-30",
            "from": "trial",
            "to": "avoid",
            "kind": "reversal",
            "because": "The experiment returned, and no single item in the ledger decided it. Docs, search, permissions and catalog ingestion each left for their own reason, and what was left was scaffolder task state plus a catalog store with an HTTP API — both of which other decisions had already deleted. The decisive one is that the plugin ecosystem is Backstage's actual product and is reachable only through the React frontend this design deliberately did not deploy as the user surface.",
            "stance": "sourced",
            "evidence": {
              "rails": [
                "decisions"
              ],
              "decisions": [
                {
                  "id": "ADR-0059",
                  "title": "The Backstage verdict: the ports were the product, the engine was optional",
                  "status": "accepted",
                  "date": "2026-07-30",
                  "repo": "platform-engineering",
                  "path": "docs/adr/0059-the-backstage-verdict.md",
                  "private": true
                }
              ]
            },
            "decision": {
              "id": "ADR-0059",
              "title": "The Backstage verdict: the ports were the product, the engine was optional",
              "repo": "platform-engineering",
              "path": "docs/adr/0059-the-backstage-verdict.md",
              "private": true
            }
          }
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0059-the-backstage-verdict.md",
          "on": "2026-07-30"
        },
        "movedCount": 2,
        "lastExaminedOn": "2026-07-30",
        "verdictLifespanDays": 1,
        "staleDays": 9,
        "decayClass": "fresh",
        "sourceCount": 8,
        "sourceMix": "4 vendor releases · 3 project-docs pages · 1 practitioner"
      },
      {
        "id": "cue",
        "name": "CUE",
        "aliases": [
          "CUE",
          "cuelang",
          "cue"
        ],
        "researchId": "cue",
        "category": "config",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "The healthiest bet CUE has ever been — and still v0.x with occasional breaking language changes.",
        "why": "Three things had to be true at once and in mid-2026 they finally are: the evaluator rewrite that produced the performance cliffs and memory blowups of 2023-24 has landed and defaulted, the module system is usable in anger, and there is a funded company staffed by the language's creator whose commercial success depends on CUE itself succeeding. The honest risks are the version number and the registry. Both are manageable structurally rather than by hope: pin the binary per repository, host first-party modules in your own OCI registry, treat the Central Registry as a schema source you vendor from rather than a runtime dependency, and do not build anything that assumes its beta pricing survives beta.",
        "asOf": "2026-07-29",
        "basis": "built",
        "context": [
          "commercial-aws",
          "regulated-airgap",
          "personal-oss"
        ],
        "evidence": {
          "rails": [
            "projects",
            "articles",
            "sources"
          ],
          "projects": [
            {
              "id": "f1n",
              "why": "The claim-lease control plane is CUE-modelled end to end.",
              "title": "f1n — claim-leased environments"
            },
            {
              "id": "fathom",
              "why": "CUE is in the shipped stack of the code-intelligence service.",
              "title": "fathom"
            },
            {
              "id": "app-kit",
              "why": "Tokens and component contracts are CUE; the kit generates from them.",
              "title": "app-kit"
            },
            {
              "id": "agentic-kit",
              "why": "CUE carries the contracts the build gate vets.",
              "title": "agentic-kit"
            },
            {
              "id": "geoffmiller-cloud",
              "why": "This very site: the résumé fact base is CUE, and the radar you are reading is CUE.",
              "title": "geoffmiller.cloud"
            },
            {
              "id": "cue-wasm",
              "why": "A CUE evaluator compiled to WebAssembly — the deepest possible commitment to the bet.",
              "title": "cue-wasm"
            }
          ],
          "articles": [
            {
              "id": "cue-for-agentic-engineering",
              "why": "The long-form argument for why configuration wants a type system when an agent is doing the typing.",
              "title": "Why CUE is the right backbone for agentic engineering"
            }
          ]
        },
        "counterpoint": "It is still v0.x, and the language still makes occasional breaking changes. A team that wants a settled config language should use a settled config language.",
        "blastRadius": "high",
        "exitPlan": "Everything downstream consumes rendered YAML, so a CUE failure costs the authoring layer and not the running clusters.",
        "revisitWhen": [
          "CUE reaches v1.0, which retires the language-version hedge",
          "Central Registry pricing lands after beta",
          "a breaking language change costs more than one afternoon to absorb"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0010-timoni-engineered-for-exit.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 8,
        "sourceMix": "4 vendor releases · 2 vendor announcements · 1 business source · 1 project-docs page"
      },
      {
        "id": "renovate-not-dependabot",
        "name": "Renovate, not Dependabot",
        "aliases": [
          "Renovate",
          "Dependabot"
        ],
        "researchId": "renovate-vs-dependabot",
        "category": "config",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Renovate self-hosted; avoid Dependabot entirely for this stack.",
        "why": "This is one heading issuing two verdicts, and the second is as firm as the first. Renovate's flux manager bumps OCIRepository tags and digests, which — given a render-to-OCI delivery model — IS the primary path by which a config-module update reaches a cluster, and it needs no custom configuration to do it. Dependabot has none of that: no flux, no OCI-artifact awareness, and on self-managed GitLab it requires a third-party port before the conversation even starts. The one honest gap is on Renovate's side: first-party CUE module dependencies have no manager, so those stay a tidy task in CI until somebody writes one. That is a contribution opportunity, not a blocker.",
        "scope": "adopt Renovate; the avoid half applies to Dependabot for THIS stack, on self-managed GitLab",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://github.com/renovatebot/renovate/tree/main/lib/modules/manager",
              "title": "Renovate manager source tree — no timoni, no cue manager",
              "publisher": "renovatebot",
              "fetched": "2026-07-29",
              "kind": "project-docs"
            }
          ]
        },
        "blastRadius": "low",
        "revisitWhen": [
          "a CUE manager lands in Renovate, which closes the one stated gap",
          "Dependabot gains OCI-artifact awareness and self-managed GitLab support"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 4,
        "sourceMix": "3 project-docs pages · 1 vendor release"
      },
      {
        "id": "timoni",
        "name": "Timoni",
        "aliases": [
          "Timoni",
          "timoni"
        ],
        "researchId": "timoni",
        "category": "config",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "Adopt — but engineered for exit.",
        "why": "Timoni is the best-fit config tool for a CUE-first platform: typed modules, OCI-native distribution that lines up exactly with the delivery path, and no in-cluster controller to operate. The risk is equally clear and is a number rather than a feeling — one maintainer holding the overwhelming majority of commits, pre-1.0, with a README that says \"infancy\" out loud. So the adoption is structural rather than enthusiastic: keep schemas as plain CUE importing Timoni's published schemas rather than Timoni-proprietary patterns, and make CI render manifests to YAML and push THAT as the artifact. Clusters then consume YAML, which means cluster reconciliation never depends on Timoni existing. The fallback is not a plan, it is the same pipeline with one step removed.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0010",
              "title": "Timoni, engineered for exit: CI renders, clusters consume YAML",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0010-timoni-engineered-for-exit.md",
              "private": true
            }
          ]
        },
        "counterpoint": "A team that would rather not think about bus factor at all should use Helm and accept the templating. That is a coherent position and this one costs more attention.",
        "blastRadius": "medium",
        "exitPlan": "CI renders, clusters consume YAML. If Timoni stalls, every module stays exportable CUE emitting the same YAML down the same path.",
        "revisitWhen": [
          "a second sustained contributor appears, or the commit ratio moves materially",
          "Timoni reaches 1.0, or the README stops saying infancy",
          "a release cycle passes with no CUE engine bump, which would mean the cadence decoupled"
        ],
        "busFactor": {
          "note": "744 of ~880 commits are the sole maintainer's; the next-largest human contributor has 23. Re-counted across two research passes (744/23 then 811/35), so the ratio is a trend and not a snapshot.",
          "sourceRef": "https://github.com/stefanprodan/timoni"
        },
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0010-timoni-engineered-for-exit.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "4 project-docs pages · 2 vendor releases"
      },
      {
        "id": "gvisor",
        "name": "gVisor for CI isolation",
        "aliases": [
          "gVisor",
          "runsc",
          "Kata Containers",
          "Firecracker"
        ],
        "researchId": "sandboxed-ci-runtimes",
        "category": "k8s",
        "claimType": "verdict",
        "ring": "adopt",
        "verdictLine": "gVisor for the shared CI pool; avoid Kata and Firecracker on EKS.",
        "why": "CI jobs here are internal-but-untrustworthy — repository-supplied code, third-party actions, dependency install scripts — which is precisely gVisor's defense-in-depth sweet spot, and it runs on ordinary instance types. The microVM options would force metal instances and wreck the spot economics for a gain that only matters against actively adversarial tenants. The design accepts one documented deviation from the Bottlerocket-everywhere rule, because gVisor needs a custom Bottlerocket variant nobody should own: one AL2023 NodePool, tainted, with the runtime installed by userdata, and untrusted pipelines pinned to it by RuntimeClass while trusted platform jobs stay on the Bottlerocket spot pool. Pair it with the mechanical controls — no privileged pods, no Docker-in-Docker, egress lockdown on the CI namespace — because a sandbox without those is a sandbox with a door in it.",
        "scope": "for internal-but-untrustworthy CI; a genuinely hostile multi-tenant requirement is the trigger to price metal",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0025",
              "title": "CI isolation: gVisor pool for untrusted jobs",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0025-ci-isolation-gvisor.md",
              "private": true
            }
          ]
        },
        "counterpoint": "gVisor costs real throughput on syscall-heavy jobs, and CI jobs doing heavy filesystem work are syscall-heavy jobs. If your pipelines are I/O-bound this is not free.",
        "blastRadius": "medium",
        "revisitWhen": [
          "a genuinely hostile multi-tenant requirement lands, which is the trigger to price a small metal pool",
          "a Bottlerocket variant ships with the runtime, which deletes the one-pool exception",
          "nested virtualization becomes available on ordinary instance types"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0025-ci-isolation-gvisor.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 7,
        "sourceMix": "6 practitioners · 1 issue thread"
      },
      {
        "id": "capa",
        "name": "Cluster API (CAPA)",
        "aliases": [
          "Cluster API",
          "CAPA",
          "CAPI"
        ],
        "researchId": "capa-vs-crossplane",
        "category": "k8s",
        "claimType": "verdict",
        "ring": "avoid",
        "verdictLine": "Cluster API for an EKS-only fleet is a second control plane for a resource Crossplane already manages.",
        "why": "The three things CAPA earns its complexity for are non-EKS or multi-cloud clusters, CAPI's machine-lifecycle machinery, and ecosystem tools that hard-require CAPI objects. None applies here: the fleet is EKS-only, Karpenter already owns machine lifecycle better than a machine-pool abstraction does, and nothing downstream needs the CRDs. Meanwhile an EKS cluster is just another AWS resource, and a Crossplane composition exposes exactly the self-service API the platform wants — one reconciliation system, one RBAC story, one hub. This is an avoid about fit, and it reverses the moment a genuine multi-cloud requirement appears.",
        "scope": "for an EKS-only fleet with a Crossplane hub already committed",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources",
            "decisions"
          ],
          "decisions": [
            {
              "id": "ADR-0023",
              "title": "Spoke clusters are Crossplane claims; no Cluster API",
              "status": "accepted",
              "date": "2026-07-29",
              "repo": "platform-engineering",
              "path": "docs/adr/0023-spokes-crossplane.md",
              "private": true
            }
          ]
        },
        "counterpoint": "CAPI's reconcile loop is genuinely well specified, and a shop that expects to grow past one cloud is buying the abstraction at the right time rather than the wrong one.",
        "blastRadius": "medium",
        "revisitWhen": [
          "a hard multi-cloud or self-managed-cluster requirement lands",
          "a fleet tool the platform wants hard-requires CAPI objects"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0023-spokes-crossplane.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "3 practitioners · 3 project-docs pages"
      }
    ],
    "watch": [
      {
        "id": "ambient-multicluster",
        "name": "Ambient multicluster",
        "aliases": [
          "ambient multicluster",
          "Istio multicluster"
        ],
        "researchId": "istio-ambient",
        "category": "runtime",
        "claimType": "watch",
        "verdictLine": "Ambient multi-network multicluster is Beta. Sidecar is still the only Stable multicluster mode.",
        "why": "This is the single fact the ambient adoption rests on, and it is the one that could still make that adoption look early. Nothing here is a verdict — the promotion to Stable is either going to happen before this platform needs a federated mesh, or it is not, and which of those is true is a fact about a release train rather than an opinion about a technology.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://istio.io/latest/blog/2026/ambient-multinetwork-multicluster-beta/",
              "title": "Ambient multi-network multicluster reaches Beta",
              "publisher": "Istio",
              "fetched": "2026-07-29",
              "kind": "vendor-announcement"
            }
          ]
        },
        "revisitWhen": [
          "ambient multi-network multicluster is promoted from Beta to Stable",
          "a requirement for a flat federated mesh arrives before that promotion"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 7,
        "sourceMix": "4 vendor releases · 1 practitioner · 1 project-docs page · 1 vendor announcement"
      },
      {
        "id": "cue-central-registry",
        "name": "CUE Central Registry",
        "aliases": [
          "Central Registry",
          "registry.cue.works"
        ],
        "researchId": "cue",
        "category": "config",
        "claimType": "watch",
        "verdictLine": "Still a single-vendor beta: free during beta, authentication required, self-hosting is a \"contact us\".",
        "why": "The registry is where CUE's commercial story lives, which makes its terms a platform question rather than a convenience question. Nothing about the current terms is objectionable; what is unknown is what they become after beta. The posture that survives either answer is to vendor schemas from it into your own registry and never make it a runtime dependency — which is what the CUE adoption already does. This row exists so that when the pricing lands, there is a dated place that said it was coming.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap",
          "personal-oss"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://cue.dev/products/central-registry/",
              "title": "CUE Central Registry — beta terms",
              "publisher": "CUE Labs",
              "fetched": "2026-07-29",
              "kind": "vendor-announcement"
            }
          ]
        },
        "revisitWhen": [
          "Central Registry pricing is announced after beta",
          "self-hosting stops being a contact-us option"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 8,
        "sourceMix": "4 vendor releases · 2 vendor announcements · 1 business source · 1 project-docs page"
      },
      {
        "id": "cuenv",
        "name": "cuenv",
        "aliases": [
          "cuenv"
        ],
        "researchId": "env-and-tasks",
        "category": "config",
        "claimType": "watch",
        "verdictLine": "The tool I would have designed — and 72 stars, AGPL, self-declared breaking churn, and CI codegen for a host I do not use.",
        "why": "A typed environment file carrying variables, secrets, and a cached task DAG, generating CI from the same definitions, is precisely the shape a CUE-first monorepo wants, and cuenv is the only thing that is actually it. Four things stop it being load-bearing substrate today, and none of them is about the design: the size of the community, the licence, its own README warning about breaking changes between releases, and CI generation aimed elsewhere. So it gets a quarterly re-check rather than a verdict. That is a genuinely different thing from a hold, and this row exists to say which one it is.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "personal-oss",
          "commercial-aws"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://github.com/cuenv/cuenv",
              "title": "cuenv — the README's own churn warning",
              "publisher": "cuenv",
              "fetched": "2026-07-29",
              "kind": "project-docs"
            }
          ]
        },
        "revisitWhen": [
          "the release notes stop declaring breaking changes between releases",
          "CI generation covers the host this platform actually runs",
          "the licence or the contributor count changes materially"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 5,
        "sourceMix": "3 project-docs pages · 2 vendor releases"
      },
      {
        "id": "capacity-buffer",
        "name": "Karpenter CapacityBuffer",
        "aliases": [
          "CapacityBuffer",
          "capacity buffer"
        ],
        "researchId": "warm-capacity",
        "category": "k8s",
        "claimType": "watch",
        "verdictLine": "Shipped in Karpenter v1.14.0 in July 2026 and effectively alpha — the right answer to a five-year-old issue, too new to bet a CI SLO on.",
        "why": "Declarative headroom that scales with demand expresses what a warm CI pool actually wants far better than a fixed replica count does, and it consolidates away when idle, which fixed capacity never will. It is also weeks old. So the current design uses static-capacity node pools — which are productized and documented — and layers this in as it stabilizes. Watching, not adopting, and the difference is a quarter or two.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://github.com/aws/karpenter-provider-aws/issues/3240",
              "title": "The overprovisioning issue CapacityBuffer answers",
              "publisher": "aws",
              "fetched": "2026-07-29",
              "kind": "issue-thread"
            }
          ]
        },
        "revisitWhen": [
          "CapacityBuffer graduates past v1beta1",
          "a second Karpenter minor ships without changing its API shape"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "4 project-docs pages · 1 issue thread · 1 vendor release"
      },
      {
        "id": "image-volume",
        "name": "ImageVolume",
        "aliases": [
          "ImageVolume",
          "OCI volume"
        ],
        "researchId": "k8s-core-delta",
        "category": "k8s",
        "claimType": "watch",
        "verdictLine": "Beta since Kubernetes 1.33 and still not GA at 1.36 — promising for shipping config as OCI, not yet a foundation.",
        "why": "Mounting an OCI artifact as a pod volume would collapse a class of config- and model-distribution problems into the registry that already exists, which is why it is worth watching rather than ignoring. Three releases in beta is the fact, and it is a fact about the feature's confidence rather than about its usefulness. Nothing gets built on it until that changes.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://kubernetes.io/blog/2025/04/23/kubernetes-v1-33-release/",
              "title": "Kubernetes v1.33 — ImageVolume to beta",
              "publisher": "Kubernetes",
              "fetched": "2026-07-29",
              "kind": "vendor-release"
            }
          ]
        },
        "revisitWhen": [
          "ImageVolume reaches GA",
          "a config-distribution problem appears that the current OCI path handles badly"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "3 vendor releases · 2 practitioners · 1 vendor announcement"
      },
      {
        "id": "vcluster-tenancy",
        "name": "vCluster as a boundary",
        "aliases": [
          "vCluster",
          "virtual clusters"
        ],
        "researchId": "cluster-sizing",
        "category": "k8s",
        "claimType": "watch",
        "verdictLine": "Excellent for ephemeral environments; its isolation is still namespace-grade at the node level.",
        "why": "The ephemeral-environment case is settled and good — turning a fifteen-minute cluster spin-up into seconds, and keeping CRD-heavy test debris out of real clusters, is worth having. What is not settled is whether a virtual cluster is a production TENANCY boundary, because without per-tenant node pools the isolation at the node level is the same isolation a namespace gives you. That is a claim about a security property, and security properties are the wrong place to be optimistic, so this stays a watch until the isolation story changes or a requirement forces the question.",
        "asOf": "2026-07-29",
        "basis": "researched",
        "context": [
          "commercial-aws",
          "regulated-airgap"
        ],
        "evidence": {
          "rails": [
            "sources"
          ],
          "sources": [
            {
              "url": "https://www.vcluster.com/blog/tenant-isolation-models-kubernetes",
              "title": "The vendor's own tenant-isolation model comparison",
              "publisher": "vCluster",
              "fetched": "2026-07-29",
              "kind": "vendor-announcement"
            }
          ]
        },
        "revisitWhen": [
          "per-tenant node pools become the documented default rather than an add-on",
          "a production tenancy requirement arrives that namespaces genuinely cannot meet"
        ],
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "on": "2026-07-29"
        },
        "movedCount": 0,
        "lastExaminedOn": "2026-07-29",
        "staleDays": 10,
        "decayClass": "fresh",
        "sourceCount": 6,
        "sourceMix": "3 practitioners · 2 vendor announcements · 1 project-docs page"
      }
    ],
    "positions": [
      {
        "id": "engineered-for-exit",
        "title": "CI renders, clusters consume YAML — the exit is the design, not the hedge",
        "statement": "Every tool in a delivery path is a bet on somebody else's attention, and the honest way to take that bet is to make losing it cheap. The shape that does this is boring: the authoring tool runs in CI and produces plain rendered manifests, and the cluster reconciles those manifests. Nothing in the running system knows what produced them. That single property means a maintainer walking away costs you an authoring layer rather than a migration, and it is why the tools this platform adopts with a known bus-factor problem are adoptable at all. An exit plan you would have to build later is a hope; an exit plan that is just how the pipeline already works is a property.",
        "context": [
          "commercial-aws",
          "regulated-airgap",
          "personal-oss"
        ],
        "blipIds": [
          "timoni",
          "cue"
        ],
        "instances": [
          {
            "name": "Timoni",
            "why": "One maintainer, pre-1.0, README-admitted infancy.",
            "replacement": "Render to YAML in CI; the cluster never learns Timoni exists."
          },
          {
            "name": "External Secrets Operator",
            "why": "A 2025 maintainer pause proved this dependency class can stall with no notice.",
            "replacement": "A secrets port compiling to the operator's resources, so the adapter is swappable."
          },
          {
            "name": "EKS Auto Mode",
            "why": "Adopting it would surrender the node-layer control points this design is built on.",
            "replacement": "Kept as a cluster-class flag rather than a fork, so it stays available without being depended on."
          }
        ],
        "sources": [
          {
            "url": "https://timoni.sh/gitops-flux/",
            "title": "Timoni with Flux — render to OCI, reconcile YAML",
            "publisher": "Timoni",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/external-secrets/external-secrets/releases",
            "title": "external-secrets releases — the pause and the recovery",
            "publisher": "external-secrets",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://thenewstack.io/how-maintainer-burnout-is-causing-a-kubernetes-security-disaster/",
            "title": "Maintainer burnout and the dependency class it threatens",
            "publisher": "The New Stack",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/adr/0010-timoni-engineered-for-exit.md"
        },
        "reaffirmed": {
          "on": "2026-08-05",
          "note": "Re-checked at the infrastructure-as-code pass and unchanged — the no-Helm ruling of ADR-0061 is the same principle applied to a different layer: charts are import-time sources, never runtime objects. A re-check that confirms is a data point, and it is not a change of mind.",
          "sourceRef": "platform-engineering/docs/adr/0061-no-helm.md"
        },
        "review": "ratified",
        "ratifiedBy": {
          "repo": "platform-engineering",
          "path": "docs/adr/0010-timoni-engineered-for-exit.md",
          "on": "2026-07-29"
        }
      }
    ],
    "research": {
      "aws-audit-manager": {
        "id": "aws-audit-manager",
        "title": "AWS Audit Manager",
        "state": "Effectively sunset. Per the AWS Service Availability Updates of Mar 31, 2026, Audit Manager entered maintenance mode and is closed to new customers as of Apr 30, 2026: no new accounts or regions can set it up, no organization-wide deployment for single-account users, and no new features, framework updates, or support for new AWS services. Existing per-account, per-region setups keep working, including creating new assessments. AWS's own guidance points customers at partner GRC tools layered on AWS Config, with Security Hub covering posture management.",
        "asOf": "2026-07-29",
        "category": "aws",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "AWS Audit Manager"
        },
        "sources": [
          {
            "url": "https://docs.aws.amazon.com/audit-manager/latest/userguide/audit-manager-availability-change.html",
            "title": "AWS Audit Manager availability change",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2026/03/aws-service-availability",
            "title": "AWS Service Availability Updates, March 2026",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://github.com/hashicorp/terraform-provider-aws/issues/47163",
            "title": "terraform-provider-aws #47163 — Audit Manager maintenance mode",
            "publisher": "hashicorp",
            "fetched": "2026-07-29",
            "kind": "issue-thread"
          },
          {
            "url": "https://kaloscloud.io/blog/aws-audit-manager-alternative-compliance-software",
            "title": "Audit Manager alternatives after the sunset",
            "publisher": "Kalos Cloud",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "AWS published the availability change itself; this is not a read of the tea leaves."
        }
      },
      "backstage": {
        "id": "backstage",
        "title": "Backstage (headless catalog + scaffolder)",
        "state": "Current release v1.52.0 (2026-06-16). Since 2023 both halves were replaced: the New Backend System is now the ONLY backend (legacy support removed in v1.39, the last backend-common remnants deleted by v1.42, scaffolder-backend new-system-only and promoted to 4.0 in v1.51), and the New Frontend System hit 1.0 RC and became the default for newly scaffolded apps around March 2026. Headless consumption is a supported posture: the catalog and scaffolder expose documented REST APIs, and the new alpha ActionsRegistry plus mcp-actions plugin exposes scaffolder actions as MCP tools. TechDocs is architecture-friendly to headless — techdocs-backend serves generated static HTML per entity from object storage — but the polished reader and its add-ons are React components, so headless TechDocs means re-implementing the shell. v1.51 also added an AiResource entity kind and MCP Server as a first-class API type in the catalog model.",
        "asOf": "2026-07-29",
        "category": "runtime",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Backstage (headless catalog + scaffolder)"
        },
        "sources": [
          {
            "url": "https://github.com/backstage/backstage/releases/tag/v1.52.0",
            "title": "Backstage v1.52.0",
            "publisher": "backstage",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://backstage.io/docs/releases/v1.51.0/",
            "title": "Backstage v1.51.0 release notes",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://backstage.io/docs/releases/v1.39.0/",
            "title": "Backstage v1.39.0 — legacy backend removed",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://backstage.io/docs/releases/v1.42.0/",
            "title": "Backstage v1.42.0",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://roadie.io/backstage-weekly/126-new-frontend-system-default-ai-context-idp-architecture/",
            "title": "New Frontend System becomes the default",
            "publisher": "Roadie",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://backstage.io/docs/features/software-templates/api/scaffolder/",
            "title": "Scaffolder REST API",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://backstage.io/docs/features/techdocs/architecture/",
            "title": "TechDocs architecture",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://backstage.io/docs/plugins/new-backend-system/",
            "title": "The new backend system",
            "publisher": "Backstage",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The headless posture was verified against Backstage's own release notes and API docs before it was tried, and then tried."
        }
      },
      "capa-vs-crossplane": {
        "id": "capa-vs-crossplane",
        "title": "Cluster API (CAPA) for an EKS-only fleet vs Crossplane-managed EKS spokes",
        "state": "CAPA remains an active SIG Cluster Lifecycle project in 2026 with EKS support through AWSManagedControlPlane, two bootstrap providers, and machine-pool support; it gives declarative control-plane upgrades with a well-defined reconcile loop. But it is a community project with modest maintainer bandwidth, its centre of gravity is self-managed clusters across many infrastructures, and EKS features historically land there after they land in the EKS API and the Crossplane providers. The 2026 pattern literature for EKS fleets has consolidated around either CAPA with a gitops engine or Crossplane compositions claiming EKS clusters from a hub, and Crossplane's continuous reconciliation gives the same no-drift convergence property CAPI is praised for. Running both means two management control planes fighting over one lifecycle.",
        "asOf": "2026-07-29",
        "category": "k8s",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Cluster API (CAPA) for an EKS-only fleet vs Crossplane-managed EKS spokes"
        },
        "sources": [
          {
            "url": "https://cluster-api-aws.sigs.k8s.io/topics/eks/",
            "title": "Cluster API Provider AWS — EKS support",
            "publisher": "kubernetes-sigs",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/kubernetes-sigs/cluster-api-provider-aws",
            "title": "kubernetes-sigs/cluster-api-provider-aws",
            "publisher": "kubernetes-sigs",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://aws.amazon.com/blogs/containers/part-1-build-multi-cluster-gitops-using-amazon-eks-flux-cd-and-crossplane/",
            "title": "Multi-cluster GitOps with EKS, Flux CD and Crossplane",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://aws.amazon.com/blogs/containers/multi-cluster-management-for-kubernetes-with-cluster-api-and-argo-cd/",
            "title": "Multi-cluster management with Cluster API and Argo CD",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://itnext.io/kubernetes-cluster-management-and-cloud-automation-with-clusterapi-crossplane-and-projectsveltos-a20594be51b5",
            "title": "Cluster management with ClusterAPI, Crossplane and Sveltos",
            "publisher": "ITNEXT",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://www.eksworkshop.com/docs/automation/controlplanes/crossplane/",
            "title": "EKS Workshop — Crossplane control planes",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high"
        }
      },
      "cluster-sizing": {
        "id": "cluster-sizing",
        "title": "Cluster sizing: etcd/scale limits, few-big-vs-many-small, and virtual clusters",
        "state": "Scale ceilings moved dramatically: in July 2025 AWS announced EKS support for 100,000 nodes per cluster, achieved by offloading etcd's consensus to an internal multi-AZ journal and partitioning storage. Standard clusters still live within classic etcd envelope thinking, but EKS's managed control plane means etcd capacity is no longer the binding constraint for any cluster this platform will run — blast radius, upgrade risk, noisy-neighbour API-server load and tenancy boundaries are. On virtual clusters, vCluster is the dominant 2026 implementation: tenant clusters with their own API server running as pods in a host namespace, marketed on large control-plane cost reduction and instant self-service environments. The 2026 practitioner literature is full of \"we collapsed thirty clusters into a few hosts plus virtual clusters\" migrations, and both vCluster and the hosted-control-plane alternative are production-credible, with vCluster clearly ahead for ephemeral use.",
        "asOf": "2026-07-29",
        "category": "k8s",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Cluster sizing: etcd/scale limits, few-big-vs-many-small, and virtual clusters"
        },
        "sources": [
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2025/07/amazon-eks-100000-worker-nodes-per-cluster/",
            "title": "EKS supports 100,000 worker nodes per cluster",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://aws.amazon.com/blogs/containers/under-the-hood-amazon-eks-ultra-scale-clusters/",
            "title": "Under the hood: EKS ultra-scale clusters",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://www.vcluster.com/blog/tenant-isolation-models-kubernetes",
            "title": "Tenant isolation models in Kubernetes",
            "publisher": "vCluster",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://github.com/loft-sh/vcluster",
            "title": "loft-sh/vcluster",
            "publisher": "loft-sh",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://thenewstack.io/virtual-clusters-kubernetes-cost-isolation/",
            "title": "Virtual clusters, cost and isolation",
            "publisher": "The New Stack",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://www.hams.tech/blog/kubernetes-multi-tenancy-2026-vcluster-eks-sprawl.html",
            "title": "Kubernetes multi-tenancy in 2026",
            "publisher": "hams.tech",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The scale ceiling is an AWS announcement with an engineering write-up behind it; the tenancy claim is the vendor's own and is labelled as such."
        }
      },
      "cue": {
        "id": "cue",
        "title": "CUE (cue-lang/cue) + Central Registry",
        "state": "Latest stable v0.17.1 (2026-07-16), following v0.17.0 and v0.16.0 — a steady three to four minor releases a year, still pre-1.0. What changed since 2023: the new evaluator became the DEFAULT in v0.13.0 after more than a year behind a flag, bringing large performance wins (v0.14.0 brought up to 10x wall-time and up to 80% memory reductions on large configs); modules are real now, with OCI-registry-backed dependency management, a language-version compatibility mechanism, and local and remote module replacement; v0.14 added an error builtin and initial Kubernetes CRD import. Corporate backing changed materially: CUE Labs, founded by the language's creator, emerged from stealth with $10M from Sequoia and OSS Capital, commercializing through the Central Registry and a configuration control plane. The Central Registry is still BETA — free during beta, authentication required — and self-hosting it is a \"contact us\" option. Custom private OCI registries are fully supported by the CLI.",
        "asOf": "2026-07-29",
        "category": "config",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "CUE (cue-lang/cue) + Central Registry"
        },
        "sources": [
          {
            "url": "https://github.com/cue-lang/cue/releases",
            "title": "cue-lang/cue releases",
            "publisher": "cue-lang",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/cue-lang/cue/releases/tag/v0.17.0",
            "title": "CUE v0.17.0",
            "publisher": "cue-lang",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/cue-lang/cue/releases/tag/v0.13.0",
            "title": "CUE v0.13.0 — evalv3 becomes the default",
            "publisher": "cue-lang",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/cue-lang/cue/releases/tag/v0.14.0",
            "title": "CUE v0.14.0 — performance",
            "publisher": "cue-lang",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://cue.dev/products/central-registry/",
            "title": "CUE Central Registry",
            "publisher": "CUE Labs",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://cue.dev/blog/announcing-cue-labs/",
            "title": "Announcing CUE Labs",
            "publisher": "CUE Labs",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://www.prnewswire.com/news-releases/sequoia-backed-cue-labs-the-company-behind-widely-adopted-cue-open-source-project-emerges-from-stealth-to-tackle-multi-billion-dollar-configuration-challenge-302599632.html",
            "title": "Sequoia-backed CUE Labs emerges from stealth",
            "publisher": "PR Newswire",
            "fetched": "2026-07-29",
            "kind": "business"
          },
          {
            "url": "https://cuelang.org/docs/tutorial/working-with-a-custom-module-registry/",
            "title": "Working with a custom module registry",
            "publisher": "CUE",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The funding and the evaluator history are both matters of public record with dates on them."
        }
      },
      "eks-auto-mode": {
        "id": "eks-auto-mode",
        "title": "EKS Auto Mode",
        "state": "GA Dec 1, 2024; by 2026 it is mature and broadly available, including AWS GovCloud (US) since Oct 2025 with FIPS-validated AMIs. It is EKS running a managed Karpenter-style provisioner plus baked-in dataplane (VPC CNI, EBS CSI, ALB controller, CoreDNS, Pod Identity agent, node monitoring) as host processes on AWS-managed, Bottlerocket-only, locked-down nodes (no SSH, no custom AMIs, auto-rotated nodes, ~21-day max lifetime). You may add custom NodePools/NodeClasses, but the NodeClass is AWS's own API (not EC2NodeClass), the built-in NodePools shouldn't be edited, and you cannot run your own Karpenter alongside it for the same capacity. Pricing: a per-instance management fee billed per-second on top of EC2 — e.g. m5a.xlarge $0.02064/hr, c6a.2xlarge $0.03672/hr — roughly 10-12% of the on-demand price, charged even on spot capacity.",
        "asOf": "2026-07-29",
        "category": "aws",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "EKS Auto Mode"
        },
        "sources": [
          {
            "url": "https://docs.aws.amazon.com/eks/latest/userguide/automode.html",
            "title": "EKS Auto Mode — user guide",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://aws.amazon.com/eks/pricing/",
            "title": "Amazon EKS pricing",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2024/12/amazon-eks-auto-mode/",
            "title": "Announcing Amazon EKS Auto Mode",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-eks-auto-mode-aws-govcloud-us-east-west",
            "title": "EKS Auto Mode in AWS GovCloud (US)",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://alexandre-vazquez.com/eks-auto-mode/",
            "title": "EKS Auto Mode, in practice",
            "publisher": "Alexandre Vazquez",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://docs.aws.amazon.com/eks/latest/userguide/create-node-pool.html",
            "title": "Create a node pool for EKS Auto Mode",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "AWS's own pricing and docs pages, plus the GovCloud availability announcement — the per-instance management fee is published, not estimated."
        }
      },
      "eks-pod-identity": {
        "id": "eks-pod-identity",
        "title": "EKS Pod Identity vs IRSA",
        "state": "Pod Identity (GA Nov 2023) is now the AWS-preferred default and the gaps that kept IRSA alive have mostly closed: cross-account access shipped Jun 2025 with a target-account role ARN directly on the association and built-in role chaining; EKS add-ons accept podIdentityAssociations directly on CreateAddon/UpdateAddon, so the old \"managed add-ons are IRSA-only\" caveat is dead (GovCloud got this Feb 2026); ABAC via session tags works with IAM condition keys; there is no per-cluster OIDC provider, no trust-policy size blowups, and roles are portable across clusters. Remaining IRSA-only cases: Fargate pods, because the Pod Identity agent is a DaemonSet and Fargate cannot run DaemonSets — containers-roadmap #2274 is still open; anything that is not an EKS cluster, since the EKS Auth API is EKS-only; and very old AWS SDKs that predate container-credentials-provider support.",
        "asOf": "2026-07-29",
        "category": "aws",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "EKS Pod Identity vs IRSA"
        },
        "sources": [
          {
            "url": "https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html",
            "title": "EKS Pod Identity — user guide",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-eks-pod-identity-cross-account-access",
            "title": "EKS Pod Identity cross-account access",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://aws.amazon.com/blogs/containers/simplifying-iam-permissions-for-amazon-eks-addons-with-eks-pod-identity/",
            "title": "Simplifying IAM permissions for EKS add-ons with Pod Identity",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2026/02/amazon-eks-simplifies-iam-permissions-eks-addons",
            "title": "EKS simplifies IAM permissions for add-ons",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://github.com/aws/containers-roadmap/issues/2274",
            "title": "containers-roadmap #2274 — Pod Identity on Fargate",
            "publisher": "aws",
            "fetched": "2026-07-29",
            "kind": "issue-thread"
          },
          {
            "url": "https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-eks-pod-identity-aws-govcloud-us-regions",
            "title": "EKS Pod Identity in AWS GovCloud (US)",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The one remaining exception is an AWS roadmap issue that is still open — a checkable fact, not a hunch."
        }
      },
      "env-and-tasks": {
        "id": "env-and-tasks",
        "title": "go-task vs cuenv vs devbox (+ devcontainer spec) — env \u0026 task management",
        "state": "go-task is boringly healthy on a monthly-ish cadence, with recent work on secret masking and source fingerprinting; remote Taskfiles are the least-settled feature. cuenv is the exact philosophical fit — a single typed environment file for variables, secrets resolved at runtime, tasks with a DAG and caching, and CI workflow GENERATION from task definitions, implemented in Rust with a bridge to the real CUE evaluator, and actively developed. It is also 72 stars, AGPL-3.0, with a README that declares rapid iteration and breaking changes between releases, and its CI codegen targets a different host than this platform uses. devbox is very active, Nix-backed reproducible toolchains with a JSON interface. The devcontainer spec is infrastructure now rather than a bet.",
        "asOf": "2026-07-29",
        "category": "config",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "go-task vs cuenv vs devbox"
        },
        "sources": [
          {
            "url": "https://github.com/go-task/task/releases/tag/v3.52.0",
            "title": "go-task v3.52.0",
            "publisher": "go-task",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/cuenv/cuenv",
            "title": "cuenv/cuenv",
            "publisher": "cuenv",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/jetify-com/devbox/releases",
            "title": "devbox releases",
            "publisher": "jetify-com",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/devcontainers/spec",
            "title": "devcontainers/spec",
            "publisher": "devcontainers",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://taskfile.dev/",
            "title": "Taskfile",
            "publisher": "go-task",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high"
        }
      },
      "istio-ambient": {
        "id": "istio-ambient",
        "title": "Istio — ambient mode",
        "state": "Latest stable is 1.30.3 (2026-07-16); supported lines are 1.28, 1.29 and 1.30. Ambient — ztunnel at L4 with opt-in waypoints at L7 — has been GA since 1.24 in November 2024. The gap that mattered, multi-cluster, closed fast: 1.27 shipped ambient multicluster in Alpha, 1.28 let waypoints route to remote networks, and 1.29 promoted ambient multi-network multicluster to Beta with DNS capture on by default. Sidecar multicluster remains the only Stable multicluster mode. Benchmarks consistently show around 70% memory savings for ambient over sidecar, and ambient's L4-mTLS-for-free model fits fleets where most services never need L7 policy.",
        "asOf": "2026-07-29",
        "category": "runtime",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Istio — ambient mode"
        },
        "sources": [
          {
            "url": "https://istio.io/latest/news/releases/1.27.x/announcing-1.27/",
            "title": "Announcing Istio 1.27",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://istio.io/latest/news/releases/1.28.x/announcing-1.28/",
            "title": "Announcing Istio 1.28",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://istio.io/latest/news/releases/1.29.x/announcing-1.29/",
            "title": "Announcing Istio 1.29",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://istio.io/latest/blog/2026/ambient-multinetwork-multicluster-beta/",
            "title": "Ambient multi-network multicluster reaches Beta",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://istio.io/latest/blog/2025/roadmap/",
            "title": "The Istio roadmap",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://istio.io/latest/news/",
            "title": "Istio release news",
            "publisher": "Istio",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://oneuptime.com/blog/post/2026-02-24-how-to-compare-istio-sidecar-mode-vs-ambient-mode/view",
            "title": "Istio sidecar vs ambient, compared",
            "publisher": "OneUptime",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high"
        }
      },
      "k8s-core-delta": {
        "id": "k8s-core-delta",
        "title": "Kubernetes core: what changed since ~1.27",
        "state": "Upstream latest is v1.36 (April 2026). The delta an architect frozen at 1.27 is missing, in the parts that bear on this platform: sidecar containers went GA in 1.33, ending the proxy-and-job-never-completes hacks; in-place pod resize went GA in 1.35 including memory-limit decreases, so right-sizing without restarts is real; ValidatingAdmissionPolicy GA'd in 1.30 and MutatingAdmissionPolicy in 1.36, which together shrink webhook territory to what CEL cannot express; structured authentication config GA'd in 1.34; Dynamic Resource Allocation GA'd in 1.34. And two that have NOT arrived: ImageVolume — an OCI image or artifact mounted as a pod volume — has been beta since 1.33 and is still not GA as of 1.36, and JobSet remains an out-of-tree API aimed at distributed ML rather than at CI.",
        "asOf": "2026-07-29",
        "category": "k8s",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Kubernetes core: what changed since ~1.27"
        },
        "sources": [
          {
            "url": "https://kubernetes.io/blog/2025/04/23/kubernetes-v1-33-release/",
            "title": "Kubernetes v1.33 release",
            "publisher": "Kubernetes",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga",
            "title": "In-place pod resize goes GA in v1.35",
            "publisher": "Kubernetes",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://www.infoq.com/news/2026/05/kubernetes-1-36-released/",
            "title": "Kubernetes 1.36 released",
            "publisher": "InfoQ",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://cloudsmith.com/blog/kubernetes-1-34-what-you-need-to-know",
            "title": "Kubernetes 1.34 — what you need to know",
            "publisher": "Cloudsmith",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://kubernetes.io/blog/2026/04/21/gateway-api-v1-5/",
            "title": "Gateway API v1.5",
            "publisher": "Kubernetes",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://kubernetes.io/blog/2025/03/23/introducing-jobset/",
            "title": "Introducing JobSet",
            "publisher": "Kubernetes",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "Every promotion below is a release announcement with a version and a date."
        }
      },
      "karpenter": {
        "id": "karpenter",
        "title": "Karpenter",
        "state": "Latest is v1.14.0 (core kubernetes-sigs/karpenter and aws/karpenter-provider-aws, released Jul 11, 2026), with active patch trains maintained back to v1.5.8. The v1 API (NodePool, EC2NodeClass, NodeClaim) has been stable since v1.0 (Aug 2024) and additive-only since. What changed 2024 to 2026: v1.6 turned native ODCR capacity-reservation support on by default (breaking if you used open ODCRs without capacityReservationSelectorTerms); v1.8 added static capacity; v1.9 split the controller IAM policy into five attached policies; v1.10 requires updated EventBridge rules for ODCR interruption warnings; v1.12 added drift-on-CA-bundle-change and a new required ec2:DescribeInstanceStatus permission; v1.14 graduated Capacity Buffers to v1beta1, added DRA support and a Balanced consolidation policy. Bottlerocket is first-class — the amiSelectorTerms alias bottlerocket@1.x.y gives exact AMI-version pinning. Spot interruption handling STILL requires the SQS queue plus EventBridge rules wiring; without it Karpenter only notices spot loss after the node vanishes.",
        "asOf": "2026-07-29",
        "category": "aws",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Karpenter"
        },
        "sources": [
          {
            "url": "https://karpenter.sh/docs/upgrading/upgrade-guide/",
            "title": "Karpenter upgrade guide",
            "publisher": "karpenter.sh",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/aws/karpenter-provider-aws/releases",
            "title": "karpenter-provider-aws releases",
            "publisher": "aws",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/aws/karpenter-provider-aws/releases/tag/v1.14.0",
            "title": "karpenter-provider-aws v1.14.0",
            "publisher": "aws",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://karpenter.sh/docs/concepts/disruption/",
            "title": "Karpenter disruption and consolidation",
            "publisher": "karpenter.sh",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://aws.github.io/aws-eks-best-practices/karpenter/",
            "title": "EKS best practices — Karpenter",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "Every version claim below is a release note or an upgrade-guide entry, not a recollection."
        }
      },
      "kyverno-cel": {
        "id": "kyverno-cel",
        "title": "Kyverno + policy-reporter vs ValidatingAdmissionPolicy (CEL)",
        "state": "Kyverno 1.16 landed 2025-11-10, then 1.17 in February 2026 — and 1.17 is the watershed: the CEL-based policy engine went GA as dedicated CRDs aligned with upstream VAP/MAP semantics, and the JMESPath ClusterPolicy plus CleanupPolicy are officially deprecated with removal targeted for v1.20 in October 2026. Kubernetes-native ValidatingAdmissionPolicy (CEL, in-tree) has been GA since 1.30 and is fully mainstream, and Kyverno can generate VAPs from its own policies. On reporting: policy-reporter v3 is a Kyverno sub-project providing UI, metrics and alerting, and Kyverno 1.15+ can emit reports via the new openreports.io API — though policy-reporter's coverage of native-VAP results is still an open gap.",
        "asOf": "2026-07-29",
        "category": "runtime",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Kyverno + policy-reporter vs ValidatingAdmissionPolicy (CEL)"
        },
        "sources": [
          {
            "url": "https://kyverno.io/blog/2026/02/02/announcing-kyverno-release-1.17/",
            "title": "Announcing Kyverno 1.17",
            "publisher": "Kyverno",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://www.cncf.io/blog/2026/02/18/announcing-kyverno-1-17/",
            "title": "CNCF: announcing Kyverno 1.17",
            "publisher": "CNCF",
            "fetched": "2026-07-29",
            "kind": "vendor-announcement"
          },
          {
            "url": "https://kyverno.io/blog/2025/11/10/announcing-kyverno-release-1.16/",
            "title": "Announcing Kyverno 1.16",
            "publisher": "Kyverno",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://kyverno.io/docs/policy-types/validating-policy/",
            "title": "Kyverno ValidatingPolicy (CEL)",
            "publisher": "Kyverno",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://main.kyverno.io/docs/policy-reports/openreports/",
            "title": "Kyverno policy reports via openreports",
            "publisher": "Kyverno",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/kyverno/policy-reporter",
            "title": "kyverno/policy-reporter",
            "publisher": "kyverno",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/kyverno/policy-reporter/issues/1230",
            "title": "policy-reporter #1230 — native VAP results",
            "publisher": "kyverno",
            "fetched": "2026-07-29",
            "kind": "issue-thread"
          },
          {
            "url": "https://www.dedico.hu/en/posts/kyverno-cel-policies-v1/",
            "title": "Writing Kyverno CEL policies",
            "publisher": "Dedico",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The deprecation and its removal target are in Kyverno's own 1.17 announcement."
        }
      },
      "renovate-vs-dependabot": {
        "id": "renovate-vs-dependabot",
        "title": "Renovate vs Dependabot for this stack (timoni modules, helm, go, cue)",
        "state": "Renovate is on v43.x with multiple releases a day and 126 managers as of July 2026. Coverage relevant here, verified against the manager source tree: a flux manager that updates OCIRepository and HelmRelease tags AND digests, the helm family, and a mature gomod. There is NO timoni manager and NO CUE-parsing manager — confirmed by zero timoni hits in the repository and no cue manager in the modules directory. The supported pattern for Timoni bundles is a custom regex manager matching the OCI url plus version fields with the docker datasource, which resolves fine because Timoni modules are plain OCI artifacts. Renovate runs first-class against self-hosted GitLab. Dependabot has no flux support, no timoni, no CUE, no OCI-artifact awareness, and on self-managed GitLab needs a third-party port anyway.",
        "asOf": "2026-07-29",
        "category": "config",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Renovate vs Dependabot for this stack (timoni modules, helm, go, cue)"
        },
        "sources": [
          {
            "url": "https://github.com/renovatebot/renovate/releases",
            "title": "Renovate releases",
            "publisher": "renovatebot",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://docs.renovatebot.com/modules/manager/flux/",
            "title": "Renovate flux manager",
            "publisher": "Renovate",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://docs.renovatebot.com/modules/manager/",
            "title": "Renovate managers",
            "publisher": "Renovate",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/renovatebot/renovate/tree/main/lib/modules/manager",
            "title": "renovate/lib/modules/manager — the manager source tree",
            "publisher": "renovatebot",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "Manager coverage was verified against Renovate's own manager source tree, not against its marketing."
        }
      },
      "sandboxed-ci-runtimes": {
        "id": "sandboxed-ci-runtimes",
        "title": "gVisor / Kata / Firecracker for untrusted CI on EKS",
        "state": "The 2026 constraint set on EKS is unchanged in physics but much better documented. Kata Containers and Firecracker need KVM, and standard virtualized EC2 instances do not expose nested virtualization — so on EKS they require metal instances: expensive, chunky capacity units, awkward with spot and Karpenter. gVisor runs on any instance type, intercepts syscalls in userspace for a drastically reduced host-kernel attack surface, and integrates through a containerd runtime handler plus a RuntimeClass; a June 2026 AWS-authored walkthrough shows the now-standard pattern of a dedicated Karpenter NodePool whose userdata installs the runtime. Critical catch for this platform: gVisor does NOT run on Bottlerocket without building a custom variant, so the sandboxed pool must be AL2023. GitLab Runner's Kubernetes executor supports runtime_class_name, so job pods can be pinned per runner. gVisor's known costs are syscall-heavy workload overhead and occasional compatibility gaps.",
        "asOf": "2026-07-29",
        "category": "k8s",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "gVisor / Kata / Firecracker for untrusted CI on EKS"
        },
        "sources": [
          {
            "url": "https://medium.com/@jicowan/running-gvisor-on-eks-with-karpenter-39e8d914e1c3",
            "title": "Running gVisor on EKS with Karpenter",
            "publisher": "Jeremy Cowan (AWS)",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://northflank.com/blog/kata-containers-vs-firecracker-vs-gvisor",
            "title": "Kata vs Firecracker vs gVisor",
            "publisher": "Northflank",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://www.verygoodsecurity.com/blog/posts/secure-compute-part-2",
            "title": "Secure compute, part 2",
            "publisher": "Very Good Security",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://gitlab.com/gitlab-org/gitlab-runner/-/work_items/26646",
            "title": "GitLab Runner runtime_class_name support",
            "publisher": "GitLab",
            "fetched": "2026-07-29",
            "kind": "issue-thread"
          },
          {
            "url": "https://www.systemshardening.com/articles/kubernetes/runtimeclass-gvisor-kata/",
            "title": "RuntimeClass with gVisor and Kata",
            "publisher": "Systems Hardening",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://builder.aws.com/content/3ADDWTtyI2gevtzY9d2vzULAxzS/secure-agent-sandboxes-on-eks",
            "title": "Secure agent sandboxes on EKS",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          },
          {
            "url": "https://edera.dev/stories/kata-vs-firecracker-vs-gvisor-isolation-compared",
            "title": "Kata vs Firecracker vs gVisor — isolation compared",
            "publisher": "Edera",
            "fetched": "2026-07-29",
            "kind": "practitioner"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The nested-virtualization constraint is physics on Nitro, not a preference."
        }
      },
      "timoni": {
        "id": "timoni",
        "title": "Timoni",
        "state": "Latest v0.27.1 (2026-07-23); v0.27.0 bumped the embedded CUE engine to v0.17, added direct rendered-manifest export, and exposed the Bundle, Runtime and Instance schemas for external tooling. Cadence over eighteen months is roughly four to five releases a year, each mostly tracking CUE engine bumps plus incremental features. It IS still one person: 744 of about 880 commits are his, and the next-largest human contributor has 23. Around 2.0k stars, 45 open issues, actively pushed, funded through GitHub Sponsors — no CNCF donation and no company behind it. The README still carries the warning that Timoni is under active development and still in its infancy. Production adoption is real but niche. Architecturally it is a CLI with no controller, which keeps the blast radius small.",
        "asOf": "2026-07-29",
        "category": "config",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Timoni"
        },
        "sources": [
          {
            "url": "https://github.com/stefanprodan/timoni/releases",
            "title": "timoni releases",
            "publisher": "stefanprodan",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/stefanprodan/timoni/releases/tag/v0.27.0",
            "title": "Timoni v0.27.0",
            "publisher": "stefanprodan",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/stefanprodan/timoni",
            "title": "stefanprodan/timoni",
            "publisher": "stefanprodan",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://timoni.sh/gitops-flux/",
            "title": "Timoni with Flux GitOps",
            "publisher": "Timoni",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://timoni.sh/flux-aio/",
            "title": "flux-aio — Timoni's Flux distribution",
            "publisher": "Timoni",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://timoni.sh/cue/module/publishing/",
            "title": "Publishing Timoni modules to OCI",
            "publisher": "Timoni",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The bus-factor figure is a commit count, re-counted across two research passes rather than asserted once."
        }
      },
      "warm-capacity": {
        "id": "warm-capacity",
        "title": "Warm capacity for CI on Karpenter (static capacity, CapacityBuffer, pause pods)",
        "state": "Two first-class mechanisms now exist where only the pause-pod hack existed in 2023. Static capacity: a NodePool grew a replicas field, shipped behind a feature gate in the v1.8.x line, maintaining N nodes regardless of pod demand with one-for-one replacement on drift and no consolidation; it is documented as GA behaviour in Auto Mode's static capacity node pools. CapacityBuffer: Karpenter v1.14.0, July 2026, added support for the SIG-Autoscaling Buffer API — declarative headroom that Karpenter's scheduling and consolidation understand, making Karpenter the second implementation after Cluster Autoscaler. It is brand new, with commits from May to July 2026, and effectively alpha. Placeholder low-priority pause pods remain the widely documented, battle-tested overprovisioning pattern, and the long-lived provider issue asking for native overprovisioning is what CapacityBuffer finally answers.",
        "asOf": "2026-07-29",
        "category": "k8s",
        "origin": {
          "repo": "platform-engineering",
          "path": "docs/research/tech-radar-2026-07.md",
          "heading": "Warm capacity for CI on Karpenter"
        },
        "sources": [
          {
            "url": "https://github.com/kubernetes-sigs/karpenter/blob/main/designs/static-capacity.md",
            "title": "Karpenter static capacity design",
            "publisher": "kubernetes-sigs",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://docs.aws.amazon.com/eks/latest/userguide/auto-static-capacity.html",
            "title": "Static capacity node pools in EKS Auto Mode",
            "publisher": "AWS",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/kubernetes-sigs/karpenter/releases",
            "title": "kubernetes-sigs/karpenter releases",
            "publisher": "kubernetes-sigs",
            "fetched": "2026-07-29",
            "kind": "vendor-release"
          },
          {
            "url": "https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/proposals/buffers.md",
            "title": "The SIG-Autoscaling Buffer API proposal",
            "publisher": "kubernetes",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          },
          {
            "url": "https://github.com/aws/karpenter-provider-aws/issues/3240",
            "title": "karpenter-provider-aws #3240 — native overprovisioning",
            "publisher": "aws",
            "fetched": "2026-07-29",
            "kind": "issue-thread"
          },
          {
            "url": "https://karpenter.sh/docs/concepts/nodepools/",
            "title": "Karpenter NodePools",
            "publisher": "karpenter.sh",
            "fetched": "2026-07-29",
            "kind": "project-docs"
          }
        ],
        "confidence": {
          "level": "high",
          "why": "The CapacityBuffer commits and the release that carries them are both dated and public."
        }
      }
    },
    "moves": [
      {
        "id": "backstage-2",
        "blipId": "backstage",
        "blipName": "Backstage",
        "title": "Backstage · TRIAL → AVOID",
        "status": "superseded",
        "date": "2026-07-30",
        "tags": [
          "reversal",
          "sourced"
        ],
        "context": [
          "The experiment returned, and no single item in the ledger decided it. Docs, search, permissions and catalog ingestion each left for their own reason, and what was left was scaffolder task state plus a catalog store with an HTTP API — both of which other decisions had already deleted. The decisive one is that the plugin ecosystem is Backstage's actual product and is reachable only through the React frontend this design deliberately did not deploy as the user surface."
        ],
        "decision": null,
        "consequences": [
          {
            "label": "ADR-0059",
            "text": "The Backstage verdict: the ports were the product, the engine was optional",
            "tone": "positive"
          }
        ],
        "from": "trial",
        "to": "avoid",
        "kind": "reversal",
        "stance": "sourced",
        "lifespanDays": 1,
        "decisionLabel": "ADR-0059 · The Backstage verdict: the ports were the product, the engine was optional",
        "decisionOpen": false
      }
    ],
    "blipsByRoleId": {},
    "blipsByProjectId": {
      "agentic-kit": [
        "cue"
      ],
      "app-kit": [
        "cue"
      ],
      "cue-wasm": [
        "cue"
      ],
      "eks-blueprint": [
        "karpenter",
        "kyverno-cel"
      ],
      "f1n": [
        "cue"
      ],
      "fathom": [
        "cue"
      ],
      "geoffmiller-cloud": [
        "cue"
      ]
    },
    "blipsByArticleId": {
      "cue-for-agentic-engineering": [
        "cue"
      ]
    },
    "blipByAlias": {
      "ambient mesh": "istio-ambient",
      "ambient multicluster": "ambient-multicluster",
      "audit manager": "aws-audit-manager",
      "auto mode": "eks-auto-mode",
      "aws audit manager": "aws-audit-manager",
      "backstage": "backstage",
      "capa": "capa",
      "capacity buffer": "capacity-buffer",
      "capacitybuffer": "capacity-buffer",
      "capi": "capa",
      "central registry": "cue-central-registry",
      "cluster api": "capa",
      "cluster api (capa)": "capa",
      "cue": "cue",
      "cue central registry": "cue-central-registry",
      "cuelang": "cue",
      "cuenv": "cuenv",
      "dependabot": "renovate-not-dependabot",
      "eks auto mode": "eks-auto-mode",
      "eks automode": "eks-auto-mode",
      "eks pod identity": "eks-pod-identity",
      "firecracker": "gvisor",
      "gvisor": "gvisor",
      "gvisor for ci isolation": "gvisor",
      "imagevolume": "image-volume",
      "irsa": "eks-pod-identity",
      "istio": "istio-ambient",
      "istio ambient": "istio-ambient",
      "istio multicluster": "ambient-multicluster",
      "karpenter": "karpenter",
      "karpenter capacitybuffer": "capacity-buffer",
      "kata containers": "gvisor",
      "kyverno": "kyverno-cel",
      "kyverno (cel types only)": "kyverno-cel",
      "oci volume": "image-volume",
      "pod identity": "eks-pod-identity",
      "registry.cue.works": "cue-central-registry",
      "renovate": "renovate-not-dependabot",
      "renovate, not dependabot": "renovate-not-dependabot",
      "runsc": "gvisor",
      "timoni": "timoni",
      "validatingadmissionpolicy": "kyverno-cel",
      "vap": "kyverno-cel",
      "vcluster": "vcluster-tenancy",
      "vcluster as a boundary": "vcluster-tenancy",
      "virtual clusters": "vcluster-tenancy",
      "ztunnel": "istio-ambient"
    }
  };
})();
