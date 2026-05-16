package voxgigworldwonderssdk

import (
	"github.com/voxgig-sdk/world-wonders-sdk/core"
	"github.com/voxgig-sdk/world-wonders-sdk/entity"
	"github.com/voxgig-sdk/world-wonders-sdk/feature"
	_ "github.com/voxgig-sdk/world-wonders-sdk/utility"
)

// Type aliases preserve external API.
type WorldWondersSDK = core.WorldWondersSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WorldWondersEntity = core.WorldWondersEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WorldWondersError = core.WorldWondersError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewWonderEntityFunc = func(client *core.WorldWondersSDK, entopts map[string]any) core.WorldWondersEntity {
		return entity.NewWonderEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWorldWondersSDK = core.NewWorldWondersSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
