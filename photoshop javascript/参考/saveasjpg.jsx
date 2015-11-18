main();

function main() {
	if(!documents.length) return;
	//Reset Custom Options.
	//app.eraseCustomOptions( 'a7ba92a0-d6f8-11df-937b-0800200c9a66' ); return;
	Count = 0;
	try {
		var desc1 = app.getCustomOptions('a7ba92a0-d6f8-11df-937b-0800200c9a66');
		Count = desc1.getInteger(0);
	} catch(e) {
		var win = new Window("dialog", "File increment");
		win.pnl1 = win.add('panel');
		win.grp1 = win.pnl1.add('group');
		win.grp1.st1 = win.grp1.add('statictext', undefined, "File Suffix Number start...");
		win.grp1.et1 = win.grp1.add('edittext', undefined, "1");
		win.grp1.et1.preferredSize = [50, 20];
		win.grp1.et1.onChanging = function () {
			if(this.text.match(/[^\-\.\d]/)) {
				this.text = this.text.replace(/[^\-\.\d]/g, '');
			}
		}
		win.grp10 = win.pnl1.add('group');
		win.grp10.process = win.grp10.add('button', undefined, 'Okay');
		win.grp10.process.onClick = function () {
			Count = Number(win.grp1.et1.text);
			win.close(1);
		}
		win.center();
		win.show();
	}
	try {
		var Name = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
		var Path = decodeURI(activeDocument.path);
		var saveFile = File(Path + "/" + Name + "#" + zeroPad(Count, 4) + ".jpg")
		SaveJPEG(saveFile, 8);
		Count++;
		var desc2 = new ActionDescriptor();
		desc2.putInteger(0, Count);
		app.putCustomOptions('a7ba92a0-d6f8-11df-937b-0800200c9a66', desc2, true);
	} catch(e) {
		alert(e + "\r@ Line " + e.line);
	}
}

function SaveJPEG(saveFile, jpegQuality) {
	var doc = activeDocument;
	if(doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
	jpgSaveOptions = new JPEGSaveOptions();
	jpgSaveOptions.embedColorProfile = true;
	jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
	jpgSaveOptions.matte = MatteType.NONE;
	jpgSaveOptions.quality = jpegQuality;
	activeDocument.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

function zeroPad(n, s) {
	n = n.toString();
	while(n.length < s) n = '0' + n;
	return n;
};
