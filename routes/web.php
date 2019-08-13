<?php

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

Route::get('/images', 'AuthenticationController@index');

Route::redirect('/', '/login', 301);

// add authentication for middleware later
Route::group(['prefix' => 'login'], function () {
    Route::get('/{vue?}', function () {
        return view('welcome');
    })->where('vue', '.*');  
});