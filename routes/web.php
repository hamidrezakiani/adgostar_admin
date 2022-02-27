<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',function(){
  return redirect('/page/dashboard');
});

Route::get('/login',[LoginController::class,'loginPage'])->name('login');
Route::post('/login',[LoginController::class,'login']);
Route::group(['middleware' => ['auth:admin']], function () {
    Route::get('/logout', [LogoutController::class, 'logout']);
    Route::get('page/{url}',function(Request $request,$url){
      if($request->all())
      {
          $url.='?';
          foreach($request->all() as $key=>$value)
          {
              $url.=$key.'='.$value.'&';
          }
          $url = substr($url,0,strlen($url)-1);
      }
      return view('layout.master',compact('url'));
    });
    Route::get('page/dashboard',function(){
       return view('dashboard');
    });
    Route::get('categories',function(Request $request){
       if($request->parent)
       {
           $flag = 'subCats';
           $parent = $request->parent;
       }
       else
       {
           $parent=NULL;
           $flag='parents';
       }
       return view('categories',compact(['flag','parent']));
    });

    Route::get('categories-create',function(Request $request){
        if($request->parent)
        {
            $flag = 'subCats';
            $parent = $request->parent;
        }
        else
        {
            $parent=0;
            $flag='parents';
        }
        return view('categories-create',compact(['flag','parent']));
     });
     Route::get('products',function(Request $request){
        if($request->category_id)
        {
            $flag = 'categoryProducts';
            $category_id = $request->category_id;
        }
        else
        {
            $category_id=NULL;
            $flag='all';
        }
        return view('products',compact(['flag','category_id']));
     });

     Route::get('products-create',function(Request $request){
         $category_id = $request->category_id;
         return view('products-create',compact(['category_id']));
      });

    Route::get('items', function (Request $request) {
        if ($request->product_id) {
            $flag = 'productItems';
            $product_id = $request->product_id;
        } else {
            $$product_id = NULL;
            $flag = 'all';
        }
        return view('items', compact(['product_id','flag']));
    });

    Route::get('items-create', function (Request $request) {
        $product_id = $request->product_id;
        return view('items-create', compact(['product_id']));
    });

    Route::get('properties', function (Request $request) {
        if ($request->product_id) {
            $flag = 'productProperties';
            $product_id = $request->product_id;
        } else {
            $$product_id = NULL;
            $flag = 'all';
        }
        return view('properties', compact(['product_id', 'flag']));
    });

    Route::get('property-create', function (Request $request) {
        $product_id = $request->product_id;
        return view('properties-create', compact(['product_id']));
    });

    Route::get('participations', function (Request $request) {
        if ($request->executer_id) {
            $flag = 'executerParticipations';
            $executer_id = $request->executer_id;
        } else {
            $executer_id = NULL;
            $flag = 'all';
        }
        return view('participations', compact(['flag', 'executer_id']));
    });
});
