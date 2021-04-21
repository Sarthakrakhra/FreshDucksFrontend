<template>
  <b-notification
    v-if="showNotification"
    :type="type"
    has-icon
    aria-close-label="Close notification"
    auto-close
    :duration="8500"
    :closable="false"
  >
    {{ message }}
  </b-notification>
</template>
<script>
export default {
  name: "Notification",
  props: {
    type: String,
    message: String,
    showNotification: Boolean,
  },
};
</script>
