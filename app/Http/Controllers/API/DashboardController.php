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
        $anio = (Int)$anio;
        $anioAnterior = $anio -1;

        $users = User::where('id_rol', '=', 3)->get();        
        $distritos = Distritos::all();
        $iglesias = Iglesias::all();
        
        $diezmosAnioActual = Informes::where('anio_informe', $anio)
                ->where('mes_informe', $mes)
                ->where('id_remesa', 1)
                ->sum('importe');
        $diezmosAnioAnterior = Informes::where('anio_informe', $anioAnterior)
                ->where('mes_informe', $mes)
                ->where('id_remesa', 1)
                ->sum('importe');
        
        $v1 = $diezmosAnioActual;
        $v2 = $diezmosAnioAnterior;
        if(($v1-$v2) < 0){
            $dif = (-1)*($v1-$v2);
            $icono = 'caret-down';
            $type = 'is-danger';
        }else{
            $dif = ($v1-$v2);
            $icono = 'caret-up';
            $type = 'is-success';
        }
        if($diezmosAnioAnterior != 0)
            $porcentaje = ( ($diezmosAnioActual * 100) / $diezmosAnioAnterior ) - 100;
        else
            $porcentaje = 0;
        
        $arrDiezmos = [
            "anios" => [
                "anio_actual" => $anio,
                "anio_anterior" => $anioAnterior
            ],
            "informes" => [
                "anio" => $diezmosAnioActual,
                "anio_anterior" => $diezmosAnioAnterior,
                "dif" => $dif,
                "porc" => $porcentaje,
                "icon" => $icono,
                "type" => $type
            ]
        ];

        
        $planDesarrollo = Informes::where('anio_informe', $anio)
                ->where('mes_informe', '=', $mes)
                ->where('id_remesa', 3)
                ->sum('importe');
        
        $ofrendasMisioneras = Informes::where('anio_informe', $anio)
                ->where('mes_informe', '=', $mes)
                ->where('id_remesa', 2)
                ->sum('importe');
        
        $results = [
            "diezmos" => $arrDiezmos,
            "pastores" => count($users),
            "distritos" => count($distritos),
            "iglesias" => count($iglesias),
            "planDesarrollo" => $planDesarrollo,
            "ofrendasMisioneras" => $ofrendasMisioneras
        ];
        return response()->json([
            'results' => $results
        ]);
    }
    
}
