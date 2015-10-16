function PathCoordinateExport(el, fileOutput, filePath) {

	var layerRef = app.activeDocument.artLayers.getByName("图层 2");
	alert(app.activeDocument.artLayers.length)
	layerRef.allLocked = true;

}

function init() {

	// Establish the correct linefeed type
	if ($.os.search(/windows/i) != -1) {
		fileLineFeed = "windows";
	} else {
		fileLineFeed = "macintosh";
	}

	// Do we have a document open?
	if (app.documents.length === 0) {
		alert("Please open a file", "PathsToImageMap Error", true);
		return;
	}

	// If we have more than one document open...
	if (app.documents.length > 1) {

		var runMultiple = confirm("PathsToImageMap has detected multiple open files.\nDo you wish to run PathsToImageMap on all open files?", true, "PathsToImageMap");

		if (runMultiple === true) {
			docs = app.documents;
		} else {
			docs = [app.activeDocument];
		}

	// Or only one document open...
	} else {
		runMultiple = false;
		docs = [app.activeDocument];
	}

	// Loop through all documents
	for (var i = 0; i < docs.length; i++)
	{

		// Auto set filePath and fileName
		filePath = Folder.myDocuments + '/PathsToImageMap-' + docs[i].name + '.txt';

		// create outfile
		var fileOutput = new File(filePath);

		// set linefeed
		fileOutput.linefeed = fileLineFeed;

		// open for write
		fileOutput.open("w", "TEXT", "????");

		// Set active document
		app.activeDocument = docs[i];

		// call to the core with the current document
		PathCoordinateExport(app.activeDocument, fileOutput, '/');

		// close the file
		fileOutput.close();

	}

	// Finish up by displaying a notice (multiple) or opening the output file (single)
	if (runMultiple === true) {
		alert("PathsToImageMap has parsed " + documents.length + " files;\nFiles were saved in your documents folder", "PathsToImageMap");
	} else {
		fileOutput.execute();
	}

}

init()
