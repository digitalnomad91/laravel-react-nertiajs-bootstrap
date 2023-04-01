<?php

namespace App\Http\Controllers;

use App\Services\AnalyticsService;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(AnalyticsService $analyticsService)
    {
        $analytics = $analyticsService->getAnalytics();
        return Inertia::render('Admin/Analytics', ['analytics' => $analytics]);
    }
}
