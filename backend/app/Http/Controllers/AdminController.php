<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

class AdminController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function registerCourse() {
        if(!$this->registerRequirements()) {
            return response()->json([
                "message" => 'Register course failed',
                "error" => true,
            ]);
        }
        $course = new Course();
        $course->code = request()->get('code');
        $course->save();
        return $course;
        $course = Course::create([
            'code' => request()->get('code'),
        ]);

        return response()->json([
            'message' => 'Course Created',
            'course' => $course,
            'error' => false,
        ]);

    }

    function assignCourseToInstructor() {
        $instructor_id = request()->get('_id');
        $courses = request()->get('courses');

        $instructor = User::find($instructor_id);
        if(in_array($courses, $instructor->courses)) {
            return response()->json([
                'error' => true,
            ]);
        }
        // store current courses of teacher in variable
        $currentCourses = $instructor->courses;
        // add new course to them
        $currentCourses[] = $courses;
        // assign new array to the courses
        $instructor->courses = $currentCourses;
        $instructor->update();

        return response()->json([
            "error" => false,
        ]);
    }

    function registerRequirements() {
        $validator = validator()->make(request()->all(), [
            'code' => 'required',
        ]);
        if($validator->fails()) {
            return false;
        }
        return true;
    }
}
