<?php
namespace App\Services\Auth;

use App\Repositories\Eloquent\Auth\LoginRepository;
use App\Lib\ResponseTemplate;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class LoginService extends ResponseTemplate{

    protected $loginRepository;

    public function __construct(LoginRepository $loginRepository)
    {
        $this->loginRepository = $loginRepository;
    }

    public function loginPage()
    {
        return view('Auth.login');
    }

    public function login(Request $request)
    {
        $admin = Admin::where('phone',$request->phone)->first();
        if($admin && Hash::check($request->password, $admin->password))
        {
           Auth::login($admin);
           Auth::guard('admin')->login($admin);
           return redirect('/page/dashboard');
        }
        else
        {
           return redirect()->back();
        }
    }

}
