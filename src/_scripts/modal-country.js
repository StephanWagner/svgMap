
// Create for the country modal
svgMap.prototype.createCountryModal = function () {
  this.countryModalWrapper = $('<div class="svgMap-country-modal-wrapper svgMap-content-active"/>').appendTo(this.wrapper);
  this.createCountryModalSearch(this.countryModalWrapper);
  this.countryModalHeader = $('<div class="svgMap-country-modal-header"/>').appendTo(this.countryModalWrapper);

  // Add title with tooltip
  $('<div class="svgMap-country-modal-title-container"/>')
    .append($('<div class="svgMap-country-modal-title"/>'))
    .append($('<div class="svgMap-country-modal-toggle"/>').html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329 512"><path d="M307.143 210.286q0 3.714-2.857 6.572l-133.143 133.143q-2.857 2.857-6.571 2.857t-6.572-2.857l-133.143-133.143q-2.857-2.857-2.857-6.571t2.857-6.572l14.285-14.286q2.857-2.857 6.572-2.857t6.572 2.857l112.285 112.286 112.285-112.286q2.857-2.857 6.572-2.857t6.572 2.857l14.286 14.286q2.857 2.857 2.857 6.572z"></path></svg>'))
    .on('click', function () {
      this.toggleCountryModalContent();
    }.bind(this))
    .appendTo(this.countryModalWrapper);
  $('<div class="svgMap-country-modal-chosen-country-tooltip"/>').appendTo(this.countryModalWrapper);
  this.countryModalContent = $('<div class="svgMap-country-modal-content"/>').appendTo(this.countryModalWrapper);
}

// Create the search for the country modal
svgMap.prototype.createCountryModalSearch = function (headerWrapper) {
  var wrapper = $('<div class="svgMap-country-modal-search-wrapper"/>')
    .appendTo(headerWrapper);

  var me = this;

  $('<input class="svgMap-country-modal-search-input"/>')
    .attr('placeholder', 'Ländersuche')
    .on('focus', function () {
      me.selectedCountryInput = $(this);
      me.countryModalWrapper.addClass('svgMap-search-enabled');
      var val = $(this).val();
      setTimeout(function () {
        if ($('.svgMap-country-modal-search-input:focus').length) {
          me.openCountryFinderResults(wrapper, val);
        }
      }, 320);
    })
    .on('blur', function () {
      setTimeout(function () {
        me.selectedCountryInput = null;
        me.closeCountryFinderResults();
        me.countryModalWrapper.removeClass('svgMap-search-enabled');
      }, 40);
    })
    .on('input', function () {
      me.updateCountryFinderResults($(this).val());
    })
    .on('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === 'Tab') {
        me.setCountryFinderResult($(this));
        ev.key === 'Enter' && $(this).blur();
      }
    })
    .appendTo(wrapper);

  $('<div class="svgMap-country-modal-search-button"/>')
    .html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576"><path d="M224.369 96c70.172 0 127.266 57.422 127.266 128 0 26.578-8.156 52.164-23.594 73.984l-12.531 17.696-17.594 12.586c-21.687 15.531-47.125 23.734-73.547 23.734-70.188 0-127.266-57.422-127.266-128s57.079-128 127.266-128zM224.369 32c-105.437 0-190.906 85.961-190.906 192s85.469 192 190.906 192c41.203 0 79.25-13.258 110.438-35.586l153.312 154.195c6.234 6.266 14.391 9.391 22.547 9.391s16.312-3.125 22.531-9.391c12.453-12.518 12.453-32.812 0-45.328l-153.312-154.195c22.203-31.375 35.375-69.648 35.375-111.086 0-106.039-85.469-192-190.891-192v0z"></path></svg>')
    .on('click', function () {
      console.log('CLICK Search');
    })
    .appendTo(wrapper);

  this.countryModalSearchResults = $('<div class="svgMap-country-modal-search-results"/>')
    .appendTo(headerWrapper);
};

// Open the country modal
svgMap.prototype.openCountryModal = function (countryID) {
  this.closeModal();
  if (!$('.svgMap-country-modal-header-countries-wrapper').length) {
    this.createCountryModalHeader();
  }
  if (!countryID) {
    countryID = this.countriesCategory1[0];
  }
  this.setCountryModalContent(countryID);
  this.countryModalWrapper.addClass('svgMap-active');
}

// Close the country modal
svgMap.prototype.closeCountryModal = function () {
  this.countryModalWrapper.removeClass('svgMap-active');
}

