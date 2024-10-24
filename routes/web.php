<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Index');
})->name('index');

Route::get('/card-demo', function () {
    return inertia('CardDemo');
})->name('card-demo');
