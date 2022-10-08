<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function register() {
        if(!$this->registerRequirements()) {
            response()->json([
                "message" => 'Register failed',
                "error" => true,
            ]);
        }

    }

    public function registerRequirements() {
        $validator = validator()->make(request()->all(), [
            'name' => "string|required",
            "email" => "email|required",
            "password" => "string|min:6|max:255",
            'type' => "required",
        ]);
        $type = request()->get('type');
        if($type != 'admin' && $type != 'instructor' && $type != 'student') {
            return false;
        }
        if($validator->fails()) {
            return false;
        }
        return true;
    }

    public function login() {
        $credentials = request(['email', 'password']);
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized']);
        }
        return $this->respondWithToken($token);
    }

    public function me() {
        return response()->json(auth()->user());
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh() {
        return $this->respondWithToken(auth()->JWTAuth::refresh());
    }

    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl'),
            'error' => false,
        ]);
    }
}