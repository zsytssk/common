#MaxHotkeysPerInterval 150
#SingleInstance force
SetTitleMatchMode RegEx
; Sublime Text 快捷键
#IfWinActive, ahk_class PX_WINDOW_CLASS
!h::
	send !{Left}
	return

!j::
	send {down}
	return
!k::
	send {up}
	return
!l::
	send !{right}
	return

; GitHub Desktop shortcut
#IfWinActive, ahk_exe GitHub.exe
; open in github
f12::
	Send {AppsKey}{Tab}{Enter}
	return
; open in file explorer
^o::
	Send {AppsKey}{Tab}{Tab}{Enter}
	return
; open in shell
^c::
	Send {AppsKey}{Tab}{Tab}{Tab}{Enter}
	return
; open folder in textEditor
^e::
	; clipboard:= "'D:\Program Files\Sublime Text 3\sublime_text.exe' . && exit"
	clipboard:= "atom . && exit"
	Send {AppsKey}{Tab}{Tab}{Tab}{Enter}
	sleep 333
	send ^v
	send {Enter}
	return

; 调出sublime project 切换
#IfWinExist, ahk_class PX_WINDOW_CLASS
^!p::
	activew("ahk_class PX_WINDOW_CLASS")
	Send ^!p
	return

; 调试html, 跳转chrome 刷新 再回到sublime
#IfWinExist, .*job.* Sublime Text
!Tab::
	if (isActiveW("ahk_class PX_WINDOW_CLASS") || isActiveW("ahk_class Photoshop")) {
		activew("ahk_class Chrome_WidgetWin_1")
		send {f5}
	} else {
		activew("ahk_class PX_WINDOW_CLASS")
	}
	return
^Tab::
	if (isActiveW("ahk_class PX_WINDOW_CLASS") || isActiveW("ahk_class Chrome_WidgetWin_1")) {
		activew("ahk_class Photoshop")
	} else {
		send {Esc}
		activew("ahk_class PX_WINDOW_CLASS")
	}
	return

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
!Space::
sleep, 2000
baicizhan(7)
return
^Space::
sleep, 2000
baicizhan(8)
return
!Tab::
	if (isActiveW("ahk_class Chrome_WidgetWin_1")) {
		activew("ahk_class PX_WINDOW_CLASS")
	} else {
		activew("ahk_class Chrome_WidgetWin_1")
	}
	return

baicizhan(num) {
	if (activew("百词斩.*")) {
		send {%num%}
		activew(".*Sublime Text")
	}
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

activew(title) { ; 激活窗口函数
	IfWinExist %title%
	{
		WinActivate
		return true
	}
	return false
}
isActiveW(title) { ; 激活窗口函数
	IfWinActive %title%
	{
		return true
	}
	return false
}
