
<!-- Hacking Specificity -->  

.__ZSY_FIX_TOUCH_THROUGH_OVERLAY__ {  
  pointer-events: none;  
}  

body {  
  color: #666;  
  font: 12px/1.5 'Microsoft YaHei',tahoma,arial;  
  font-weight: lighter;  
}  
.ff-yh {  
  font-family: 'Microsoft YaHei';  
}  
/* scrollbar */  
::-webkit-scrollbar {  
  -webkit-appearance:none;  
  width:12px;  
  background-color:#f0f0f0;  
}  
::-webkit-scrollbar-thumb {  
  border-radius:12px;  
  border:4px solid rgba(255,255,255,0);  
  background-clip:content-box;  
  background-color:#bfbfbf;  
}  
::-webkit-scrollbar-thumb:hover {  
  border-radius:12px;  
  border:4px solid rgba(255,255,255,0);  
  background-clip:content-box;  
  background-color:#A0A0A0;  
}  
::-webkit-scrollbar-corner {  
  background-color:#e6e6e6;  
}  
/* container */  
.container {  
  margin: auto;  
  width: 1200px;  
}  
.container-fluid {  
  width: 100%;  
}  
/* click item */  
a.collect {  
  cursor: pointer;  
}  
[data-toggle=pop],  
[data-toggle=panel] {  
  cursor: pointer;  
}  
/* btn */  
a[class^=btn] {  
  box-sizing: border-box;  
  display: inline-block;  
  text-align: center;  
  text-decoration: none;  
}  
a[class^=btn],  
button[class^=btn] {  
  cursor: pointer;  
  outline: none;  
  font-family: 'Microsoft yahei';  
}  
.btn1 {  
  background-color: #ff4a00;  
  color: #fff;  
}  
.btn1:hover {  
  color: #fff;  
  background-color: #eb4400;  
}  
.btn1:active {  
  color: #333;  
}  
.btn-g,  
[class^=btn]:disabled,  
[class^=btn].disabled {  
  background-color: #bbb;  
  border: none;  
  color: #eee !important;  
  outline: none;  
  display: inline-block;  
  cursor: not-allowed !important;  
}  
a[class^=btn]:active,  
button[class^=btn]:active {  
  color: #333 !important;  
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);  
}  
/* head */  
h1 {  
  font-size: 30px;  
}  
h2 {  
  font-size: 20px;  
}  
h3 {  
  font-size: 18px;  
}  
h4 {  
  font-size: 16px;  
}  
.fz12 {  
  font-size: 12px;  
}  
/* color */  
.ci0,  
dfn,  
a.ci0 {  
  color: #c51e20 !important;  
}  
a.ci0 {  
  cursor: pointer;  
}  
.cc0 {  
  color: #444;  
}  
.cc1 {  
  color: #888;  
}  
/* input */  
/* 去除input:number 的默认样式 */  
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button {  
  -webkit-appearance: none;  
}  

textarea,  
input[type='text'],  
input[type='password'],  
select,  
.inp {  
  border: 1px solid #ccc;  
  border-bottom-color: #ddd;  
  border-left-color: #ddd;  
  box-sizing: border-box;  
  display: inline-block;  
}  
input[type='text']:focus,  
input[type='password']:focus,  
select:focus,  
.inp:focus {  
  border-color: #aaa;  
}  
input[type='checkbox'],  
input[type='radio'] {  
  margin-right: 3px;  
  vertical-align: middle;  
}  
textarea {  
  padding: 8px;  
}  

/* tab*/  
.tabs-box .trigger a {  
  cursor: pointer;  
  text-decoration: none;  
}  
.tab-item {  
  display: none;  
}  
.tab-item.cur {  
  display: block;  
}  

/* text-align */  
.t-a-l {  
  text-align: left;  
}  
.t-a-c {  
  text-align: center;  
}  
.t-a-r {  
  text-align: right;  
}  

/* text-align */  
.t-a-l {  
  text-align: left;  
}  
.t-a-c {  
  text-align: center;  
}  
.t-a-r {  
  text-align: right;  
}  

/* logo */  
.logo figcaption {  
  display: none;  
}  

