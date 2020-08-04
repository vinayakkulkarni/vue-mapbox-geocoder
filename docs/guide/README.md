# Quickstart

## Installation

You can install `@geospoc/v-mapbox-geocoder` via GitHub package registry.
Note that you need to install `@mapbox/mapbox-gl-geocoder` & `v-mapbox` aswell:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@geospoc
npm i @mapbox/mapbox-gl-geocoder v-mapbox @geospoc/v-mapbox-geocoder
```

## Usage

Now you can add the geocoder control like other controls

```html
<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
  >
    <MglGeocoderControl
      :accessToken="accessToken"
      :input.sync="defaultInput"
      :mapboxgl="mapbox"
      container="geocoder_container_id"
      position="top-left"
      @results="handleSearch"
    />
  </MglMap>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import { MglMap } from 'v-mapbox';
  import MglGeocoderControl from '@geospoc/v-mapbox-geocoder';
  // you can also import this in your main.js or nuxt.config.js
  // or even main/global (s)css file
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

  export default {
    name: 'App',
    components: {
      MglMap,
      MglGeocoderControl
    },
    data() {
      return {
        accessToken: 'YOUR_ACCESS_TOKEN',
        mapStyle: 'YOUR_MAP_STYLE',
        defaultInput: 'Bodhgaya',
        mapbox: mapboxgl,
      }
    },
    methods: {
      handleSearch(event) {
        console.log(event)
      }
    },
  };
</script>
```

## Props

_The props that you send to the `<MglGeocoderControl />` component_

### Available properties
  -   `accessToken` **[String][57]** Required.
  -   `origin` **[String][57]** Use to set a custom API origin. (optional, default `https://api.mapbox.com`)
  -   `mapboxgl` **[Object][56]?** A [mapbox-gl][58] instance to use when creating [Markers][59]. Required if `marker` is `true`.
  -   `zoom` **[Number][60]** On geocoded result what zoom level should the map animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`. (optional, default `16`)
  -   `flyTo` **([Boolean][61] \| [Object][56])** If `false`, animating the map to a selected result is disabled. If `true`, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`][62] or [`fitBounds`][63] method providing control over the animation of the transition. (optional, default `true`)
  -   `placeholder` **[String][57]** Override the default placeholder attribute value. (optional, default `Search`)
  -   `proximity` **[Object][56]?** a proximity argument: this is
      a geographical point given as an object with `latitude` and `longitude`
      properties. Search results closer to this point will be given
      higher priority.
  -   `trackProximity` **[Boolean][61]** If `true`, the geocoder proximity will automatically update based on the map view. (optional, default `true`)
  -   `collapsed` **[Boolean][61]** If `true`, the geocoder control will collapse until hovered or in focus. (optional, default `false`)
  -   `clearAndBlurOnEsc` **[Boolean][61]** If `true`, the geocoder control will clear it's contents and blur when user presses the escape key. (optional, default `false`)
  -   `clearOnBlur` **[Boolean][61]** If `true`, the geocoder control will clear its value when the input blurs. (optional, default `false`)
  -   `bbox` **[Array][64]?** a bounding box argument: this is
      a bounding box given as an array in the format `[minX, minY, maxX, maxY]`.
      Search results will be limited to the bounding box.
  -   `countries` **[String][57]?** a comma separated list of country codes to
      limit results to specified country or countries.
  -   `types` **[String][57]?** a comma seperated list of types that filter
      results to match those specified. See [https://docs.mapbox.com/api/search/#data-types][65]
      for available types.
      If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
  -   `minLength` **[Number][60]** Minimum number of characters to enter before results are shown. (optional, default `2`)
  -   `limit` **[Number][60]** Maximum number of results to show. (optional, default `5`)
  -   `language` **[String][57]?** Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. Defaults to the browser's language settings.
  -   `filter` **[Function][66]?** A function which accepts a Feature in the [Carmen GeoJSON][67] format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
  -   `localGeocoder` **[Function][66]?** A function accepting the query string which performs local geocoding to supplement results from the Mapbox Geocoding API. Expected to return an Array of GeoJSON Features in the [Carmen GeoJSON][67] format.
  -   `reverseMode` **(distance | score)** Set the factors that are used to sort nearby results. (optional, default `distance`)
  -   `reverseGeocode` **[boolean][61]** If `true`, enable reverse geocoding mode. In reverse geocoding, search input is expected to be coordinates in the form `lat, lon`, with suggestions being the reverse geocodes. (optional, default `false`)
  -   `enableEventLogging` **[Boolean][61]** Allow Mapbox to collect anonymous usage statistics from the plugin. (optional, default `true`)
  -   `marker` **([Boolean][61] \| [Object][56])** If `true`, a [Marker][59] will be added to the map at the location of the user-selected result using a default set of Marker options.  If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `mapboxgl` also be set. (optional, default `true`)
  -   `render` **[Function][66]?** A function that specifies how the results should be rendered in the dropdown menu. This function should accepts a single [Carmen GeoJSON][67] object as input and return a string. Any HTML in the returned string will be rendered.
  -   `getItemValue` **[Function][66]?** A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [Carmen GeoJSON][67] object as input and return a string. HTML tags in the output string will not be rendered. Defaults to `(item) => item.place_name`.
  -   `mode` **[String][57]** A string specifying the geocoding [endpoint][68] to query. Options are `mapbox.places` and `mapbox.places-permanent`. The `mapbox.places-permanent` mode requires an enterprise license for permanent geocodes. (optional, default `mapbox.places`)
  -   `localGeocoderOnly` **[Boolean][61]** If `true`, indicates that the `localGeocoder` results should be the only ones returned to the user. If `false`, indicates that the `localGeocoder` results should be combined with those from the Mapbox API with the `localGeocoder` results ranked higher. (optional, default `false`)


[56]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[57]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[58]: https://github.com/mapbox/mapbox-gl-js

[59]: https://docs.mapbox.com/mapbox-gl-js/api/#marker

[60]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[61]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[62]: https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto

[63]: https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds

[64]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[65]: https://docs.mapbox.com/api/search/#data-types

[66]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[67]: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md

[68]: https://docs.mapbox.com/api/search/#endpoints
