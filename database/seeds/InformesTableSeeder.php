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

        foreach ($pastores as $pastor) {
            $totalInformes = 0;
            $totalInputal = 0;
            $totalPuntual = 0;
            $id_pastor = $pastor->id;
            $iglesias = DB::table('iglesias')
                ->where('id_distrito', '=', $pastor->id_distrito)
                ->get();

            foreach ($iglesias as $iglesia) {

                // Insertar datos para los años 2024 y 2025
                foreach ([2024, 2025] as $anio) {

                    // Para cada año, hasta el mes anterior si es año actual
                    $currentYear = date('Y');
                    $currentMonth = date('n');

                    $lastMonth = 12; // Por default todos los meses

                    if ($anio == $currentYear) {
                        // Si es el año actual, calcula hasta el mes anterior
                        if ($currentMonth == 1 && (int)date('d') < 15) {
                            $anio = $currentYear - 1;
                            $lastMonth = 12;
                        } else {
                            $lastMonth = ((int) date('d') < 15) ? $currentMonth - 1 : $currentMonth;
                        }
                    }

                    for ($x = 1; $x <= $lastMonth; $x++) {
                        $caso = rand(1, 2);
                        switch ($caso) {
                            case 1: // puntual
                                $fecha = date("$anio-$x-" . rand(1, 5));
                                break;
                            case 2: // no puntual
                                $fecha2[0] = date("$anio-$x-" . rand(6, 10));
                                $fecha2[1] = date("$anio-$x-" . rand(11, 18));
                                break;
                        }

                        $fecha_final = ($caso == 1) ? $fecha : $fecha2[rand(0, 1)];

                        foreach ($remesas as $remesa) {
                            DB::table('informes')->insert([
                                'id_pastor' => $id_pastor,
                                'id_remesa' => $remesa->id,
                                'id_iglesia' => $iglesia->id,
                                'importe' => rand(1200, 15000),
                                'fecha' => $fecha_final,
                                'hora' => date('H:i:s'),
                                'mes_informe' => $x,
                                'anio_informe' => $anio
                            ]);
                            $totalInformes++;
                        }

                        if ($x == 6) {
                            if ($caso == 1)
                                $totalInputal++;
                            else if ($caso == 2)
                                $totalPuntual++;
                        }
                    }
                }
            }

            // Actualizar la puntualidad después de insertar
            if ($totalInformes > 0) {
                $puntualidad = number_format(($totalPuntual / $totalInformes) * 100, 0);
                DB::table('users')
                    ->where('id', $id_pastor)
                    ->update(['puntualidad' => $puntualidad]);
            }

            $this->command->info($pastor->name . " Total Informes " . $totalInformes);
        }
    }

}
