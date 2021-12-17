<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * @OA\Post (
     *     path="/api/auth/login",
     *     tags={"Auth"},
     *     summary="Login",
     *     operationId="Login",
     *     @OA\Parameter (
     *      name="email",
     *      in="query",
     *      required=true,
     *      @OA\Schema (
     *          type="string"
     *      )
     *     ),
     *     @OA\Parameter (
     *      name="password",
     *      in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="string"
     *      )
     *      ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   )
     * )
     */
    public function  login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=> 'required|email',
            'password'=>'required|string|min:6'
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors, 422);
        }

        if(!$token = auth()->attempt($validator->validated()))
        {
            return response()->json(['error' => 'Дані введено не коректно!'], 401);
        }

        return $this->createNewToken($token);
    }
    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Register",
     *     tags={"Auth"},
     *     operationId="Register",
     *      @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password_confirmation",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="Image",
     *                     type="file"
     *                 ),
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *     response="200",
     *     description="Success"
     * )
     * )
     */

    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|email|unique:users|between:2,100',
            'name'=>'required|string|max:100',
            'password' =>'required|string|min:6|confirmed',
        ]);
        if($validator->fails())
        {
            return response()->json($validator->errors, 422);
        }
        $filename = "";
        if(!empty($_FILES))
        {
        $extension = pathinfo($_FILES['Image']['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . ".{$extension}";

        $dir = $_SERVER['DOCUMENT_ROOT'] . '/images/' . $filename;
        move_uploaded_file($_FILES['Image']['tmp_name'], $dir);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password),
                'Image' => $filename]
        ));

        if(!$token = auth()->attempt($validator->validated()))
        {
            return response()->json(['error' => 'Дані введено не коректно!'], 401);
        }

        return response()->json([
            'message'=> 'Успішно зареєстровано!',
            'user' => $user,
            'access_token' => $token
        ], 200);
    }

    /**
     * @OA\Post (
     *     path="/api/auth/logout",
     *     summary="Logout",
     *     tags={"Auth"},
     *     operationId="Logout",
     *     security={{"bearerAuth": {}}},
     *
     *     @OA\Response(
     *     response="200",
     *     description="Success logout",
     *     @OA\MediaType (
     *     mediaType="application/json"
     * )
     *
     * )
     * )
    */

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Успішно делоговано!'
        ], 200);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post (
     *     path="/api/auth/refresh",
     *     summary="Refresh",
     *     tags={"Auth"},
     *     operationId="Refresh",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response (
     *     response="200",
     *     description="Logout refresh"
     * )
     * )
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * @OA\Get (
     *     path="/api/auth/user-profile",
     *     summary="User Profile",
     *     tags={"Auth"},
     *     operationId="userProfile",
     *     security={{"bearerAuth": {}}},
     *
     *     @OA\Response(
     *     response="200",
     *     description="Success get user data",
     *
     * )
     * )
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    public function createNewToken($token)
    {
        return response()->json([
            'access_token'=>$token,
            'token_type'=>'bearer',
            'expires_in' => auth()->factory()->getTTL()*60,
            'user'=> Auth::user()
        ]);
    }
}
