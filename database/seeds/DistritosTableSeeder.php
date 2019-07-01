<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class DistritosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $pastores = DB::table('users')
                    ->where('id_rol', '=', 3)
                    ->get();
        foreach ($pastores as $key => $pastor) {
            $nombre = $faker->citySuffix();
            $codigo_dt = $faker->cityPrefix().$faker->randomNumber();
            
            // Distrito
            $id_distrito = DB::table('distritos')->insertGetId([
                'nombre' => $faker->streetName(),
                'codigo_dt' => $faker->cityPrefix()
            ]);
            
            DB::table('pastores')->insert([
                'id_user' => $pastor->id,
                'id_distrito' => $id_distrito
            ]);

            
        }
    }
}
