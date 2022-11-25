<template>
    <div class="container">
        <div class="mt-5">
            <input v-model="room_name" type="text">
            <a class="btn" @click="createRoom">create</a>
        </div>

        <div class="row">
          <div class="col-sm">
            <p class="h5">Rooms:</p>
            <div class="container" v-for="(room,key) in rooms" :key=key>
              <div class="row border rounded p-2" style="width:30%">
                <p class="col-sm"> {{room.name}} </p>
                <a class="col-sm btn btn-primary" @click="()=>connectRoom(room.id)">connnect</a>
              </div>
              
            </div>
          </div>
          <div class="col-sm">
            <p class="h5">My rooms:</p>
            <div class="container" v-for="(room,key) in myrooms" :key=key>
              <div class="row border rounded p-2" style="width:30%">
                <p class="col-sm"> {{room.name}} </p>
                <a class="col-sm btn btn-primary" @click="()=>{connectMyRoom(room.id)}">connnect</a>
              </div>
              
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
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
          user_id: 2,
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

