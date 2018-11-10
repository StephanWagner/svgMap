// Log error to console
svgWorldmap.prototype.error = function (error) {
  (console.error || console.log)('SVG Worldmap Error: ' + (error || 'Unknown error'));
};

// Get the category of a country by its ISO ID
svgWorldmap.prototype.getCountryCategory = function (countryID) {
  return this.data && this.data[countryID] ? (this.data[countryID].category || 0) : 'default';
};

// Helper to create an element with a class name
svgWorldmap.prototype.createElement = function (type, className, appendTo, innerhtml) {
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
svgWorldmap.prototype.numberWithCommas = function (nr) {
  return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};