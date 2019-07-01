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
                foreach ($remesas as $key => $remesa) {
                    
                }
            }
            
        }
    }
}
