function getHex(rawStyle){

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {

    var hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

    return hex.toUpperCase();
  }
  

  var rawStyleSplit = rawStyle.split(",");

  var r = parseInt(rawStyleSplit[0].replace('rgb(',''));
  var g = parseInt(rawStyleSplit[1]);
  var b = parseInt(rawStyleSplit[2].replace(')',''));

  return rgbToHex(r, g, b); 
}