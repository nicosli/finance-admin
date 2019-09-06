<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;
use App\Distritos;
use App\Iglesias;
use App\Remesas;
use App\Informes;

class DashboardController extends Controller
{
    public $successStatus = 200;

    public static function resumen($mes, $anio){
        $users = User::where('id_rol', '=', 3)->get();        
        $distritos = Distritos::all();
        $iglesias = Iglesias::all();
        $diezmos = Informes::where('anio_informe', $anio)
                ->where('mes_informe', '<=', $mes)
                ->where('id_remesa', 1)
                ->sum('importe');
        
        $planDesarrollo = Informes::where('anio_informe', $anio)
                ->where('mes_informe', '<=', $mes)
                ->where('id_remesa', 3)
                ->sum('importe');
        
        $ofrendasMisioneras = Informes::where('anio_informe', $anio)
                ->where('mes_informe', '<=', $mes)
                ->where('id_remesa', 2)
                ->sum('importe');
        
        $results = [
            "pastores" => count($users),
            "distritos" => count($distritos),
            "iglesias" => count($iglesias),
            "diezmos" => $diezmos,
            "planDesarrollo" => $planDesarrollo,
            "ofrendasMisioneras" => $ofrendasMisioneras
        ];
        return response()->json([
            'results' => $results
        ]);
    }
    
}
