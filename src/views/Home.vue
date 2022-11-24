<template>
  <div class="home">
    <Header/>
    <Demo/>
    <VuePool/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Demo from '@/components/Demo.vue'
import VuePool from '../components/VuePool.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Demo,
    VuePool
}
}
</script>
