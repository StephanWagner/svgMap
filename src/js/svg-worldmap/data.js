// Apply the data to the map
svgMap.prototype.applyData = function (data) {

  var max = null;
  var min = null;

  // Get highest and lowest value
  Object.keys(data).forEach(function (countryID) {
    var value = parseInt(data[countryID], 10);
    max === null && (max = value);
    min === null && (min = value);
    value > max && (max = value);
    value < min && (min = value);
  });

  // Loop through countries and set colors
  Object.keys(data).forEach(function (countryID) {
    var element = document.getElementById(this.id + '-map-country-' + countryID);
    if (!element) {
      return;
    }

    var value = parseInt(data[countryID], 10);
    var ratio = value / max;
    var color = this.getColor(this.options.colorMax, this.options.colorMin, ratio);
    element.setAttribute('fill', color);


  }.bind(this));

};