/*
  {
    typeId: number,
    startPos: {x: number, y: number}
  }
*/

#target photoshop;
#include "../libs/json2.js";

var origUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

var activeDoc = app.activeDocument;
if (typeof activeDoc.path == 'undefined') {
  var myPath = 'c:';
} else {
  var myPath = app.activeDocument.path;
}
filePath = (new File($.fileName)).parent + '/shoal3.data.json';
var f = new File(filePath);
f.encoding = 'UTF8';
f.open('w');

var shoal = {
  bounds: {
    width: parseInt(activeDoc.width),
    height: parseInt(activeDoc.height)
  }
};
var fish = [];

function getAlllayersInfo(layerSet, fishType, funType) {
  var fish = [];
  var layers = layerSet.artLayers;

  for (var l_len = layers.length, j = l_len - 1; j >= 0; j--) {
    var layer = layers[j];
    var name = parseInt(layer.name);
    var isSpecial = (layer.name == 'special');
    var fishType = name ? name : (fishType ? fishType : '');
    if (!fishType) {
      continue;
    }

    var fishInfo = getLayerInfo(layer, fishType, isSpecial, funType);
    fish.push(fishInfo);
  }

  var layerSets = layerSet.layerSets;
  for (var l_len = layerSets.length, j = l_len - 1; j >= 0; j--) {
    var layerSet = layerSets[j];
    var name = layerSet.name;
    if (name.indexOf('fun') != -1) {
      var funType = name;
    }
    name = parseInt(layerSet.name);
    var fishType = name ? name : fishType;
    var layerSet_fish = getAlllayersInfo(layerSet, fishType, funType);
    fish = fish.concat(layerSet_fish);
  }

  return fish;
}

shoal.fish = getAlllayersInfo(activeDoc);
f.writeln(JSON.stringify(shoal));

f.close('w');
app.preferences.rulerUnits = origUnits;

function getLayerInfo(layer, fishType, isSpecial, funType) {
  var bounds = layer.bounds;
  var x1 = parseInt(bounds[0]);
  var y1 = parseInt(bounds[1]);
  var x2 = parseInt(bounds[2]);
  var y2 = parseInt(bounds[3]);

  var x = x1 + (x2 - x1) / 2;
  var y = y1 + (y2 - y1) / 2;

  return {
    isSpecial: isSpecial,
    typeId: fishType,
    funType: funType,
    startPos: {
      x: x,
      y: y
    }
  };
}