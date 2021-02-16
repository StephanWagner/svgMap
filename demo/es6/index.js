import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';

// Demo GDP
import dataGDP from './data/gdp';

new svgMap({
  targetElementID: 'svgMapGPD',
  data: dataGDP
});
