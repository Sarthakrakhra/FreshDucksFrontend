<template>
  <div class="columns is-centered">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="column is-half">
      <Notification
        :type="notificationType"
        :show-notification="showNotification"
        :message="notificationMsg"
      />
      <div class="box">
        <form ref="duckDataForm" @submit="submitData($event)">
          <h2 class="subtitle is-1">Duck Data Form</h2>
          <b-field label="Your Name">
            <b-input
              v-model.trim="name"
              required
              placeholder="Kevin Malone"
            ></b-input>
          </b-field>
          <b-field label="How many ducks were fed?">
            <b-input
              type="number"
              v-model.number="numberOfDucksFed"
              required
              placeholder="E.g: 100"
            ></b-input>
          </b-field>
          <b-field label="Select a date and time the ducks were fed">
            <b-datetimepicker
              placeholder="Click to select..."
              icon="calendar"
              v-model="timeFed"
              :timepicker="{ hourFormat }"
              horizontal-time-picker
              required
            >
            </b-datetimepicker>
          </b-field>
          <b-field label="Location where the ducks were fed">
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
          </b-field>
          <b-field
            label="Select or type the foods the duck ate"
            :type="{ 'is-danger': noFoodTags }"
            :message="{ 'Please add some food tags': noFoodTags }"
          >
            <b-taginput
              v-model="foodsFed"
              :data="filteredFoodTags"
              autocomplete
              :allow-new="true"
              :open-on-focus="true"
              icon="tags"
              field="name"
              placeholder="Search or add a food. Press Enter/Tab/',' to add the food"
              @typing="getFilteredFoodTags"
              :create-tag="addFoodTag"
            >
            </b-taginput>
          </b-field>
          <b-field
            class="mt-1"
            label="How much food were the ducks fed?"
            v-if="!noFoodTags"
          >
            <b-field grouped v-for="(food, index) in foodsFed" :key="index">
              <b-field label="Food">
                <b-input :value="food.name" readonly></b-input>
              </b-field>
              <b-field label="Amount in grams" expanded>
                <b-input
                  type="number"
                  v-model.number="food.amount"
                  expanded
                  placeholder="Please enter amount in grams"
                  required
                ></b-input>
                <p class="control">
                  <span class="button is-static">Grams</span>
                </p>
              </b-field>
            </b-field>
          </b-field>

          <b-button type="is-success" native-type="submit">
            Submit Form
          </b-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Notification from "@/components/Notification.vue";

const apiUrl = process.env.VUE_APP_DUCK_API_URL;

export default {
  name: "DataSubmissionView",
  data: () => {
    return {
      name: "",
      timeFed: null,
      hourFormat: "12",
      foodsFed: [],
      foodOptions: [],
      filteredFoodTags: [],
      filteredLocationData: [],
      location: "",
      selectedLocation: null,
      placesService: null,
      numberOfDucksFed: null,
      showNotification: false,
      notificationMsg: "",
      notificationType: "",
      isLoading: false,
    };
  },
  components: {
    Notification,
  },
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_PLACES_API_KEY}&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.initializePlacesService(),
        },
      ],
    };
  },
  async created() {
    this.getDuckData();
  },
  computed: {
    noFoodTags() {
      return this.foodsFed.length === 0;
    },
  },
  methods: {
    async getDuckData() {
      const response = await axios.get(`${apiUrl}/foodTypes`);
      const foods = response.data.map((f) => ({ name: f, amount: null }));
      this.foodOptions = foods;
      this.filteredFoodTags = foods;
    },
    initializePlacesService() {
      this.placesService = new window.google.maps.places.AutocompleteService();
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.filteredLocationData = [];
        return;
      }

      this.filteredLocationData = predictions.map(
        (prediction) => prediction.description
      );
    },
    getFilteredFoodTags(text) {
      this.filteredFoodTags = this.foodOptions.filter(({ name: foodType }) => {
        return (
          foodType.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    addFoodTag(tag) {
      if (tag.name !== undefined) {
        return tag;
      } else {
        return { name: tag, amount: null };
      }
    },
    async submitData(event) {
      event.preventDefault();

      if (!this.$refs.duckDataForm.checkValidity()) {
        this.$refs.duckDataForm.reportValidity();
      } else {
        this.isLoading = true;
        console.log("Everything is fine. Time to send stuff to backend!");
        const formattedFoodTags = this.foodsFed.map((food) => ({
          food: food.name,
          amountFed: food.amount,
        }));
        const dataToSend = {
          personName: this.name,
          timeFed: this.timeFed,
          duckLocation: this.selectedLocation,
          numberOfDucksFed: this.numberOfDucksFed,
          foodsFed: formattedFoodTags,
        };

        try {
          await axios.post(`${apiUrl}/submitDuckData`, dataToSend);

          window.scrollTo(0, 0);
          this.notificationType = "is-success";
          this.showNotification = true;
          this.notificationMsg = `Thank you for your
        time and efforts ${this.name}! Your data has been submitted for a scientist to view.`;

          this.resetFormData();
        } catch (err) {
          console.log(err);

          window.scrollTo(0, 0);
          this.isLoading = false;
          this.notificationType = "is-danger";
          this.showNotification = true;
          this.notificationMsg = `Sorry ${this.name}. There was a problem accepting your data. Please make sure all fields are filled out in a valid format or try again in a few minutes`;
        }
      }
    },
    resetFormData() {
      this.name = "";
      this.timeFed = null;
      this.foodsFed = [];
      this.location = "";
      this.selectedLocation = "";
      this.numberOfDucksFed = "";
      this.getDuckData();
      this.isLoading = false;
    },
  },
  watch: {
    location(val) {
      if (val) {
        this.placesService.getPlacePredictions(
          { input: this.location },
          this.displaySuggestions
        );
      }
    },
  },
};
</script>
