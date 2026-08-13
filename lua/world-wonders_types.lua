-- Typed models for the WorldWonders SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Wonder
---@field build_year? number
---@field id? string
---@field links? table
---@field location? table
---@field name? string
---@field summary? string
---@field time_period? string

---@class WonderLoadMatch
---@field id string

---@class WonderListMatch
---@field build_year? number
---@field id? string
---@field links? table
---@field location? table
---@field name? string
---@field summary? string
---@field time_period? string

local M = {}

return M
