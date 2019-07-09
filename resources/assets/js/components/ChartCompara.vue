<template>
<div>
    <h3 class="subtitle m-t-lg">Comparativo</h3>
    <h6 class="title is-6">año anterior</h6>
    <apexchart v-if="options.chart" width="100%" height="300" type="bar" :options="options" :series="series"></apexchart>
</div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                options: [],
                series: []
            }
        },
        methods: {
            loadChart() {
                this.loading = true
                this.$emit('loading', true)
                this.$http.get(`http://local.mayordomia.nicosli.com/api/reports/comparative/${this.id_iglesia}/${this.id_remesa}`)
				.then(( {data} ) => {
					this.loading = false
                    this.$emit('loading', false)
                    this.options = data.options
                    this.options.chart = {
                        id: 'chartComparativo',
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            speed: 500
                        }
                    }
                    this.options.yaxis = {
                        labels: {
                            formatter: function (val) {
                                let value = (val/1).toFixed(0).replace(',', '')
                                return "$"+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                        }
                    }
                    this.options.legend = {
                        show: true,
                        horizontalAlign: 'right',
                        fontSize: '14px',
                        markers: {
                            width: 25,
                            height: 15
                        }
                    }
                    this.options.dataLabels = {
                        enabled: true,
                        formatter: function (val) {
                            let value = (val/1).toFixed(0).replace(',', '')
                            return "$"+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }                        
                    },
                    this.series = data.series
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            formateNumber(value){
                let val = (value/1).toFixed(2).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        },
        watch: {
            id_remesa: function(val){
                this.loadChart()
            }
        },
        props: {
            id_iglesia: {required:true},
            id_remesa: {required:true}
        },
        mounted() {
            this.loadChart()
        }
    }
</script>
