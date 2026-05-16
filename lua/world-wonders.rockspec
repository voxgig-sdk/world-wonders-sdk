package = "voxgig-sdk-world-wonders"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/world-wonders-sdk.git"
}
description = {
  summary = "WorldWonders SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["world-wonders_sdk"] = "world-wonders_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
