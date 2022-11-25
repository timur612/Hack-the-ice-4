<template>
    <div class="container">
        <div class="mt-3">
            <p class="h3">Room: {{id}}</p>
        </div>
        <div v-for="(widget,key) in widgets" :key="key">
        <div ref="draggableContainer" class="position-absolute" id="draggable-container" style="width:15%;">
                <div  class="container border text-center p-2"  >
                    <div id="draggable-header">
                        <p> {{widget.type}} </p>
                    </div>
                </div>
        </div>


        </div>
    </div>
</template>

<script>
import Demo from '@/components/Demo.vue'
import axios from 'axios';

export default {
    name:"Room",
    components:{
        Demo
    },
    data(){
        return{
            id: '',
            top:'',
            left:'',
            widgets: [{type:'a'}]
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        setInterval(this.getWidget,5);
        console.log(this.$refs)
    },
    methods:{
        async getWidget(){
            const body = JSON.stringify({
                room_id: localStorage.getItem('room_id')
            })

            await axios.post('http://localhost:5000/api/widget/get',body,{headers: {"Content-Type": "application/json"  }})
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

