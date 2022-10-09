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
