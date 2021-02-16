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
