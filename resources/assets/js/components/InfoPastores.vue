<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/list/pastores">Lista Pastores</a></li>
            <li class="is-active"><a href="#" aria-current="page">Pastor {{data.name}}</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content">
            <section class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Pastor {{data.name}}</h1>
                        <h2 class="subtitle">{{data.last_name}}</h2>
                    </div>
                </div>
            </section>
            <div class="content">
               <h3 class="subtitle m-t-lg">Distrito</h3>
               <h6 class="title is-6">{{data.pastor.distrito.nombre}}</h6>
               <tabla-informes :id_distrito="data.pastor.distrito.id" :mes="mes"></tabla-informes>
            </div>
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
				perPage: 10
            }
        },
        methods: {
            loadAsyncData() {
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/pastores/${this.id}`)
				.then(( {data} ) => {
                    this.data = data.results
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            }
        },
        props: {
            id: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
