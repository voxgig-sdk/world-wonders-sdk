import { WorldWondersEntityBase } from '../WorldWondersEntityBase';
import type { WorldWondersSDK } from '../WorldWondersSDK';
import type { Control } from '../types';
import type { Wonder, WonderLoadMatch, WonderListMatch } from '../WorldWondersTypes';
declare class WonderEntity extends WorldWondersEntityBase<Wonder> {
    constructor(client: WorldWondersSDK, entopts: any);
    make(this: WonderEntity): WonderEntity;
    load(this: any, reqmatch?: WonderLoadMatch, ctrl?: Control): Promise<WonderEntity>;
    list(this: any, reqmatch?: WonderListMatch, ctrl?: Control): Promise<WonderEntity[]>;
}
export { WonderEntity };
