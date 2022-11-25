<template>
    <div class="container mt-5" style="width:50%">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="passwrod" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <a class="btn btn-primary" @click="login">Submit</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data(){
        return{
            email:'',
            passwrod:'',
        }
    },
    methods:{
        async login(){
            const body = JSON.stringify({
                email: this.email,
                passwrod: this.passwrod
            });

            await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/user/login',body,{headers: {"Content-Type": "application/json"  }})
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('user_id',res.data.id);
                    this.$router.push('/');
                })
                .catch(e=>{
                    console.log(e);
                })
        }
    }
}
</script>

<style scoped>

</style>