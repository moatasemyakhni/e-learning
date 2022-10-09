<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
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

        return response()->json([
            'message' => "assignment created",
            'assignment' => $assignment,
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
