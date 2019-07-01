<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_pastor');
            $table->integer('id_remesa');
            $table->integer('id_iglesia');
            $table->double('importe', 15, 2);
            $table->date('fecha');
            $table->time('hora');
            $table->index('id_pastor', 'id_pastor');
            $table->index('id_remesa', 'id_remesa');
            $table->index('id_iglesia', 'id_iglesia');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('informes');
    }
}
