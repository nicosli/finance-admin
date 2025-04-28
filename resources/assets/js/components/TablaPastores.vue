<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Lista Pastores</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content">
            <article class="message is-link">
                <div class="message-body">Tabla de <strong>Pastores</strong>.
                    Este módulo muestra una lista completa de todos los pastores
                    que están dados de alta en el sistema, para poder
                    ver los informes, hacer click en el botón "Info", 
                    este link dará un informe detallado del pastor
                </div>
            </article>
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading">Pastores</p>
                    <p class="title">{{analytics.pastores}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading">Iglesias</p>
                    <p class="title">{{analytics.iglesias}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading">Distritos</p>
                    <p class="title">{{analytics.distritos}}</p>
                    </div>
                </div>
            </nav>
            <div class="columns">
                <div class="column is-9-widescreen">
                    <h3 class="subtitle m-t-sm">Lista de Pastores</h3>
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
                    <b-table-column field="name" label="Nombre" sortable v-slot="props">
                            {{ props.row.name }}
                    </b-table-column>
                    <b-table-column field="last_name" label="Apellido" sortable v-slot="props">
                        {{ props.row.last_name }}
                    </b-table-column>
                    <b-table-column field="email" label="Correo" sortable v-slot="props">
                        <span class="has-text-info">
                            {{ props.row.email }}
                        </span>
                    </b-table-column>
                    <b-table-column field="iglesias" label="Iglesias" sortable v-slot="props">
                        {{ props.row.pastor.distrito.iglesias.length }}
                    </b-table-column>
                    <b-table-column field="puntualidad" label="Puntualidad" v-slot="props">
                        {{props.row.puntualidad}}%
                    </b-table-column>
                    <b-table-column field="nombre" label="Informe Mensual" sortable v-slot="props">
                        <b-tooltip label="Mostrar Informe Mensual de Remesas del Distrito"
                        position="is-top"
                        type="is-link"
                        multilined
                        animated>
                            <a class="has-text-link" :href="'/informes/mensual/distrito/'
                                +props.row.pastor.distrito.id">
                                <span class="icon">
                                    <i class="fas fa-angle-right"></i>
                                </span>
                                <span>Informe Mensual</span>
                            </a>
                        </b-tooltip>
                    </b-table-column>
                    <b-table-column field="nombre" label="Informe Anual" sortable v-slot="props">
                        <b-tooltip label="Mostrar Informe Mensual de Remesas del Distrito"
                        position="is-top"
                        type="is-info"
                        multilined
                        animated>
                            <a class="has-text-info" :href="'/informes/anual/distrito/'
                                +props.row.pastor.distrito.id">
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
                        Tabla de Pastores
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
                analytics: '',
                sortField: 'fechaFuente',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                loading: false,
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
                    `/api/list/pastores?${params}`)
                .then(({ data }) => {
                    this.data = []
                    this.analytics = data.analytics
                    data.results.forEach(item => {
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
                return this.data.filter(item => {
                    return (
                        item.codigo_er?.toLowerCase().includes(keyword) ||
                        item.name?.toLowerCase().includes(keyword) ||
                        item.last_name?.toLowerCase().includes(keyword) ||
                        item.email?.toLowerCase().includes(keyword) ||
                        item.mobile?.toLowerCase().includes(keyword)
                    );
                });
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>

