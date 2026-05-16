<?php
declare(strict_types=1);

// WorldWonders SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WorldWondersMakeContext
{
    public static function call(array $ctxmap, ?WorldWondersContext $basectx): WorldWondersContext
    {
        return new WorldWondersContext($ctxmap, $basectx);
    }
}
