# frozen_string_literal: true

# Typed models for the WorldWonders SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Wonder entity data model.
#
# @!attribute [rw] build_year
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] links
#   @return [Hash, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] time_period
#   @return [String, nil]
Wonder = Struct.new(
  :build_year,
  :id,
  :links,
  :location,
  :name,
  :summary,
  :time_period,
  keyword_init: true
)

# Request payload for Wonder#load.
#
# @!attribute [rw] id
#   @return [String]
WonderLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Wonder#list.
#
# @!attribute [rw] build_year
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] links
#   @return [Hash, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] time_period
#   @return [String, nil]
WonderListMatch = Struct.new(
  :build_year,
  :id,
  :links,
  :location,
  :name,
  :summary,
  :time_period,
  keyword_init: true
)

