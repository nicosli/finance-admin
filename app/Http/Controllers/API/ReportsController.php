<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\Iglesias;
use App\Remesas;

class ReportsController extends Controller
{
    public static function pastores($id_distrito, $mes){
        
        $informe = Iglesias::with(['informes' => function($query) use ($mes){
            $query->whereBetween('fecha', ['2019-'.$mes.'-01', '2019-'.$mes.'-31']);
        }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();

        $remesas = Remesas::all();
        
        return response()->json([
            'remesas' => $remesas,
            'results' => $informe
        ]);
    }
}
