<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Distritos extends Model
{
    protected $table = 'distritos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 'codigo_dt',
    ];

    public function iglesias(){
        return $this->hasMany('App\Iglesias', 'id_distrito');
    }

}
