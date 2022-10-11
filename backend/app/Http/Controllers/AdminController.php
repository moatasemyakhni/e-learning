<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

class AdminController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }
    
    public function register() {
        if(!$this->registerRequirements()) {
            return response()->json([
                "message" => 'Register failed',
                "error" => true,
            ]);
        }
        $user = User::create([
            'name' => request()->get('name'),
            'email' => request()->get('email'),
            'password' => bcrypt(request()->get('password')),
            'type' => request()->get('type'),
        ]);

        return response()->json([
            'message' => 'User Created',
            'user' => $user,
            'error' => false,
        ]);

    }

    public function registerRequirements() {
            $validator = validator()->make(request()->all(), [
                'name' => "string|required",
                "email" => "email|required",
                "password" => "string|min:6|max:255",
                'type' => "required",
            ]);
            $type = request()->get('type');
            if($type != 'instructor' && $type != 'student') {
                return false;
            }
            if($validator->fails()) {
                return false;
            }
            return true;
    }

    public function registerCourse() {
        if(!$this->registerCourseRequirements()) {
            return response()->json([
                "message" => 'Register course failed',
                "error" => true,
            ]);
        }

        $course = new Course();
        $course->code = request()->get('code');
        $course->save();

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
        if(is_null($instructor->courses)) {
            $instructor->courses = [];
        }
        
        // check if course already assigned to instructor
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

    function registerCourseRequirements() {
        $validator = validator()->make(request()->all(), [
            'code' => 'required',
        ]);
        if($validator->fails()) {
            return false;
        }
        return true;
    }

    function displayCourses() {
        return Course::all();
    }

    function displayInstructors() {
        return User::where('type', 'instructor');
    }
}
