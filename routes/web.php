<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\SnippetsController;
use App\Http\Controllers\SocialController;

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

Route::controller(SnippetsController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/snippet/{slug}', 'view')->name('snippet.view');
});

Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {
    Route::get('/dashboard', 'App\Http\Controllers\SnippetsController@index')->name('dashboard');
});

Route::get('/payment', function () {
    return Inertia::render('Payment');
})->name('payment');

Route::controller(StripePaymentController::class)->group(function () {
    Route::get('/payment/credit_card', 'stripePost')->name('stripe.post');
    Route::get('/payment/confirm', 'successfulPayment')->name('stripe.confirm');
});

Route::get('/snippets', 'App\Http\Controllers\Admin\SnippetCrudController@getSnippets')->name('request_snippets');

/*
|--------------------------------------------------------------------------
| SOCIAL LOGIN ROUTES
|--------------------------------------------------------------------------
*/
Route::get('login/{provider}', 'App\Http\Controllers\SocialController@redirect');
Route::get('login/{provider}/callback', 'App\Http\Controllers\SocialController@Callback');
Route::post('/2fa-confirm', [TwoFactorAuthController::class, 'confirm'])->name('two-factor.confirm');
Route::post('/settings', [TwoFactorAuthController::class, 'confirm'])->name('two-factor.confirm');

Route::get('/admin/login', function () {
    return redirect('/login');
});
