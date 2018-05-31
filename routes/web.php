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

/*Route::get('/', function () {
    return view('welcome');
});*/


Route::group(['middleware'=>['web'],'namespace'=>'Admin'],function(){
    Route::get('login', 'IndexController@login_index');
    Route::get('index', 'IndexController@index');
    Route::get('ad/imgCode',"IndexController@imgCode");
    Route::post('ad/loginuser',"IndexController@login");
});