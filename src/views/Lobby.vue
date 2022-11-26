<template>
  <div class="home">
    <Header/>
    <!-- <Demo/> -->
    <!-- <a :class="created == 0 ? '' : 'disabled'" class="btn" v-on:click="()=>addWidget('some')"> add widget</a> -->

    <!-- WIDGET -->
    <div v-for="(widget,key) in widgets" :key="key">
      <div ref="draggableContainer" id="draggable-container" style="width:15%;">
        <a v-if="widget.clicked" v-on:click="atacchWidget" style="top:-10%" class="btn position-absolute">X</a>
            <div v-on:click="()=>getNum(key)" :class="widget.clicked === 1 ? 'choosed' : ''" class="" style="cursor:pointer;" >
              <div id="draggable-header" @mousedown="dragMouseDown">
                <VoteActive :lobby="false" :id="widget.id" v-if="widget.type === 'Poll'"/>
                <!-- <p> {{widget}} </p> -->
              </div>
            </div>
      </div>
    </div>
    <!-- WIDGET -->

    <vue-webrtc ref="webrtc"
                  width="100vw"
                  height="100vh"
                  :roomId="roomId"
                  :enableAudio="false"
                  :enableLogs="true"
                  v-on:joined-room="logEvent"
                  v-on:left-room="logEvent"
                  v-on:opened-room="logEvent"
                  v-on:share-started="logEvent"
                  v-on:share-stopped="logEvent"
                  @error="onError" />
    <div :class="widgetsWindow ? '' : 'd-none'" class="container float-end border" style="margin-top:-0.6%;height:80vh;width:25%;background-color:white">
        <div class="row mt-3">
          <p class="col-sm-10 h4">Виджеты</p>
          <a class="col-sm" @click="()=>closeWindow('w')" style="cursor:pointer"><img src="../assets/close.svg" alt=""></a>
        </div>
        <div class="mt-4">
          <div  v-on:click="()=>addWidget('Poll')"><Vote style="pointer-events: none;"/></div>
        </div>
    </div>

    <div :class="queueWindow ? '' : 'd-none'" class="container float-start border" style="margin-top:-0.6%;height:80vh;width:25%;background-color:white">
        <div class="row mt-3">
          <p class="col-sm-10 h4">Очередь</p>
          <a class="col-sm" @click="()=>closeWindow('q')" style="cursor:pointer"><img src="../assets/close.svg" alt=""></a>
        </div>
        <div class="mt-5">
          <Comands class="text-center" :team="roomId"/>
        </div>
    </div>
    <Footer @data="handleData($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Demo from '@/components/Demo.vue'
import Footer from '@/components/Footer.vue'
import Vote from '@/components/Vote.vue'
import PoolChars from '@/components/PoolChars.vue'
import VoteActive from '@/components/VoteActive'
import Comands from '@/components/Comands'

import { VueWebRTC } from 'vue-webrtc';

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Header,Demo,Footer,Vote,PoolChars,VoteActive,Comands,
    'vue-webrtc': VueWebRTC
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
      roomId: localStorage.getItem('room_id'),
      widgetsWindow: true,
      queueWindow: false
    }
  },
  mounted(){
    this.onJoin();
    // this.$refs.webrtc.enableAudio = false;
    // this.$dispatch('onLeave');
  },
  methods:{
    closeWindow(m){
      if(m == 'q'){
        this.queueWindow = false;
      }
      if(m == 'w'){
        this.widgetsWindow = false;
      }
    },
    handleData(cmd){
      if(cmd == 'onLeave'){
        this.onLeave();
        this.$router.push('/')
      }
      if(cmd == 'addWidget'){
        // this.addWidget('Poll')
        this.widgetsWindow = true;
      }
      if(cmd == 'teams'){
        this.queueWindow = true;
      }
      console.log(cmd)
    },
    // WEB RTC
      onJoin() {
        // console.log(this.$refs.webrtc);
          this.$refs.webrtc.join();
          console.log('ref')
          console.log(this.$refs.webrtc.$el)
      },
      onLeave() {
        this.$refs.webrtc.leave();
      },
      onShareScreen() {
        this.img = this.$refs.webrtc.shareScreen();
      },
      onError(error, stream) {
          console.log('On Error Event', error, stream);
      },
      logEvent(event) {
          console.log('Event : ', event);
      },
     // WEB RTC

    async addWidget(n){
      const body = JSON.stringify({
        room_id: localStorage.getItem('room_id'),
        type: n,
        top:"0px",
        left:"0px"
      })

      await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/create',body,{headers: {"Content-Type": "application/json"  }})
        .then(res=>{
          this.widgets.push({id:res.data.id,type: n,clicked:1});
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

      await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/update',body,{headers: {"Content-Type": "application/json"  }})
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
    /* background:red; */
    color:red;
  }
  
</style>
