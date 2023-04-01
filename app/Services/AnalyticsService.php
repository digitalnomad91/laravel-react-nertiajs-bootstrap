<?php

namespace App\Services;

use App\Models\RequestLog;
use Illuminate\Support\Collection;

class AnalyticsService
{
    public function getAnalytics()
    {
        $perRoute = RequestLog::raw(function (Collection $collection) {
            return $collection->aggregate([
                [
                    '$group' => [
                        '_id' => ['url' => '$url', 'method' => '$method'],
                        'responseTime' => ['$avg' => '$response_time'],
                        'numberOfRequests' => ['$sum' => 1],
                    ],
                ],
            ]);
        });
        $requestsPerDay = RequestLog::raw(function (Collection $collection) {
            return $collection->aggregate([
                [
                    '$group' => [
                        '_id' => '$day',
                        'numberOfRequests' => ['$sum' => 1],
                    ],
                ],
                ['$sort' => ['numberOfRequests' => 1]],
            ]);
        });
        $requestsPerHour = RequestLog::raw(function (Collection $collection) {
            return $collection->aggregate([
                [
                    '$group' => [
                        '_id' => '$hour',
                        'numberOfRequests' => ['$sum' => 1],
                    ],
                ],
                ['$sort' => ['numberOfRequests' => 1]],
            ]);
        });
        return [
            'averageResponseTime' => RequestLog::avg('response_time'),
            'statsPerRoute' => $perRoute,
            'busiestDays' => $requestsPerDay,
            'busiestHours' => $requestsPerHour,
            'totalRequests' => RequestLog::count(),
        ];
    }
}
