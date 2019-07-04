<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Super Admin
        DB::table('users')->insert([
            'name' => 'Nicolás Vicente',
            'last_name' => 'Navarrete Clemente',
            'codigo_er' => 'NCLE-01',
            'email' => 'nicosli@gmail.com',
            'mobile' => '9993900074',
            'id_rol' => 1,
            'password' => bcrypt('ok00'),
            'remember_token' => str_random(10),
        ]);
        // Cajero
        DB::table('users')->insert([
            'name' => $faker->firstName(),
            'last_name' => $faker->lastName(),
            'codigo_er' => 'NCLE-01',
            'email' => $faker->email,
            'mobile' => $faker->phoneNumber,
            'id_rol' => 2,
            'password' => bcrypt('ok00'),
            'remember_token' => str_random(10),
        ]);

        // Pastores
        for($x=0; $x<25; $x++){
            DB::table('users')->insert([
                'name' => $faker->firstName('male'),
                'last_name' => $faker->lastName(),
                'codigo_er' => 'NCLE-'.rand(100,200),
                'email' => $faker->email,
                'mobile' => $faker->phoneNumber,
                'id_rol' => 3,
                'password' => bcrypt('ok00'),
                'remember_token' => str_random(10),
            ]); 
        }
    }
}
