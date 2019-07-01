<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class IglesiasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $distritos = DB::table('distritos')->get();
        foreach ($distritos as $key => $distrto) {
            for($x=0; $x<rand(10,18); $x++){
                DB::table('iglesias')->insert([
                    'nombre' => $faker->streetName(),
                    'codigo_t' => $faker->cityPrefix(),
                    'excepcion' => 0,
                    'id_distrito' => $distrto->id
                ]);
            }
        }
    }
}
