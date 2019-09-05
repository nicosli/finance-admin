<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
    Route::get('/list/pastores', 'API\ListsController@pastores');    
    Route::get('/list/iglesias', 'API\ListsController@iglesias');
    Route::get('/details/iglesia/{id_iglesia}', 'API\ListsController@getIglesia');

    Route::get('/list/distritos', 'API\ListsController@distritos');
    Route::get('/details/distrito/{id}', 'API\ListsController@detailsDistrito');
    Route::get('/list/remesas', 'API\ListsController@remesas');
    Route::get('/reports/pastores/{id_distrito}/{mes}/{anio}', 'API\ReportsController@pastores');
    Route::get('/reports/comparative/byChurch/{id_iglesia}/{id_remesa}', 'API\ReportsController@comparativo');
    Route::get('/reports/comparative/byDistrict/{id_distrito}/{id_remesa}/{mes}/{anio}/{tipo_reporte}', 'API\ReportsController@comparativoDis');
});