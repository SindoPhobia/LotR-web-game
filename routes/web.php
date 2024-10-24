<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    dump(request()->cookie());

    return 'Hello world';
});
