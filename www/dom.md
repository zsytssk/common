

-| 前段 要想建高楼 先要建骨架 在装饰  
-? 什么样的结构是 稳定的dom骨架  
---&&---  

-| 命名空间  
-> P- 页面元素  
-> C- common 元素  
-> S- 结构元素  

.sider  
.main  
  .main-sub1  
    .sider-sub2  
    .main-sub2  
  .sider-sub1  

-> 很容易搞清层级关系  
-> 这个玩意在其他地方也用不到  

# 有没有一种 可以省脑力的布局方式  
-> 很实用  
-> 难不难看是其次  
----&&---  
-| 能不能 看这一块 的功能 作用是什么  
-| 将不同的功能分开来  

-| meta[http-equiv="Cache-Control",content="no-store"]  
-> 网页无cache 方便测试  
-| meta[name="viewport",content="width=1100, initial-scale=1.0"]  
-> 桌面网站适应手机  

-| 常用关键字 用驼峰形式  
-| img-box 钉死宽高  
-| 所有和页面相关的class 使用驼峰命名 首字母也大写  

## 强健布局  
-? 如何使页面不同部分, 相互独立  
-? 如何在复杂的网页应用, 清晰的布局  

-| 这需要引入后台的两个概念: 模块化, 面向对象  

-| 页面的class 用首字母大写, 不用连接符  

## 常用  
-| container>container-fluid>row>col  
-| del --> 删除  
-| kbd --> 快捷键  
-| fieldset --> html5  

<!-- box -->  
(.??-wraper>).??-box(??>.inner)>.??-main+.??-??  
eg: .star-box>.star-bg>.star^.star-txt <!-- 评分 -->  
.search-box>.input-box>input:t+button:b^^p.keywords>a  
.tabs-box>.trigger(>a)+.tab-list>.tab-item <!-- tab -->  
.tab>ul.tab-nav>li^^.tab-con>.tab-item  

.table-box>table(用来定义table的宽度... 很有作用)  
.??-list>ul>li.??-item  
.??-box>h?+.con>  

<!-- 广告位 -->  
.banner>img  

<!-- 回到顶部 -->  
.gotoBar>a[href="#top"].gotoTop  
<!-- zsyzoom -->  

<!-- tag -->  
tag --> 标签 说明 ...  

<!-- img gallery -->  
.??-glr>.switch(>.prev+.next|.grey)+.pagination+.glr-wraper>ul>li  

<!-- logo -->  
figure.logo>img+figcaption  
<!-- menu -->  
nav.menu>ul>li  

<!-- 计数 -->  
span.count-wrap>a.count-reduce{-}+a.count-add{-}+input:t.text  

<!-- 面包屑 -->  
.page-index>a+span  

<!-- 分页 -->  
.page-nav>(ul>li>a)+.goto>{到第}+input:t+{页}+button{确定}  
li>a.first[data-index="first" class="first"]{首页}  
li>a.prev[data-index="prev" class="prev"]{&lt;}  
li>a.next[data-index="next" class="next"]{&gt;}  
li>a.last[data-index="last" class="last"]{尾页}  

<!-- 表单 -->  
.fill-list>form>table>tr>th+td>div>input  

<!-- 弹出层 -->  
.pop-overlay>.pop.pop-$>h3(>a.close)+.pop-con  
-> pop-?? 这样 就不会和其他的潜在冲突  
-> trigger a[data-toggle="pop", data-target="#pop-target"]  
a.btn1.confirm{确定}  
a.btn1.cancel{取消}  

<!-- 下拉框 -->  
.expand>.drop-box --> 有个问题, 怎么确定哪个有 .expanded ??  

<!-- alertTip -->  
.pop.pop-tip>a.close+.pop-con>.icon-box>i.icon-tip+div.txt(>span)+.btn-box>a.btn.confirm{确认}+a.btn.cancel{取消}  

<!-- corner -->  
.icons-box>.icon-??  --> .is-box>.i-??  
.i-ok .i-err  

<!-- color -->  
.c1 .c2 ...  

<!-- corner -->  
span.corner-box>span.corner-bd{&#x25C6;}+span.corner-bg{&#x25C6;}  

<!-- 标题 + 导航 + 内容列表 -->  
.??>h2+ul.nav-keyword(>li)+ul.??-list  

<!-- ie6, 7 居中对齐-->  
<!--[if lt IE 7 ]><span style="zoom: 1;"></span><![endif]-->  

<!-- 控制栏 -->  
.ctrl-box>a.ctrl-prev+a.ctrl-next+a.ctrl-refresh  

<!-- list -->  
.??-list>ul>li(.??-item>ul>li)  

<!-- progressbar -->  
.progressbar>.progressIndicator+.progressVal  

<!-- 分隔符 -->  
.vsprtr  <!-- 竖直分隔符 -->  
.hsprtr  <!-- 水平分隔符 -->  

<!-- 价格 -->  
dfn>i+{298}  

<!-- icon -->  
.i-??  

<!-- 商品的展示和详细 -->  
.prdct-show  
.prdct-intro  

<!--  常用链接 -->  
.quickLink  

<!-- 验证码  -->  
.verifyCode  

<!-- 版权 -->  
.copyright  

<!-- select -->  
select>option[disabled selected]+option  

<!-- 参数列表 -->  
p.parameter-list>span  

<!-- other -->  
.fold  
.maskBar  

<!-- time-box -->  
.time-box>input:t+i.icon-calendar  

<!-- bd-box -->  
-| .bd-box>h?+.con  
-| .bg-box>h?+.con  
-| .??-list>ul>li  
-| 广告 post-box  
-| 反馈 feedback  
-| 认证 authentication  
-| 广播 broadcast  
-| 注册 登录  signup login  
-| 联合登陆:> popular-signup  

## 注意  
☐ 使用首字母代表整个class  
-| 最大的问题是语意不明确 --> 建立一个缩写全写对照表, 可以一一查找?  
-| 还有就是可能出现相同的 --> 将已经归类的, 和网站基本的class使用简写?  --> 将有冲突的用两个字母  

-| 所有的装饰, 只有两种 bg 和 icon  


## Bootstrap 布局  
-| container>container-fluid>row>col  
-| 这个除了container container-fluid, 其他的没有意义  

## btn-blue 这样的命名方式 好不好  
-| 这样的命名将样式绑定到Dom上, 如果下次要改样式, class名也必须一起改  
-| 叫btn1 btn2 btn3 怎么样 这就可以换肤了
