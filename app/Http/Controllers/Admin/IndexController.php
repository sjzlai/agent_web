<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    /**
     * 登陆展示页面
     */
    public function index()
    {
        return view('Index.index');
    }
}