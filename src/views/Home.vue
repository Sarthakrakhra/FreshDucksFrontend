<template>
  <div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box">
          <h1 class="title">Please select an action</h1>
          <b-button
            to="/dataSubmission"
            tag="router-link"
            type="is-primary"
            class="mb-3"
            icon-right="pen"
            icon-pack="fas"
            expanded
          >
            Submit Duck Data
          </b-button>
          <b-button
            to="/scientist"
            tag="router-link"
            type="is-info"
            expanded
            icon-right="atom"
            icon-pack="fas"
          >
            Scientist Duck Data
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
