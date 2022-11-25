<template>
    <form>
      <div class="d-flex flex-column">
        <label>What's your favorite fruit?</label>
        <div class="d-flex bruh flex-column justify-content-center ms-5">
          <div class="my-1  d-flex justify-content-center" style="border: 2px solid #7e60d4;width: 200px;border-radius: 5px;"><label for="a"> apple</label> <input class="col-1 bruh1" type="radio" value="apple" id="a" v-model="choice" />  </div>
          <div class="d-flex justify-content-center" style="border: 2px solid #7e60d4;width: 200px;border-radius: 5px;"><label for="aa">orange</label>  <input class="col-1 bruh1" type="radio" value="orange" id="aa" v-model="choice" />  </div>
          <div class="my-1  d-flex justify-content-center" style="border: 2px solid #7e60d4;width: 200px;border-radius: 5px;"><label for="aaa">grape</label> <input class="col-1 bruh1" type="radio" value="grape" id="aaa" v-model="choice" />  </div>
        </div>
      </div>
      <button class="btn ms-5" style="background-color: #7E60D4; color:white" type="button" @click="vote">vote</button>
    </form>
    <div>
      <div class="" v-for="(value, key) of results" :key="key">{{ key }}: {{ value }}</div>
    </div>
  </template>
<style scoped>
#aaa, #aa, #a{
  appearance: none;
}
#aaa:checked, #aa:checked, #a:checked{
  background-color: #7E60D4;
}
</style>
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