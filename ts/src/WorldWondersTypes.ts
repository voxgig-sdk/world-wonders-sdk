// Typed models for the WorldWonders SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Wonder {
  build_year?: number
  id?: string
  link?: Record<string, any>
  location?: Record<string, any>
  name?: string
  summary?: string
  time_period?: string
}

export interface WonderLoadMatch {
  id: string
}

export interface WonderListMatch {
  build_year?: number
  id?: string
  link?: Record<string, any>
  location?: Record<string, any>
  name?: string
  summary?: string
  time_period?: string
}

