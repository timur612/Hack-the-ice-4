<template>
    <form>
      <div class="d-flex flex-column card " style="width: 200px;">
        <label class="d-flex justify-content-center mt-2">What's your favorite fruit?</label>
        <div class="card-body d-flex flex-column justify-content-center my-2" style="width: 200px;">
          <input name="options-outlined" class=" btn-check" type="radio" value="apple" id="success-outlined-3" v-model="choice" autocomplete="off" /><label class="btn btn-outline-success my-2" for="success-outlined-3">apple</label> 
          <input name="options-outlined" class=" btn-check" type="radio" value="orange" id="success-outlined-2" v-model="choice" autocomplete="off" /><label class="btn btn-outline-success" for="success-outlined-2">orange</label>  
          <input name="options-outlined" class=" btn-check" type="radio" value="grape"  id="success-outlined-1" v-model="choice" autocomplete="off" /><label class="btn btn-outline-success my-2" for="success-outlined-1" >grape</label>  
          <button class="btn mx-5" style="background-color: #7E60D4; color:white" type="button" @click="vote2">Vote</button>
        </div>
      </div>
    </form>
    <!-- <div>
      <div class="" v-for="(value, key) of results" :key="key">{{ key }}: {{ value }}</div>
    </div> -->
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
      vote2(){
        this.$emit("data",this.choice);
      }
    },
  };
  </script>