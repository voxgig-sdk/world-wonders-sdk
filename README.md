# WorldWonders SDK

Browse famous world wonders and their categories from a free, open-source REST API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About World Wonders

World Wonders API is a small, free public API that returns information about notable wonders of the world. It is catalogued on [freepublicapis.com](https://freepublicapis.com/world-wonders) and served from `https://www.world-wonders-api.org/v0`.

What you get from the API:

- `GET /v0/wonders/` — list of world wonders
- `GET /v0/wonders/categories` — the categories used to group wonders

Operational notes: the public catalogue page reports CORS enabled on the main wonders endpoint and disabled on the categories endpoint. No authentication or rate-limit policy is documented on the pages reviewed.

## Try it

**TypeScript**
```bash
npm install world-wonders
```

**Python**
```bash
pip install world-wonders-sdk
```

**PHP**
```bash
composer require voxgig/world-wonders-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/world-wonders-sdk/go
```

**Ruby**
```bash
gem install world-wonders-sdk
```

**Lua**
```bash
luarocks install world-wonders-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { WorldWondersSDK } from 'world-wonders'

const client = new WorldWondersSDK({})

// List all wonders
const wonders = await client.Wonder().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o world-wonders-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "world-wonders": {
      "command": "/abs/path/to/world-wonders-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Wonder** | A single world wonder resource, listed and filtered through `/v0/wonders/` and grouped by the values returned from `/v0/wonders/categories`. | `/wonders` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from worldwonders_sdk import WorldWondersSDK

client = WorldWondersSDK({})

# List all wonders
wonders, err = client.Wonder(None).list(None, None)

# Load a specific wonder
wonder, err = client.Wonder(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'worldwonders_sdk.php';

$client = new WorldWondersSDK([]);

// List all wonders
[$wonders, $err] = $client->Wonder(null)->list(null, null);

// Load a specific wonder
[$wonder, $err] = $client->Wonder(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/world-wonders-sdk/go"

client := sdk.NewWorldWondersSDK(map[string]any{})

// List all wonders
wonders, err := client.Wonder(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "WorldWonders_sdk"

client = WorldWondersSDK.new({})

# List all wonders
wonders, err = client.Wonder(nil).list(nil, nil)

# Load a specific wonder
wonder, err = client.Wonder(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("world-wonders_sdk")

local client = sdk.new({})

-- List all wonders
local wonders, err = client:Wonder(nil):list(nil, nil)

-- Load a specific wonder
local wonder, err = client:Wonder(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = WorldWondersSDK.test()
const result = await client.Wonder().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = WorldWondersSDK.test(None, None)
result, err = client.Wonder(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = WorldWondersSDK::test(null, null);
[$result, $err] = $client->Wonder(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Wonder(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = WorldWondersSDK.test(nil, nil)
result, err = client.Wonder(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Wonder(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the World Wonders

- Upstream: [https://www.world-wonders-api.org](https://www.world-wonders-api.org)
- API docs: [https://www.world-wonders-api.org/v0/docs](https://www.world-wonders-api.org/v0/docs)

- Described on freepublicapis.com as a free and open source API
- No specific licence text is published on the listed pages — confirm with the maintainer before redistribution
- No attribution requirements are documented

---

Generated from the World Wonders OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
