<template >
  <Header/>
    <div class="container-fluid"  >
      <!-- <VoteActive/> -->
      <!-- <Comands/> -->
        
        <div class="justify-content-center align-content-center" style="background-color:#2F2F2F;">
          <div class="pt-5">
            <input v-model="room_name" type="text">
            <a class="btn btn-outline-primary mx-5" @click="createRoom">create</a>
          </div>
          <div class="d-flex flex-column" style="">
            <p class="h5" style="color: white;">Rooms:</p>
            <div class="container d-flex flex-row flex-wrap" v-for="(room,key) in rooms" :key=key>
              <div class="p-2 d-flex flex-column justify-content-center" style="border-radius: 5px;border-color: #222222; margin-top: 10px; width: 200px; background-color: #222222;">
                <p class="col-sm text-center" style="color: white;"> {{room.name}} </p>
                <a class="col-sm btn" style="background-color: #7E60D4; color:white" @click="()=>connectRoom(room.id)">connnect</a>
              </div>
            </div>   
            </div>
          </div>
        </div>
</template>
<style>
</style>
<script>
import axios from 'axios'
import VoteActive from '@/components/VoteActive'
import Comands from '@/components/Comands'
import Header from '../components/Header.vue'

export default {
    name: 'Home',
    components:{

      VoteActive,Comands,Header
    },

    data(){
      return{
        room_name: '',
        rooms: [],
        myrooms: []
      }
    },
    mounted(){
      this.getRooms();
      this.getUsersRooms();
    },
    methods:{
      async createRoom(){
        const body = JSON.stringify({
          user_id: localStorage.getItem('user_id'),
          name: this.room_name
        })
        await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/room/create',body,{headers: {"Content-Type": "application/json"  }})
          .then((res)=>{
            console.log(res.data);
            localStorage.setItem('room_id',res.data.id);
            this.$router.push('/myroom/'+res.data.id);
          })
          .catch(e => {
            console.log(e);
          })
        
      },
      connectRoom(i){
        this.$router.push('/room/'+i);
        localStorage.setItem('room_id',i);
      },
      connectMyRoom(i){
        this.$router.push('/myroom/'+i);
        localStorage.setItem('room_id',i);
        // this.$emit()
      },
      async getRooms(){
        await axios.get('https://placify-hack-the-ice-4.herokuapp.com/api/room/getAll')
          .then(res=>{
              this.rooms = res.data;
              console.log(this.rooms)
          })
          .catch(e => {
            console.log(e);
          })
      },
      async getUsersRooms(){
        const body = JSON.stringify({
          user_id: localStorage.getItem('user_id')
        })
        await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/room/getUsers',body,{headers: {"Content-Type": "application/json"  }})
          .then(res=>{
            this.myrooms = res.data
          })
          .catch(e => {
            console.log(e);
          })
      }
    }
}
</script>

<style scoped>

</style>

