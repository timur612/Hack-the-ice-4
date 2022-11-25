<template>
  <div class="home">
    <Header/>
    <a class="btn" v-on:click="()=>addWidget('some')"> add widget</a>
    <div v-for="(widget,key) in widgets" :key="key">
    <div v-on:click="()=>getNum(key)" :class="widget.clicked === 1 ? 'choosed' : ''" class="container border text-center p-2" style="width:15%;cursor:pointer" ref="draggableContainer" id="draggable-container">
      <div id="draggable-header" @mousedown="dragMouseDown">
        <p> {{widget.name}} </p>
      </div>
    </div>
    </div>
    <Diagram/>
    <PoolChars/>
    <Vote/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Vote from '../components/Vote.vue';
import PoolChars from '../components/PoolChars.vue';
import Diagram from '../components/Diagram.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Vote,
    PoolChars,
    Diagram
},
  data(){
    return {
      widgets: [],
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      id:0,
    }
  },
  methods:{
    addWidget(n){
      this.widgets.push({name: n,clicked:0});
    },
    getNum(id){
      this.id = id;
      for(let i = 0; i < this.widgets.length; i++){
        if(i != id){
          this.widgets[i].clicked = 0;
        }else{
          this.widgets[i].clicked = 1;
        }
      }
      
    },
    dragMouseDown: function (event,id) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      // console.log(this.$refs.draggableContainer[0].style)
      this.$refs.draggableContainer[this.id].style.top = (this.$refs.draggableContainer[this.id].offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer[this.id].style.left = (this.$refs.draggableContainer[this.id].offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style scoped>
  #draggable-container {
    position: absolute;
    z-index: 9;
  }
  #draggable-header {
    z-index: 10;
  }
  .choosed{
    background:red;
  }
</style>
