<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller {
    public function __construct() {
        $this->middleware('auth:api');
    }

    function displayCourses() {
        $student = auth()->user();
        return $student->courses;
    }

    function displayAssignments() {
        $student = auth()->user();
        return $student->assignments;
    }
}
