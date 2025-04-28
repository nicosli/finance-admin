<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Lista Iglesias</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content">
            <article class="message is-info">
                <div class="message-body">Tabla de <strong>Iglesias</strong>.
                    Este módulo muestra una lista completa de todas las iglesias
                    que están dados de alta en el sistema, para poder
                    ver los informes, hacer click en el botón "Info", 
                    este link dará un informe detallado de la iglesia
                </div>
            </article>
            <div class="columns">
                <div class="column is-9-widescreen">
                    <h3 class="subtitle m-t-sm">Lista de Iglesias</h3>
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
                :data="filteredData"
                :loading="loading"
                paginated
                :per-page="perPage"
                :striped=true
                :hoverable=true
                :default-sort-direction="defaultSortOrder"
                :focusable=true>
                <template>
                    <b-table-column field="nombre" label="Nombre" sortable v-slot="props">
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column field="distrito" label="Distrito" sortable v-slot="props">
                        {{ props.row.distrito?.nombre }}
                    </b-table-column>
                    <b-table-column field="pastor" label="Pastor" sortable v-slot="props">
                        {{ props.row.distrito?.pastor?.user?.name }}
                        {{ props.row.distrito?.pastor?.user?.last_name }}
                    </b-table-column>
                    <b-table-column>
                        <b-tooltip label="Reporte Que Muestra el 
                        Importe Acumulado Anual y lo compara
                        con el año anterior"
                        position="is-top"
                        type="is-link"
                        multilined
                        animated v-slot="props">
                            <a class="" 
                            :href="'/informes/iglesia/'
                            +props.row?.id">
                                <span class="icon">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                                <span>Comparativo</span>
                            </a>
                        </b-tooltip>
                    </b-table-column>
                    <b-table-column field="" label="" v-slot="props">
                        <b-tooltip label="Porcentaje de Diferencia de
                            Ofrendas en Comparación con el Diezmo (PDOCD)"
                        position="is-top"
                        type="is-info"
                        multilined
                        animated>
                            <a class="has-text-info" 
                            :href="'/informes/pdocd/iglesia/'
                            +props.row.id">
                                <span class="icon">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                                <span>PDOCD</span>
                            </a>
                        </b-tooltip>
                    </b-table-column>
                </template>
                <template slot="footer">
                    <div class="has-text-right">
                        Tabla de Iglesias
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
                const params = [
                    `sort_by=${this.sortField}`,
                    `sort_type=${this.sortOrder}`
                ].join('&')
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/list/iglesias?${params}`)
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
            filteredData() {
                const keyword = this.searchKeyword.toLowerCase();
                return this.data.filter((item) => {
                    return (item.codigo_t || '').toLowerCase().includes(keyword) ||
                        (item.nombre || '').toLowerCase().includes(keyword) ||
                        (item.distrito?.nombre || '').toLowerCase().includes(keyword) ||
                        (item.distrito?.pastor?.user?.name || '').toLowerCase().includes(keyword) ||
                        (item.distrito?.pastor?.user?.last_name || '').toLowerCase().includes(keyword);
                });
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
