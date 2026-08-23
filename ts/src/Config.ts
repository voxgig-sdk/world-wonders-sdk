
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WorldWonders',
        slug: "world-wonders",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.world-wonders-api.org/v0",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      wonder: {
      },

    }
  }


  entity = {
    "wonder": {
      "fields": [
        {
          "name": "build_year",
          "short": "Year the wonder was built",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the wonder",
          "type": "`$STRING`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        },
        {
          "name": "location",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "short": "Name of the world wonder",
          "type": "`$STRING`"
        },
        {
          "name": "summary",
          "short": "Brief summary of the wonder",
          "type": "`$STRING`"
        },
        {
          "name": "time_period",
          "short": "Historical time period of the wonder",
          "type": "`$STRING`"
        }
      ],
      "name": "wonder",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/wonders",
              "parts": [
                "wonders"
              ],
              "select": {
                "exist": [
                  "limit",
                  "offset"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/wonders/{id}",
              "parts": [
                "wonders",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

