<?php

namespace App\Http\Middleware;

use App\Models\RequestLog;
use Carbon\Carbon;
use Closure;

class RequestLogger
{
    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {
        $response = $next($request);

        if ($request->routeIs('analytics.dashboard')) {
            return $response;
        }
        $requestTime = Carbon::createFromTimestamp($_SERVER['REQUEST_TIME']);
        $responseTime = floatval(microtime(true)) - floatval($_SERVER['REQUEST_TIME_FLOAT']);
        $request = RequestLog::create([
            'url' => $request->getPathInfo(),
            'method' => $request->method(),
            'response_time' => $responseTime,
            'number_of_requests' => 1,
            'day' => date('l', $requestTime->timestamp),
            'hour' => $requestTime->hour,
        ]);

        return $response;
    }
}
