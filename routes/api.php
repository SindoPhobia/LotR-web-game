<?php

use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return response('test')->withCookie(cookie('test', 'woah?'));
});