// Create the header for the country modal
svgMap.prototype.createCountryModalHeader = function () {
  var me = this;

  this.countryModalHeader.html('');
  $.each([
    {index: 1, name: 'Ihre Wachstumsländer'},
    {index: 2, name: 'Ihre Risikoländer'}
  ], function (index, item) {
    var wrapper = $('<div class="svgMap-country-modal-header-countries-wrapper"/>').appendTo(this.countryModalHeader);
    var label = $('<div class="svgMap-country-modal-header-countries-label"/>').html(item.name).appendTo(wrapper);
    var container = $('<div class="svgMap-country-modal-header-countries-container"/>').appendTo(wrapper);
    while (this['countriesCategory' + item.index].length < 3) {
      this['countriesCategory' + item.index].push('-');
    }
    $.each(this['countriesCategory' + item.index], function (index2, countryID) {
      var countryWrapper = $('<div class="svgMap-country-modal-header-country-wrapper"/>')
      .on('mouseenter', function () {
        if (countryID != '-') {
          $(this).addClass('svgMap-tooltip-active');
          $('.svgMap-country-modal-chosen-country-tooltip').html(me.data[countryID]['name' + me.options.language]).addClass('svgMap-active');
        }
      })
      .on('mouseleave', function () {
        $('.svgMap-country-modal-header-country-wrapper.svgMap-tooltip-active').removeClass('svgMap-tooltip-active');
        $('.svgMap-country-modal-chosen-country-tooltip.svgMap-active').removeClass('svgMap-active');
      })
      .on('click', function () {
        $('.svgMap-country-modal-header-country-wrapper.svgMap-tooltip-active').removeClass('svgMap-tooltip-active');
        $('.svgMap-country-modal-chosen-country-tooltip.svgMap-active').removeClass('svgMap-active');
        if (countryID != '-') {
          me.activateCountry(countryID);
          me.setCountryModalContent(countryID);
        }
      })
      .appendTo(container);

      $('<div class="svgMap-country-modal-header-country"/>')
        .addClass('svgMap-category-bg-' + (countryID != '-' ? this.data[countryID].category : 'none'))
        .html(countryID)
        .attr('data-id', countryID)
        .appendTo(countryWrapper);
    }.bind(this));
  }.bind(this));
};

// Set the content for the country modal dependent on country ID
svgMap.prototype.setCountryModalContent = function (countryID) {
  // Reset
  $('.svgMap-country-modal-header-country.svgMap-active').removeClass('svgMap-active');
  $('.svgMap-country-modal-header-country[data-id="' + countryID + '"]').addClass('svgMap-active');
  $('.svgMap-country-modal-title').html(this.data[countryID]['name' + this.options.language]);
  this.countryModalContent.html('');

  // Risk comparison
  this.createRistComparisonContainer(countryID);

  // Chart
  this.createChartWrappers(countryID);
  this.showChart(countryID);

  // Add footer
  this.createCountryModalFooter(countryID);

  // Open content if closed
  this.openCountryModalContent();

  // Show active country
  this.activateCountry(countryID);
};

// Create the risk comparison container
svgMap.prototype.createRistComparisonContainer = function (countryID) {
  var riskComparisonWrapper = $('<div class="svgMap-risk-comparison-wrapper"/>').appendTo(this.countryModalContent);

  var riskComparisonContainer1 = $('<div class="svgMap-risk-comparison-container svgMap-risk-comparison-container1"/>').appendTo(riskComparisonWrapper);
  $('<div class="svgMap-risk-comparison-icon"/>')
    .html(this.data[countryID].risk[0])
    .appendTo(riskComparisonContainer1);
  $('<div class="svgMap-risk-comparison-text"/>')
    .html('% der von uns befragten Exporteure sind der Ansicht: <br>Dieses Land ist ein Wachstumsland.')
    .appendTo(riskComparisonContainer1);

  var riskComparisonContainer2 = $('<div class="svgMap-risk-comparison-container svgMap-risk-comparison-container2"/>').appendTo(riskComparisonWrapper);
  $('<div class="svgMap-risk-comparison-icon"/>')
    .html(this.data[countryID].risk[1])
    .appendTo(riskComparisonContainer2);
  $('<div class="svgMap-risk-comparison-text"/>')
    .html('% der befragten Exporteure hingegen meinen: <br>Exporte in dieses Land sind risikobehaftet.')
    .appendTo(riskComparisonContainer2);
};

