import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VMapboxGeocoder',
    file: 'dist/v-mapbox-geocoder.min.js',
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
    resolve({ extensions: ['.js', '.vue'], browser: true }),
    commonjs(),
    terser(),
    vue(),
  ],
  external: ['@mapbox/mapbox-gl-geocoder', 'v-mapbox'],
};
