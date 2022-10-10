<?php

namespace App\Http\Controllers;

use App\Models\User;
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

    function assignCourse() {
        $student_id = request()->get('_id');
        $courses = request()->get('courses');

        $student = User::find($student_id);
        // course already assigned to student
        if(in_array($courses, $student->courses)) {
            return response()->json([
                'error' => true,
            ]);
        }  
        // store current courses of student in variable
        $currentCourses = $student->courses;
        // add new course to them
        $currentCourses[] = $courses;
        // assign new array to the courses
        $student->courses = $currentCourses;
        $student->update();

        return response()->json([
            "error" => false,
        ]);
    }

    function registerCourseRequirements() {
        $validator = validator()->make(request()->all(), [
            'code' => 'required',
        ]);
        if($validator->fails()) {
            return false;
        }
        return true;
    }
}
