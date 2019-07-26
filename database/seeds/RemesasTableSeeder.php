<?php

use Illuminate\Database\Seeder;

class RemesasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('remesas')->insert([
            'nombre' => 'Diezmos'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Ofrenda Misionera'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Plan de Desarrollo'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Primisias'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Recolección'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Gratitud Anual'
        ]);
        DB::table('remesas')->insert([
            'nombre' => 'Ayuda Educativa'
        ]);
    }
}
