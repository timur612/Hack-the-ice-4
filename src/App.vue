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

<style src="./assets/style.css">

</style>
