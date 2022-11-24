<template>
    <form>
      <div class="d-flex flex-column">
        <label>What's your favorite fruit?</label>
        <input class="col-1" type="checkbox" value="apple" v-model="choice" /> apple
        <input class="col-1" type="checkbox" value="orange" v-model="choice" /> orange
        <input class="col-1" type="checkbox" value="grape" v-model="choice" /> grape
      </div>
      <button type="button" @click="vote">vote</button>
    </form>
    <div>
      <h1>result</h1>
      <p v-for="(value, key) of results" :key="key">{{ key }}: {{ value }}</p>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "App",
    data() {
      return {
        choice: "",
        results: {},
      };
    },
    methods: {
      vote() {
        if (!localStorage.getItem("vote-result")) {
          localStorage.setItem("vote-result", JSON.stringify({}));
        }
        const { choice } = this;
        const results = JSON.parse(localStorage.getItem("vote-result"));
        if (!Object.prototype.hasOwnProperty.call(results, choice)) {
          results[choice] = 0;
        }
        results[choice]++;
        localStorage.setItem("vote-result", JSON.stringify(results));
        this.results = JSON.parse(localStorage.getItem("vote-result"));
      },
    },
  };
  </script>