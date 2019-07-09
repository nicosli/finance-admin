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
    Route::get('/licencia', function(){
        return view('modulos.licencia');
    });
    Route::get('/list/pastores', function(){
        return view('modulos.listaPastores');
    });
    Route::get('/list/pastores/{id_pastor}', function($id_pastor){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.infoPastores', ["id_pastor" => $id_pastor, "mes" => $mes]);
    });
    Route::get('/list/pastores/{id_pastor}/informes/iglesia/{id_iglesia}', function($id_pastor, $id_iglesia){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.infoIglesia', [
            "id_pastor" => $id_pastor, 
            "id_iglesia" => $id_iglesia,
            "mes" => $mes
        ]);
    });

    Route::get('/list/pastores/{id_pastor}/informes/distrito/{id_distrito}', function($id_pastor, $id_distrito){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.infoDistrito', [
            "id_pastor" => $id_pastor, 
            "id_distrito" => $id_distrito,
            "mes" => $mes
        ]);
    });
});
