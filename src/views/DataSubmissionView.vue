<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="box">
        <form>
          <h2 class="subtitle is-1">Duck Data Form</h2>
          <b-field label="Your Name">
            <b-input
              v-model.trim="name"
              required
              placeholder="Kevin Malone"
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
          <b-field label="Select or type the foods the duck ate">
            <b-taginput
              v-model="foodsFed"
              :data="filteredFoodTags"
              autocomplete
              :allow-new="true"
              :open-on-focus="true"
              icon="tags"
              field="name"
              placeholder="Search or add a food. Press Enter to add the food"
              @typing="getFilteredFoodTags"
              :create-tag="addFoodTag"
            >
            </b-taginput>
          </b-field>
          <b-field
            class="mt-1"
            label="How much food were the ducks fed?"
            v-if="foodsFed.length !== 0"
          >
            <b-field grouped v-for="(food, index) in foodsFed" :key="index">
              <b-field label="Food">
                <b-input :value="food.name" readonly></b-input>
              </b-field>
              <b-field label="Amount in grams" expanded>
                <b-input
                  v-model.number="food.amount"
                  required
                  expanded
                  placeholder="Please enter amount in grams"
                ></b-input>
                <p class="control">
                  <span class="button is-static">Grams</span>
                </p>
              </b-field>
            </b-field>
          </b-field>

          <b-button type="is-success ">Submit Form</b-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
const food = [{ name: "rice", amount: 0 }];
export default {
  name: "DataSubmissionView",
  data: () => {
    return {
      name: "",
      timeFed: null,
      hourFormat: "12",
      foodsFed: [],
      foodOptions: food,
      filteredFoodTags: food,
    };
  },
  methods: {
    getFilteredFoodTags(text) {
      this.filteredFoodTags = this.foodOptions.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
    addFoodTag(tag) {
      if (tag.name !== undefined) {
        return tag;
      } else {
        return { name: tag, amount: 0 };
      }
    },
  },
};
</script>
