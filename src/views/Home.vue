<template>
  <div class="home">
    <Header/>
    <Demo/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Demo from '@/components/Demo.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Demo,
}
}
</script>
