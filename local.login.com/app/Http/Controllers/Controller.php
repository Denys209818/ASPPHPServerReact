<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(title="HomeWork", version="0.1")
 */
/**
 * @OA\SecurityScheme (
 *type="http",
 *description="desc",
 *name="Name security scheme",
 *in="header",
 *scheme="bearer",
 *bearerFormat="JWT",
 *securityScheme="bearerAuth"
 *)
 */

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
