# v-mapbox-geocoder 🌎

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/geospoc/v-mapbox-geocoder?sort=semver)](https://github.com/geospoc/v-mapbox-geocoder/packages) [![Ship js trigger](https://github.com/geospoc/v-mapbox-geocoder/workflows/Ship%20js%20trigger/badge.svg)](https://github.com/geospoc/v-mapbox-geocoder/actions?query=workflow%3A%22Ship+js+trigger%22) [![GitHub Release Date](https://img.shields.io/github/release-date/geospoc/v-mapbox-geocoder)](https://github.com/geospoc/v-mapbox-geocoder/releases) [![deploy](https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat)](https://github.com/algolia/shipjs) [![David](https://img.shields.io/david/peer/geospoc/v-mapbox-geocoder)](https://david-dm.org/geospoc/v-mapbox-geocoder?type=peer) [![David](https://img.shields.io/david/dev/geospoc/v-mapbox-geocoder)](http://david-dm.org/geospoc/v-mapbox-geocoder?type=dev) [![GitHub issues](https://img.shields.io/github/issues/geospoc/v-mapbox-geocoder)](https://github.com/geospoc/v-mapbox-geocoder) [![GitHub last commit](https://img.shields.io/github/last-commit/geospoc/v-mapbox-geocoder)](https://github.com/geospoc/v-mapbox-geocoder/master) ![Maintenance](https://img.shields.io/maintenance/yes/2021) [![GitHub contributors](https://img.shields.io/github/contributors/geospoc/v-mapbox-geocoder)](https://github.com/geospoc/v-mapbox-geocoder/graphs/contributors) [![DeepScan grade](https://deepscan.io/api/teams/9381/projects/11871/branches/177149/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9381&pid=11871&bid=177149)

[v-mapbox](https://github.com/vinayakkulkarni/v-mapbox) plugin for [mapbox-gl-geocoder](https://github.com/mapbox/mapbox-gl-geocoder) support.

## Setup


First of all you need to install `mapbox-gl-geocoder` and `v-mapbox`. [See v-mapbox doc](https://v-mapbox.netlify.app)

> _Generate a [Personal Access Token](https://github.com/settings/tokens/new) with `read:packages` scope_

``` bash
# Skip if you're logged in, else login to GPR using above generated PAT
$ npm login --registry=https://npm.pkg.github.com --scope=@geospoc

# Install mapbox-gl-geocoder v-mapbox and v-mapbox-geocoder:
$ npm install @mapbox/mapbox-gl-geocoder v-mapbox @geospoc/v-mapbox-geocoder --save
```

## Usage

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

Options for mapbox-gl-geocoder described [here](https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md) can be passed via props.

Additionaly you can pass syncronized prop `input` as in example below.
It will be passed to mapbox-gl-geocoder as default input value.
Each time you change value of this prop, mapbox-gl-geocoder `.setInput` method is called.

Same for `proximity` prop that internally invokes mapbox-gl-geocoder `setProximity` method.

Also you can call `query` method to query search and get results programmatically.

## Credits
- Thanks to [soal](https://github.com/soal) & his original [vue-mapbox-geocoder](https://github.com/soal/vue-mapbox-geocoder)
- All contributors ([list](https://github.com/geospoc/v-mapbox-geocoder/contributors)).
- All GeoSpoc ([team](https://github.com/orgs/Geospoc/people)).

## License

MIT &copy; [GeoSpoc](https://geospoc.com)