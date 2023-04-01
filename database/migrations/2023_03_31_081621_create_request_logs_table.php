<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('request_logs', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('method');
            $table->string('response_time');
            $table->integer('number_of_requests');
            $table->string('day');
            $table->string('hour');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('request_logs');
    }
};
