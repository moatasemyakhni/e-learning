<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    function checkEmail(Request $req) {
        $userEmail = User::where('email', $req->email)->count();
        if($userEmail === 0) {
            return json_encode(['available' => true]);
        }
        return json_encode(['available' => false]);

    }

}
