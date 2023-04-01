<?php

namespace App\Events;

use App\Services\AnalyticsService;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class AnalyticsUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // The updated analytics
    public $analytics;

    public function __construct()
    {
        $this->analytics = (new AnalyticsService())->getAnalytics();
    }
    public function broadcastOn()
    {
        return new Channel('analytics');
    }
}
