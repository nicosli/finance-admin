<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\User;

class ListsController extends Controller
{
    public $successStatus = 200;

    public static function pastores(){
        $pastores = User::where('id_rol', '=', 3)->get();
        return response()->json([
            'results' => $pastores
        ]);
    }
    
}
