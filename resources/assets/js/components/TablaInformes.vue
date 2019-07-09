<template>
<div>
    <div v-show="loading">
        cargando...
    </div>
    <table class="table is-bordered is-striped is-hoverable is-responsive">
        <thead>
            <tr>
                <th>Iglesia</th>
                <th v-for="remesa in remesas">{{remesa.nombre}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="iglesia in data">
                <td>
                    <a :href="'/list/pastores/'+id_pastor+'/informes/iglesia/'+iglesia.id">
                        <i class="fas fa-chart-line"></i> {{iglesia.nombre}}
                    </a>
                </td>
                <td v-for="remesa in remesas" align="center">
                    <span v-for="informe in iglesia.informes">
                        <span v-if="remesa.id == informe.remesa.id">
                            <b-tooltip :label="informe.fecha | formatDate">
                                <span :class="checkColor(informe.fecha)">
                                    {{informe.importe | formateNumber}}
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
				perPage: 10,
            }
        },
        methods: {
            loadAsyncData() {
                this.loading = true
                this.$http.get(`http://local.mayordomia.nicosli.com/api/reports/pastores/${this.id_distrito}/${this.mes}`)
				.then(( {data} ) => {
                    this.data = []
                    this.remesas = []
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
        filters: {
            formateNumber(value){
                let val = (value/1).toFixed(2).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            formatDate(value){
                if (value) {
                    return moment(String(value)).format('D MMM YYYY - HH:mm')
                }
            }
        },
        props: {
            id_distrito: {required:true},
            id_pastor: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
