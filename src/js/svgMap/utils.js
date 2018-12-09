// Log error to console
svgMap.prototype.error = function (error) {
  (console.error || console.log)('svgMap error: ' + (error || 'Unknown error'));
};

// Helper to create an element with a class name
svgMap.prototype.createElement = function (type, className, appendTo, innerhtml) {
  var element = document.createElement(type);
  if (className) {
    className = className.split(' ');
    className.forEach(function (item) {
      element.classList.add(item);
    });
  }
  innerhtml && (element.innerHTML = innerhtml);
  appendTo && appendTo.appendChild(element);
  return element;
};

// Print numbers with commas
svgMap.prototype.numberWithCommas = function (nr, separator) {
  return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, (separator || ','));
};

// Get a color between two other colors
svgMap.prototype.getColor = function (color1, color2, ratio) {
  color1 = color1.slice(-6);
  color2 = color2.slice(-6);
  var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
  var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
  var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
  return '#' + this.getHex(r) + this.getHex(g) + this.getHex(b);
};

// Get a hex value
svgMap.prototype.getHex = function (value) {
  value = value.toString(16);
  return ('0' + value).slice(-2);
};

// Get the name of a country by its ID
svgMap.prototype.getCountryName = function (countryID) {
  return this.options.countryNames && this.options.countryNames[countryID] ? this.options.countryNames[countryID] : this.countries[countryID];
};