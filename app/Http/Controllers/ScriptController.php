<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;
use App\Distritos;
use App\Iglesias;
use App\Remesas;
use DB;

class ScriptController extends Controller
{

    public static function inicio(){
        for($mes=1; $mes<=12; $mes++){
            $mesChar = ($mes<10)? "0".$mes : $mes;
            $array[] = [
                "fecha" => "2018-$mesChar-01",
                "hora" => "10:00:00",
                "mes_informe" => $mes,
                "anio_informe" => "2018"
            ];
        }
        for($mes=1; $mes<=8; $mes++){
            $mesChar = ($mes<10)? "0".$mes : $mes;
            $array[] = [
                "fecha" => "2019-$mesChar-01",
                "hora" => "10:00:00",
                "mes_informe" => $mes,
                "anio_informe" => "2019"
            ];
        }
        
        $res = DB::table('iglesias')
                     ->select(DB::raw('users.id as id_pastor,
                     iglesias.id as id_iglesia,
                     iglesias.nombre'))
                     ->join('distritos', 'iglesias.id_distrito', '=', 'distritos.id')
                     ->join('pastores', 'distritos.id', '=', 'pastores.id_distrito')
                     ->join('users', 'pastores.id_user', '=', 'users.id')
                     ->where('users.id_rol', 3)
                     ->get();
        return view('modulos.query', ["res" => $res, "fechas" => $array]);
    }
    
}
