<template>
<div>
    <h3 class="subtitle m-t-lg">Tabla Remesas</h3>
    <h6 class="title is-6">año anterior</h6>
    <table class="table is-bordered is-striped is-hoverable is-responsive">
        <thead>
            <tr class="has-background-info" v-if="iglesias[0].id">
                <th class="has-text-white">Iglesia</th>
                <th class="has-text-white" v-for="anio in anios" align="center">{{anio}}</th>
                <th class="has-text-white" align="center">+ / -</th>
                <th class="has-text-white" align="center">%</th>
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
                <td align="center">{{ iglesia.analytics.porcentaje | formatNumber}}</td>
            </tr>
            <tr class="has-background-link" v-if="analitycs.dif">
                <td class="has-text-white" align="center">TOTAL</td>
                <td v-for="anio in anios" class="has-text-white" align="center">
                    <span v-for="total in totales">
                        <span v-if="anio == total.anio">{{total.suma | formatNumber}}</span>
                    </span>
                </td>
                <td class="has-text-white" align="center">{{analitycs.dif | formatNumber}}</td>
                <td class="has-text-white" align="center">{{analitycs.porcentaje | formatNumber}}</td>
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
                analitycs: ''
            }
        },
        methods: {
            loadChart() {
                this.loading = true
                this.$emit('loading', true)
                this.$http.get(`http://local.mayordomia.nicosli.com/api/reports/comparative/byDistrict/${this.id_distrito}/${this.id_remesa}/${this.mes}`)
				.then(( {data} ) => {
					this.loading = false
                    this.iglesias = data.results
                    this.anios = data.anios
                    this.totales = data.totales
                    this.analitycs = data.analitycs
                    this.$emit('loading', false)
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
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
            }
        },
        props: {
            id_distrito: {required:true},
            id_remesa: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadChart()
        }
    }
</script>
