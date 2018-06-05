<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Administration</title>
  <link rel="stylesheet" href="{{asset('assets/Public/css/index.css')}}">
</head>

<body>
  <div class="wrap">
    <header class="header">
      <nav>
        <div class="nav_container">
          <section><span class="nav_text">欢迎进入供应商平台</span></section>
          <section class="nav_manage">
            <div>
              <a class="nav_text a_text" href="{{url('outto')}}">退出登录</a>
            </div>
            <div class="people">
              <img src="{{asset('assets/Public/images/people.png')}}" alt="">
              <a class="nav_text a_text" href="">个人中心</a>
            </div>
          </section>
        </div>
      </nav>
      <div class="nav_show">
        <section class="logo_wrap">
          <img src="{{asset('assets/Public/images/logo.png')}}" alt="">
        </section>
        <section>
          <a class="nav_link" href="">订单采购</a>
          <a class="nav_link" href="">问题咨询</a>
        </section>
      </div>
    </header>
    <div class="banner">
      <img src="{{asset('assets/Public/images/banner.jpg')}}" alt="">
    </div>
    <div class="advantage_wrap">
      <div class="advantage_container">
        <header class="title_header">
          <h3 class="title_text">OUR ADVANTAGES</h3>
          <div class="position">
            <span class="position_text">我们的优势</span>
            <div class="position_img">
              <img src="{{asset('assets/Public/images/sanjiao.png')}}" alt="">
            </div>
          </div>
        </header>
        <div class="advantage_show">
          <ul>
            <li>
              <div>
                <img src="{{asset('assets/Public/images/jingzheng.png')}}" alt="">
                <span class="advantage_title">竞争优势明显</span>
                <span class="advantage_content">首批手持便携式排痰设备</span>
              </div>
            </li>
            <li>
              <div>
                <img src="{{asset('assets/Public/images/fuwu.png')}}" alt="">
                <span class="advantage_title">服务体系高效</span>
                <span class="advantage_content">代理商支持体系健全，渠道管理实践经验丰富。</span>
              </div>
            </li>
            <li>
              <div>
                <img src="{{asset('assets/Public/images/jishu.png')}}" alt="">
                <span class="advantage_title">技术团队专业</span>
                <span class="advantage_content"> 技术开发经验丰富，管理团队对医疗市场有较强的理解力。</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="agent_wrap">
      <header style="margin-top: 80px;" class="title_header">
        <h3 class="title_text">AGENT SUPPORT PROGRAM</h3>
        <div class="position">
          <span class="position_text">代理商扶持计划</span>
          <div class="position_img">
            <img src="{{asset('assets/Public/images/sanjiao.png')}}" alt="">
          </div>
        </div>
      </header>
      <div class="agent_content">
        <ul class="agent_wrapper">
          <li>
            <div class="agent_item">
              <div class="img_top">
                <img src="{{asset('assets/Public/images/jishuzhichi.png')}}" alt="">
              </div>
              <span class="agent_title">技术支持</span>
              <span class="agent_content_text">具备专业的技术团队，优先处理代理商反馈的问题。</span>
              <div class="bottom"></div>
            </div>
          </li>
          <li>
            <div class="agent_item">
              <div class="img_top">
                <img src="{{asset('assets/Public/images/baohu.png')}}" alt="">
              </div>
              <span class="agent_title">区域保护</span>
              <span class="agent_content_text">对于有代理商的区域采取 区域保护，对跨区域销售采取必要的约束措施。</span>
              <div class="bottom"></div>
            </div>
          </li>
          <li>
            <div class="agent_item">
              <div class="img_top">
                <img src="{{asset('assets/Public/images/huiyi.png')}}" alt="">
              </div>
              <span class="agent_title">会议支持</span>
              <span class="agent_content_text">针对产品销售及市场反馈， 定期或在必要时刻举行供应商交流会议。</span>
              <div class="bottom"></div>
            </div>
          </li>
          <li>
            <div class="agent_item">
              <div class="img_top">
                <img src="{{asset('assets/Public/images/peixun.png')}}" alt="">
              </div>
              <span class="agent_title">培训支持</span>
              <span class="agent_content_text">对代理商的人员包括销售、客服、技术进行相应的培训，快速提高代理商团队的战斗力。</span>
              <div class="bottom"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="first_wrapper">
        <section class="first_footer">
          <div>
            <img src="{{asset('assets/Public/images/footer.png')}}" alt="">
          </div>
          <div>
            <ul class="footer_ul">
              <li>
                <div>
                  <img src="{{asset('assets/Public/images/tel.png')}}" alt="">
                </div>
                <div class="li_border one"></div>
              </li>
              <li>
                <div>
                  <img src="{{asset('assets/Public/images/email.png')}}" alt="">
                </div>
                <div class="li_border two"></div>
              </li>
              <li>
                <div>
                  <img src="{{asset('assets/Public/images/qq.png')}}" alt="">
                </div>
                <div class="li_border three"></div>
              </li>
              <li>
                <div>
                  <img src="{{asset('assets/Public/images/weixin.png')}}" alt="">
                </div>
                <!-- <div class="li_border"></div> -->
              </li>
            </ul>
          </div>
        </section>
      </div>
      <section class="second_footer">
        <p style="margin-top: 24px;" class="footer_text">©ALIMAMA MUX, powered by alimama THX. </p>
        <p style="margin-top: 5px;" class="footer_text">商业媒体及纸媒请先联系：sangxing@taobao.com</p>
      </section>
    </footer>
  </div>
</body>

</html>