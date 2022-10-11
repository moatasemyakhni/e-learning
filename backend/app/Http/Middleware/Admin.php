<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin {
    public function handle(Request $request, Closure $next) {
        $user = auth()->user();
        if($user->type === "admin") {
            return $next($request);
        }

        return response()->json([
            'error' => true,
            'message' => 'Only Admins Are Allowed',
        ]);
        //dd("Only Admins are allowed");
    }
}
