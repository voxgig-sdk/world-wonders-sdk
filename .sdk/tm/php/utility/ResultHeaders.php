<?php
declare(strict_types=1);

// WorldWonders SDK utility: result_headers

class WorldWondersResultHeaders
{
    public static function call(WorldWondersContext $ctx): ?WorldWondersResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
