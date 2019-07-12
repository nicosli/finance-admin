<?php

use Illuminate\Database\Seeder;

class InformesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $remesas = DB::table('remesas')->get();
        $pastores = DB::table('users')
            ->join('pastores', 'users.id', '=', 'pastores.id_user')
            ->where('id_rol', '=', 3)
            ->get();
        foreach ($pastores as $key => $pastor) {
            $iglesias = DB::table('iglesias')
                ->where('id_distrito', '=', $pastor->id_distrito)
                ->get();

            foreach ($iglesias as $key => $iglesia) {
                $mes = date('m');
                $mes = ((int) date('d') < 15)? $mes-1 : $mes;
                $anio = "2019";
                // $mes = 12;
                // $anio = "2018";
                for($x=1; $x<=$mes; $x++) {
                    $caso = rand(1,2);
                    switch ($caso) {
                        case 1: // puntual
                            $fecha = date($anio."-$x-".rand(1,5));
                            break;
                        
                        case 2: // no puntual
                            $fecha2[0] = date($anio."-$x-".rand(6,10));
                            $fecha2[1] = date($anio."-$x-".rand(11,18));
                            break;
                        default:
                            # code...
                            break;
                    }
                    
                    $fecha_final = ($caso == 1)? $fecha : $fecha2[rand(0,1)];
                    foreach($remesas as $key => $remesa){
                        $id_pastor = $pastor->id;
                        $id_remesa = $remesa->id;
                        $id_iglesia = $iglesia->id;
                        $importe = rand(1200, 15000);
                        DB::table('informes')->insert([
                            'id_pastor' => $id_pastor,
                            'id_remesa' => $id_remesa,
                            'id_iglesia' => $id_iglesia,
                            'importe' => $importe,
                            'fecha' => $fecha_final,
                            'hora' => date('H:i:s'),
                            "mes_informe" => $x,
                            "anio_informe" => $anio
                        ]);
                    }
                    $this->command->info($anio." - ".$x);
                }
            }
            
        }
    }
}
