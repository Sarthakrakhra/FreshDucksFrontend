<template>
  <div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="box has-text-centered">
          <h1 class="title">Please select an action</h1>
          <b-button
            to="/dataSubmission"
            tag="router-link"
            type="is-primary"
            class="mb-3"
            icon-right="tasks"
            icon-pack="fas"
            expanded
          >
            Duck Data Questionnaire
          </b-button>
          <b-button
            to="/scientist"
            tag="router-link"
            type="is-info"
            expanded
            icon-right="table"
            icon-pack="fas"
          >
            Duck Data Submissions
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
