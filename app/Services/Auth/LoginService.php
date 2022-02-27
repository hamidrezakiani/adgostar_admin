<?php
namespace App\Services\Auth;

use App\Repositories\Eloquent\Auth\LoginRepository;
use App\Lib\ResponseTemplate;
use App\Models\Account;
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
        $account = Account::where('phone',$request->phone)->whereHas('admin')->first();
        if($account && Hash::check($request->password, $account->password))
        {
           Auth::login($account);
           Auth::guard('admin')->login($account->admin);
           return redirect('/page/dashboard');
        }
        else
        {
           return redirect()->back();
        }
    }

}
