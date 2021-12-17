<?php

namespace App\Http\Controllers;
use http\Env\Response;
use Validator;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/product",
     *     tags={"Product"},
     *     summary="Product",
     *     operationId="getItem",
     *     @OA\Parameter (
     *     name="page",
     *     in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="string"
     * )
     *     ),
     *     @OA\Parameter (
     *     name="search",
     *     in="query",
     *     @OA\Schema (
     *     type="string"
     * )
     *     ),
     *     @OA\Response(
     *     response=200,
     *     description="Add item is success",
     *     @OA\MediaType (
     *     mediaType="application/json"
     * )
     * )
     * )
    */
    public function getPage(Request $request)
    {
        $search = isset($request["search"]) ? $request["search"] : "";
        if(!empty($search))
        {
            $isInt = ctype_digit($search);
            if($isInt)
            {
                $betweenPrice = intval($search);
                $products = Product::whereBetween('price', [$betweenPrice-100, $betweenPrice+100])->paginate(3);
                return response()->json([
                    'data' => $products,
                    'search' => $search
                ]);
            }
          $products = Product::where('name', 'LIKE', '%'.$search . '%')
                ->orwhere('description', 'LIKE', '%'.$search . '%')->paginate(3);
        }else
        {
            $products = Product::paginate(3);
        }
        return response()->json([
            'data' => $products,
            'search' => $search
        ]);
    }
    /**
     * @OA\Post (
     *     path="/api/product/add",
     *     summary="Add",
     *     tags={"Product"},
     *     operationId="Add",
     *     @OA\Parameter (
     *     name="name",
     *     in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="string"
     * )
     * ),
     *     @OA\Parameter (
     *     name="description",
     *     in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="string"
     * )
     * ),
     *     @OA\Parameter (
     *     name="price",
     *     in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="integer"
     * )
     * ),
     *      @OA\Response(
     *          response=200,
     *          description="Success add item",
     *     @OA\MediaType(
     *     mediaType="application/json"
     * )
*     )
     *
     * )
    */
    public function addItem(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'price' =>'required'
        ]);

        if($validator->fails())
        {
            return $this->sendError('Add Item Error',
                $validator->errors());
        }

        $product = Product::create($input);
        return response()->json([
            'data' => $product,
            'message' => 'success added item',
            'success' => true
        ]);
    }
    /**
     * @OA\Post(
     *     path="/api/product/update/{id}",
     *     summary="update",
     *     tags={"Product"},
     *     operationId="Update",
     *     @OA\Parameter (
     *          name="id",
     *          required=true,
     *          in="path"
*     ),
     *     @OA\Parameter (
     *          name="name",
     *          required=true,
     *          in="query",
     *          @OA\Schema (
     *              type="string"
     * )
     *     ),
     *     @OA\Parameter (
     *          name="description",
     *          required=true,
     *          in="query",
     *          @OA\Schema (
     *              type="string"
     * )
     *     ),
     *     @OA\Parameter (
     *     name="price",
     *     in="query",
     *     required=true,
     *     @OA\Schema (
     *     type="integer"
     * )
     * ),
     *     @OA\Response(
     *     response=200,
     *     description="Update is success!",
     *      @OA\MediaType(
     *     mediaType="application/json"
     * )
     * )
     * )
    */
    public function updateItem($id, Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' =>'required',
            'description' => 'required',
            'price' =>'required'
        ]);

        if($validator->fails())
        {
            return response()->sendError('Update Error', $validator->errors());
        }

        $updatedItem = Product::find($id);
        if(is_null($updatedItem))
        {
            return response()->sendError('Not fount item');
        }
        $updatedItem->name = $input['name'];
        $updatedItem->description = $input['description'];
        $updatedItem->price = $input['price'];
        $updatedItem->save();

        return response()->json([
            'data' => $updatedItem,
            'message'=> 'Update is success',
            'success'=>true
        ]);
    }


    /**
     * @OA\Get(
     *     path="/api/product/delete/{id}",
     *     summary="Delete",
     *     tags={"Product"},
     *     operationId="Delete",
     *     @OA\Parameter (
     *     name="id",
     *     in="path",
     *     required=true,
     * ),
     *     @OA\Response(
     *     response=200,
     *     description="Success delete!",
     *     @OA\MediaType (
     *     mediaType="application/json"
     * )
     * )
     * )
    */
    public function deleteItem($id)
    {
        $product = Product::find($id);
        if(is_null($product))
        {
            return response()->sendError('Product not found!');
        }

        $product->delete();
        return response()->json([
            'message'=>'Success deleted!'
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/product/find/{id}",
     *     summary="Find",
     *     tags={"Product"},
     *     operationId="Find",
     *     @OA\Parameter (
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema (
     *              type="string"
     * )
*     ),
     *     @OA\Response(
     *      response=200,
     *     description="Success",
     *     @OA\MediaType (
     *     mediaType="application/json"
     * )
     * )
     * )
    */
    public function findItem($id)
    {
        $product = Product::find($id);
        if(is_null($product))
        {
            return response()->sendError('Not found product!');
        }

        return response()->json([
            'data' => $product,
            'success' => true
        ]);
    }
}
