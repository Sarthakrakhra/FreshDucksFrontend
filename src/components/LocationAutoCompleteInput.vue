<template>
  <b-autocomplete
    v-model="location"
    :data="filteredLocationData"
    placeholder="Enter a location (E.g Public Gardens)"
    icon="search"
    clearable
    @select="(option) => (selectedLocation = option)"
  >
    <template #empty>No results found</template>
  </b-autocomplete>
</template>
<script>
// this variable is to determine whether the google places api script tag has been added to the website
let scriptAdded = false;

export default {
  name: "LocationAutoCompleteInput",
  data: () => {
    return {
      filteredLocationData: [],
      location: "",
      selectedLocation: null,
      placesService: null,
    };
  },
  metaInfo() {
    const skip = scriptAdded;
    scriptAdded = true;

    if (skip) {
      // if the skip value is true it means the component has been reinitialized but
      // the service has not been so we re-initialize the service as well
      this.initializePlacesService();
      return;
    }
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_PLACES_API_KEY}&libraries=places`,
          async: true,
          defer: true,
          once: true,
          skip,
          callback: () => this.initializePlacesService(),
        },
      ],
    };
  },
  methods: {
    initializePlacesService() {
      this.placesService = new window.google.maps.places.AutocompleteService();
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.filteredLocationData = [];
        return;
      }

      // getting the descriptions of the places
      this.filteredLocationData = predictions.map(
        (prediction) => prediction.description
      );
    },
    resetLocation() {
      this.location = "";
      this.selectedLocation = "";
    },
  },
  watch: {
    location(val) {
      if (val) {
        // getPlacePredictions is the method which returns the predictions based on what the user has typed in
        this.placesService.getPlacePredictions(
          { input: this.location },
          this.displaySuggestions
        );
      }
    },
  },
};
</script>
