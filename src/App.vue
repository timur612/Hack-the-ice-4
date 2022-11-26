<template>
  <div id="nav">
  </div>
  <router-view/>
</template>

<script>
export default {
  mounted(){
    if(!localStorage.getItem('user_id')){
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#nav{
  background-color: #222222;
}
template{
  overflow: hidden;
  background-color: #2f2f2f;
}
</style>
