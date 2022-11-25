<template>
  <div class="home">
    <Demo/>
    <a :class="created == 0 ? '' : 'disabled'" class="btn" v-on:click="()=>addWidget('some')"> add widget</a>

    <div v-for="(widget,key) in widgets" :key="key">
      <div ref="draggableContainer" id="draggable-container" style="width:15%;">
        <a v-if="widget.clicked" v-on:click="atacchWidget" class="btn position-absolute">X</a>
            <div v-on:click="()=>getNum(key)" :class="widget.clicked === 1 ? 'choosed' : ''" class="container border text-center p-2" style="cursor:pointer" >
              <div id="draggable-header" @mousedown="dragMouseDown">
                <p> {{widget.name}} </p>
              </div>
            </div>
      </div>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Demo from '@/components/Demo.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Header,Demo
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
      created: 0,
    }
  },
  methods:{
    async addWidget(n){
      const body = JSON.stringify({
        room_id: localStorage.getItem('room_id'),
        type: n,
        top:"0px",
        left:"0px"
      })

      await axios.post('http://localhost:5000/api/widget/create',body,{headers: {"Content-Type": "application/json"  }})
        .then(res=>{
          this.widgets.push({id:res.data.id,name: n,clicked:1});
          this.id = this.widgets.length - 1;
          this.created = 1;
        })
        .catch(e=>{
          console.log(e);
        })

      
    },
    async atacchWidget(){
      console.log(this.$refs.draggableContainer[this.id].style.top)
      const widget_id = this.widgets[this.id].id;
      const top = this.$refs.draggableContainer[this.id].style.top;
      const left = this.$refs.draggableContainer[this.id].style.left
      this.widgets[this.id].clicked = 0;
      this.id = -1;
      this.created = 0;

      const body = JSON.stringify({
        id: widget_id,
        top: top,
        left: left
      })

      await axios.post('http://localhost:5000/api/widget/update',body,{headers: {"Content-Type": "application/json"  }})
        .catch(res=>{})
    },
    getNum(id){
      this.created = 1;
      this.id = id;
      for(let i = 0; i < this.widgets.length; i++){
        if(i != id){
          this.widgets[i].clicked = 0;
        }else{
          this.widgets[i].clicked = 1;
        }
      }
      
    },
    dragMouseDown: function (event) {
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
