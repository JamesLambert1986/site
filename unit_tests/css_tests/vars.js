var options = {
  width: 375,
  height: 500,
  stylesheet: ["/base/public/stylesheets/styles.css","/base/unit_tests/css_reset.css"]
}

var frame;
var element;

var unitTest = true;

var getRawStyle = function (element,attr){

  return element.getRawStyle(attr);
}

var isMobile = true;

var isTablet = true;

var isDesktop = true;
