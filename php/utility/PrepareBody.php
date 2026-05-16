<?php
declare(strict_types=1);

// WorldWonders SDK utility: prepare_body

class WorldWondersPrepareBody
{
    public static function call(WorldWondersContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
