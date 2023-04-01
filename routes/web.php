<?php

use App\Http\Controllers\SnippetsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\TwoFactorAuthController;

use App\Http\Controllers\StripePaymentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
|--------------------------------------------------------------------------
| CODE SNIPPET ROUTES
|--------------------------------------------------------------------------
*/
Route::controller(SnippetsController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/snippet/{slug}', 'view')->name('snippet.view');
});
//Route::get('/snippets', 'App\Http\Controllers\Admin\SnippetCrudController@getSnippets')->name('request_snippets');

/*
|--------------------------------------------------------------------------
| BLOG ROUTES
|--------------------------------------------------------------------------
*/
Route::controller(BlogController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog.home');
    Route::get('/blog/{category}/{slug}', 'view')->name('blog.view');
});

/*
|--------------------------------------------------------------------------
| STRIPE PAYMENT ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/premium', function () {
    return Inertia::render('Payment');
})->name('premium');
Route::controller(StripePaymentController::class)->group(function () {
    Route::get('/payment/credit_card', 'stripePost')->name('stripe.post');
    Route::get('/payment/confirm', 'successfulPayment')->name('stripe.confirm');
});

/*
|--------------------------------------------------------------------------
| SOCIAL LOGIN ROUTES
|--------------------------------------------------------------------------
*/
Route::get('login/{provider}', 'App\Http\Controllers\SocialController@redirect');
Route::get('login/{provider}/callback', 'App\Http\Controllers\SocialController@Callback');
Route::post('/2fa-confirm', [TwoFactorAuthController::class, 'confirm'])->name('two-factor.confirm');
Route::post('/settings', [TwoFactorAuthController::class, 'confirm'])->name('two-factor.confirm');

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/admin/login', function () {
    return redirect('/login');
});

//Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {
//    Route::get('/dashboard', 'App\Http\Controllers\SnippetsController@index')->name('dashboard');
//});
Route::get('/dashboard', function () {
    return redirect('/');
});

Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);
Route::get('/analytics', 'App\Http\Controllers\AnalyticsController@index')->name('analytics.dashboard');

/** CATCH-ALL ROUTE for Backpack/PageManager - needs to be at the end of your routes.php file  **/
Route::get('{page}/{subs?}', ['uses' => '\App\Http\Controllers\PageController@cmsPage'])->where([
    'page' => '^(((?=(?!admin))(?=(?!\/)).))*$',
    'subs' => '.*',
]);
