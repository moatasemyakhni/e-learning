<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'

], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user_info', [AuthController::class, 'user']);
    Route::post('assign_course', [AdminController::class, 'assignCourseToInstructor']);
    Route::post('register_course', [AdminController::class, 'registerCourse']);
    Route::post('create_assignment', [InstructorController::class, 'createAssignment']);
    Route::post('create_announcement', [InstructorController::class, 'createAnnouncement']);
    Route::get('courses', [StudentController::class, 'displayCourses']);
    Route::get('assignments', [StudentController::class, 'displayAssignments']);
});
// public Routes
Route::post('check_email', [UserController::class, 'checkEmail']);