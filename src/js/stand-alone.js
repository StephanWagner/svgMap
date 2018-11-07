// UMD module definition
(function (window, document) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('svg-worldmap', function () {
      return svgWorldmap;
    });

  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = svgWorldmap;
    window.svgWorldmap = svgWorldmap;
  }
})(window, document)