import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';

// Demo GDP
import dataGDP from './data/gdp';

new svgMap({
  targetElementID: 'svgMapGPD',
  data: dataGDP
});

// Demo population
import dataPopulation from './data/population';

new svgMap({
  targetElementID: 'svgMapPopulation',
  data: dataPopulation,
  flagType: 'emoji'
});

// Demo person height in German
import dataPersonHeight from './data/personHeight';
import countriesDE from './local/countriesDE';

new svgMap({
  targetElementID: 'svgMapPersonHeight',
  countryNames: countriesDE,
  data: dataPersonHeight,
  colorMin: '#FFF0F9',
  colorMax: '#730B62',
  hideFlag: true,
  noDataText: 'Keine Daten vorhanden'
});

// Demo EURO as currency

var svgMapEuroCurrency = new svgMap({
  targetElementID: 'svgMapEuroCurrency',
  data: {
    data: {
      euro: {}
    },
    applyData: 'euro',
    values: {
      AT: { euro: 1 },
      BE: { euro: 1 },
      CY: { euro: 1 },
      EE: { euro: 1 },
      FI: { euro: 1 },
      FR: { euro: 1 },
      DE: { euro: 1 },
      GR: { euro: 1 },
      IE: { euro: 1 },
      IT: { euro: 1 },
      LV: { euro: 1 },
      LT: { euro: 1 },
      LU: { euro: 1 },
      MT: { euro: 1 },
      NL: { euro: 1 },
      PT: { euro: 1 },
      ES: { euro: 1 },
      SI: { euro: 1 },
      SK: { euro: 1 },
      XK: { euro: 1 },
      ME: { euro: 1 },
      AD: { euro: 1 },
      MC: { euro: 1 },
      SM: { euro: 1 },
      VA: { euro: 1 }
    }
  },
  colorMin: '#E2E2E2',
  colorMax: '#297ACC',
  colorNoData: '#E2E2E2',
  thresholdMax: 1,
  thresholdMin: 0,
  initialZoom: 3,
  initialPan: {
    x: 420,
    y: 50
  },
  onGetTooltip: function (tooltipDiv, countryID, countryValues) {
    // Geting the list of countries
    var countries = svgMapEuroCurrency.countries;

    // Create tooltip content element
    var tooltipContentElement = document.createElement('div');
    tooltipContentElement.style.padding = '10px 15px';

    // Fill content
    var innerHTML =
      '<div style="min-width: 180px; font-weight: bold; margin: 0 0 15px; text-align: center">' +
      countries[countryID] +
      '</div>';

    if (countryValues && countryValues.euro == 1) {
      innerHTML +=
        '<div style="text-align:center"><span style="color: #6d0; margin-right: 8px">✔</span>Uses Euro</div>';
    } else {
      innerHTML +=
        '<div style="text-align:center; color: #aaa"><span style="color: #f03; margin-right: 8px">✘</span>Does not use Euro</div>';
    }

    // Return element with custom content
    tooltipContentElement.innerHTML = innerHTML;
    return tooltipContentElement;
  }
});
