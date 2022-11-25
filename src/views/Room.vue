<template>
    <div >
        <Header/>
        <!-- <div class="mt-3">
            <p class="h3">Room: {{id}}</p>
        </div> -->
        <div v-for="(widget,key) in widgets" :key="key">
        <div ref="draggableContainer" class="position-absolute" id="draggable-container" style="width:15%;">
                <div  class="container"  >
                    <div id="draggable-header">
                        <VoteActive :lobby="true" :id="widget.id" v-if="widget.type === 'Poll'"/>
                        <!-- <p> {{widget.type}} </p> -->
                    </div>
                </div>
        </div>


        </div>
        <vue-webrtc ref="webrtc"
                  width="100vw"
                  height="50vh"
                  :enableVideo="false"
                  :enableAudio="true"
                  :roomId="roomId"
                  :enableLogs="true"
                  v-on:joined-room="logEvent"
                  v-on:left-room="logEvent"
                  v-on:opened-room="logEvent"
                  v-on:share-started="logEvent"
                  v-on:share-stopped="logEvent"
                  @error="onError" />
    
    <div :class="queueWindow ? '' : 'd-none'" class="container float-start border" style="margin-top:-0.6%;height:80vh;width:25%;background-color:white">
        <div class="row mt-3">
          <p class="col-sm-10 h4">Очередь</p>
          <a class="col-sm" @click="()=>closeWindow('q')" style="cursor:pointer"><img src="../assets/close.svg" alt=""></a>
        </div>
        <div class="mt-4">
          <Comands class="text-center"  :team="roomId"/>
        </div>
    </div>
    <Footer @data="handleData($event)"/>
    </div>
</template>

<script>
import Demo from '@/components/Demo.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Vote from '@/components/Vote.vue'
import VoteActive from '@/components/VoteActive'
import Comands from '@/components/Comands'

import axios from 'axios';
import { VueWebRTC } from 'vue-webrtc';

export default {
    name:"Room",
    components:{
        Demo, Header, Footer,'vue-webrtc': VueWebRTC,Vote,VoteActive,Comands
    },
    data(){
        return{
            id: '',
            top:'',
            left:'',
            widgets: [{type:'a'}],
            roomId: localStorage.getItem('room_id'),
            queueWindow: false
        }
    },
    mounted(){
        this.id = this.$route.params.id;

        setInterval(this.getWidget,100);
        console.log(this.$refs)
        this.onJoin();
        
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
      if(cmd == 'teams'){
        this.queueWindow = true;
      }
      // console.log(cmd)
    },
    // WEB RTC
      onJoin() {
        console.log(this.$refs.webrtc);
          this.$refs.webrtc.join();
        //   console.log('ref')
        //   console.log(this.$refs.webrtc.$el)
      },
      onLeave() {
        console.log('w')
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
        async getWidget(){
            const body = JSON.stringify({
                room_id: localStorage.getItem('room_id')
            })

            await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/get',body,{headers: {"Content-Type": "application/json"  }})
                .then(res=>{
                    this.widgets = res.data;
                    
                    for(let i = 0; i < this.widgets.length; i++){
                        this.$refs.draggableContainer[i].style.top = this.widgets[i].top;
                        this.$refs.draggableContainer[i].style.left = this.widgets[i].left;
                        console.log(this.$refs.draggableContainer[i].style.left)
                    }
                })
                .catch(e=>{
                    console.log(e)
                })
        }
    }
}
</script>

<style scoped>

</style>

