<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Instructor {
    public function handle(Request $request, Closure $next) {
        $user = auth()->user();
        if($user->type === "instructor") {
            return $next($request);
        }

        dd("Only Instructors are allowed");
    }
}
