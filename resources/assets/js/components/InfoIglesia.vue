<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/list/pastores">Lista Pastores</a></li>
            <li><a :href="'/list/pastores/'+data.id">Pastor {{data.name}}</a></li>
            <li class="is-active"><a href="#" aria-current="page">Iglesia X</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content" v-if="data.pastor">
            <section class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Pastor {{data.name}}</h1>
                        <h2 class="subtitle">Distrito {{data.pastor.distrito.nombre}}</h2>
                    </div>
                </div>
            </section>
            <div class="content" v-if="data.pastor">
                <h3 class="subtitle m-t-lg">Comparativo</h3>
                <h6 class="title is-6">año anterior</h6>
                <bar-chart 
                id="bar" :data="barData" xkey="year" ykeys='[ "2018", "2019" ]' resize="true"
                labels='[ "2018", "2018" ]' horizontal="true"
                bar-colors='[ "#FF6384", "#FFCE56" ]'
                :y-label-format="percentFormat"
                grid="true" grid-text-weight="bold" hide-hover="auto">
                </bar-chart>
                <h3 class="subtitle m-t-lg">Importes</h3>
                <h6 class="title is-6">del mes</h6>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import { BarChart } from 'vue-morris'    
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
                barData: [
                    { year: 'Diezmos', 2018: 10, 2019: 5 },
                    { year: 'Ofrenda Misionera', 2018: 10, 2019: 15 },
                    { year: 'Plan de desarrollo', 2018: 20, 2019: 25 },
                    { year: 'Primicias', 2018: 30, 2019: 20 }
                ],
            }
        },
        methods: {
            loadAsyncData() {
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/pastores/${this.id_pastor}`)
				.then(( {data} ) => {
                    this.data = data.results
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            percentFormat (val) {
                return val + '%'
            },
        },
        components: {
            BarChart
        },
        props: {
            id_pastor: {required:true},
            id_iglesia: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
