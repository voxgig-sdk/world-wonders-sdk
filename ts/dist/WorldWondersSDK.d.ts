import { WonderEntity } from './entity/WonderEntity';
export type * from './WorldWondersTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WorldWondersEntityBase } from './WorldWondersEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class WorldWondersSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Wonder(entopts?: Record<string, any>): WonderEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WorldWondersSDK;
    tester(testopts?: any, sdkopts?: any): WorldWondersSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WorldWondersSDK;
export { stdutil, config, BaseFeature, WorldWondersEntityBase, WorldWondersSDK, SDK, };
export type { DirectResult };
