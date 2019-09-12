<template>
<div>
    <div class="tags has-addons">
        <span class="tag">Mes</span>
        <span class="tag is-info">{{getMontName(mes)}} {{anio}}</span>
    </div>
    <h3 class="subtitle m-t-lg">Gráfica</h3>
    <h6 class="title is-6">Comparativo con año anterior</h6>
    <apexchart 
        v-if="options.chart" 
        width="100%" 
        height="350" 
        type="line" 
        :options="options" 
        :series="series">
    </apexchart>

    <h3 class="subtitle m-t-lg">Tabla Remesas</h3>
    <h6 class="title is-6">Comparativo con año anterior</h6>
    <table class="table is-bordered is-striped is-hoverable is-responsive">
        <thead>
            <tr class="has-background-light" v-if="iglesias.length > 0">
                <th class="has-text-dark">Iglesia</th>
                <th class="has-text-dark" v-for="anio in anios" align="center">{{anio}}</th>
                <th class="has-text-dark" align="center">+ / -</th>
                <th class="has-text-dark" align="center">%</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="iglesia in iglesias">
                <td>{{ iglesia.nombre }}</td>
                <td align="center">
                    {{ iglesia.comparativo.anioAnterior | formatNumber}}
                </td>
                <td align="center">
                    {{ iglesia.comparativo.anio | formatNumber}}
                </td>
                <td align="center">{{ iglesia.analytics.dif | formatNumber}}</td>
                <td align="center">
                    <span style="font-size:14px">
                        <b-icon
                            pack="fas"
                            :icon="iglesia.analytics.icon"
                            :type="iglesia.analytics.type"
                            size="is-small">
                        </b-icon>
                        {{ iglesia.analytics.porcentaje | formatNumber}}%
                    </span>
                </td>
            </tr>
            <tr class="has-background-info" v-if="analitycs.dif">
                <td class="has-text-white" align="center">TOTAL</td>
                <td v-for="anio in anios" class="has-text-white" align="center">
                    <span v-for="total in totales">
                        <span v-if="anio == total.anio">{{total.suma | formatNumber}}</span>
                    </span>
                </td>
                <td class="has-text-white" align="center">{{analitycs.dif | formatNumber}}</td>
                <td class="has-text-white" align="center">
                    <span style="font-size:14px">
                        <b-icon
                            pack="fas"
                            :icon="analitycs.icon"
                            :type="analitycs.type"
                            size="is-small">
                        </b-icon>
                        {{analitycs.porcentaje | formatNumber}}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
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
                    `/api/reports/comparative/byDistrict/${this.id_distrito}/${this.id_remesa}/${this.mes}/${this.anio}/${this.tipo_reporte}`)
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
                let val = (value/1).toFixed(2).replace(',', '')
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
            id_distrito: {required:true},
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
