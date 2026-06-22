export interface NavItem {
    id: string;
    label: string;
}

export interface Project {
    code: string;
    name: string;
    tag: string;
    status: "In progress" | "Shipped";
    blurb: string;
    stack: string[];
    metric: [string, string];
    year: string;
    live: boolean;
    detail: Detail;
}

export interface SkillItem {
    name: string;
    lvl: number;
}

export interface SkillDomain {
    domain: string;
    code: string;
    items: SkillItem[];
}

export interface Certificates {
    [key: string]: Array<SkillCertificate>;
}

export interface SkillCertificate {
    label: string;
    file: string;
}

export interface Post {
    n: string;
    date: string;
    read: string;
    tag: string;
    title: string;
    dek: string;
}

export interface DetailStat {
    primary: string;
    title: string;
    subtitle: string;
}

export interface DetailStackGroup {
    label: string;
    items: Array<string>;
}

export interface DetailBlocker {
    status: "solved";
    title: string;
    description: string;
}

export interface DetailProcessPhase {
    name: string;
    weeks: number;
    title: string;
    description: string;
    tags: Array<string>;
}

export interface DetailSubsystem {
    title: string;
    tag: string;
    description: string;
}

export interface DetailExhibitItem {
    title: string;
    description: string;
    codeHeader: string;
    code: string | null;
}

export interface DetailFeature {
    title: string;
    description: string;
}

export interface DetailFigure {
    src: string;
    title: string;
}

export interface DetailQuote {
    message: string;
    author: string;
    company: string;
}

export interface Detail {
    subtitle: string;
    role: string;
    milestones: Array<Milestone>;
    client: string;
    team: string;
    platform: string;
    heroCopy: string;
    outcomes: Array<String>;
    links: ProjectLinks;
    stats: Array<DetailStat>;
    problem: Array<string>;
    context: Array<string>;
    goal: Array<string>;
    stack: Array<DetailStackGroup>;
    blockers: Array<DetailBlocker>;
    process: Array<DetailProcessPhase>;
    systemDescription: string;
    system: Array<DetailSubsystem>;
    exhibits: Array<DetailExhibitItem>;
    features: Array<DetailFeature>;
    figures: Array<DetailFigure>;
    learned: Array<string>;
    quote: DetailQuote;
}

export interface Milestone {
    name: string;
    date?: Date;
}

export interface ProjectLinks {
    status: "enabled" | "soon";
    demo: string | null;
    source: string | null;
}
