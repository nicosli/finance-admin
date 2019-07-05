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

}
