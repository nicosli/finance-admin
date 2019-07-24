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
            <article class="message is-link">
                <div class="message-body">Tabla de <strong>Iglesias</strong>.
                    Este módulo muestra una lista completa de todas las iglesias
                    que están dados de alta en el sistema, para poder
                    ver los informes, hacer click en el botón "Info", 
                    este link dará un informe detallado de la iglesia
                </div>
            </article>
            <b-field grouped position="is-right">
                <b-input 
                    icon-pack="fas"
                    icon="search"
                    v-model="searchKeyword"
                    placeholder="búsqueda...">
                </b-input>
            </b-field>
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
                <template slot-scope="props">
                    <b-table-column field="codigo_t" label="Código" sortable>
                        <span class="has-text-danger">
                            {{ props.row.codigo_t }}
                        </span>
                    </b-table-column>
                    <b-table-column field="nombre" label="Nombre" sortable>
                        {{ props.row.nombre }}
                    </b-table-column>
                    <b-table-column field="distrito" label="Distrito" sortable>
                        {{ props.row.distrito.nombre }}
                    </b-table-column>
                    <b-table-column field="pastor" label="Pastor" sortable>
                        {{ props.row.distrito.pastor.user.name }}
                        {{ props.row.distrito.pastor.user.last_name }}
                    </b-table-column>
                    <b-table-column>
                        <a class="button is-primary is-small" 
                        :href="'/list/pastores/'
                        +props.row.distrito.pastor.user.id
                        +'/informes/iglesia/'
                        +props.row.id">
                            <span class="icon">
                                <i class="fas fa-angle-right"></i>
                            </span>
                            <span>Info</span>
                        </a>
                    </b-table-column>
                </template>
                <template slot="footer">
                    <div class="has-text-right">
                        Tabla Iglesias
                    </div>
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
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/iglesias?${params}`)
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
                    this.filtered = item.codigo_t.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.distrito.nombre.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.distrito.pastor.user.name.toLowerCase().includes(this.searchKeyword.toLowerCase())

                    return this.filtered
                })
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
