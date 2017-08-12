' 创建code快捷方式 配置文件 插件在同一个文件夹
curdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
Set wsc = WScript.CreateObject("WScript.Shell")
Set lnk = wsc.CreateShortcut(curdir & "\Code.LNK")

lnk.targetpath = curdir + "/Code - Insiders.exe"
lnk.arguments = " --user-data-dir ""./Data"" --extensions-dir ""./Data/extensions"""
lnk.description = "vscode portable"
lnk.WorkingDirectory  = curdir
lnk.save