<template>
  <div class="columns">
    <div class="column">
      <Notification
        :type="notificationType"
        :message="notificationMsg"
        :show-notification="showNotification"
      />
      <DuckDataTable :duck-data="submissions" :loading="loadingData" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DuckDataTable from "@/components/DuckDataTable.vue";
import Notification from "@/components/Notification.vue";

const apiUrl = process.env.VUE_APP_DUCK_API_URL;

export default {
  name: "ScientistView",
  data: () => {
    return {
      submissions: [],
      loadingData: true,
      showNotification: false,
    };
  },
  components: {
    DuckDataTable,
    Notification,
  },
  async created() {
    // getting all submissions from the database
    const response = await axios.get(`${apiUrl}`);
    this.submissions = [...response.data];
    this.showNotification = true;
    this.loadingData = false;
  },
  computed: {
    hasSubmissions() {
      return this.submissions.length > 0 && !this.loadingData;
    },
    notificationType() {
      return this.hasSubmissions ? "is-success" : "is-warning";
    },
    notificationMsg() {
      return this.hasSubmissions
        ? `Showing ${this.submissions.length} submissions`
        : "There are no submissions";
    },
  },
};
</script>
