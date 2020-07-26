import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { $helpers } from 'v-mapbox';

const geocoderEvents = {
  clear: 'clear',
  loading: 'loading',
  results: 'results',
  result: 'result',
  error: 'error',
};

export default {
  name: 'GeocoderControl',
  mixins: [$helpers.asControl],

  inject: ['mapbox', 'map'],

  props: {
    position: {
      type: String,
      default: 'top-right',
      required: false,
    },
    container: {
      type: String,
      default: null,
      required: false,
    },
    /**
     * mapbox.com Access Token
     */
    accessToken: {
      type: String,
      default: null,
      required: true,
    },
    /**
     * Use to set a custom API origin. (optional, default https://api.mapbox.com)
     */
    origin: {
      type: String,
      default: 'https://api.mapbox.com',
      required: false,
    },
    /**
     * A mapbox-gl instance to use when creating Markers.
     * Required if options.marker is true.
     */
    mapboxgl: {
      type: Object,
      default: null,
      required: this.marker,
    },
    /**
     * On geocoded result what zoom level should the map animate to when a bbox isn't found in the response.
     * If a bbox is found the map will fit to the bbox.
     */
    zoom: {
      type: Number,
      default: 16,
      required: false,
    },
    /**
     * If false, animating the map to a selected result is disabled.
     * If true, animating the map will use the default animation parameters.
     * If an object, it will be passed as options to the map flyTo or fitBounds method providing control over the animation of the transition.
     */
    flyTo: {
      type: [Boolean, Object],
      default: true,
      required: false,
    },
    /**
     * Override the default placeholder attribute value.
     */
    placeholder: {
      type: String,
      default: 'Search',
      required: false,
    },
    /**
     * a proximity argument: this is a geographical point given as an object with latitude and longitude properties.
     * Search results closer to this point will be given higher priority.
     */
    proximity: {
      type: Object,
      default: null,
      required: false,
    },
    /**
     * If true, the geocoder proximity will automatically update based on the map view.
     */
    trackProximity: {
      type: Boolean,
      default: true,
      required: false,
    },
    /**
     *  If true, the geocoder control will collapse until hovered or in focus.
     */
    collapsed: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * the geocoder control will clear it's contents and blur when user presses the escape key.
     */
    clearAndBlurOnEsc: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * the geocoder control will clear its value when the input blurs.
     */
    clearOnBlur: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * This is a bounding box given as an array in the format
     * Search results will be limited to the bounding box.
     */
    bbox: {
      type: Array,
      default: () => [],
      required: false,
    },
    /**
     * A comma separated list of country codes to limit results to specified country or countries.
     */
    countries: {
      type: String,
      default: '',
      required: false,
    },
    /**
     * A comma seperated list of types that filter results to match those specified.
     * See docs.mapbox.com/api/search/#data-types for available types.
     * If reverseGeocode is enabled, you should specify one type.
     * If you configure more than one type, the first type will be used.
     */
    types: {
      type: String,
      default: '',
      required: false,
    },
    /**
     * Minimum number of characters to enter before results are shown. (optional, default 2)
     */
    minLength: {
      type: Number,
      default: 2,
      required: false,
    },
    /**
     * Maximum number of results to show. (optional, default 5)
     */
    limit: {
      type: Number,
      default: 5,
      required: false,
    },
    /**
     * Specify the language to use for response text and query result weighting.
     * Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script.
     * More than one value can also be specified, separated by commas.
     * Defaults to the browser's language settings.
     */
    language: {
      type: String,
      default: '',
      required: false,
    },
    /**
     * A function which accepts a Feature in the Carmen GeoJSON format to filter out results from the Geocoding API response before they are included in the suggestions list.
     * Return true to keep the item, false otherwise.
     */
    filter: {
      type: Function,
      default: '',
      required: false,
    },
    /**
     * A function accepting the query string which performs local geocoding to supplement results from the Mapbox Geocoding API.
     * Expected to return an Array of GeoJSON Features in the Carmen GeoJSON format.
     */
    localGeocoder: {
      type: Function,
      default: '',
      required: false,
    },
    /**
     * Set the factors that are used to sort nearby results. (optional, default distance)
     */
    reverseMode: {
      type: String,
      default: 'distance',
      required: false,
    },
    /**
     * If true, enable reverse geocoding mode.
     * In reverse geocoding, search input is expected to be coordinates in the form lat, lon, with suggestions being the reverse geocodes.
     */
    reverseGeocode: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * Allow Mapbox to collect anonymous usage statistics from the plugin. (optional, default true)
     */
    enableEventLogging: {
      type: Boolean,
      default: true,
      required: false,
    },
    /**
     * If true, a Marker will be added to the map at the location of the user-selected result using a default set of Marker options.
     * If the value is an object, the marker will be constructed using these options.
     * If false, no marker will be added to the map. Requires that options.mapboxgl also be set. (optional, default true)
     */
    marker: {
      type: [Boolean, Object],
      default: true,
      required: false,
    },
    /**
     * A function that specifies how the results should be rendered in the dropdown menu.
     * This function should accepts a single Carmen GeoJSON object as input and return a string.
     * Any HTML in the returned string will be rendered.
     */
    render: {
      type: Function,
      default: '',
      required: false,
    },
    /**
     * A function that specifies how the selected result should be rendered in the search bar.
     * This function should accept a single Carmen GeoJSON object as input and return a string.
     * HTML tags in the output string will not be rendered.
     * Defaults to (item) => item.place_name
     */
    getItemValue: {
      type: Function,
      default: (item) => item.place_name,
      required: false,
    },
    /**
     * A string specifying the geocoding endpoint to query.
     * Options are mapbox.places and mapbox.places-permanent.
     * The mapbox.places-permanent mode requires an enterprise license for permanent geocodes.
     * (optional, default mapbox.places)
     */
    mode: {
      type: String,
      default: 'mapbox.places',
      required: false,
    },
    /**
     * If true, indicates that the localGeocoder results should be the only ones returned to the user.
     * If false, indicates that the localGeocoder results should be combined with those from the Mapbox API with the localGeocoder results ranked higher.
     * (optional, default false)
     */
    localGeocoderOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
    // Component options
    input: {
      type: String,
      default: null,
      required: false,
    },
  },

  data() {
    return {
      initial: true,
    };
  },

  watch: {
    input: {
      handler(next, prev) {
        if (this.control && next !== prev) {
          this.control.setInput(next);
        }
      },
      immediate: true,
    },
    proximity(next, prev) {
      if (this.control && next !== prev) {
        this.control.setProximity(next);
      }
    },
  },

  created() {
    const t = this;
    let mapboxgl = t.mapbox;
    t.geocoder = null;
    if (t.accessToken && !t.mapbox.accessToken) {
      t.mapbox.accessToken = t.accessToken;
    }
    if (t.mapboxgl) {
      mapboxgl = t.mapboxgl;
    }
    t.geocoder = new MapboxGeocoder({
      accessToken: t.accessToken,
      origin: t.origin,
      mapboxgl,
      zoom: t.zoom,
      flyTo: t.flyTo,
      placeholder: t.placeholder,
      proximity: t.proximity,
      trackProximity: t.trackProximity,
      collapsed: t.collapsed,
      clearAndBlurOnEsc: t.clearAndBlurOnEsc,
      clearOnBlur: t.clearOnBlur,
      bbox: t.bbox,
      countries: t.countries,
      types: t.types,
      minLength: t.minLength,
      limit: t.limit,
      language: t.language,
      filter: t.filter,
      localGeocoder: t.localGeocoder,
      reverseMode: t.reverseMode,
      reverseGeocode: t.reverseGeocode,
      enableEventLogging: t.enableEventLogging,
      marker: t.marker,
      render: t.render,
      getItemValue: t.getItemValue,
      mode: t.mode,
      localGeocoderOnly: t.localGeocoderOnly,
    });
    t.geocoder.on('results', t.$_updateInput);
    t.$_deferredMount();
  },

  beforeDestroy() {
    this.control.off('results', this.$_updateInput);
  },

  methods: {
    $_deferredMount() {
      if (this.container !== null) {
        document
          .getElementById(this.container)
          .appendChild(this.control.onAdd(this.map));
      } else {
        this.map.addControl(this.control, this.position);
      }
      if (this.input) {
        this.control.setInput(this.input);
      }
      this.$_emitEvent('added', { geocoder: this.control });
      this.$_bindSelfEvents(Object.keys(geocoderEvents));
      this.initial = false;
    },

    $_bindSelfEvents(events) {
      const vm = this;
      Object.keys(this.$listeners).forEach((eventName) => {
        if (events.includes(eventName)) {
          this.control.on(eventName, vm.$_emitControlEvent.bind(vm, eventName));
        }
      });
    },

    $_emitControlEvent(eventName, eventData) {
      return this.$_emitSelfEvent({ type: eventName }, eventData);
    },

    $_updateInput(results) {
      if (!this.initial) {
        const input = results.query ? results.query.join(' ') : ' ';
        this.$emit('update:input', input);
      }
    },

    query(query) {
      if (this.control) {
        this.$emit('update:input', query);
        return this.control.query(query);
      }
      return null;
    },
  },
};
