package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewWonderEntityFunc func(client *WorldWondersSDK, entopts map[string]any) WorldWondersEntity

