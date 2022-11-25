<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 my-3">
                <h2>Room</h2>
                <input v-model="roomId">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="">
                    <vue-webrtc ref="webrtc"
                                width="100%"
                                :roomId="roomId"
                                :enableLogs="true"
                                :enableAudio="false"
                                :enableVideo="false"
                                v-on:joined-room="logEvent"
                                v-on:left-room="logEvent"
                                v-on:opened-room="logEvent"
                                v-on:share-started="logEvent"
                                v-on:share-stopped="logEvent"
                                @error="onError" />
                </div>
                <div class="row">
                    <div class="col-md-12 my-3">
                        <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
                        <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>
                        <button type="button" class="btn btn-primary" @click="onShareScreen">Share Screen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueWebRTC } from 'vue-webrtc';
    export default {
        name: 'demo',
        components: {
            'vue-webrtc': VueWebRTC
        },
        data() {
            return {
                img: null,
                roomId: "private-room-liver"
            };
        },
        mounted() {
            
        },
        computed: {
        },
        watch: {
        },
        methods: {
            onJoin() {
                this.$refs.webrtc.join();
                
                console.log('refs:')
                console.log(this.$refs.webrtc);
            },
            onLeave() {
                this.$refs.webrtc.leave();
            },
            onShareScreen() {
                this.img = this.$refs.webrtc.shareScreen();
            },
            onError(error, stream) {
                console.log('On Error Event', error, stream);
            },
            logEvent(event) {
                console.log('Event : ', event);
            },
        }
    };
</script>

<style>
    .btn {
       margin-right: 8px;
    }
    .video-list {
        margin-bottom: 10px;
        background: transparent !important;
    }
    .video-item {
       
        position:absolute;
        top:0;
        z-index: -1;
        left:0;
        display: inline-block;
        background: transparent !important;
    }
    .video-item video {
        width: 100vw;
        height: 90vh;
        object-fit: cover;
        transform: scale(-1,1);   
    }
</style>