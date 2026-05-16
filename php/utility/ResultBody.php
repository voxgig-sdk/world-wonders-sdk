<?php
declare(strict_types=1);

// WorldWonders SDK utility: result_body

class WorldWondersResultBody
{
    public static function call(WorldWondersContext $ctx): ?WorldWondersResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
