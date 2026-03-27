# Growth Plan — systeminternals.dev → $3,500/day

## Current State (March 26, 2026)
- 117 pages, 25+ systems, 400 unique visitors/day
- Revenue: $0 (AdSense prepped but not verified/live)
- SEO: sitemap + robots.txt just added, structured data added, canonical URLs added

## Revenue Math
$3,500/day = $105k/month. At 400 visitors/day this is impossible with ads alone.

### Revenue Streams (parallel)
| Stream | $/day target | Requirement |
|--------|-------------|-------------|
| AdSense/Mediavine | $50-200 | 10k+ daily visitors (Mediavine requires 50k sessions/mo) |
| Sponsorships | $500-1000 | 5-10 sponsors at $3-6k/mo (DB vendors, cloud providers) |
| Premium course | $1500-2000 | "System Design Interview" course at $99-199, 10-15 sales/day |
| Affiliate | $200-500 | Cloud credits, DB-as-a-service referrals |
| Team licenses | $500-800 | Enterprise/team access to full interactive suite |

## Phase 1: Traffic 10x (400 → 4,000/day) — Weeks 1-4
1. **System Design Interview section** — HIGHEST priority, massive search volume
   - "Design a URL Shortener" with interactive capacity planning
   - "Design a Chat System" with message queue visualization
   - "Design a Rate Limiter" with token bucket/sliding window sim
   - "Design a Distributed Cache" with consistent hashing viz
2. **Kubernetes deep-dives** — huge search volume, only 3 pages now
   - Service mesh / Istio internals
   - RBAC & admission controllers
   - Custom Resource Definitions / Operator pattern
   - HPA/VPA autoscaling
3. **Linux kernel** — only 2 pages, should have 10+
   - Process scheduling (CFS)
   - Networking stack (TCP/IP)
   - Filesystem internals (ext4, io_uring)
   - cgroups & namespaces (container foundation)
   - eBPF
4. **LLM/AI infra** — trending, only 3 pages
   - Distributed training (data/model/pipeline parallelism)
   - GPU memory management
   - vLLM / inference serving
   - RAG architecture

## Phase 2: Monetize (Weeks 2-6)
1. **Activate AdSense** — verify site, place ad units (sidebar + in-content)
2. **Launch sponsor outreach** — PingCAP, Confluent, Redis Inc, CockroachDB, Timescale
3. **Build premium course** — "System Design Interviews: The Interactive Way"
   - 20 problems, each with interactive visualization
   - $99 individual / $499 team
   - Gumroad or Lemon Squeezy for payments
4. **Affiliate programs** — sign up for cloud provider programs

## Phase 3: Scale (Weeks 6-12)
- Target 20k+ daily visitors
- Apply for Mediavine (higher RPM than AdSense)
- Launch team/enterprise tier
- Newsletter with sponsored slots
- YouTube channel with viz screen recordings

## SEO Quick Wins (DONE / TODO)
- [x] Sitemap generated (@astrojs/sitemap)
- [x] robots.txt with sitemap reference
- [x] Canonical URLs on all pages
- [x] Open Graph meta tags
- [x] JSON-LD structured data
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add og:image per page (social sharing screenshots)
- [ ] Internal linking between related pages
- [ ] "Related topics" component at bottom of each page

## Content Priority Queue (by search volume impact)
1. System Design Interview problems (NEW section)
2. Kubernetes (expand from 3 → 10 pages)
3. Linux kernel (expand from 2 → 8 pages)
4. LLM/AI infrastructure (expand from 3 → 8 pages)
5. Docker (expand from 3 → 6 pages)
6. AWS internals (S3, Lambda, ECS) — NEW section
7. Networking (TCP, HTTP/2, QUIC, WebSocket) — NEW section
