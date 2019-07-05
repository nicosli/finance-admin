<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;
use App\Distritos;
use App\Iglesias;

class ListsController extends Controller
{
    public $successStatus = 200;

    public static function pastores(){
        $users = User::with([
            'pastor', 
            'pastor.distrito', 
            'pastor.distrito.iglesias'
        ])
            ->where('id_rol', '=', 3)
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
    
}
