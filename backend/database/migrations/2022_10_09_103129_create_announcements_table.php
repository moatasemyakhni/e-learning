<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('announcements', function (Blueprint $table) {
            $table->string('title');
            $table->string('descripiton');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('announcements');
    }
};
