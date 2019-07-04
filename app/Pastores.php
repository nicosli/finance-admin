<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pastores extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_user', 'id_distrito', 'password',
    ];
}
