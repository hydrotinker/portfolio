import { defineStore } from "pinia";
import type { Project } from "~/types/components";

export const useProjectsStore = defineStore("projects", () => {
    const projects = ref<Project[]>([
        {
            code: "PRJ_GID",
            name: "Get Isekai'd",
            tag: "product",
            status: "In progress",
            blurb: "Collaborative self-development platform for ADHD people and students.",
            stack: ["Laravel", "Nuxt", "webRTC", "Websockets"],
            metric: ["JUNE 2026", "Open Beta"],
            year: "2026",
            live: true,
            detail: {
                subtitle:
                    "Collaborative self-development platform for ADHD people and students.",
                role: "Solo — design, architecture, full build",
                milestones: [
                    {
                        name: "Development start",
                        date: new Date(2026, 2, 8),
                    },
                    {
                        name: "Internal Testing",
                        date: new Date(2026, 2, 16),
                    },
                    {
                        name: "Closed Beta #1",
                        date: new Date(2026, 2, 31),
                    },
                    {
                        name: "Closed Beta #2",
                        date: new Date(2026, 4, 16),
                    },
                    {
                        name: "Open Beta",
                        date: new Date(2026, 5, 22),
                    },
                ],
                client: "Self-initiated",
                team: "1 engineer (me)",
                platform: "Web, Windows",
                heroCopy:
                    "AI-powered collaborative tool to enrich your life with the most intuitive gaming experience.",
                links: {
                    status: "soon",
                    demo: "sl-project.online",
                    source: null,
                },
                stats: [
                    {
                        primary: "12k",
                        title: "API requests/day",
                        subtitle: "across all tenants",
                    },
                    {
                        primary: "<5min",
                        title: "MTTR",
                        subtitle: "automated failover",
                    },
                    {
                        primary: "1.2s",
                        title: "time to interactive",
                        subtitle: "median, mobile",
                    },
                    {
                        primary: "1",
                        title: "deploy/day",
                        subtitle: "zero-downtime",
                    },
                ],
                problem: [
                    "Young adults trying to grow — building habits, learning skills, setting goals — are stuck managing an ecosystem of disconnected tools that were never designed to work together. They're using Notion for notes, Habitica for habit tracking, and Discord for community. Every context switch adds friction. Progress lives in different places. Momentum breaks.",
                    "The deeper issue isn't a lack of tools — it's that no single experience ties personal development to social accountability and daily engagement. The tools that gamify behavior are shallow on productivity. The tools built for depth have no social layer. The ones built for community have no structured growth path.",
                    "The result: most people start self-improvement systems, abandon them within weeks, and quietly go back to doing nothing.",
                ],
                context: [
                    "The personal development and productivity app market is large, growing, and increasingly dominated by single-purpose tools. Gen Z and young adults (15–35) are the most engaged demographic in this space — digitally native, motivated by progress, and deeply responsive to community-driven experiences.",
                    "The clearest proof points are at the extremes: Duolingo demonstrates that gamification loops (streaks, XP, levels) can drive daily retention at scale; Strava shows that social accountability and community can sustain long-term engagement beyond the novelty phase. Yet no product has successfully merged these dynamics into a unified personal development platform.",
                    "The market gap isn't a missing feature — it's a missing system. One where habit mechanics, skill-building, goal-setting, and community reinforce each other rather than exist in parallel apps that compete for the same attention.",
                ],
                goal: [
                    "Get Isekai'd is a B2C mobile and web platform that unifies productivity, goal-tracking, skill-building, and community collaboration into a single daily-use experience — with gamification as the connective tissue.",
                    "The goal is to build the app that makes fragmentation unnecessary: one place where users log habits, level up skills, collaborate with others pursuing similar goals, and feel the momentum of genuine progress — daily.",
                    "The immediate aim is to validate the core retention loop with a tightly scoped MVP, prove that the gamification mechanics (XP, levels, streaks, quests) drive the habit formation that the market's existing tools fail to sustain, and establish a freemium model where the free tier functions as a viral growth engine rather than a restricted demo.",
                ],
                stack: [
                    {
                        label: "Frontend",
                        items: ["Nuxt 4", "Vue 3", "TypeScript", "Tailwind 4"],
                    },
                    {
                        label: "Backend",
                        items: [
                            "Laravel 12",
                            "PHP 8.4",
                            "Fortify",
                            "Sanctum",
                            "Spatie Data/Permission",
                        ],
                    },
                    {
                        label: "Realtime",
                        items: [
                            "Laravel Reverb",
                            "Laravel Echo",
                            "Pusher JS",
                            "WebSockets",
                            "WebRTC",
                        ],
                    },
                    {
                        label: "Data & Infra",
                        items: ["PostgreSQL", "Redis", "Docker", "NGINX"],
                    },
                ],

                blockers: [
                    {
                        status: "solved",
                        title: "Heterogeneous, independently-gated subsystems",
                        description:
                            "The product is not one app but a federation of loosely-related feature domains — Chat, Quests, Calendar, Finance, Skill, and Achievement — each with its own data model, access rules, and lifecycle. This forced a modular monolith on the backend (nwidart/laravel-modules, with each domain self-contained under backend/Modules/* and merged via Composer) and mirrored access-gating on the frontend (finance-access, quests-access, achievements-access middleware). The constraint is that subsystems must be addable or disabled in isolation without destabilizing the core, so the architecture favors clear module boundaries and per-feature authorization over a single shared domain layer.",
                    },
                    {
                        status: "solved",
                        title: "Peer-to-peer audio/video call establishment",
                        description:
                            'Real-time voice and video can\'t be proxied through the application server at scale, so calls run over WebRTC directly between peers, with the Laravel/Reverb stack acting only as a signaling broker. This imposes several hard constraints visible in useWebRTC.ts and Modules/Chat/Events/*: the server relays offers, answers, and ICE candidates (WebRTCSignal, AudioChannelSignal) but never carries media; signaling payloads are end-to-end encrypted via an ECDH (P-256) key exchange with AES-GCM, so the broker can route without reading them; and the SDP must be normalized to bridge Chrome/Firefox incompatibilities (Plan-B SSRC stripping). The system also has to model call state transitions — initiated, accepted, declined — as discrete broadcast events because there is no persistent call "connection" on the server to query.',
                    },
                    {
                        status: "solved",
                        title: "Realtime chat over authorized, secured channels",
                        description:
                            "Chat demands sub-second delivery of messages, edits, deletions, and reactions, which rules out request/response polling and mandates an event-broadcast architecture (Laravel Reverb WebSockets + Laravel Echo on the client). The security constraint is that realtime delivery cannot bypass the authorization model: every conversation maps to a private/presence channel that must be authenticated per-subscriber, so a user only receives events for conversations they belong to. This couples the realtime layer tightly to Sanctum-based auth and the conversation membership model, and it requires every state-changing chat action to emit a corresponding broadcast event (MessageEdited, MessageDeleted, ReactionRemoved) so that all participants' clients converge on the same state without a refresh.",
                    },
                ],
                process: [
                    {
                        name: "Research",
                        weeks: 1,
                        title: "Market research & planning",
                        description:
                            "Studied the gamified-productivity landscape and pinned down the core bet: a social app where quests, skills and achievements wrap around a real-time chat core. Turned that into a feature map and a module breakdown that became the build order.",
                        tags: ["Market research", "Feature map", "Module plan"],
                    },
                    {
                        name: "Foundation",
                        weeks: 2,
                        title: "Core architecture & CI/CD",
                        description:
                            "Stood up the Laravel 12 modular monolith (nwidart modules) behind a Nuxt 4 SPA, with Reverb WebSockets, Postgres and Redis wired through Docker Compose and nginx. Built the GitHub Actions pipeline and dev/prod image builds so every module shipped on the same rails from day one.",
                        tags: [
                            "Modular monolith",
                            "Docker Compose",
                            "CI/CD pipeline",
                        ],
                    },
                    {
                        name: "Chat",
                        weeks: 3,
                        title: "Realtime chat & calls",
                        description:
                            "The hardest subsystem and the spine of the app: private/presence channels over Reverb for messages, edits, reactions and party chat, plus peer-to-peer audio/video on WebRTC with a TURN server and ECDH-encrypted signaling. Pushed video to 1080p and ironed out cross-browser SDP quirks.",
                        tags: [
                            "Reverb channels",
                            "WebRTC + TURN",
                            "Party chat",
                        ],
                    },
                    {
                        name: "Quests",
                        weeks: 1,
                        title: "Quest system",
                        description:
                            "Built the quest module on top of the core: quest lists and items, progress tracking and access-gated routes. This was the first gamification layer to prove the modular pattern held up for a self-contained feature domain.",
                        tags: [
                            "Quest module",
                            "Progress tracking",
                            "Access gating",
                        ],
                    },
                    {
                        name: "Achievements",
                        weeks: 1,
                        title: "Achievement module",
                        description:
                            "Added the achievement subsystem — unlock criteria, detail views and the reward loop that ties player activity back to visible progress. Slotted in as an independent module without touching chat or quests.",
                        tags: [
                            "Achievement module",
                            "Unlock logic",
                            "Reward loop",
                        ],
                    },
                    {
                        name: "Skills",
                        weeks: 1,
                        title: "Skill system",
                        description:
                            "Layered the skill progression system over the existing modules, reusing the shared data and i18n conventions. With four feature domains live, the module boundaries and per-feature authorization were doing exactly what the architecture was designed for.",
                        tags: [
                            "Skill module",
                            "Progression",
                            "Shared conventions",
                        ],
                    },
                    {
                        name: "Launch",
                        weeks: 2,
                        title: "Open beta & support",
                        description:
                            "Shipped to open beta and moved into continuous support — bug fixes, polish and incremental module updates driven by real usage. The CI/CD foundation made the steady cadence of fixes and feature tweaks cheap to release.",
                        tags: [
                            "Open beta",
                            "Continuous support",
                            "Iterative releases",
                        ],
                    },
                ],

                systemDescription:
                    "Dockerized stack behind a single nginx edge. The Laravel modular monolith owns the domain; the Nuxt client and Reverb WebSocket server are thin layers over it.",
                system: [
                    {
                        tag: "nuxt",
                        title: "Web client",
                        description:
                            "Nuxt 4 / Vue 3 SPA (PrimeVue + Tailwind). Calls the REST API over HTTPS and subscribes to live channels via Laravel Echo, authenticated with Sanctum tokens.",
                    },
                    {
                        tag: "nginx",
                        title: "Edge proxy",
                        description:
                            "Single entry point. Terminates TLS, serves the SPA, and routes /api to the backend and the WebSocket upgrade path to Reverb.",
                    },
                    {
                        tag: "laravel",
                        title: "Modular monolith",
                        description:
                            "Laravel 12 with nwidart modules (Chat, Quests, Skill, Achievement, …). Sanctum + Fortify auth, Spatie Data/Permission, versioned V1 REST API per domain.",
                    },
                    {
                        tag: "reverb",
                        title: "Realtime & jobs",
                        description:
                            "Reverb broadcasts domain events on authorized private/presence channels; the queue worker and scheduler run async jobs. WebRTC call signaling is relayed here.",
                    },
                    {
                        tag: "postgres",
                        title: "Data layer",
                        description:
                            "PostgreSQL is the system of record; Redis backs the cache, queues and the broadcast backplane that fans events out through Reverb.",
                    },
                ],

                exhibits: [
                    {
                        title: "End-to-end encrypted call signaling",
                        description:
                            "Audio/video calls run peer-to-peer over WebRTC, but the offers, answers and ICE candidates still pass through the server. So the signaling payloads are sealed with an ECDH (P-256) handshake and AES-GCM before they ever hit the wire — the Reverb broker routes the call without being able to read it. End-to-end privacy without trusting the relay.",
                        codeHeader: "encrypted_call_signaling",
                        code: "PrjGidEcs",
                    },
                    {
                        title: "Cross-browser SDP sanitizer",
                        description:
                            "Chrome and Firefox disagree on SDP: Chrome emits legacy Plan-B `a=ssrc` lines that Firefox's strict parser rejects, and stray CRs in transit break Chrome's own parser. One small, well-reasoned pass strips the redundant lines (tracks are identified by MID under Unified Plan) and renormalizes to RFC 4566 CRLF — the difference between calls that connect everywhere and calls that silently fail on one browser.",
                        codeHeader: "cross_browser_sdp_sanitizer",
                        code: "PrjGidCss",
                    },
                    {
                        title: "Per-conversation channel authorization",
                        description:
                            "Realtime delivery never bypasses the permission model. Every WebSocket subscription to a conversation is authorized against actual participant membership, so a client only receives message, edit and reaction events for rooms it belongs to. Security is enforced at the channel boundary, not patched on afterward.",
                        codeHeader: "channel_authorization",
                        code: "PrjGidPca",
                    },
                ],

                features: [
                    {
                        title: "Realtime messaging & party chat",
                        description:
                            "Direct and group conversations sync instantly over Reverb WebSockets — messages, edits, deletions, reactions and link previews all broadcast live on per-conversation channels, with no refresh and no polling.",
                    },
                    {
                        title: "Encrypted 1080p voice & video calls",
                        description:
                            "Peer-to-peer WebRTC calls at up to 1080p, with a TURN server for NAT traversal and end-to-end encrypted signaling. Works across Chrome and Firefox thanks to cross-browser SDP handling.",
                    },
                    {
                        title: "Gamified progression system",
                        description:
                            "Quests, skills and achievements are layered over the social core as independent modules — players take on quests, level skills and unlock achievements, each a self-contained feature domain in the modular monolith.",
                    },
                    {
                        title: "Multi-platform from one backend",
                        description:
                            "A single Laravel API and Nuxt client ship to web and to a native Electron desktop app with OS notifications and Firebase push — same codebase, same realtime stack, everywhere.",
                    },
                ],

                figures: [
                    {
                        src: "/projects/prj_gid/prj_gid_1.png",
                        title: "Profile",
                    },
                    {
                        src: "/projects/prj_gid/prj_gid_0.png",
                        title: "Achievements",
                    },
                    {
                        src: "/projects/prj_gid/prj_gid_2.png",
                        title: "Chat",
                    },
                    {
                        src: "/projects/prj_gid/prj_gid_3.png",
                        title: "Quests",
                    },
                ],
                outcomes: [
                    "Shipped to open beta as a complete social platform — realtime chat and party rooms, encrypted 1080p voice/video calls, and a gamified progression layer of quests, skills and achievements — delivered to both web and a native Electron desktop app from a single Laravel + Nuxt codebase.",
                    "The modular-monolith bet was the real payoff: once the chat core was solid, each new subsystem (Quests, then Achievements, then Skills) landed in roughly a week without touching what already shipped. Continuous post-launch support became a steady, low-risk release cadence rather than a series of risky merges.",
                ],
                learned: [
                    "Building the hardest subsystem first — realtime chat and WebRTC calls — de-risked everything downstream. Once the broadcast and signaling backbone was proven, the gamification modules were comparatively easy.",
                    "Strict module boundaries with per-feature authorization meant new domains could be added or gated in isolation. The architecture earned its keep the moment the fourth feature module dropped in without a single regression.",
                    "Designing security in from the start — end-to-end encrypted call signaling and channel-level authorization on every realtime subscription — was far cheaper than it would have been to retrofit onto a working chat system.",
                    "Standing up Docker + CI/CD on day one, before the first feature, turned every later release into a non-event. The continuous-support phase was only sustainable because shipping was already free.",
                ],
                quote: {
                    message:
                        "I built the hard part first — chat and calls — and made every feature after it a module that couldn't break the last one. By launch, adding a whole subsystem felt routine, and that's exactly what I'd designed for.",
                    author: "Ivan Morozov",
                    company: "Hydrotinker",
                },
            },
        },
    ]);

    return {
        projects,
    };
});