/* table-box */  
.table-box table {  
  width: 100%;  
}  

/* glr-wraper */  
.switch a {  
  position: absolute;  
  top: 50%;  
  cursor: pointer;  
}  
.switch .grey {  
  cursor: default;  
}  
.pagination {  
  bottom: 0;  
  left: 0;  
  width: 100%;  
}  
.pagination a {  
  display: inline-block;  
  margin: 0 3px;  
  cursor: pointer;  
}  
.glr-wraper {  
  overflow: hidden;  
}  
.glr-wraper>ul {  
  position: relative;  
  width: 1000em;  
}  
/*  fill-list  */  
.fill-list th {  
  width: 70px;  
  text-align: right;  
  vertical-align: top;  
  padding-right: 15px;  
}  

.index-glr {  
  position: relative;  
}  
.index-glr,  
.index-glr .glr-wraper {  
  width: 771px;  
}  
.index-glr .pagination {  
  position: absolute;  
  bottom: 10px;  
  left: 0;  
  width: 100%;  
  text-align: right;  
  z-index: 10;  
}  
.index-glr .pagination a {  
  display: inline-block;  
  width: 10px;  
  height: 10px;  
  background-color: #fff;  
  margin-right: 10px;  
  cursor: pointer;  
}  
.index-glr  .pagination .cur {  

}  

/* drop-box */  
.drop-box {  
  display: none;  
}  
.expand > .drop-box {  
  display: block;  
}  

/* grade */  
.grade-bg,  
.grade-txt {  
  display: inline-block;  
}  
.grade-bg {  
  width: px;  
  background: transparent url(images/grade.png) 0 0 repeat-x;  
  height: px;  
}  
.grade-bg .grade {  
  width: 0;  
  height: 100%;  
  background: transparent url(images/grade.png) 0 px repeat-x;  
}  
.grade-txt {  

}  
/* panel */  
.panel {  
  position: fixed;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  z-index: 998;  
}  
/* pop */  
.pop-overlay {  
  display: none;  
  position: fixed;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  background-color: rgba(0, 0, 0, .3);  
  z-index: 999;  
}  

.pop {  
  display: none;  
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);  
  left: 50%;  
  position: fixed;  
  top: 50%;  
  z-index: 999;  
}  
.pop .close {  
  cursor: pointer;  
  position: absolute;  
}  
/* pop-tip */  
.pop-tip {  
  width: 480px;  
  height: 300px;  
  background-color: #fff;  
  text-align: center;  
  margin: -150px 0 0 -240px;  
  z-index: 1000;  
}  
.pop-tip .icon-box {  
  margin: 30px 0 20px;  
}  
.pop-tip .icon-box .icon-tip {  
  width: 73px;  
  height: 73px;  
  background: transparent url(images/icon-right.png) 0 0 no-repeat;  
}  
.pop-tip .icon-box .icon-err {  
  background-image: url(images/icon-err.png);  
}  
.pop-tip .txt {  
  padding: 0 20px;  
  width: 90%;  
  margin: 0 auto 20px;  
  display: table;  
}  
.pop-tip .txt span {  
  margin: auto;  
  font-size: 24px;  
  color: #333;  
  height: 80px;  
  display: table-cell;  
  vertical-align: middle;  
  margin-bottom: 20px;  
}  
.pop-tip .btn-box a {  
  width: 147px;  
  height: 43px;  
  line-height: 43px;  
  font-size: 22px;  
  margin: 0 10px;  
}  
/* page-nav */  
.page-nav {  
  margin-top: 35px;  
  text-align: center;  
  font-family: "Microsoft YaHei";  
}  

