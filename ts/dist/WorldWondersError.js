"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldWondersError = void 0;
class WorldWondersError extends Error {
    isWorldWondersError = true;
    sdk = 'WorldWonders';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.WorldWondersError = WorldWondersError;
//# sourceMappingURL=WorldWondersError.js.map