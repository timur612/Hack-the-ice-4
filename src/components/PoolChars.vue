<template>
    <div>
     <VueApexCharts type="bar" width="400" :options="chartOptions" :series="series"/>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"

import axios from 'axios'
export default {  
components: {
    VueApexCharts
  },
  props:['data1','data2','data3'],
  computed(){
    // this.series[0].data = [this.data1,this.data2,this.data3];
    // console.log(this.data1)
    // setInterval(this.add,5000)
    this.add();
  },
  methods:{
    add(){
      this.series[0].data[0] += 1;
    }
  },
  data: function() { 
    return{
          ddata1:1,
          // data2:0,
          // data3:0,
          series: [{
              name: "",
              data: [this.data1,this.data2,0]
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
              text: 'Product Trends by Month',
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
    }

</script>