<template>
    <div>
        <b-field grouped position="is-right">
            <b-input 
                icon-pack="fas"
                icon="search"
                v-model="searchKeyword"
                placeholder="búsqueda...">
            </b-input>
        </b-field>

        <b-table
            :data="filteredData"
            :loading="loading"
            paginated
                        
            :per-page="perPage"
            :striped=true
            :hoverable=true
            :focusable=true>
            <template slot-scope="props">
                <b-table-column field="codigo_er" label="Fecha Fuente" sortable>
                    <span class="has-text-danger">
                        {{ props.row.codigo_er }}
                    </span>
                </b-table-column>
                <b-table-column field="name" label="Nombre" sortable>
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="last_name" label="Apellido" sortable>
                    {{ props.row.last_name }}
                </b-table-column>
                <b-table-column field="email" label="Correo" sortable>
                    {{ props.row.email }}
                </b-table-column>
            </template>
        </b-table>
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
                const params = [
                    `sort_by=${this.sortField}`,
                    `sort_type=${this.sortOrder}`
                ].join('&')
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/pastores?${params}`)
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
                    this.filtered = item.codigo_er.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.last_name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.email.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.mobile.toLowerCase().includes(this.searchKeyword.toLowerCase())
                    

                    return this.filtered
                })
            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
