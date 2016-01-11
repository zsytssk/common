// #target photoshop

#include "libs/saveImages.jsx";

function main() {
	if($.os.search(/windows/i) !== -1) {
		fileLineFeed = 'windows';
	} else {
		fileLineFeed = 'macintosh';
	}

	if(app.documents.length === 0) {
		alert('Please open a file', 'PathsToImageMap Error', true);
		return;
	}

	if(app.documents.length > 1) {
		var runMultiple = confirm('PathsToImageMap has detected multiple open files.\nDo you wish to run PathsToImageMap on all open files?', true, 'PathsToImageMap');
		if(runMultiple === true) {
			docs = app.documents;
		} else {
			docs = [app.activeDocument];
		}
	} else {
		runMultiple = false;
		docs = [app.activeDocument];
	}

	// Loop through all documents
	for(var i = 0; i < docs.length; i++) {
		// position info
		var txtFilePath = 'E:/zsytssk/job/save/repairo2o/mobile/' + docs[i].name.substr(0, docs[i].name.length - 4) + '.position.txt';
		var txtFileOutput = new File(txtFilePath);
		txtFileOutput.linefeed = fileLineFeed;
		txtFileOutput.open('w', 'TEXT', '????');
		app.activeDocument = docs[i];
		getTextPositions(app.activeDocument, txtFileOutput, '/');
		txtFileOutput.close();

		// BackgroundImage
		var pngFilePath = 'E:/zsytssk/job/save/repairo2o/mobile/';
		var pngName = docs[i].name.substr(0, docs[i].name.length - 4) + '.background.png';
		getBackgroundImage(app.activeDocument, pngFilePath, pngName, '背景');
	}
}

main();

function getTextPositions(el, fileOut, path) {
	var layers = el.layers;
	for(var layerIndex = layers.length; layerIndex > 0; layerIndex--) {
		var currentLayer = layers[layerIndex - 1];
		if(currentLayer.typename === 'LayerSet') {
			goTextExport2(currentLayer, fileOut, path + currentLayer.name + '/');
		} else {
			if((currentLayer.visible) && (currentLayer.kind === LayerKind.TEXT)) {
				fileOut.writeln('***********************');
				fileOut.writeln('');
				fileOut.writeln('LayerName: ' + currentLayer.name);
				fileOut.writeln('');
				var left = ('left: ' + currentLayer.bounds[0]).replace(' px', 'px');
				var top = ('top: ' + (currentLayer.bounds[1] - 4)).replace(' px', 'px');
				fileOut.writeln(left);
				fileOut.writeln(top);
				// alert(currentLayer.bounds[1] - 4);
				fileOut.writeln('');
			}
		}
	}
}

function getBackgroundImage(el, path, name, lname) {
	var layers = el.layers;
	activeDocument.activeLayer = layers.getByName(lname);
	dupLayers();
	var saveFile = File(path + name);
	// SavePNG(saveFile);
	// SavePNG8(saveFile);
	SaveGIF(saveFile);
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function dupLayers() {
	var desc143 = new ActionDescriptor();
	var ref73 = new ActionReference();
	ref73.putClass(charIDToTypeID('Dcmn'));
	desc143.putReference(charIDToTypeID('null'), ref73);
	desc143.putString(charIDToTypeID('Nm  '), activeDocument.activeLayer.name);
	var ref74 = new ActionReference();
	ref74.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
	desc143.putReference(charIDToTypeID('Usng'), ref74);
	executeAction(charIDToTypeID('Mk  '), desc143, DialogModes.NO);
}


