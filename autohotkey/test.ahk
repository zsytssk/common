
; #MaxHotkeysPerInterval 150
; #SingleInstance force
; Thread, NoTimers
; FileSelectFolder, OutputVar,, 3
; Thread, NoTimers, false


; param=E:\zsytssk\GitHub\common
; Run "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Sublime Text 3.lnk" -data "%param%"
; Run "C:\Users\世阳\AppData\Local\atom\app-1.0.11\resources\cli\atom.cmd" "%param%"
; Run taskkill /im atom.exe
; WinClose

; ahk_exe sublime_text.exe
; ahk_exe atom.exe

; Run, notepad.exe
; WinWaitActive, ahk_class Notepad, , 2
; if ErrorLevel
; {
; 		MsgBox, WinWait timed out.
; 		return
; }
; else
; 		Run taskkill /im notepad.exe