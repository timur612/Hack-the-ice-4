<template >
    <div id="sheet" class=" container-fluid align-items-center d-flex d-flex justify-content-between" style="height:76px; position:fixed; bottom:0;">
        <span>
            <a href="#" class="mx-2"><img src="../assets/mic.svg" alt=""></a>
            <a href="#" class="mx-2"><img src="../assets/cam.svg" alt=""></a>
        </span>
        <span>
            <a href="#" class="mx-2" @click="teams"><img src="../assets/people.svg" alt=""></a>
            <a href="#" class="mx-2"><img src="../assets/queque.svg" alt=""></a>
            <a href="#" class="mx-2"><img src="../assets/chat.svg" alt=""></a>
            <a href="#" class="mx-2"><img src="../assets/screencast.svg" alt=""></a>
            <a class="mx-2"><img src="../assets/squares.svg" alt=""></a>
            <a class="mx-2" style="cursor:pointer" @click="addWidget"><img src="../assets/widget.svg" alt=""></a>
            <a href="#" class="mx-2"><img src="../assets/dots.svg" alt=""></a>
        </span>
        <span>
            <a href="#" @click="leaveOn" ><img src="../assets/off.svg" alt=""></a>
        </span>
    </div>
</template>
<style>
#sheet{
    background-color: #222222;
}
</style>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        leaveOn(){
            this.$emit('data','onLeave');
        },
        addWidget(){
            this.$emit('data','addWidget')
        },
        teams(){
            this.$emit('data','teams')
        }
    }
}
</script>