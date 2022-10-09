<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\User;
use Illuminate\Http\Request;

class InstructorController extends Controller {
    public function __construct() {
        $this->middleware('auth:api');
    }

    // register students only
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
            if($type != 'student') {
                return false;
            }
            if($validator->fails()) {
                return false;
            }
            return true;
    }

    public function createAssignment() {
        if(! $this->createRequirements()) {
            return response()->json([
                'error' => true,
            ]);
        }

        $assignment = new Assignment();
        $assignment->title = request()->get('title');
        $assignment->description = request()->get('description');
        $assignment->save();

        $students = User::all()->where('type', 'student');
        foreach($students as $st) {
            $currentAssignments = $st->assignments;
            // add new course to them
            $currentAssignments[] = [
                "title" => $assignment->title,
                "description" => $assignment->description,
            ];
            // assign new array to the assignments
            $st->assignments = $currentAssignments;
            // add assignment to each student
            $st->update();
        }
        return response()->json([
            'message' => "assignment created",
            'assignment' => $assignment,
            'error' => false,
        ]);
    }

    public function createAnnouncement() {
        if(! $this->createRequirements()) {
            return response()->json([
                'error' => true,
            ]);
        }

        $announcement = new Announcement();
        $announcement->title = request()->get('title');
        $announcement->description = request()->get('description');
        $announcement->save();

        $students = User::all()->where('type', 'student');
        foreach($students as $st) {
            $currentAnnouncements = $st->announcements;
            // add new course to them
            $currentAnnouncements[] = [
                "title" => $announcement->title,
                "description" => $announcement->description,
            ];
            // assign new array to the announcements
            $st->announcements = $currentAnnouncements;
            // add assignment to each student
            $st->update();
        }

        return response()->json([
            'message' => "announcement created",
            'announcement' => $announcement,
            'error' => false,
        ]);
    }

    function createRequirements() {
        $validator = validator()->make(request()->all(), [
            'title' => 'required',
            'description' => 'required',
        ]);
        if($validator->fails()) {
            return false;
        }
        return true;
    }
}
