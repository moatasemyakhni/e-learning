<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'

], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user_info', [AuthController::class, 'user']);

    Route::group(['middleware' => 'admin'], function() {
        Route::post('register_people', [AdminController::class, 'register']);
        Route::post('assign_course', [AdminController::class, 'assignCourseToInstructor']);
        Route::post('register_course', [AdminController::class, 'registerCourse']);
        Route::get('get_instructors', [AdminController::class, 'displayInstructors']);
        Route::get('get_courses', [AdminController::class, 'displayCourses']);
    });

    Route::group(['middleware' => 'instructor'], function() {
        Route::post('register_student', [InstructorController::class, 'register']);
        Route::post('create_assignment', [InstructorController::class, 'createAssignment']);
        Route::post('create_announcement', [InstructorController::class, 'createAnnouncement']);
    });

    // information of student himself
    Route::group(['middleware' => 'student'], function() {
        Route::get('courses', [StudentController::class, 'displayCourses']);
        Route::get('assignments', [StudentController::class, 'displayAssignments']);
        Route::get('announcements', [StudentController::class, 'displayAnnouncements']);
        Route::get('non_registered_courses', [StudentController::class, 'displayNonRegisteredCourses']);
        Route::post('submit_assignment', [StudentController::class, 'submitAssignment']);
        Route::post('student_register_course', [StudentController::class, 'assignCourse']);
    });
});
// public Routes
Route::post('check_email', [UserController::class, 'checkEmail']);