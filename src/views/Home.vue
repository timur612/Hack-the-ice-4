<template>
  <div class="home">
    <Header/>
    <Demo/>
    <VuePool/>
    <PoolChars/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Demo from '@/components/Demo.vue';
import VuePool from '../components/VuePool.vue';
import PoolChars from '../components/PoolChars.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Demo,
    VuePool,
    PoolChars,
}
}
</script>
