<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Iglesias extends Model
{
    protected $table = 'iglesias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_distrito', 'nombre', 'codigo_t', 'excepcion'
    ];

    public function informes(){
        return $this->hasMany('App\Informes', 'id_iglesia');
    }

    public function distrito(){
        return $this->belongsTo('App\Distritos', 'id_distrito');
    }

    public function pastor(){
        return $this->belongsTo('App\Pastores', 'id_distrito', 'id_distrito');
    }
}
