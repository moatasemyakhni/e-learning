<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Student {

    public function handle(Request $request, Closure $next) {
        $user = auth()->user();
        if($user->type === "student") {
            return $next($request);
        }

        dd("Only Students allowed");
    }
}
