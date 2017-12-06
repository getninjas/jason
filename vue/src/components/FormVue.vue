<template>
  <form class="jason" v-on:submit.prevent="buttonOnClick">
    <FormStep v-bind:key='key' v-for='(value, key, index) in data' :position='index' :formData='formData' :value='value' :stepBy='stepBy' :step='step' :onBackClick='onBackClick' v-if='index === step' />
  </form>
</template>

<script>
import FormStep from './FormStep';

export default {
  name: 'FormVue',
  components: {
    FormStep,
  },
  data() {
    return {
      data: {},
      formData: {},
      stepBy: false,
      step: 0,
      totalSteps: 0,
    }
  },
  created() {
    this.getFormInfo();
  },
  methods: {
    getFormInfo: function () {
      // fetch('https://gist.githubusercontent.com/nathpaiva/6e2bda071405e2e6711a642ff139dacf/raw/d6cf5ff96f8d3294972c5dbb24482d4d17a37da7/form-stepby')
      fetch('https://gist.githubusercontent.com/nathpaiva/6b1aad9203ab8c3abf97113c45e310ea/raw/5150fe9f8a2c9930ae02bb967408f45c5b2e1870/form-normal')
        .then((data) => data.json())
        .then((data) => {
          this.data = data._embedded;
          this.stepBy = data.type === 'stepby' ? true : false;
          this.totalSteps = Object.keys(data._embedded).length;
        })
        .catch((error) => { console.log(error) });
    },
    buttonOnClick: function() {
      if (this.step + 1 !== this.totalSteps) {
        ++this.step;
        return;
      }

      alert('submit');
    },
    onBackClick: function() {
      if (!this.step) return;
      --this.step;
      return;
    }
  }
};
</script>
