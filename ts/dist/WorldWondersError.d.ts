import { Context } from './Context';
declare class WorldWondersError extends Error {
    isWorldWondersError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WorldWondersError };
