<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Informes extends Model
{
    protected $table = 'informes';

    public function remesa(){
        return $this->belongsTo('App\Remesas', 'id_remesa');
    }
}
