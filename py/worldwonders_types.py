# Typed models for the WorldWonders SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Wonder:
    build_year: Optional[int] = None
    id: Optional[str] = None
    link: Optional[dict] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    summary: Optional[str] = None
    time_period: Optional[str] = None


@dataclass
class WonderLoadMatch:
    id: str


@dataclass
class WonderListMatch:
    build_year: Optional[int] = None
    id: Optional[str] = None
    link: Optional[dict] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    summary: Optional[str] = None
    time_period: Optional[str] = None

