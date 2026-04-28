export interface NavItem {
    id: string;
    label: string;
}

export interface Project {
    code: string;
    name: string;
    tag: string;
    blurb: string;
    stack: string[];
    metric: [string, string];
    year: string;
    live: boolean;
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

export interface CaseDetail {
    subtitle: string;
    role: string;
    client: string;
    team: string;
    platform: string;
    launched: string;
    heroCopy: string;
    problem: string;
    approach: string[];
    outcomes: [string, string][];
    gallery: string[];
    quote: { text: string; by: string };
}
