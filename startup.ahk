#SingleInstance force
SetTitleMatchMode RegEx
; Sublime Text 快捷键
#IfWinActive, .*Sublime Text
!h::
	send {left}
	return
!j::
	send {down}
	return
!k::
	send {up}
	return
!l::
	send {right}
	return
!e::
	send ^{k}^{e}

; 百词斩
#IfWinExist, 百词斩.*
Numpad0::
Numpad1::
Numpad2::
Numpad3::
Numpad4::
Numpad7::
Numpad8::
	baicizhan(SubStr(A_ThisHotkey, -0))
	return
	baicizhan(num) {
		if (activew("百词斩.*")) {
			send {%num%}
			activew(".*Sublime Text")
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

;任务栏上滚动鼠标滚轮来快速调节系统音量
#If MouseIsOver("ahk_class Shell_TrayWnd")
{
	WheelUp::Send {Volume_Up}
	WheelDown::Send {Volume_Down}
}
MouseIsOver(WinTitle) {
    MouseGetPos,,, Win
    return WinExist(WinTitle . " ahk_id " . Win)
}
