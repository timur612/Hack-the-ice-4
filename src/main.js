import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WebRTC from 'vue-webrtc' 
import 'setimmediate';

const app = createApp(App);

app.use(router).mount('#app');
app.use(WebRTC);