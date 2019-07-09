<?php

namespace App\Http\Controllers\API;

use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\Iglesias;
use App\Remesas;
use App\Informes;

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

    public static function comparativo($id_iglesia, $id_remesa){
        $reporte = Informes::where('id_iglesia', '=', $id_iglesia)
        ->where('id_remesa', '=', $id_remesa)
        ->select(DB::raw('
            MONTH(fecha) as mesNumber,
            case MONTH(fecha) 
            WHEN 1 THEN "Enero"
            WHEN 2 THEN  "Febrero"
            WHEN 3 THEN "Marzo" 
            WHEN 4 THEN "Abril" 
            WHEN 5 THEN "Mayo"
            WHEN 6 THEN "Junio"
            WHEN 7 THEN "Julio"
            WHEN 8 THEN "Agosto"
            WHEN 9 THEN "Septiembre"
            WHEN 10 THEN "Octubre"
            WHEN 11 THEN "Noviembre"
            WHEN 12 THEN "Diciembre"
            END mes, YEAR(fecha) as anio, importe'))
        ->get();
        $mesTope = date('m') - 1;

        $meses = [];
        $importesActual = [];
        $importesAnterior = [];

        for($x=1; $x<=$mesTope; $x++){
            $mes = $x;
            $anio = date('Y');
            $anioAnterior = $anio - 1;
            $anioImporte = 0;
            $anioAnteriorImporte = 0;
            
            foreach ($reporte as $key => $val) {
                if($val->mesNumber == $mes)
                    if( ! in_array($val->mes, $meses))
                        $meses[] = $val->mes;

                if($val->anio == $anio AND $mes == $val->mesNumber)
                    $importesActual[] = $val->importe;

                if($val->anio == $anioAnterior AND $mes == $val->mesNumber)
                    $importesAnterior[] = $val->importe;
            }
        }
        $series[] = [
                "name" => (string)$anioAnterior,
                "type" => "column",
                "data" => $importesAnterior
        ];
        $series[] = [
                "name" => $anio,
                "type" => "column",
                "data" => $importesActual
        ];
        sleep(2);
        return response()->json([
            'options' => [
                "xaxis" => ["categories" => $meses]
            ],
            'series' => $series
        ]);
    }
}
