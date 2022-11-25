<template>
    <div>
     <VueApexCharts type="bar" width="500" :options="chartOptions" :series="series"></VueApexCharts>
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
              name: "Desktops",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], labels:{show:false}
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