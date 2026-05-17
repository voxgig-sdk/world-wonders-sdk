package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/world-wonders-sdk/go"
	"github.com/voxgig-sdk/world-wonders-sdk/go/core"

	vs "github.com/voxgig-sdk/world-wonders-sdk/go/utility/struct"
)

func TestWonderEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Wonder(nil)
		if ent == nil {
			t.Fatal("expected non-nil WonderEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := wonderBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "wonder." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set WORLDWONDERS_TEST_WONDER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		wonderRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.wonder", setup.data)))
		var wonderRef01Data map[string]any
		if len(wonderRef01DataRaw) > 0 {
			wonderRef01Data = core.ToMapAny(wonderRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = wonderRef01Data

		// LIST
		wonderRef01Ent := client.Wonder(nil)
		wonderRef01Match := map[string]any{}

		wonderRef01ListResult, err := wonderRef01Ent.List(wonderRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, wonderRef01ListOk := wonderRef01ListResult.([]any)
		if !wonderRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", wonderRef01ListResult)
		}

		// LOAD
		wonderRef01MatchDt0 := map[string]any{
			"id": wonderRef01Data["id"],
		}
		wonderRef01DataDt0Loaded, err := wonderRef01Ent.Load(wonderRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		wonderRef01DataDt0LoadResult := core.ToMapAny(wonderRef01DataDt0Loaded)
		if wonderRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if wonderRef01DataDt0LoadResult["id"] != wonderRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func wonderBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "wonder", "WonderTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read wonder test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse wonder test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"wonder01", "wonder02", "wonder03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("WORLDWONDERS_TEST_WONDER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WORLDWONDERS_TEST_WONDER_ENTID": idmap,
		"WORLDWONDERS_TEST_LIVE":      "FALSE",
		"WORLDWONDERS_TEST_EXPLAIN":   "FALSE",
		"WORLDWONDERS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["WORLDWONDERS_TEST_WONDER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WORLDWONDERS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["WORLDWONDERS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewWorldWondersSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WORLDWONDERS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WORLDWONDERS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
