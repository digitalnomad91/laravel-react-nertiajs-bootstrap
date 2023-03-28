<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripePaymentController;

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

Route::get('/', 'App\Http\Controllers\SnippetsController@index')->name('home');

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

Route::get('/admin/login', function () {
    return redirect('/login');
});
