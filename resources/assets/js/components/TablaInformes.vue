<template>
<div>
    <div v-show="loading">
        cargando...
    </div>
    <table class="table is-bordered is-striped is-hoverable is-responsive">
        <thead>
            <tr>
                <th>Iglesia</th>
                <th v-for="remesa in remesas" align="center">{{remesa.nombre}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="iglesia in data">
                <td>
                    <a :href="'/informes/iglesia/'+iglesia.id">
                        {{iglesia.nombre}}
                    </a>
                </td>
                <td v-for="remesa in remesas" align="center">
                    <span v-for="informe in iglesia.informes">
                        <span v-if="remesa.id == informe.remesa.id">
                            <b-tooltip 
                                multilined="true"
                                size="is-small"
                                :label="informe.fecha+' '+informe.hora | formatDate('Entrega')">
                                <span :class="checkColor(informe.fecha)">
                                    {{checkLabel(informe.fecha)}} 
                                </span>
                            </b-tooltip>
                            <div class="is-block m-t-sm"></div>
                            <b-tooltip 
                                type="is-info"
                                position="is-left"
                                :label="informe.mes_anterior.importe | formatNumber('Año pasado')">
                                <span>
                                    <span class="has-text-grey">$</span> 
                                    {{informe.importe | formatNumber}} 
                                </span>
                            </b-tooltip>
                            <div class="is-block"></div>
                            <b-tooltip 
                                type="is-info"
                                position="is-left"
                                :label="informe.mes_anterior.dif | formatNumber('Diferencia')">
                                <span style="font-size:14px">
                                    <b-icon
                                        pack="fas"
                                        :icon="informe.mes_anterior.icono"
                                        :type="informe.mes_anterior.type"
                                        size="is-small">
                                    </b-icon>
                                    {{ informe.mes_anterior.porcentaje | formatNumber }}%
                                </span>
                            </b-tooltip>
                        </span>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
    import moment from 'moment'
	moment.locale('es')
    export default {
        data() {
            return {
                data: [],
                remesas: [],
                sortField: 'fechaFuente',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                loading: false,
                filtered: '',
                searchKeyword: '',
				perPage: 10
            }
        },
        methods: {
            loadAsyncData() {
                this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/reports/pastores/${this.id_distrito}/${this.mes}/${this.anio}`)
				.then(( {data} ) => {
                    this.data = []
                    this.remesas = []
                    this.$emit('dateReport', data.dateReporte)
                    data.results.forEach((item) => {
						this.data.push(item)
                    })
                    data.remesas.forEach((item) => {
						this.remesas.push(item)
                    })
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            checkColor(fecha){
                let dia = parseInt(fecha.split('-')[2]);
                if(dia <= 5)
                    return "tag is-light";
                else if(dia > 5 && dia <= 10)
                    return "tag is-warning";
                else if(dia > 10)
                    return "tag is-danger";
            },
            checkLabel(fecha){
                let dia = parseInt(fecha.split('-')[2]);
                if(dia <= 5)
                    return "A tiempo";
                else if(dia > 5 && dia <= 10)
                    return "en límite";
                else if(dia > 10)
                    return "Tardanza";
            }
        },
        computed: {
            filteredData(){
                return this.data.filter((item) => {
                    this.filtered = item.nombre.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.codigo_t.toLowerCase().includes(this.searchKeyword.toLowerCase()) 
                    return this.filtered
                })
            }
        },
        watch: {
            mes: function(val){
                this.loadAsyncData()
            }
        },
        filters: {
            formatNumber(value, string){
                if(string == undefined)
                    string = ''
                let val = (value/1).toFixed(2).replace(',', '')
                return string + ' ' +val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            formatDate(value, string){
                if(string == undefined)
                    string = ''
                if (value) {
                    return string + ' ' + moment(String(value)).format('D MMM YYYY - HH:mm')
                }
            }
        },
        props: {
            id_distrito: {required:true},
            id_pastor: {required:true},
            mes: {required:true},
            anio: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
