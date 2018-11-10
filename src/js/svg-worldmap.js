// Wrapper function
var svgMap = function (options) {
  this.init(options)
}

// Initialize SVG Worldmap
svgMap.prototype.init = function (options) {

  // Default options, pass a custom options object to overwrite specific
  var defaultOptions = {

    // The element to render the map in
    targetElementID: '',

    // Minimum and maximum zoom
    minZoom: 1,
    maxZoom: 10,

    // Initial zoom
    initialZoom: 1.2,

    // Zoom sensitivity
    zoomScaleSensitivity: 0.2,

    // Data colors
    colorMax: '#FF0000',
    colorMin: '#00FF00',
    colorNoData: '#DDDDDD',

    // Data thresholds
    thresholdMax: null,
    thresholdMin: null,

    // The url to the flags, {0} will get replaced with lowercase coutry id
    flagURL: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg'
  };

  this.options = Object.assign({}, defaultOptions, (options || {}));

  // Abort if target element not found
  if (!this.options.targetElementID || !document.getElementById(this.options.targetElementID)) {
    this.error('Target element not found');
  }

  // Global id
  this.id = this.options.targetElementID;

  // Cache wrapper element
  this.wrapper = document.getElementById(this.options.targetElementID);

  // Create the map
  this.createMap();

  // Apply map data
  this.applyData(svgMapDataPopulation);
}