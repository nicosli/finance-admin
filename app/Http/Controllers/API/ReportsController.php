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
            $query->whereBetween('fecha', [date('Y').'-'.$mes.'-01', date('Y').'-'.$mes.'-31']);
        }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();

        $remesas = Remesas::all();
        
        return response()->json([
            'remesas' => $remesas,
            'results' => $informe
        ]);
    }

    public static function comparativoDis($id_distrito, $id_remesa, $mes){
        $anio = (int) date('Y');
        $anioAnterior = (int) ($anio -1);

        $iglesias = Iglesias::with(['informes' => function($query) use ($mes, $anio, $anioAnterior, $id_remesa){
            $query->where('mes_informe', '=', $mes);
            $query->where('id_remesa', '=', $id_remesa);
            $query->orWhere([
                ['anio_informe', '=', $anio],
                ['anio_informe', '=', $anioAnterior]
            ]);
        }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();
        $importeTotal = 0;
        $importeTotalAnterior = 0;
        foreach ($iglesias as $key => $iglesia) {
            $importeAnio = 0;
            $importeAnioAnterior = 0;
            foreach ($iglesia->informes as $key2 => $informe) {
                if($informe->anio_informe == $anio){
                    $importeAnio = $informe->importe;                    
                }
                if($informe->anio_informe == $anioAnterior){
                    $importeAnioAnterior = $informe->importe;
                }
                $importeTotal += $importeAnio;
                $importeTotalAnterior += $importeAnioAnterior;
            }

            $v1 = $importeAnioAnterior;
            $v2 = $importeAnio;
            $dif = ($v1-$v2) < 0 ? (-1)*($v1-$v2) : ($v1-$v2);
            $porcentaje = ( ($importeAnio * 100) / $importeAnioAnterior ) - 100;

            $iglesias[$key]->comparativo = [
                "anio" => $importeAnio,
                "anioAnterior" => $importeAnioAnterior
            ];
            
            $iglesias[$key]->analytics = [
                "dif" => $dif,
                "porcentaje" => $porcentaje
            ];
        }

        $totales[] = [
            "anio" => $anio,
            "suma" => $importeTotal
        ];
        $totales[] = [
            "anio" => $anioAnterior,
            "suma" => $importeTotalAnterior
        ];
        
        $v1 = $importeTotal;
        $v2 = $importeTotalAnterior;
        $dif = ($v1-$v2) < 0 ? (-1)*($v1-$v2) : ($v1-$v2);
        if($importeTotalAnterior > 0)
            $porcentaje = ( ($importeTotal * 100) / $importeTotalAnterior ) - 100;
        $analitycs = [
            "dif" => $dif,
            "porcentaje" => $porcentaje
        ];
        
        return response()->json([
            'anios' => [$anioAnterior, $anio],
            'totales' => $totales,
            'analitycs' => $analitycs,
            'results' => $iglesias
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
        
        return response()->json([
            'options' => [
                "xaxis" => ["categories" => $meses]
            ],
            'series' => $series
        ]);
    }
}
