# Typed models for the WorldWonders SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Wonder(TypedDict, total=False):
    build_year: int
    id: str
    links: dict
    location: dict
    name: str
    summary: str
    time_period: str


class WonderLoadMatch(TypedDict):
    id: str


class WonderListMatch(TypedDict, total=False):
    limit: int
    offset: int
