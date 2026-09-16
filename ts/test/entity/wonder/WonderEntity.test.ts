

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WorldWondersSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WonderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WORLD_WONDERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('WORLD_WONDERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WorldWondersSDK.test()
    const ent = testsdk.Wonder()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WORLD_WONDERS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'wonder.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"build_year","req":false,"short":"Year the wonder was built","type":"`$INTEGER`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the wonder","type":"`$STRING`","index$":1},{"active":true,"name":"links","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"location","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"name","req":false,"short":"Name of the world wonder","type":"`$STRING`","index$":4},{"active":true,"name":"summary","req":false,"short":"Brief summary of the wonder","type":"`$STRING`","index$":5},{"active":true,"name":"time_period","req":false,"short":"Historical time period of the wonder","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"wonder","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /wonders","json":"{\"operationId\":\"getAllWonders\",\"parameters\":[{\"description\":\"Maximum number of wonders to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of wonders to skip\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"build_year\":{\"description\":\"Year the wonder was built\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the wonder\",\"type\":\"string\"},\"links\":{\"properties\":{\"britannica\":{\"description\":\"Britannica link\",\"format\":\"uri\",\"type\":\"string\"},\"google_maps\":{\"description\":\"Google Maps link\",\"format\":\"uri\",\"type\":\"string\"},\"trip_advisor\":{\"description\":\"TripAdvisor link\",\"format\":\"uri\",\"type\":\"string\"},\"wiki\":{\"description\":\"Wikipedia link\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"location\":{\"properties\":{\"city\":{\"description\":\"City where the wonder is located\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent where the wonder is located\",\"type\":\"string\"},\"coordinates\":{\"properties\":{\"latitude\":{\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"country\":{\"description\":\"Country where the wonder is located\",\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"description\":\"Name of the world wonder\",\"type\":\"string\"},\"summary\":{\"description\":\"Brief summary of the wonder\",\"type\":\"string\"},\"time_period\":{\"description\":\"Historical time period of the wonder\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wonders","segments":[{"lit":"wonders"}],"select":{"exist":["limit","offset"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /wonders/{id}","json":"{\"operationId\":\"getWonderById\",\"parameters\":[{\"description\":\"Unique identifier of the world wonder\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"build_year\":{\"description\":\"Year the wonder was built\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the wonder\",\"type\":\"string\"},\"links\":{\"properties\":{\"britannica\":{\"description\":\"Britannica link\",\"format\":\"uri\",\"type\":\"string\"},\"google_maps\":{\"description\":\"Google Maps link\",\"format\":\"uri\",\"type\":\"string\"},\"trip_advisor\":{\"description\":\"TripAdvisor link\",\"format\":\"uri\",\"type\":\"string\"},\"wiki\":{\"description\":\"Wikipedia link\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"location\":{\"properties\":{\"city\":{\"description\":\"City where the wonder is located\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent where the wonder is located\",\"type\":\"string\"},\"coordinates\":{\"properties\":{\"latitude\":{\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"country\":{\"description\":\"Country where the wonder is located\",\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"description\":\"Name of the world wonder\",\"type\":\"string\"},\"summary\":{\"description\":\"Brief summary of the wonder\",\"type\":\"string\"},\"time_period\":{\"description\":\"Historical time period of the wonder\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Wonder not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wonders/{id}","segments":[{"lit":"wonders"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"wonder","name__orig":"wonder","Name":"Wonder","name_":"wonder","name-":"wonder","NAME":"WONDER","index$":0}, {"active":true,"entity":"wonder","key$":"BasicWonderFlow","kind":"basic","name":"BasicWonderFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"wonder_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"wonder_ref01","srcdatavar":"wonder_ref01_data","suffix":"_dt0"},"match":{"id":"wonder01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-wonder_ref01"}}],"index$":1}]}, 'Wonder')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let wonder_ref01_data = Object.values(setup.data.existing.wonder)[0] as any

    // LIST
    const wonder_ref01_ent = client.Wonder()
    const wonder_ref01_match: any = {}

    const wonder_ref01_list = (await wonder_ref01_ent.list(wonder_ref01_match)).map((e: any) => e.data())


    // LOAD
    const wonder_ref01_match_dt0: any = {}
    wonder_ref01_match_dt0.id = wonder_ref01_data.id
    const wonder_ref01_data_dt0 = (await wonder_ref01_ent.load(wonder_ref01_match_dt0)).data()
    assert(wonder_ref01_data_dt0.id === wonder_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/wonder/WonderTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WorldWondersSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['wonder01','wonder02','wonder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WORLD_WONDERS_TEST_WONDER_ENTID': idmap,
    'WORLD_WONDERS_TEST_LIVE': 'FALSE',
    'WORLD_WONDERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WORLD_WONDERS_TEST_WONDER_ENTID']

  const live = 'TRUE' === env.WORLD_WONDERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WORLD_WONDERS_TEST_WONDER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WorldWondersSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
