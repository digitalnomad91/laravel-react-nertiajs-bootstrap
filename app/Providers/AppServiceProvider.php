<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
//use ProtoneMedia\LaravelEloquentScopeAsSelect\ScopeAsSelect;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ScopeAsSelect::addMacro();

        // or use a custom method name:
        //ScopeAsSelect::addMacro('withScopeAsSubQuery');
    }
}
