<template>
  <div class="columns">
    <div class="column">
      <b-table
        :data="submissions"
        ref="table"
        paginated
        per-page="10"
        detailed
        detail-key="_id"
        :show-detail-icon="true"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column
          field="personName"
          label="Person Name"
          sortable
          v-slot="props"
        >
          {{ props.row.personName }}
        </b-table-column>
        <b-table-column
          field="timeFed"
          label="Time Fed"
          sortable
          v-slot="props"
        >
          <span class="tag is-info">
            {{ new Date(props.row.timeFed).toTimeString() }}
          </span>
        </b-table-column>
        <b-table-column
          field="duckLocation"
          label="Duck Location"
          sortable
          v-slot="props"
        >
          {{ props.row.duckLocation }}
        </b-table-column>
        <template #detail="props">
          <div class="columns is-flex is-justify-content-flex-start">
            <div class="column is-one-quarter">
              <b-tag type="is-primary is-light" size="is-medium">
                ID: {{ props.row._id }}
              </b-tag>
            </div>
            <div class="column is-one-fifth">
              <b-tag type="is-success is-light" size="is-medium">
                Number of ducks fed: {{ props.row.numberOfDucksFed }}
              </b-tag>
            </div>
            <div class="column is-one-quarter">
              <b-tag type="is-info is-light" size="is-medium">
                Date Ducks were fed:
                {{ new Date(props.row.timeFed).toDateString() }}
              </b-tag>
            </div>
          </div>
          <div class="columns">
            <div class="column is-5">
              <b-table :data="props.row.foodsFed" bordered>
                <b-table-column
                  field="food"
                  label="Food"
                  sortable
                  v-slot="props"
                >
                  {{ props.row.food }}
                </b-table-column>
                <b-table-column
                  field="amountFed"
                  label="Amount Fed (Grams)"
                  sortable
                  v-slot="props"
                >
                  {{ props.row.amountFed }}
                </b-table-column>
              </b-table>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const apiUrl = process.env.VUE_APP_DUCK_API_URL;

export default {
  name: "ScientistView",
  data: () => {
    return {
      submissions: [],
      loading: true,
    };
  },
  async created() {
    const response = await axios.get(`${apiUrl}`);
    this.submissions = [...response.data];
    this.loading = false;
  },
};
</script>
