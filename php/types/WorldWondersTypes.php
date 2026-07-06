<?php
declare(strict_types=1);

// Typed models for the WorldWonders SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Wonder entity data model. */
class Wonder
{
    public ?int $build_year = null;
    public ?string $id = null;
    public ?array $link = null;
    public ?array $location = null;
    public ?string $name = null;
    public ?string $summary = null;
    public ?string $time_period = null;
}

/** Request payload for Wonder#load. */
class WonderLoadMatch
{
    public string $id;
}

/** Request payload for Wonder#list. */
class WonderListMatch
{
    public ?int $build_year = null;
    public ?string $id = null;
    public ?array $link = null;
    public ?array $location = null;
    public ?string $name = null;
    public ?string $summary = null;
    public ?string $time_period = null;
}

