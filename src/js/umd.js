(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['svgPanZoom'], function (svgPanZoom) {
      return (root.svgMap = factory(svgPanZoom));
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = root.svgMap = factory(require('svgPanZoom'));
  } else {
    root.svgMap = factory(svgPanZoom);
  }
})(this, function (svgPanZoom) {
  var svgMap = svgMapWrapper(svgPanZoom);
  return svgMap;
});
