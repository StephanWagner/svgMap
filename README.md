# svgMap

svgMap is a JavaScript library that lets you easily create an interactable world map comparing customizable data for each country.

Live demo: https://stephanwagner.me/create-world-map-charts-with-svgmap#svgMapDemoGDP

---

## Install

### ES6

```bash
npm install --save svgmap
```

```javascript
import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/StephanWagner/svgMap@v2.1.1/dist/svgMap.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/StephanWagner/svgMap@v2.1.1/dist/svgMap.min.css" rel="stylesheet">
```

---

## Usage

Create an HTML element where to show your map, then use JavaScript to initialize:

```html
<div id="svgMap"></div>
```

```javascript
new svgMap({
  targetElementID: 'svgMap',
  data: {
    data: {
      gdp: {
        name: 'GDP per capita',
        format: '{0} USD',
        thousandSeparator: ',',
        thresholdMax: 50000,
        thresholdMin: 1000
      },
      change: {
        name: 'Change to year before',
        format: '{0} %'
      }
    },
    applyData: 'gdp',
    values: {
      AF: {gdp: 587, change: 4.73},
      AL: {gdp: 4583, change: 11.09},
      DZ: {gdp: 4293, change: 10.01}
      // ...
    }
  }
});
```

This example code creates a world map with the GDP per capita and its change to the previous year:
https://stephanwagner.me/create-world-map-charts-with-svgmap#svgMapDemoGDP

---

## Options

You can pass the following options into svgMap:

* `targetElementID` (`string`) The ID of the element where the world map will render (Required)

* `minZoom`, `maxZoom` (`float`) Minimal and maximal zoom level. Default: `1` for `minZoom`, `25` for `maxZoom`

* `initialZoom` (`float`) Initial zoom level. Default: `1.06`

* `zoomScaleSensitivity` (`float`) Sensitivity when zooming. Default: `0.2`

* `mouseWheelZoomEnabled` (`boolean`) Enables or disables zooming with the scroll wheel. Default: `true`

* `colorMax`, `colorMin`, `colorNoData` (`string`) The color values in hex for highest value `colorMax`, lowest value `colorMin` and no data available `colorNoData`. Default: `#CC0033` for `colorMax`, `#FFE5D9` for `colorMin`, `#E2E2E2` for `colorNoData`

* `flagType` (`'emoji'`, `'image'`) The type of the flag in the tooltip. Default: `image`

* `flagURL` (`string`) The URL to the flags when using flag type `image`. The placeholder `{0}` will get replaced with the lowercase [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. Default: `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg`

* `hideFlag` (`boolean`) Decide whether to show the flag option or not

* `noDataText` (`string`) The default text to be shown when no data is present

* `countries` (`object`) Additional options specific to countries:

  * `EH` (`boolean`) When set to `false`, Western Sahara (EH) will be combined with Morocco (MA)

* `data` (`object`) The chart data to use for coloring and to show in the tooltip. Use a unique data-id as key and provide following options as value:

  * `name` (`string`) The name of the data, it will be shown in the tooltip

  * `format` (`string`) The format for the data value, `{0}` will be replaced with the actual value

  * `thousandSeparator` (`string`) The character to use as thousand separator

  * `thresholdMax` (`number`) Maximal value to use for coloring calculations

  * `thresholdMin` (`number`) Minimum value to use for coloring calculations

  * `applyData` (`string`) The ID (key) of the data that will be used for coloring

  * `values` (`object`) An object with the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code as key and the chart data for each country as value

  * `values.link` (`string`) A target URL to redirect to when clicking the country

* `countryNames` (`object`) An object with the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code as key and the country name as value

---

## Localize

Use the option `countryNames` to translate country names. In the folder `demo/html/local` or `demo/es6/local` you can find translations in following languages: Arabic, Chinese, English, French, German, Hindi, Portuguese, Russian, Spanish, Urdu.

To create your own translations, check out [country-list](https://github.com/umpirsky/country-list) by [Saša Stamenković](https://github.com/umpirsky).

---

## Attribution

If you need more detailed maps or more options for your data, there is a great open source project called [datawrapper](https://github.com/datawrapper/datawrapper) out there, with a lot more power than svgMap.

svgMap uses [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom) by [Anders Riutta](https://github.com/ariutta).

The country flag images are from [country-flags](https://github.com/hjnilsson/country-flags) by [Hampus Nilsson](https://github.com/hjnilsson).

Most data in the demos was taken from [Wikipedia](https://www.wikipedia.org).

---

## Appendix - Internet Explorer 11 Support

The library uses both `Object.assign` and `classlist.add`, which are not supported by IE11. In order to make this library work in IE11, you need to use a polyfill, which adds this functionalty to the browser. You can create a bundle by going to https://polyfill.io/v3/, or can use the pre-defined one below, which adds both of these two polyfills.

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Element.prototype.classList%2CObject.assign"></script>
```

Ensure to include this script before the svgMap scripts.
