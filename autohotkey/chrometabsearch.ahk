chrome := "- Google Chrome"
found := "false"
tabSearch := "扩展程序"
curWinNum := 0

SetTitleMatchMode, 2

WinGet, numOfChrome, Count, %chrome% ; Get the number of chrome windows

WinActivateBottom, %chrome% ; Activate the least recent window

WinWaitActive %chrome% ; Wait until the window is active

ControlFocus, Chrome_RenderWidgetHostHWND1 ; Set the focus to tab control ???

; Loop until all windows are tried, or until we find it
while (curWinNum < numOfChrome and found = "false") {
	WinGetTitle, firstTabTitle, A ; The initial tab title
	title := firstTabTitle
	Loop
	{
		if(InStr(title, tabSearch)>0){
			found := "true"
			break
		}
		Send {Ctrl down}{Tab}{Ctrl up}
		Sleep, 50
		WinGetTitle, title, A  ;get active window title
		if(title = firstTabTitle){
			break
		}
	}
	WinActivateBottom, %chrome%
	curWinNum := curWinNum + 1
}

; If we did not find it, start it
if(found = "false"){
	WinActivateBottom, %chrome%
	curWinNum := curWinNum + 1
	Run "chrome://extensions"
}

send ^{r}
WinActivateBottom, %chrome%
return