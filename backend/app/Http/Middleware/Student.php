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
        return response()->json([
            'error' => true,
            'message' => 'Only students Are Allowed',
        ]);
        //dd("Only Students allowed");
    }
}
