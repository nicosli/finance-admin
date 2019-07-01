<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'nombre' => 'Super Admin',
            'descripccion' => 'Usuario con todos los permisos'
        ]);
        DB::table('roles')->insert([
            'nombre' => 'Cajero',
            'descripccion' => 'Usuario para ser cajero'
        ]);
        DB::table('roles')->insert([
            'nombre' => 'Pastor',
            'descripccion' => 'Usuario con permiso para pastores'
        ]);
    }
}
