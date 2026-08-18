-- Wonder entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("world-wonders_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("WonderEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Wonder(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["wonder"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Wonder(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Wonder(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = wonder_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "wonder." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set WORLD_WONDERS_TEST_WONDER_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local wonder_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.wonder")))
    local wonder_ref01_data = nil
    if #wonder_ref01_data_raw > 0 then
      wonder_ref01_data = helpers.to_map(wonder_ref01_data_raw[1][2])
    end

    -- LIST
    local wonder_ref01_ent = client:Wonder(nil)
    local wonder_ref01_match = {}

    local wonder_ref01_list_result, err = wonder_ref01_ent:list(wonder_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(wonder_ref01_list_result)

    -- LOAD
    local wonder_ref01_match_dt0 = {
      id = wonder_ref01_data["id"],
    }
    local wonder_ref01_data_dt0_loaded, err = wonder_ref01_ent:load(wonder_ref01_match_dt0, nil)
    assert.is_nil(err)
    local wonder_ref01_data_dt0_load_result = helpers.to_map(type(wonder_ref01_data_dt0_loaded) == 'table' and wonder_ref01_data_dt0_loaded.data_get and wonder_ref01_data_dt0_loaded:data_get() or wonder_ref01_data_dt0_loaded)
    assert.is_not_nil(wonder_ref01_data_dt0_load_result)
    assert.are.equal(wonder_ref01_data_dt0_load_result["id"], wonder_ref01_data["id"])

  end)
end)

function wonder_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/wonder/WonderTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read wonder test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "wonder01", "wonder02", "wonder03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("WORLD_WONDERS_TEST_WONDER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WORLD_WONDERS_TEST_WONDER_ENTID"] = idmap,
    ["WORLD_WONDERS_TEST_LIVE"] = "FALSE",
    ["WORLD_WONDERS_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["WORLD_WONDERS_TEST_WONDER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["WORLD_WONDERS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["WORLD_WONDERS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["WORLD_WONDERS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
