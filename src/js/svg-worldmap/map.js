// Create the SVG map

svgWorldmap.prototype.createMap = function () {

    // Create the tooltip
    //this.createTooltip();

    // Create map wrappers
    this.mapWrapper = this.createElement('div', 'svgWorldmap-map-wrapper', this.wrapper);
    this.mapImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.mapImage.setAttribute('viewBox', '0 0 2000 1001');
    this.mapImage.classList.add('svgWorldmap-map-image');
    this.mapWrapper.appendChild(this.mapImage);

    /*
    // Add controls
    var mapControlsWrapper = $('<div class="svgWorldmap-map-controls-wrapper"/>').appendTo(this.mapWrapper);
    var zoomContainer = $('<div class="svgWorldmap-map-controls-zoom"/>').appendTo(mapControlsWrapper);
    $.each(['in', 'out'], function (index, item) {
      $('<div class="svgWorldmap-control-button svgWorldmap-zoom-button svgWorldmap-zoom-' + item + '-button"/>')
        .on('click', function () { me.zoomMap(item); })
        .appendTo(zoomContainer);
    });
    */

    Object.keys(this.countries).forEach(function(countryID) {
        var countryData = this.countries[countryID];
        if (!countryData.d) {
            return;
        }

        var countryElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        countryElement.setAttribute('d', countryData.d);
        countryElement.setAttribute('data-id', countryID);
        countryElement.classList.add('svgWorldmap-country');
        // TODO countryElement.classList.add('svgWorldmap-category-' + this.getCountryCategory(countryID));

        this.mapImage.appendChild(countryElement);

        ['mouseenter', 'touchdown'].forEach(function(event) {
            countryElement.addEventListener(event, function(){
                this.mapImage.appendChild(countryElement);
                // TODO $('.svgWorldmap-country.svgWorldmap-active').length && me.activateCountry($('.svgWorldmap-country.svgWorldmap-active').attr('data-id'));
            }.bind(this));
        }.bind(this));

        /*
        // Tooltip events
        country.on('click', function () {
          var countryID = $(this).attr('data-id');
          me.showCountry(countryID);
        });

        // Tooltip events
        country.on('mouseenter', function (e) {
          me.setTooltipContent(me.data[$(this).attr('data-id')]['name' + me.options.language]);
          me.showTooltip(e);
        })
        .on('mousemove', function (e) {
          me.moveTooltip(e);
        })
        .on('mouseleave', function (e) {
          me.hideTooltip();
        });
        */
    }.bind(this));

    /*

    // Expose to window namespace for testing purposes
    this.mapPanZoom = svgPanZoom('#svgWorldmap-map-image', {
      zoomEnabled: true,
      fit: 1,
      center: 1,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
      zoomScaleSensitivity: this.options.zoomScaleSensitivity,
      controlIconsEnabled: false,
      mouseWheelZoomEnabled: true,
      preventMouseEventsDefault: true,
      onZoom: function () {
        me.setControlStatuses();
      },
      beforePan: function(oldPan, newPan) {
        var gutterWidth = me.mapWrapper.width() * 0.85;
        var gutterHeight = me.mapWrapper.height() * 0.85;
        var sizes = this.getSizes();
        var leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth - 260;
        var rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
        var topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
        var bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
        return {
          x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
          y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
        }
      }
    });
    this.mapPanZoom.zoomIn();

    this.setControlStatuses();
    */

}

/*
// Set the disabled statuses for buttons
svgWorldmap.prototype.setControlStatuses = function () {
  $('.svgWorldmap-control-button').removeClass('svgWorldmap-disabled');

  if (this.mapPanZoom.getZoom().toFixed(3) <= this.options.minZoom) {
    $('.svgWorldmap-zoom-out-button').addClass('svgWorldmap-disabled');
  }
  if (this.mapPanZoom.getZoom().toFixed(3) >= this.options.maxZoom) {
    $('.svgWorldmap-zoom-in-button').addClass('svgWorldmap-disabled');
  }
};

// Zoom map
svgWorldmap.prototype.zoomMap = function (direction) {
  if ($('.svgWorldmap-zoom-' + direction + '-button').hasClass('svgWorldmap-disabled')) {
    return false;
  }
  this.mapPanZoom[direction == 'in' ? 'zoomIn' : 'zoomOut']();
};

*/