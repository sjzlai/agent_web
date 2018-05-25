/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	$(function () {
	    $('.login--bg').height($(window).height() - 300 - 120);
	    $(window).resize(function () {
	        $('.login--bg').height($(window).height() - 300 - 120);
	    });

	    $("#jsForm").validate({
	        submitHandler: function submitHandler() {
	            // 验证通过后 的js代码写在这里

	            var tel = myform.tel.value;
	            var psd = myform.psd.value;
	            var checkcode = myform.code.value;
	            $.ajax({
	                //指定ajax请求后台php程序
	                'url': "/sign/login",
	                //指定ajax数据发送类型
	                'type': 'post',
	                //指定同步还是异步
	                // 'cache': false,
	                // 'async': true,
	                //向后台程序发送的数据
	                'data': {
	                    'tel': tel,
	                    'password': psd,
	                    'code': checkcode
	                },
	                //返回值类型
	                'dataType': 'json',
	                //成功后的触发事件，参数msg接收到的后台php的返回值
	                'success': function success(res) {

	                    window.location.href = "/index";
	                }
	            });
	        }
	    });

	    $('.radio-box').each(function (index, el) {
	        $(this).click(function (event) {
	            /* Act on the event */
	            $(this).siblings().removeClass('active');
	            $(this).addClass('active');
	        });
	    });

	    //配置通用的默认提示语
	    $.extend($.validator.messages, {
	        required: '*',
	        equalTo: "*"
	    });
	    //手机验证规则
	    jQuery.validator.addMethod("mobile", function (value, element) {
	        var mobile = /^1[3|4|5|7|8]\d{9}$/;
	        return this.optional(element) || mobile.test(value);
	    }, "手机格式不对");
	});

/***/ })
/******/ ]);