// Create the wrappers for the chart
svgMap.prototype.createChartWrappers = function (countryID) {
  var chartWrapper = $('<div class="svgMap-chart-wrapper"/>').appendTo(this.countryModalContent);
  var chartTitle = $('<div class="svgMap-chart-title-container"/>').appendTo(chartWrapper);
  var chartContainer = $('<div class="svgMap-chart-container"/>').appendTo(chartWrapper);
  var chartNavigation = $('<div class="svgMap-chart-navigation-container"/>').appendTo(chartContainer);

  $.each([
    {
      id: 'bipentwicklung',
      title: 'BIP Entwicklung von ' + Object.keys(this.data[countryID].charts.bipentwicklung)[0] + ' bis ' + Object.keys(this.data[countryID].charts.bipentwicklung).pop(),
      navTitle: 'BIP Entwicklung'
    },
    {
      id: 'exporte',
      title: 'Wachstum deutscher Exporte von ' + Object.keys(this.data[countryID].charts.bipentwicklung)[0] + ' bis ' + Object.keys(this.data[countryID].charts.bipentwicklung).pop(),
      navTitle: 'Exporte'
    },
    {
      id: 'deckungsquote',
      title: 'Deckungsquote von ' + Object.keys(this.data[countryID].charts.bipentwicklung)[0] + ' bis ' + Object.keys(this.data[countryID].charts.bipentwicklung).pop(),
      navTitle: 'Deckungsquote'
    },
    {
      id: 'ueberfaelligkeiten',
      title: 'Überfälligkeiten in vergangenen Jahr',
      navTitle: 'Überfälligkeiten'
    },
    {
      id: 'schaeden',
      title: 'Schäden von ' + Object.keys(this.data[countryID].charts.bipentwicklung)[0] + ' bis ' + Object.keys(this.data[countryID].charts.bipentwicklung).pop(),
      navTitle: 'Schäden'
    },
    {
      id: 'laenderkategorie',
      title: 'Länderkategorie von ' +  Object.keys(this.data[countryID].charts.bipentwicklung)[0] + ' bis ' + Object.keys(this.data[countryID].charts.bipentwicklung).pop(),
      navTitle: 'Länderkategorie'
    }
  ], function (index, item) {
    $('<div class="svgMap-chart-navigation-item"/>')
    .attr('data-id', item.id)
    .attr('data-title', item.title)
    .on('click', function () {
      this.showChart(countryID, item.id);
    }.bind(this))
    .html(item.navTitle)
    .appendTo(chartNavigation);
  }.bind(this));

  var chartCanvasContainer = $('<div class="svgMap-chart-canvas-container"/>').appendTo(chartContainer);
  var chartCanvas = $('<div class="svgMap-chart-canvas"/>').appendTo(chartCanvasContainer);
  this.chartCanvas = $('<canvas id="svgMap-chart" height="185"/>').appendTo(chartCanvas);
}

