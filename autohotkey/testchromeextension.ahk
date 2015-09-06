#SingleInstance force
;任务栏上滚动鼠标滚轮来快速调节系统音量
SetTitleMatchMode RegEx

#IfWinExist, .*Extensions Developer Tool
!t::
	testChromeExtension()
	return

testChromeExtension() {
	if (activew(".*Extensions Developer Tool")) {
		Click 166 420
		activew(".*Google Chrome")
		send {f5}
	}
}
activew(title) { ; 激活窗口函数
	IfWinExist %title%
	{
		WinActivate
		return true
	}
	return false
}
