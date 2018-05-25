<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta name="keywords" content="朗恒安、肺笛、排痰器、振动排痰器、便携排痰器、雾霾、呼吸困难、排痰、吸烟、朗弗罗、肺癌、肺结核、COPD、慢性肺部疾病、痰液标本">
    <meta name="description" content="北京朗恒安生物科技有限公司是一家专业从事进口医疗健康器械的销售与服务，并已建立了完善销售网络的医疗健康公司">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/amazeui.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/reset.css')}}"><!-- Animate.css -->
    <!-- Icomoon Icon Fonts-->
    <!-- Bootstrap  -->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/animate.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/font-awesome/css/font-awesome.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/icomoon.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/common/css/sprite.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/public/css/base.css')}}">
    <title>朗恒安</title>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/supplier/css/index.css')}}">
</head>
<body>
<div style="display: none" class="loading"></div>
<div id="navigation">
    <nav role="navigation" class="page__title">
        <div class="page__title--warp">
            <div class="container">
                <div class="row">
                    <div class="col-md-5"><p class="num">欢迎进入美国朗弗罗<span class="super">®</span><span>肺笛中国官网</span></p>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="social"><a href="login">登录 </a><a>|</a><a href="sigin.html">注册 </a></div>
                        <div class="social"><a href="#" class="icon-buycart"> </a><a>购物车</a>
                            <div id="lung_buycar">
                                <div class="lung_buycar--title"><span>最新加入的商品</span></div>
                                <div class="lung_buycar--content clear">
                                    <div data-num="1" data-price="0.01" data-goodsid="121112" data-type="90"
                                         class="lung_buycar--item">
                                        <div class="order__content"><img src="../public/order/images/goods.png"><span
                                                class="content">呼吸健康系统</span></div>
                                        <div class="order__show"><span
                                                class="order__price">0.01</span><span>*</span><span
                                                class="order__num">1</span>
                                            <div class="order__delete">删除</div>
                                        </div>
                                    </div>
                                    <div data-num="4" data-price="30" data-goodsid="1211090" data-type="12"
                                         class="lung_buycar--item">
                                        <div class="order__content"><img src="../public/order/images/goods.png"><span
                                                class="content">呼吸健康系统</span></div>
                                        <div class="order__show"><span class="order__price">50</span><span>*</span><span
                                                class="order__num">4</span>
                                            <div class="order__delete">删除</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="lung_buycar--total clear">
                                    <div class="total"><span>共计</span><a class="number">2</a><span>件</span><span
                                            class="price">1888.00</span></div>
                                    <a class="btn btn-primary btn-lg gotocat">去购物车</a></div>
                            </div>
                        </div>
                        <div class="social"><a>我的订单 </a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page__title--menu">
            <div class="container" style="width: 100%;height: 110px;background: #35d4a0; margin: 0; max-width: 100%;">

</div>
<section class="login--bg"></section>
<section class="supplier-img">
    <div class="supplier-img-container"><img src="{{asset('assets/supplier/images/supplier.png')}}"></div>
</section>
<section class="login--input">
    <div class="login--wap text-left"><h3 class="login--title">会员登录</h3>
        <form id="jsForm" class="bl-form bl-formhor">
            <ul>
                <li class="bl-form-group"><span class="icon-iphon"></span><input type="text" value=""
                                                                                 placeholder="请输入手机号" name="0"
                                                                                 color="color" required
                                                                                 data-rule-mobile="true"
                                                                                 data-msg-mobile="*"
                                                                                 class="input_txt_val"></li>
                <li class="bl-form-group"><span class="icon-lock"></span><input type="password" value="" name="1"
                                                                                color="color" required minlength="6"
                                                                                data-msg-minlength="*"
                                                                                placeholder="请输入密码"
                                                                                class="input_txt_val"></li>
                <li class="bl-form-group code"><input type="text" placeholder="验证码" value="" name="2" color="color"
                                                      required minlength="4" data-msg-minlength="*" maxlength="4"
                                                      data-msg-mobile="*" class="pwd"><img
                        src="{{asset('assets/supplier/images/liogn_11.png')}}" alt=""><span>点击登录</span></li>
                <div class="passSave"><span class="title">保存密码:</span><label id="radio1"
                                                                             class="radio-box active"><em></em><input
                        id="radio1" type="radio" name="savepass"></label><span class="radio--left">是</span><label
                        id="radio2" class="radio-box"><em></em><input id="radio2" type="radio"
                                                                      name="savepass"></label><span>否</span></div>
            </ul>
            <div class="btn-wap text-left">
                <button type="submit" class="btn btn-primary btn-outline btn-lg login">登录</button>
                <button href="#" class="btn btn-primary btn-outline btn-lg logout">注册</button>
                <span>忘记密码?</span></div>
        </form>
    </div>
</section>
<section id="footer" class="text-center">
    <ul class="footer-title">
        <li><a href="http://www.lunghealthbiotech.com" class="logo icon-77"></a></li>
        <li><a href="http://www.lunghealthbiotech.com">首页</a></li>
        <li><a href="">肺笛信息</a></li>
        <li><a href="javascript:void(0)">产品介绍</a></li>
        <li><a href="javascript:void(0)">联系我们</a></li>
        <li><a href="http://www.lungflute.com" tarter="_blank">美国官网</a></li>
    </ul>
    <ul class="footer-icons">
        <li><i data-am-popover="{content: '+86 5102 9797', trigger: 'hover focus'}" title="+86 5102 9797"
               href="javascript:void(0)" class="icon-tel"></i></li>
        <li><i data-am-popover="{content: 'feidi@lunghealthbiotech.com', trigger: 'hover focus'}"
               title="feidi@lunghealthbiotech.com" href="javascript:void(0)" class="icon-email"></i></li>
        <li><i data-am-popover="{content: '请点击图像', trigger: 'hover focus'}" title="请点击图像" href="javascript:void(0)"
               class="icon-myqq"><span class="path1"></span><span class="path2"></span></i></li>
        <li><i title="公众号：肺笛feidi" href="javascript:void(0)" class="icon-wechats"><span class="path1"></span><span
                class="path2"></span><span class="path3"></span><span class="path4"></span><img
                src="/static/images/code.png"></i></li>
    </ul>
    <p class="text-center tagging">京ICP证17037886号</p></section>
<div class="gototop"><a href="#" class="js-gotop"><i class="fa fa-arrow-up"></i></a></div>
<div id="loading__warp">
    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="circle" class="g-circles g-circles--v1">
            <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35"
                    cy="16.6987298" r="10"></circle>
            <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298"
                    cy="35" r="10"></circle>
            <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60"
                    r="10"></circle>
            <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298"
                    cy="85" r="10"></circle>
            <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35"
                    cy="103.30127" r="10"></circle>
            <circle id="7" cx="60" cy="110" r="10"></circle>
            <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85"
                    cy="103.30127" r="10"></circle>
            <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127"
                    cy="85" r="10"></circle>
            <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60"
                    r="10"></circle>
            <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) "
                    cx="103.30127" cy="35" r="10"></circle>
            <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85"
                    cy="16.6987298" r="10"></circle>
            <circle id="1" cx="60" cy="10" r="10"></circle>
        </g>
        <use xlink:href="#circle" class="use"></use>
    </svg>
</div>
<script src="/static/js/lib/jquery.min.js"></script>
<script src="/static/js/lib/modernizr-2.6.2.min.js"></script>
<script src="/static/js/lib/amazeui.js"></script>
<script src="/static/js/common/common.js"></script>
</body>
</html>