// Show a specific chart in the country modal
svgMap.prototype.showChart = function (countryID, chartID) {
  !this.showChartID && (this.showChartID = 'bipentwicklung');
  chartID && (this.showChartID = chartID);

  $('.svgMap-chart-navigation-item.svgMap-active').removeClass('svgMap-active');
  $('.svgMap-chart-navigation-item[data-id="' + this.showChartID + '"]').addClass('svgMap-active');
  $('.svgMap-chart-title-container').html($('.svgMap-chart-navigation-item.svgMap-active').attr('data-title'));

  var chartOptions = {
    bipentwicklung: {
      tooltip: '{VALUE} %',
      color: '#2f98e8'
    },
    exporte: {
      tooltip: '{VALUE} %',
      color: '#ff5879'
    },
    deckungsquote: {
      tooltip: '{VALUE} %',
      color: '#8e5cff'
    },
    ueberfaelligkeiten: {
      tooltip: '{VALUE} Mio €',
      color: '#ff9438',
      monthnames: {
        1: {'DE': ['Jan', 'Januar'], 'EN': ['Jan', 'January']},
        2: {'DE': ['Feb', 'Februar'], 'EN': ['Feb', 'February']},
        3: {'DE': ['Mrz', 'März'], 'EN': ['Mar', 'March']},
        4: {'DE': ['Apr', 'April'], 'EN': ['Apr', 'April']},
        5: {'DE': ['Mai', 'Mai'], 'EN': ['May', 'May']},
        6: {'DE': ['Jun', 'Juni'], 'EN': ['Jun', 'June']},
        7: {'DE': ['Jul', 'Juli'], 'EN': ['Jul', 'July']},
        8: {'DE': ['Aug', 'August'], 'EN': ['Aug', 'August']},
        9: {'DE': ['Sep', 'September'], 'EN': ['Sep', 'September']},
        10: {'DE': ['Okt', 'Oktober'], 'EN': ['Oct', 'October']},
        11: {'DE': ['Nov', 'November'], 'EN': ['Nov', 'November']},
        12: {'DE': ['Dez', 'Dezember'], 'EN': ['Dec', 'December']},
        'Jan': 1,
        'Feb': 2,
        'Mrz': 3,
        'Mar': 3,
        'Apr': 4,
        'Mai': 5,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Okt': 10,
        'Oct': 10,
        'Nov': 11,
        'Dez': 12,
        'Dec': 12
      }
    },
    schaeden: {
      tooltip: '{VALUE} Mio €',
      color: '#ffc64c'
    },
    laenderkategorie: {
      tooltip: 'Kategorie {VALUE}',
      color: '#42b8b8'
    }
  }

  var yValues = Object.values(this.data[countryID].charts[this.showChartID]);
  var xValues = Object.keys(this.data[countryID].charts[this.showChartID]);

  if (this.showChartID == 'ueberfaelligkeiten') {
    var xValuesOrg = xValues;
    $.each(xValues, function (index, value) {
      xValues[index] = chartOptions[this.showChartID].monthnames[value][this.options.language][0];
    }.bind(this));
  }

  var options = {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [
        {
          data: yValues,
          backgroundColor: chartOptions[this.showChartID].color,
          borderColor: chartOptions[this.showChartID].color,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 4
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        titleFontFamily: '"Fira Sans", Arial, sans-serif',
        titleFontSize: 14,
        bodyFontFamily: '"Fira Sans", Arial, sans-serif',
        bodyFontSize: 18,
        custom: function(tooltip) {
          if (!tooltip) return;
          tooltip.displayColors = false;
        },
        callbacks: {
          label: function(tooltipItems, data) {
            return chartOptions[this.showChartID].tooltip.replace('{VALUE}', tooltipItems.yLabel)
          }.bind(this),
          title: function(tooltipItems, data) {
            if (this.showChartID == 'ueberfaelligkeiten') {
              var orgLabel = chartOptions[this.showChartID].monthnames[tooltipItems[0].xLabel];
              return chartOptions[this.showChartID].monthnames[orgLabel][this.options.language][1]
            }
            return tooltipItems[0].xLabel;
          }.bind(this)
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: false
          }
        }]
      }
    }
  };
  var ctx = document.getElementById('svgMap-chart').getContext('2d');
  this.chart && this.chart.destroy();
  this.chart = new Chart(ctx, options);
};

