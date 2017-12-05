<template>
  <div>
    <h1>Step {{position}}</h1>
    <div v-bind:key='i' v-for="(field, i) in value">
      <label v-bind:for="field.name">{{field.name}}</label><br>
      <input type="text" v-bind:id="field.name" v-bind:name="field.name" v-model="formData[field.name]" v-bind:placeholder="field.placeholder">
    </div>

    <button type="button" v-if="stepBy && step !== 0" v-on:click="onBackClick">Back</button>
    <button>Next</button>
  </div>
</template>

<script>
export default {
  name: 'FormStep',
  props: ['position', 'formData', 'value', 'stepBy', 'step', 'onBackClick'],
  data() {
    return {
      message: 'Hello'
    }
  },
};
</script>
