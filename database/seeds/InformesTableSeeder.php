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
            $this->command->info($pastor->name.' - '.$pastor->id_distrito);
            $iglesias = DB::table('iglesias')
                ->where('id_distrito', '=', $pastor->id_distrito)
                ->get();

            foreach ($iglesias as $key => $iglesia) {
                $mes = date('m');
                $mes = ((int) date('d') < 15)? $mes-1 : $mes;
                for($x=1; $x<=$mes; $x++) {
                    $caso = rand(1,2);
                    switch ($caso) {
                        case 1: // puntual
                            $fecha = date("Y-$x-".rand(1,5));
                            break;
                        
                        case 2: // no puntual
                            $fecha2[0] = date("Y-$x-".rand(10,15));
                            $fecha2[1] = date("Y-$x-".rand(10,15));
                            break;
                        default:
                            # code...
                            break;
                    }
                    
                    foreach($remesas as $key => $remesa){
                        $id_pastor = $pastor->id;
                        $id_remesa = $remesa->id;
                        $id_iglesia = $iglesia->id;
                        $importe = rand(1200, 15000);
                        $fecha_final = ($caso == 1)? $fecha : $fecha2[0];
                        DB::table('informes')->insert([
                            'id_pastor' => $id_pastor,
                            'id_remesa' => $id_remesa,
                            'id_iglesia' => $id_iglesia,
                            'importe' => $importe,
                            'fecha' => $fecha_final,
                            'hora' => date('H:i:s')
                        ]);
                    }
                }
            }
            
        }
    }
}
