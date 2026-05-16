<?php
declare(strict_types=1);

// WorldWonders SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WorldWondersFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WorldWondersBaseFeature();
            case "test":
                return new WorldWondersTestFeature();
            default:
                return new WorldWondersBaseFeature();
        }
    }
}
