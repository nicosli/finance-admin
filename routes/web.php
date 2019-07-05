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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['middleware' => 'auth'], function(){
    Route::get('/list/pastores', function(){
        return view('modulos.listaPastores');
    });
    Route::get('/list/pastores/{id}', function($id){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.infoPastores', ["id" => $id, "mes" => $mes]);
    });
});
