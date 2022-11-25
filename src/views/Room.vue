<template>
    <div >
        <Header/>
        <div class="mt-3">
            <p class="h3">Room: {{id}}</p>
        </div>
        <div v-for="(widget,key) in widgets" :key="key">
        <div ref="draggableContainer" class="position-absolute" id="draggable-container" style="width:15%;">
                <div  class="container border text-center p-2"  >
                    <div id="draggable-header">
                        <!-- <Vote v-if="widget.type === 'Poll'"/> -->
                        <p> {{widget.type}} </p>
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

    <Footer @data="handleData($event)"/>
    </div>
</template>

<script>
import Demo from '@/components/Demo.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Vote from '@/components/Vote.vue'
import axios from 'axios';
import { VueWebRTC } from 'vue-webrtc';

export default {
    name:"Room",
    components:{
        Demo, Header, Footer,'vue-webrtc': VueWebRTC,Vote
    },
    data(){
        return{
            id: '',
            top:'',
            left:'',
            widgets: [{type:'a'}],
            roomId: localStorage.getItem('room_id')
        }
    },
    mounted(){
        this.id = this.$route.params.id;

        setInterval(this.getWidget,100);
        console.log(this.$refs)
        this.onJoin();
        
    },
    methods:{
         handleData(cmd){
      if(cmd == 'onLeave'){
        this.onLeave();
        this.$router.push('/')
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

