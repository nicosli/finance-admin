<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIglesiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('iglesias', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_distrito');
            $table->char('nombre', 50);
            $table->char('codigo_t', 20);
            $table->boolean('excepcion');
            $table->index('id_distrito', 'id_distrito');
            $table->decimal('pdocd', 5, 2)->nullable()->comment('Porcentaje de diferencia de ofrendas en comparación con el diezmo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('iglesias');
    }
}