.page-nav li,  
.page-nav ul {  
  display: inline-block;  
  margin: 0 8px;  
}  
.page-nav .first,  
.page-nav .prev,  
.page-nav .next,  
.page-nav .last {  
  background-color: #e5e5e5;  
  display: inline-block;  
  height: 28px;  
  line-height: 28px;  
  padding: 0 7px;  
}  
.page-nav a {  
  cursor: pointer;  
  color: #444;  
  text-decoration: none;  
}  
.page-nav .cur span,  
.page-nav a:hover,  
.page-nav .cur a {  
  color: #ff4a00;  
}  
.page-nav  
.page-nav .prev,  
.page-nav .next {  
  font-family: consolas;  
}  
.page-nav a:hover {  
}  
.page-nav li .prev,  
.page-nav li .next {  
  font-family: "consolas";  
}  
.page-nav .goto {  
  display: inline-block;  
  margin-left: 10px;  
}  
.page-nav .goto input {  
  border: 1px solid #666;  
  border-radius: 2px;  
  height: 28px;  
  margin: 0 2px;  
  text-align: center;  
  width: 40px;  
}  
.page-nav .goto button {  
  background-color: #fff;  
  border: 1px solid #bbb;  
  border-radius: 2px;  
  height: 30px;  
  margin-left: 5px;  
  width: 30px;  
}  
.page-nav a:active,  
.page-nav .goto button:active {  
  background-color: #e74343;  
  border-color: #e74343;  
  color: #fff;  
}  

/* placeholder */  
.placeholder {  
  color: #aaa !important;  
  display: inline-block;  
  text-indent: 6px;  
  vertical-align: middle;  
}  

/* zsyzoom */  
.zsyzoomPup {  
  position: absolute;  
  z-index: 10;  
  background: transparent url(images/zsyzoompupbg.gif) 0 0 repeat;  
  left: 0;  
  top: 0;  
  cursor: move;  
}  
.zsyzoom-result-box {  
  border: 1px solid #ccc;  
  width: 460px;  
  height: 460px;  
  left: 470px;  
  top: 0;  
  position: absolute;  
  z-index: 100;  
  overflow: hidden;  
  background-color: #fff;  
}  
.zsyzoom-result-box img {  
  position: absolute;  
  left: 0;  
  right: 0;  
  width: auto;  
  height: auto;  
}  
<!-- 计数 -->  
.count-wrap {  
  display: inline-block;  
  vertical-align: middle;  
  width: 49px;  
  height: 31px;  
  overflow: hidden;  
  border: 1px solid #ccc;  
  position: relative;  
}  
.count-wrap .text {  
  display: block;  
  width: 32px;  
  height: 32px;  
  line-height: 32px;  
  position: absolute;  
  top: 0;  
  left: 0;  
  border: none;  
  border: 0;  
  text-align: center;  
  outline: none;  
}  
.count-wrap a {  
  display: block;  
  width: 15px;  
  text-align: center;  
  height: 17px;  
  line-height: 17px;  
  overflow: hidden;  
  background: #f1f1f1;  
  color: #666;  
  position: absolute;  
  right: -1px;  
  border: 1px solid #ccc;  
  margin: 0;  
  cursor: pointer;  
  text-decoration: none;  
}  
.count-wrap a:hover {  
  background-color: #ddd;  
}  
.count-add {  
  top: -1px;  
}  
.count-reduce {  
  bottom: -1px;  
}  
/* 回到顶部 */  
.gotoBar {  
  bottom: 100px;  
  left: 50%;  
  z-index: 999;  
  position: fixed;  
  margin-left: ???px;  
}  
.gotoTop {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: ;  
  height: ;  
  background: transparent url() 0 0 no-repeat;  
  display: none;  
}  
/* 回到顶部 */  
.corner-box {  
  position: absolute;  
  left: 70px;  
  top: 0;  
  background-color: #fff;  
  border: 1px solid #ddd;  
  width: 194px;  
  padding: 10px;  
  box-shadow: 0 0 5px rgba(50, 50, 50, 0.3);  
  font-size: 14px;  
}  
.corner-box:after,  
.corner-box:before {  
  position: absolute;  
  content: '\25C6';  
  left: 0;  
  top: 0;  
  font-size: 40px;  
}  
.corner-box:before {  
  color: #ddd;  
  left: -13px;  
}  
.corner-box:after {  
  color: #fff;  
  left: -11px;  
}  

/* background gradient */  
background: linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);  
/* 三角形 */  
-| http://apps.eky.hk/css-triangle-generator/  
width: 0px;  
height: 0px;  
border-style: solid;  
border-width: 15.5px 0 15.5px 9px;  
border-color: transparent transparent transparent #d90000;  

