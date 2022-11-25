<template>
    <div>
     <VueApexCharts type="bar" width="400" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"

export default {  
components: {
    VueApexCharts
  },
  data: function() { 
    return{
          
          series: [{
              name: "",
              data: [10, 25, 35]
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
              categories: ['Jan', 'Feb', 'Mar'], labels:{show:false}
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