On Error Resume Next
curdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
' 1. Change this to your Sublime Text file path.
' path = "D:\zsytssk\other\software\Sublime Text\sublime_text.exe"
path = curdir + "\sublime_text.exe"

' 2. Optional - Change keyboard shortcut here, for example: "F" if you like.
shortcut = "Q"

Sub ElevateUAC
    If Not WScript.Arguments.Named.Exists("elevated") Then
        With CreateObject("Shell.Application")
        .ShellExecute "wscript.exe", """" & _
            WScript.ScriptFullName & """ /elevated", "", "runas", 1
            WScript.Quit
        End With
    End If
End Sub

Call ElevateUAC

Set shell = CreateoBject("WScript.shell")
result = shell.Popup("Yes  -  Install" & vbCrLf & "No  -  Uninstall", 0, "Add " & chr(34) & "Open with Sublime Text" & chr(34) & " ?", vbYesNoCancel + vbQuestion)

If result = vbYes Then
    shell.RegWrite "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\", "Sublime Text(&" & shortcut & ")", "REG_SZ"
    shell.RegWrite "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\Icon", path & ",0", "REG_EXPAND_SZ"
    shell.RegWrite "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\command\", path & " " & chr(34) & "%1" & chr(34), "REG_SZ"

    shell.RegWrite "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\", "Sublime Text(&" & shortcut & ")", "REG_SZ"
    shell.RegWrite "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\Icon", path & ",0", "REG_EXPAND_SZ"
    shell.RegWrite "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\command\", path & " " & chr(34) & "%1" & chr(34), "REG_SZ"
ElseIf result = vbNo Then
    shell.RegDelete "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\command\"
    shell.RegDelete "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\Icon"
    shell.RegDelete "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text\"

    shell.RegDelete "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\command\"
    shell.RegDelete "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\Icon"
    shell.RegDelete "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text\"
Else
    WScript.Quit
End If
