<template>
  <div class="home">
    <Header/>
    
    <div class="w-12 h-12 bg-black-1000"></div>
  </div>
</template>

<script>
import './../assets/tailwind.css'
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>
