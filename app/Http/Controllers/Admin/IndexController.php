<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class IndexController extends Controller
{
    /**
     * 登陆展示页面
     */
    public function login_index()
    {
        return view('Index.login');
    }

    /***
     * @return 验证码
     */
    public function imgCode()
    {
        $app = app('code');//可以使用app全局函数 参数为code 生成code实例
        $app->make();    //make() 为生成验证码的方法
        //$app->fontSize = 16;// 设置字体大小
        //$app->num = 4;// 设置验证码数量
        $app->width = 150;// 设置宽度
        $app->height = 50;// 设置宽度
        //$app->font = ./1.ttf // 设置字体目录
        return $app->get(); //get() 为获取验证码的方法
    }
    /***
     * 用户登录验证
     */
    public function login(Request $request)
    {
        $input = $request->all();
        $code = session('code');
        //先判断验证码是否正确
        $codes =strtolower($input['code']);
        if($codes === $code):
           $userinfo = DB::table('agent_user')
                ->where([
                    ['agent_user', '=', $input['username']],
                    ['agent_pwd', '=', md5(md5($input['pwd']))]
                ])
                ->first();
        //dd($userinfo->agent_user);
            if (!$userinfo):
                return back()->withErrors('账号或密码错误!')->withInput();
            else:
                Session::put('agent.id', $userinfo->agent_id);
                Session::put('agent.name', $userinfo->agent_user);
                return Redirect::to('index');
            endif;

        else:
            return back()->withErrors('验证码不正确')->withInput();
        endif;
    }

    public function index()
    {
        return '123';
    }
}
