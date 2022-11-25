<template>
    <form>
      <div class="d-flex flex-column">
        <label>What's your favorite fruit?</label>
        <div> apple <input class="col-1" type="radio" value="apple" v-model="choice" />  </div>
        <div> orange <input class="col-1" type="radio" value="orange" v-model="choice" />  </div>
        <div> grape <input class="col-1" type="radio" value="grape" v-model="choice" /> </div>
        <div class="my-5"></div>

        <div class="d-flex flex-column justify-content-center ms-5">
          <div style="border: 3px solid #000;width: fit-content"> apple <input class="col-1" type="radio" value="apple" v-model="choice" />  </div>
          <div style="border: 3px solid #000;width: fit-content"> orange <input class="col-1" type="radio" value="orange" v-model="choice" />  </div>
          <div style="border: 3px solid #000;width: fit-content"> grape <input class="col-1" type="radio" value="grape" v-model="choice" /> </div>
        </div>
      </div>
      <button type="button" @click="vote">vote</button>
    </form>
    <div>
      <div style="display: none;" v-for="(value, key) of results" :key="key">{{ key }}: {{ value }}</div>
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