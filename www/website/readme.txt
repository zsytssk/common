☐ 文件夹other/ie 里面是兼容ie9 一下浏览器的样式

☐ demo.js
-| 只是展示页面效果;
-| 如果好你就那过去, 没用你就不拿过去;
-| 如果你要用我这个, 然后在里面删改, 边效果就没法展示了;


☐ 注意 这不是注释
-> 这是ie9 一下浏览器用到的 必须要
<!--[if lt IE 9 ]>
	<link rel="stylesheet" href="other/ie/ie.css" media="all" />
	<script src="other/ie/html5.js"></script>
	<script src="other/ie/jquery-1.11.3.min.js"></script>
	<script src="other/ie/ie.js"></script>
<![endif]-->