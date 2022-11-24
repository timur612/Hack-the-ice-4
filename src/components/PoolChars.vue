<template>
    <div>
     <VueApexCharts type="bar" width="650" :options="chartOptions" :series="series"></VueApexCharts>
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
            colors:['#795AD2'],
            plotOptions:{
                bar:{
                    horizontal:true
                }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Product Trends by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
            bar:{
                horizontal: true
            }
          },
        }
        },
    }

</script>