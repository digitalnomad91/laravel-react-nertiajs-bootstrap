<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use JobStatus\\Concerns\\Trackable;

class ProcessPodcast
{
    use Trackable;

    protected Podcast $podcast;

    public function handle()
    {
        // Upload and process the podcast
    }

    public function tags(): array
    {
        return [
            'podcast' => $this->podcast->id,
        ];
    }

    public function alias(): string
    {
        return 'process-podcast';
    }
}
