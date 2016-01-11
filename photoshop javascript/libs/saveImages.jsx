function SaveJPEG(saveFile) {
	var doc = activeDocument;
	if(doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
	opts = new JPEGSaveOptions();
	opts.embedColorProfile = true;
	opts.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
	opts.matte = MatteType.NONE;
	opts.quality = 8;
	activeDocument.saveAs(saveFile, opts, true, Extension.LOWERCASE);
}

function SaveGIF(saveFile) {
	// 有问题，保存为png而且 像素很差
	// var opts = new ExportOptionsSaveForWeb();
	// opts.format = SaveDocumentType.COMPUSERVEGIF;
	// opts.colorReduction = ColorReductionType.ADAPTIVE;
	// opts.dither = Dither.NONE;
	// opts.quality = 100;
	// opts.includeProfile = true;
	// opts.matteColor = new RGBColor();
	// opts.matteColor.red = 255;
	// opts.matteColor.green = 255;
	// opts.matteColor.blue = 255;
	// activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
}

function SavePNG8(saveFile) {
	var opts = new ExportOptionsSaveForWeb;
	opts.format = SaveDocumentType.PNG;
	opts.PNG8 = true;
	opts.transparency = false;
	opts.interlaced = false;
	opts.quality = 100;
	activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
}

function SavePNG24(saveFile) {
	var opts = new ExportOptionsSaveForWeb;
	opts.format = SaveDocumentType.PNG;
	opts.PNG8 = false;
	opts.transparency = true;
	opts.interlaced = false;
	opts.quality = 100;
	activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
}