// Create the footer for country modal
svgMap.prototype.createCountryModalFooter = function () {
  var countryModalFooter = $('<div class="svgMap-country-modal-footer"/>').appendTo(this.countryModalContent);
  $('<div class="svgMap-country-modal-footer-headline"/>').html('Planen Sie ein Exportgeschäft in dieses Land? Sprechen Sie uns an!').appendTo(countryModalFooter);
  var countryModalFooterIcons = $('<div class="svgMap-country-modal-footer-icons"/>').appendTo(countryModalFooter);

  var countryModalFooterIconPhone = $('<div class="svgMap-country-modal-footer-icon-container"/>').appendTo(countryModalFooterIcons);
  $('<div class="svgMap-country-modal-footer-icon svgMap-country-modal-footer-icon-phone"/>').html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 0h-224c-26.4 0-48 21.6-48 48v416c0 26.4 21.6 48 48 48h224c26.4 0 48-21.6 48-48v-416c0-26.4-21.6-48-48-48zM192 24h128v16h-128v-16zM256 480c-17.673 0-32-14.327-32-32s14.327-32 32-32 32 14.327 32 32-14.327 32-32 32zM384 384h-256v-320h256v320z"></path></svg>').appendTo(countryModalFooterIconPhone);
  $('<div class="svgMap-country-modal-footer-icon-text"/>').html('+49 40 8834 9000').appendTo(countryModalFooterIconPhone);

  var countryModalFooterIconEmail = $('<a href="mailto:info@exportkreditgarantien.de" class="svgMap-country-modal-footer-icon-container"/>').appendTo(countryModalFooterIcons);
  $('<div class="svgMap-country-modal-footer-icon svgMap-country-modal-footer-icon-email"/>').html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M315.118 272.538l168.953 144.817c-6.147 5.743-14.413 9.311-23.504 9.311h-409.133c-9.136 0-17.429-3.514-23.578-9.248l169.027-144.88 59.118 51.728zM256 290.134l-228.071-195.489c6.147-5.743 14.413-9.311 23.504-9.311h409.133c9.136 0 17.429 3.513 23.579 9.248zM494.933 398.869l-164.954-140.177 164.954-143.477v283.654zM17.067 398.869v-283.561l164.954 143.384-164.954 140.177z"></path></svg>').appendTo(countryModalFooterIconEmail);
  $('<div class="svgMap-country-modal-footer-icon-text"/>').html('E-Mail').appendTo(countryModalFooterIconEmail);

  var countryModalFooterIconPolicy = $('<div class="svgMap-country-modal-footer-icon-container"/>').appendTo(countryModalFooterIcons);
  $('<div class="svgMap-country-modal-footer-icon svgMap-country-modal-footer-icon-policy"/>').html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M458.903 114.538c-11.106-15.146-26.587-32.85-43.589-49.852s-34.706-32.482-49.852-43.589c-25.787-18.91-38.296-21.097-45.462-21.097h-248c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h368c22.056 0 40-17.944 40-40v-312c0-7.166-2.186-19.675-21.097-45.462zM392.687 87.313c15.35 15.35 27.4 29.199 36.29 40.687h-76.977v-76.973c11.492 8.89 25.339 20.939 40.687 36.286zM448 472c0 4.336-3.664 8-8 8h-368c-4.336 0-8-3.664-8-8v-432c0-4.336 3.664-8 8-8 0 0 247.978-0.001 248 0v112c0 8.836 7.163 16 16 16h112v312z"></path><path d="M368 416h-224c-8.836 0-16-7.163-16-16s7.164-16 16-16h224c8.837 0 16 7.163 16 16s-7.163 16-16 16z"></path><path d="M368 352h-224c-8.836 0-16-7.163-16-16s7.164-16 16-16h224c8.837 0 16 7.163 16 16s-7.163 16-16 16z"></path><path d="M368 288h-224c-8.836 0-16-7.163-16-16s7.164-16 16-16h224c8.837 0 16 7.163 16 16s-7.163 16-16 16z"></path></svg>').appendTo(countryModalFooterIconPolicy);
  $('<div class="svgMap-country-modal-footer-icon-text"/>').html('Beschlusslage').appendTo(countryModalFooterIconPolicy);
};

// Toggle the country modal content area
svgMap.prototype.toggleCountryModalContent = function () {
  $('.svgMap-country-modal-wrapper').toggleClass('svgMap-content-active');
  $('.svgMap-country-modal-content')[$('.svgMap-country-modal-wrapper').hasClass('svgMap-content-active') ? 'slideDown' : 'slideUp'](320);
};

svgMap.prototype.closeCountryModalContent = function () {
  if (!$('.svgMap-country-modal-wrapper').hasClass('svgMap-content-active')) {
    return;
  }
  $('.svgMap-country-modal-wrapper').removeClass('svgMap-content-active');
  $('.svgMap-country-modal-content').slideUp(320);
};

svgMap.prototype.openCountryModalContent = function () {
  if ($('.svgMap-country-modal-wrapper').hasClass('svgMap-content-active')) {
    return;
  }
  $('.svgMap-country-modal-wrapper').addClass('svgMap-content-active');
  $('.svgMap-country-modal-content').slideDown(320);
};

// Show a country if chosen
svgMap.prototype.showCountry = function (countryID) {
  if (!this.data[countryID]) {
    return;
  }

  if (this.allCountriesUnlocked || this.countriesCategory1.indexOf(countryID) !== -1 || this.countriesCategory2.indexOf(countryID) !== -1) {
    this.activateCountry(countryID);
    this.openCountryModal(countryID);
    return;
  }
  this.openModal('BlockCountry');
};

// Set active state to a specific country
svgMap.prototype.activateCountry = function (countryID) {
  var pathElement = $('#svgMap-country-' + countryID);
  if (!pathElement) {
    return;
  }
  pathElement.appendTo(pathElement.parent());
  $('.svgMap-country.svgMap-active').removeClass('svgMap-active');
  pathElement.addClass('svgMap-active');
};
