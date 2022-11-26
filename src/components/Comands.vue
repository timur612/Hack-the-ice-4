<template>
    <div>
        <p class="h5 unselectable text-muted"> {{k1}} </p>
        <p class="h4 unselectable">{{k2}} </p>
        <p class="h5 unselectable text-muted" style="cursor:pointer">{{k3}} </p>
        <a id="next" @click="()=>next(k1)" style="cursor: pointer;">next</a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            k1: 'Команда 1',
            k2: 'Команда 2',
            k3: 'Команда 3',
        }
    },
    props:['team'],
    mounted(){
        if(parseInt(this.team)-1 == 0){
            this.k1 = "Команда" + (parseInt(this.team)+2).toString();
        }else{
            this.k1 = "Команда" + (parseInt(this.team)-1).toString();
        }
        
        this.k2 = "Команда" + this.team;
        this.k3 = "Команда" + (parseInt(this.team)+1).toString();
    },
    methods:{
        next(){
            let old_k1 = this.k1;
            this.k1 = this.k2;
            this.k2 = this.k3;
            this.k3 = old_k1;
        }
    }
}
</script>

<style scoped>
.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>