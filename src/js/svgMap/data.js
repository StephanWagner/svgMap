// Apply the data to the map
svgMap.prototype.applyData = function (data) {

  var max = null;
  var min = null;

  // Get highest and lowest value
  Object.keys(data.values).forEach(function (countryID) {
    var value = parseInt(data.values[countryID][data.applyData], 10);
    max === null && (max = value);
    min === null && (min = value);
    value > max && (max = value);
    value < min && (min = value);
  });

  data.data[data.applyData].thresholdMax && (max = Math.min(max, data.data[data.applyData].thresholdMax));
  data.data[data.applyData].thresholdMin && (min = Math.max(min, data.data[data.applyData].thresholdMin));

  // Loop through countries and set colors
  Object.keys(this.countries).forEach(function (countryID) {
    var element = document.getElementById(this.id + '-map-country-' + countryID);
    if (!element) {
      return;
    }
    if (!data.values[countryID]) {
      element.setAttribute('fill', this.options.colorNoData);
      return;
    }
    var value = Math.max(min, parseInt(data.values[countryID][data.applyData], 10));
    var ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
    var color = this.getColor(this.options.colorMax, this.options.colorMin, ratio);
    element.setAttribute('fill', color);
  }.bind(this));

};