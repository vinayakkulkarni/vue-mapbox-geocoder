import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';

const extensions = ['.js', '.vue'];

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VMapboxGeocoder',
      file: 'dist/v-mapbox-geocoder.esm.js',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      resolve({ extensions, browser: true }),
      commonjs(),
      vue(),
    ],
    external: ['@mapbox/mapbox-gl-geocoder', 'v-mapbox'],
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      name: 'VMapboxGeocoder',
      file: 'dist/v-mapbox-geocoder.cjs.js',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      resolve({ extensions, browser: true }),
      commonjs(),
      vue(),
    ],
    external: ['@mapbox/mapbox-gl-geocoder', 'v-mapbox'],
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'VMapboxGeocoder',
      file: 'dist/v-mapbox-geocoder.js',
      globals: {
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder',
        'v-mapbox': 'vMapbox',
      },
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      resolve({ extensions, browser: true }),
      commonjs(),
      vue(),
    ],
    external: ['@mapbox/mapbox-gl-geocoder', 'v-mapbox'],
  },
];
