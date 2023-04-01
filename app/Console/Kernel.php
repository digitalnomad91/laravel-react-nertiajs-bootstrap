<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('sitemap:generate')->daily();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Register the commands for the short schedule runner (so jobs can be run any number of seconds and not just >1 per minute).
     */
    protected function shortSchedule(\Spatie\ShortSchedule\ShortSchedule $shortSchedule)
    {
        // this artisan command will run every second
        //$shortSchedule->command('artisan-command')->everySecond();

        // this artisan command will run every second, its signature will be resolved from container
        //$shortSchedule->command(\Spatie\ShortSchedule\Tests\Unit\TestCommand::class)->everySecond();
    }
}
