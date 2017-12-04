<template>
  <form class="jason" v-on:submit.prevent="buttonOnClick">
    <div v-for="(value, key, index) in data" v-if="index === step">
      <h1>{{key}}</h1>
      <div v-for="field in value">
        <label v-bind:for="field.name">{{field.name}}</label><br>
        <input type="text" v-bind:id="field.name" v-bind:name="field.name" v-bind:placeholder="field.placeholder">
      </div>

      <button>Next</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Jason',

  data() {
    return {
      data: {},
      stepBy: false,
      step: 0,
      totalSteps: 0,
    }
  },

  created() {
    fetch('https://gist.githubusercontent.com/nathpaiva/6e2bda071405e2e6711a642ff139dacf/raw/d6cf5ff96f8d3294972c5dbb24482d4d17a37da7/form-stepby')
      .then((data) => data.json())
      .then((data) => {
        this.data = data._embedded;
        this.stepBy = data.type === 'stepby' ? true : false;
        this.totalSteps = Object.keys(data._embedded).length;
      })
      .catch((error) => { console.log(error) });
  },

  methods: {
    buttonOnClick: function() {
      if (this.step + 1 !== this.totalSteps) {
        ++this.step;
        return;
      }

      alert('submit');
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
