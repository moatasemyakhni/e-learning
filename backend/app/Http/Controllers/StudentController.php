<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $assignments = $student->assignments;
       
        //return $student;
        if(sizeof($assignments) !== 0) {
            foreach($student->assignments as $key => $val) {
                if(sizeof($val) > 2) {
                    if($val['_id'] === request()->get('_id')) {
                        DB::collection('users')
                        ->where('_id', auth()->id())
                        ->pull('assignments', $val);
                        //return $assignments;
                        return response()->json(['error' => false]);
                    }
                }
            }
            
        }
        
        // no such assignment
        return response()->json(['error' => true]);
    }
}
