import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "wonder",
    "accessor": "Wonder",
    "op": "list",
    "method": "GET",
    "path": "/wonders",
    "args": [],
    "select": {
      "limit": 10,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "summary": "x",
        "location": {
          "country": "x",
          "city": "x",
          "continent": "x",
          "coordinates": {
            "latitude": 1,
            "longitude": 1
          }
        },
        "build_year": 1,
        "time_period": "x",
        "links": {
          "wiki": "x",
          "britannica": "x",
          "google_maps": "x",
          "trip_advisor": "x"
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "wonder",
    "accessor": "Wonder",
    "op": "load",
    "method": "GET",
    "path": "/wonders/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "summary": "x",
      "location": {
        "country": "x",
        "city": "x",
        "continent": "x",
        "coordinates": {
          "latitude": 1,
          "longitude": 1
        }
      },
      "build_year": 1,
      "time_period": "x",
      "links": {
        "wiki": "x",
        "britannica": "x",
        "google_maps": "x",
        "trip_advisor": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
