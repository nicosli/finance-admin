<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Lista Distritos</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content">
            <article class="message is-info">
                <div class="message-body">Tabla de <strong>Distritos</strong>.
                    Este módulo muestra una lista completa de todas los distritos
                    que están dados de alta en el sistema, para poder
                    ver los informes, hacer click en el botón "Info", 
                    este link dará un informe detallado del distrito
                </div>
            </article>
            <div class="columns">
                <div class="column is-9-widescreen">
                    <h3 class="subtitle m-t-sm">Lista de Distritos</h3>
                </div>
                <div class="column is-3-widescreen">
                    <b-input 
                        icon-pack="fas"
                        icon="search"
                        v-model="searchKeyword"
                        placeholder="búsqueda...">
                    </b-input>
                </div>
            </div>
            <div v-show="loading">
                cargando...
            </div>
            <b-table
                :focusable=true
                :data="filteredData"
                :loading="loading"
                paginated
                            
                :per-page="perPage"
                :striped=true
                :hoverable=true
                :default-sort-direction="defaultSortOrder">
                <template slot-scope="props">
                    <b-table-column sortable field="codigo_dt" label="Código">
                        <span class="has-text-danger">
                            {{ props.row.codigo_dt }}
                        </span>
                    </b-table-column>
                    <b-table-column sortable field="nombre" label="Nombre">
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column sortable field="iglesias" label="Iglesias">
                        {{ props.row.iglesias.length }}
                    </b-table-column>
                    <b-table-column sortable field="pastor" label="Pastor">
                        {{ props.row.pastor.user.name }}
                        {{ props.row.pastor.user.last_name }}
                    </b-table-column>
                    <b-table-column sortable field="entrega" label="Entrega">
                        45%
                    </b-table-column>
                    <b-table-column field="ac_iglesias" label="">
                        <b-tooltip label="Mostrar Informe Mensual de Remesas del Distrito"
                        position="is-top"
                        type="is-link"
                        multilined
                        animated>
                            <a 
                            :href="'/informes/mensual/distrito/'
                            +props.row.id"
                            class="">
                            <span class="icon">
                                <i class="fas fa-angle-right"></i>
                            </span>
                            <span>Informe Mensual</span>
                            </a>
                        </b-tooltip>
                    </b-table-column>
                    <b-table-column>
                        <b-tooltip label="Mostrar Informe Acomulado Anual 
                        del Distrito Categorizado por Remesa"
                        position="is-top"
                        type="is-info"
                        multilined
                        animated>
                            <a class="has-text-info" 
                            :href="'/informes/anual/distrito/'
                            +props.row.id">
                                <span class="icon">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                                <span>Informe Anual</span>
                            </a>
                        </b-tooltip>
                    </b-table-column>
                </template>
                <template slot="footer">
                    <div class="has-text-right">
                        Tabla de Distritos
                    </div>
                </template>
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered" v-show="!loading">
                            <p>
                                <b-icon
                                    pack="far"
                                    icon="sad-cry"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>No se encontraron registros.</p>
                        </div>
                    </section>
                </template>
            </b-table>
        </div>
    </div>
</div>    
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                sortField: 'nombre',
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
                const params = [
                    `sort_by=${this.sortField}`,
                    `sort_type=${this.sortOrder}`
                ].join('&')
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/list/distritos?${params}`)
				.then(( {data} ) => {
                    this.data = []
                    data.results.forEach((item) => {
						this.data.push(item)
                    })
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            }
        },
        computed: {
            filteredData(){
                return this.data.filter((item) => {
                    this.filtered = item.codigo_dt.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.pastor.user.name.toLowerCase().includes(this.searchKeyword.toLowerCase())

                    return this.filtered
                })
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
