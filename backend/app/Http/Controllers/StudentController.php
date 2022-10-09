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

    function displayAnnouncements() {
        $student = auth()->user();
        return $student->announcements;
    }

    function submitAssignment() {
        // delete the assignment from student
        $student = auth()->user();
        if(sizeof($student->assignments) !== 0) {
            foreach($student->assignments as $val) {
                if($val->_id === request()->get('_id')) {
                    unset($val);
                    return response()->json(['error' => false]);
                }
            }
        }
        // no such assignment
        return response()->json(['error' => true]);
    }
}
