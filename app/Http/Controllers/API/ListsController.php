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
        return response()->json([
            'results' => $users
        ]);
    }

    public static function details($id){
        $user = User::with([
            'pastor', 
            'pastor.distrito', 
            'pastor.distrito.iglesias'
        ])
        ->where('id', '=', $id)
        ->first();
        return response()->json([
            'results' => $user
        ]);
    }

    public static function remesas(){
        $remesas = Remesas::all();        
        return response()->json([
            'results' => $remesas
        ]);
    }
    
}
