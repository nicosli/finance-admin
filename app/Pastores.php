<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pastores extends Model
{
    protected $table = 'pastores';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_user', 'id_distrito', 'password',
    ];

    public function distrito(){
        return $this->belongsTo('App\Distritos', 'id_distrito');
    }

    public function user(){
        return $this->belongsTo('App\User', 'id_user');
    }
}
