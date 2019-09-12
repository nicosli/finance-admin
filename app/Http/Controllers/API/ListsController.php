<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;
use App\Distritos;
use App\Iglesias;
use App\Remesas;

class ListsController extends Controller
{
    public $successStatus = 200;

    public static function getIglesia($id_iglesia){
        $iglesia = Iglesias::with([
            'distrito',
            'pastor.user'
        ])->find($id_iglesia);
        return response()->json([
            'results' => $iglesia
        ]);
    }

    public static function iglesias(){
        $iglesias = Iglesias::with([
            'distrito',
            'distrito.pastor.user'
        ])->get();
        return response()->json([
            'results' => $iglesias
        ]);
    }

    public static function distritos(){
        $distritos = Distritos::with([
            'iglesias',
            'pastor.user'
        ])->get();
        return response()->json([
            'results' => $distritos
        ]);
    }

    public static function pastores(){
        $users = User::with([
            'pastor', 
            'pastor.distrito', 
            'pastor.distrito.iglesias'
        ])->where('id_rol', '=', 3)
            ->get();

        $pastores = count($users);
        $iglesias = 0;
        foreach ($users as $key => $pastor) {
            if(isset($pastor->pastor->distrito->iglesias))
                $iglesias += count($pastor->pastor->distrito->iglesias);
        }
        $distritos = Distritos::all();
        return response()->json([
            'results' => $users,
            'analytics' => [
                "pastores" => $pastores,
                "iglesias" => $iglesias,
                "distritos" => count($distritos)
            ]
        ]);
    }

    public static function detailsDistrito($id){
        $distrito = Distritos::with([
            'pastor.user'
        ])
        ->where('id', '=', $id)
        ->get();
        return response()->json([
            'results' => $distrito[0]
        ]);
    }

    public static function remesas(){
        $remesas = Remesas::all();        
        return response()->json([
            'results' => $remesas
        ]);
    }
    
}
