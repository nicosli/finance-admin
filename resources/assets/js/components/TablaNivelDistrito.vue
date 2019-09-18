<template>
<div>
    <div class="tags has-addons">
        <span class="tag">Mes</span>
        <span class="tag is-info">{{getMontName(mes)}} {{anio}}</span>
    </div>
    
    <h3 class="subtitle m-t-lg">Gráfica Distrito</h3>
    <h6 class="title is-6">Comparativo con año anterior</h6>

    <nav class="level" v-show="totales.length > 0">
        <div class="level-item has-text-centered" v-for="total in totales">
            <div>
            <p class="heading">Total año {{total.anio}} </p>
            <p class="title">{{total.suma | formatNumber}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">Diferencia</p>
            <p class="title">{{analitycs.dif | formatNumber}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">% Crecimiento</p>
            <p class="title">
                <b-icon
                    pack="fas"
                    :icon="analitycs.icon"
                    :type="analitycs.type"
                    size="is-small">
                </b-icon>
                {{analitycs.porcentaje | formatNumber}}%
            </p>
            </div>
        </div>
    </nav>

    <apexchart 
        v-if="options.chart" 
        width="100%" 
        height="450" 
        type="line" 
        :options="options" 
        :series="series">
    </apexchart>

    
</div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                iglesias: [],
                anios:'',
                totales: '',
                analitycs: '',
                options: [],
                series: []
            }
        },
        methods: {
            loadChart() {
                this.loading = true
                this.$emit('loading', true)
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/reports/niveldistrito/${this.mes}/${this.anio}/${this.tipo_reporte}/${this.id_remesa}`)
				.then(( {data} ) => {
					this.loading = false
                    this.iglesias = data.results
                    this.anios = data.anios
                    this.totales = data.totales
                    this.analitycs = data.analitycs

                    this.options = data.graph.options
                    this.options.chart = {
                        id: 'chartComparativo',
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            speed: 500
                        }
                    }
                    this.options.stroke = {
                        width: [1, 1, 4]
                    }
                    this.options.yaxis = {
                        labels: {
                            formatter: function (val) {
                                let value = (val/1).toFixed(0).replace(',', '')
                                return "$"+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                        },
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true
                        },
                        tooltip: {
                            enabled: true
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
                    this.options.annotations = {
                        points: data.graph.annotations.points
                    }
                    
                    this.options.dataLabels = {
                        enabled: false,
                        style: {
                            colors: ['#FFF']
                        },
                        formatter: function (val) {
                            let value = (val/1).toFixed(0).replace(',', '')
                            return "$"+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }                        
                    },
                    this.series = data.graph.series

                    this.$emit('loading', false)
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            getMontName(mes){
				mes--
				const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
					"Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
				];
				return monthNames[mes]
			}
        },
        filters: {
            formatNumber(value){
                let val = (value/1).toFixed(0).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        },
        watch:{
            id_remesa: function(val){
                this.loadChart()
            },
            tipo_reporte: function(val){
                this.loadChart()
            },
            mes: function(val){
                this.loadChart()
            },
            anio: function(val){
                this.loadChart()
            }
        },
        props: {
            id_remesa: {required:true},
            mes: {required:true},
            anio: {required:true},
            tipo_reporte: {required:true}
        },
        mounted() {
            this.loadChart()
        }
    }
</script>
