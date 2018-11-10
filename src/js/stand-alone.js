// UMD module definition
(function (window, document) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('svg-worldmap', function () {
      return svgMap;
    });

  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = svgMap;
    window.svgMap = svgMap;
  }
})(window, document)