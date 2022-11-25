<template>
    <div>
        <Vote :class="voted || !lobby ? 'nonvisible' : ''" @data="handleData($event)"/>
        <VueApexCharts :class="voted || !lobby ? '' : 'nonvisible'" type="bar" width="400" :options="chartOptions" :series="series"/>
    </div>
</template>

<script>
import Vote from '@/components/Vote.vue';
import VueApexCharts from "vue3-apexcharts"

import axios from 'axios';
export default {
    components:{
        Vote,VueApexCharts
    },
    mounted(){
        setInterval(()=>{
            axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/get/one',JSON.stringify({id:this.id}),{headers: {"Content-Type": "application/json"  }})
             .then(res=>{
                this.series[0].data = [res.data.data1,res.data.data2,res.data.data3];
             })
             .catch(e=>{
                console.log(e)
             })
        },5000)
    },
    data(){
        return {
            // id: 1,
            data: [0,0,0],
            voted:false,

            series: [{
              name: "",
              data: [0,0,0]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'Bar',
              zoom: {
                enabled: false
              }
            },
            colors:['#7E60D4'],
            plotOptions:{
                bar:{
                    dataLabels:{
                        position:'center',
                        total:{
                            enabled:true,
                        
                        }
                    },
                    borderRadius:5,
                    horizontal:true,
                }
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: '',
              align: 'left'
            },
            grid: {
                show:false,
            },
            xaxis: {
              categories: ['apple', 'orange', 'grape'], labels:{show:false}
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
          },
        }
    },
    props:['id','lobby'],
    methods:{
        async handleData(e){
            // let data = [];
            await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/get/one',JSON.stringify({id:this.id}),{headers: {"Content-Type": "application/json"  }})
             .then(res=>{
                this.series[0].data = [res.data.data1,res.data.data2,res.data.data3];
             })
             .catch(e=>{
                console.log(e)
             })
            
            if(e == 'apple'){
                this.series[0].data[0] += 1;
            }
            if(e == 'orange'){
                this.series[0].data[1] += 1;
            }
            if(e == 'grape'){
                this.series[0].data[2] += 1;
            }
            this.updateData();
            this.voted = true;
        },
        async updateData(){
            const body = JSON.stringify({
                id:this.id,
                data1: this.series[0].data[0],
                data2: this.series[0].data[1],
                data3: this.series[0].data[2]
            });

            await axios.post('https://placify-hack-the-ice-4.herokuapp.com/api/widget/update/data',body,{headers: {"Content-Type": "application/json"  }})
             .then(res=>{
                // this.series[0].data = [res.data.data1,res.data.data2,res.data.data3];
             })
             .catch(e=>{
                console.log(e)
             })
        }
    }
}
</script>

<style scoped>
    .nonvisible{
        display: none;
    }
</style>