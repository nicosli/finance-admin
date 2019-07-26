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
    Route::get('/list/distritos', function(){
        return view('modulos.listaDistritos');
    });
    Route::get('/list/iglesias', function(){
        return view('modulos.listaIglesias');
    });

    Route::get('/informes/mensual/distrito/{id_distrito}', function($id_distrito){
        return view('modulos.infoMensualDistrito', ["id_distrito" => $id_distrito]);
    });

    Route::get('/informes/iglesia/{id_iglesia}', function($id_iglesia){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.detailsIglesia', [
            "id_iglesia" => $id_iglesia,
            "mes" => $mes
        ]);
    });

    Route::get('/informes/anual/distrito/{id_distrito}', function($id_distrito){
        $mes = date('m');
        if($mes != '01')
            $mes -= 1;
        return view('modulos.infoAnualDistrito', [
            "id_distrito" => $id_distrito,
            "mes" => $mes
        ]);
    });
});
