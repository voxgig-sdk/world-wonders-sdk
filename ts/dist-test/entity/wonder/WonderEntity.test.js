"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WonderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WORLD_WONDERS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WORLD_WONDERS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WorldWondersSDK.test();
        const ent = testsdk.Wonder();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WORLD_WONDERS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'wonder.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "build_year": { "a": true, "h": "Build Year", "n": "build_year", "r": false, "sh": "Year the wonder was built", "t": "`$INTEGER`", "key$": "build_year", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the wonder", "t": "`$STRING`", "key$": "id", "index$": 1 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$OBJECT`", "key$": "links", "index$": 2 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "t": "`$OBJECT`", "key$": "location", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the world wonder", "t": "`$STRING`", "key$": "name", "index$": 4 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "sh": "Brief summary of the wonder", "t": "`$STRING`", "key$": "summary", "index$": 5 }, "time_period": { "a": true, "h": "Time Period", "n": "time_period", "r": false, "sh": "Historical time period of the wonder", "t": "`$STRING`", "key$": "time_period", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "wonder", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /wonders", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/wonders", "q": { "exist": ["limit", "offset"] }, "r": {}, "s": [{ "lit": "wonders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /wonders/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/wonders/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "wonders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "wonder", "name__orig": "wonder", "Name": "Wonder", "name_": "wonder", "name-": "wonder", "NAME": "WONDER", "index$": 0 }, { "active": true, "entity": "wonder", "key$": "BasicWonderFlow", "kind": "basic", "name": "BasicWonderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "wonder_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "wonder_ref01", "srcdatavar": "wonder_ref01_data", "suffix": "_dt0" }, "m": { "id": "wonder01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-wonder_ref01" } }], "index$": 1 }] }, 'Wonder', { "GET /wonders": { "protocol": "http", "operationId": "getAllWonders", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the wonder", "key$": "id" }, "name": { "type": "string", "description": "Name of the world wonder", "key$": "name" }, "summary": { "type": "string", "description": "Brief summary of the wonder", "key$": "summary" }, "location": { "type": "object", "properties": { "country": { "type": "string", "description": "Country where the wonder is located" }, "city": { "type": "string", "description": "City where the wonder is located" }, "continent": { "type": "string", "description": "Continent where the wonder is located" }, "coordinates": { "type": "object", "properties": { "latitude": { "type": "number", "format": "double" }, "longitude": { "type": "number", "format": "double" } } } }, "key$": "location" }, "build_year": { "type": "integer", "description": "Year the wonder was built", "key$": "build_year" }, "time_period": { "type": "string", "description": "Historical time period of the wonder", "key$": "time_period" }, "links": { "type": "object", "properties": { "wiki": { "type": "string", "format": "uri", "description": "Wikipedia link" }, "britannica": { "type": "string", "format": "uri", "description": "Britannica link" }, "google_maps": { "type": "string", "format": "uri", "description": "Google Maps link" }, "trip_advisor": { "type": "string", "format": "uri", "description": "TripAdvisor link" } }, "key$": "links" } }, "x-ref": "#/components/schemas/Wonder", "index$": 0 } } } } }, "400": { "description": "Bad request", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "limit", "in": "query", "description": "Maximum number of wonders to return", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Number of wonders to skip", "required": false, "schema": { "type": "integer", "minimum": 0, "default": 0 }, "index$": 1 }], "securitySource": "unspecified" }, "GET /wonders/{id}": { "protocol": "http", "operationId": "getWonderById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the wonder", "key$": "id" }, "name": { "type": "string", "description": "Name of the world wonder", "key$": "name" }, "summary": { "type": "string", "description": "Brief summary of the wonder", "key$": "summary" }, "location": { "type": "object", "properties": { "country": { "type": "string", "description": "Country where the wonder is located" }, "city": { "type": "string", "description": "City where the wonder is located" }, "continent": { "type": "string", "description": "Continent where the wonder is located" }, "coordinates": { "type": "object", "properties": { "latitude": { "type": "number", "format": "double" }, "longitude": { "type": "number", "format": "double" } } } }, "key$": "location" }, "build_year": { "type": "integer", "description": "Year the wonder was built", "key$": "build_year" }, "time_period": { "type": "string", "description": "Historical time period of the wonder", "key$": "time_period" }, "links": { "type": "object", "properties": { "wiki": { "type": "string", "format": "uri", "description": "Wikipedia link" }, "britannica": { "type": "string", "format": "uri", "description": "Britannica link" }, "google_maps": { "type": "string", "format": "uri", "description": "Google Maps link" }, "trip_advisor": { "type": "string", "format": "uri", "description": "TripAdvisor link" } }, "key$": "links" } }, "x-ref": "#/components/schemas/Wonder", "index$": 0 } } } }, "404": { "description": "Wonder not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Unique identifier of the world wonder", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let wonder_ref01_data = Object.values(setup.data.existing.wonder)[0];
        // LIST
        const wonder_ref01_ent = client.Wonder();
        const wonder_ref01_match = {};
        const wonder_ref01_list = (await wonder_ref01_ent.list(wonder_ref01_match)).map((e) => e.data());
        // LOAD
        const wonder_ref01_match_dt0 = {};
        wonder_ref01_match_dt0.id = wonder_ref01_data.id;
        const wonder_ref01_data_dt0 = (await wonder_ref01_ent.load(wonder_ref01_match_dt0)).data();
        (0, node_assert_1.default)(wonder_ref01_data_dt0.id === wonder_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/wonder/WonderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WorldWondersSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['wonder01', 'wonder02', 'wonder03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WORLD_WONDERS_TEST_WONDER_ENTID': idmap,
        'WORLD_WONDERS_TEST_LIVE': 'FALSE',
        'WORLD_WONDERS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WORLD_WONDERS_TEST_WONDER_ENTID'];
    const live = 'TRUE' === env.WORLD_WONDERS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WORLD_WONDERS_TEST_WONDER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WorldWondersSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WORLD_WONDERS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WonderEntity.test.js.map