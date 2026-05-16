<?php
declare(strict_types=1);

// WorldWonders SDK utility: feature_add

class WorldWondersFeatureAdd
{
    public static function call(WorldWondersContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
