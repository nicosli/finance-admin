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
    public static function pastores($id_distrito, $mes, $anio){

        $mesChar[1] = "Enero";
        $mesChar[2] = "Febrero";
        $mesChar[3] = "Marzo";
        $mesChar[4] = "Abril";
        $mesChar[5] = "Mayo";
        $mesChar[6] = "Junio";
        $mesChar[7] = "Julio";
        $mesChar[8] = "Agosto";
        $mesChar[9] = "Septiembre";
        $mesChar[10] = "Octubre";
        $mesChar[11] = "Noviembre";
        $mesChar[12] = "Diciembre";
        
        $informe = Iglesias::with(['informes' => function($query) use ($mes, $anio){
            $query->where('mes_informe', $mes)->where('anio_informe', $anio);
        }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();

        $mesAnt = ($mes == 1)? $mes : $mes-1;

        if($mesAnt > 1){
            $informeMesAnt = Iglesias::with(['informes' => function($query) use ($mesAnt, $anio){
                $query->where('mes_informe', $mesAnt)->where('anio_informe', $anio);
            }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();

            foreach ($informe as $key => $val) {
                foreach($val->informes as $key2 => $val2){
                    $id_remesa = $val2->id_remesa;
                    $mes_informe = $val2->mes_informe;
                    $id_iglesia = $val2->id_iglesia;
                    foreach ($informeMesAnt as $key3 => $val3) {
                        foreach($val3->informes as $key4 => $val4){
                            if($val4->id_remesa == $id_remesa AND $val4->id_iglesia == $id_iglesia){
                                $importeTotal = $val2->importe;
                                $importeTotalAnterior = $val4->importe;
                                $v1 = $importeTotal;
                                $v2 = $importeTotalAnterior;
                                
                                if(($v1-$v2) < 0){
                                    $dif = (-1)*($v1-$v2);
                                    $icono = 'caret-down';
                                    $type = 'is-danger';
                                }else{
                                    $dif = ($v1-$v2);
                                    $icono = 'caret-up';
                                    $type = 'is-success';
                                }
                                
                                if($importeTotalAnterior > 0)
                                    $porcentaje = ( ($importeTotal * 100) / $importeTotalAnterior ) - 100;
                                $analitycs = [
                                    "dif" => $dif,
                                    "porcentaje" => $porcentaje,
                                    "importe" => $val4->importe,
                                    "icono" => $icono,
                                    "type" => $type
                                ];
                                $informe[$key]->informes[$key2]->mes_anterior = $analitycs;
                            }
                        }
                    }
                }
            }
        }

        $remesas = Remesas::all();

        
        return response()->json([
            'dateReporte' => $mesChar[$mes] . ' - ' .$anio,
            'remesas' => $remesas,
            'results' => $informe
        ]);
    }

    public static function comparativoDis($id_distrito, $id_remesa, $mes, $anio, $tipo_reporte){
        $anioAnterior = (int) ($anio -1);

        $iglesias = Iglesias::with(['informes' => function($query) use ($mes, $anio, $anioAnterior, $id_remesa, $tipo_reporte){
            if($tipo_reporte == 2)
                $query->where('mes_informe', '=', $mes);
            if($tipo_reporte == 1)
                $query->where('mes_informe', '<=', $mes);
            $query->where('id_remesa', '=', $id_remesa);
            $query->orWhere([
                ['anio_informe', '=', $anio],
                ['anio_informe', '=', $anioAnterior]
            ]);
        }, 'informes.remesa'])->where('id_distrito', '=', $id_distrito)->get();
        
        $importeTotal = 0;
        $importeTotalAnterior = 0;
        $importeAnio = 0;
        $importeAnioAnterior = 0;
        $graph_importeAnio = [];
        $graph_importeAnioAnterior = [];
        
        foreach ($iglesias as $key => $iglesia) {
            $importeTotalAnterior = 0;
            $importeTotal = 0;
            $graph_iglesias[] = $iglesia->nombre;
            foreach ($iglesia->informes as $key2 => $informe) {
                if($informe->anio_informe == $anioAnterior){
                    $importeTotalAnterior += $informe->importe;
                    $importeAnioAnterior += $informe->importe;
                }
                if($informe->anio_informe == $anio){
                    $importeTotal += $informe->importe;
                    $importeAnio += $informe->importe;
                }
            }

            $graph_importeAnioAnterior[] = $importeTotalAnterior;
            $graph_importeAnio[] = $importeTotal;

            $v1 = $importeTotalAnterior;
            $v2 = $importeTotal;
            if(($v1-$v2) < 0){
                $icon = 'caret-up';
                $type = 'is-success';
            }else{
                $icon = 'caret-down';
                $type = 'is-danger';
            }
            $dif = ($v1-$v2) < 0 ? (-1)*($v1-$v2) : ($v1-$v2);
            if($importeTotalAnterior != 0)
                $porcentaje = ( ($importeTotal * 100) / $importeTotalAnterior ) - 100;
            else
                $porcentaje = 0;
            
            $points[] = [
                "x" => $iglesia->nombre,
                "seriesIndex" => 0,
                "label" => [
                    "borderColor" => '#775DD0',
                    "offsetY" => 0,
                    "style" => [
                        "color" => "#fff",
                        "background" => "#775DD0",
                        "fontSize" => 12
                    ],
                    "text"  => "Dif ".number_format($porcentaje,2)."%"
                ]
            ];

            $iglesias[$key]->comparativo = [
                "anio" => $importeTotal,
                "anioAnterior" => $importeTotalAnterior
            ];
            
            $iglesias[$key]->analytics = [
                "dif" => $dif,
                "porcentaje" => $porcentaje,
                "icon" => $icon,
                "type" => $type
            ];
        }

        $totales[] = [
            "anio" => $anio,
            "suma" => $importeAnio
        ];
        $totales[] = [
            "anio" => $anioAnterior,
            "suma" => $importeAnioAnterior
        ];
        
        $v1 = $importeAnio;
        $v2 = $importeAnioAnterior;
        if(($v1-$v2) < 0){
            $icon = 'caret-down';
            $type = 'is-danger';
        }else{
            $icon = 'caret-up';
            $type = 'is-success';
        }
        $dif = ($v1-$v2) < 0 ? (-1)*($v1-$v2) : ($v1-$v2);
        if($importeAnioAnterior > 0)
            $porcentaje = ( ($importeAnio * 100) / $importeAnioAnterior ) - 100;
        $analitycs = [
            "dif" => $dif,
            "porcentaje" => $porcentaje,
            "icon" => $icon,
            "type" => $type
        ];
        
        // Gráfica
        $series[] = [
                "name" => $anioAnterior,
                "type" => "column",
                "data" => $graph_importeAnioAnterior
        ];

        $series[] = [
                "name" => $anio,
                "type" => "column",
                "data" => $graph_importeAnio
        ];
        
        return response()->json([
            'anios' => [$anioAnterior, $anio],
            'totales' => $totales,
            'analitycs' => $analitycs,
            'results' => $iglesias,
            'graph' => [
                'options' => [
                    "xaxis" => ["categories" => $graph_iglesias]
                ],
                'series' => $series,
                "annotations" => ["points" => $points]
            ]
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
        $mesTope = date('m');

        $meses = [];
        $importesActual = [];
        $importesAnterior = [];

        for($x=1; $x<=$mesTope; $x++){
            $mes = $x;
            $anio = date('Y');
            $anioAnterior = $anio - 1;
            $anioImporte = 0;
            $anioAnteriorImporte = 0;
            $importeTotal = 0;
            $importeTotalAnterior = 0;
            
            foreach ($reporte as $key => $val) {
                if($val->mesNumber == $mes)
                    if( ! in_array($val->mes, $meses))
                        $meses[] = $val->mes;

                if($val->anio == $anio AND $mes == $val->mesNumber){
                    $importesActual[] = $val->importe;
                    $importeTotal += $val->importe;
                }

                if($val->anio == $anioAnterior AND $mes == $val->mesNumber){
                    $importesAnterior[] = $val->importe;
                    $importeTotalAnterior += $val->importe;
                }
            }

            $v1 = $importeTotalAnterior;
            $v2 = $importeTotal;
            $dif = ($v1-$v2) < 0 ? (-1)*($v1-$v2) : ($v1-$v2);
            if($importeTotalAnterior != 0)
                $porcentaje = ( ($importeTotal * 100) / $importeTotalAnterior ) - 100;
            else
                $porcentaje = 0;

            $points[] = [
                "x" => $meses[$mes-1],
                "seriesIndex" => 0,
                "label" => [
                    "borderColor" => '#775DD0',
                    "offsetY" => 0,
                    "style" => [
                        "color" => "#fff",
                        "background" => "#775DD0",
                        "fontSize" => 12
                    ],
                    "text"  => "Dif ".number_format($porcentaje,2)."%"
                ]
            ];
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
            'series' => $series,
            "annotations" => ["points" => $points]
        ]);
    }
}
