export interface Wonder {
    build_year?: number;
    id?: string;
    links?: Record<string, any>;
    location?: Record<string, any>;
    name?: string;
    summary?: string;
    time_period?: string;
}
export interface WonderLoadMatch {
    id: string;
}
export interface WonderListMatch {
    limit?: number;
    offset?: number;
}
