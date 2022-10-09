<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller {
    public function __construct() {
        $this->middleware('auth:api');
    }

    function displayCourses() {
        $student_id = auth()->user();
        return $student_id;
    }
}
