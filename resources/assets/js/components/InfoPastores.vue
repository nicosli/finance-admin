<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/list/pastores">Lista Pastores</a></li>
            <li class="is-active"><a href="#" aria-current="page">Pastor {{data.name}}</a></li>
        </ul>
    </nav>
    <div v-show="!data.pastor">
        cargando...
    </div>
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
                <article class="message is-info">
                    <div class="message-body">
                        Para ver el informe acomlado del Distrito 
                        <a class="button is-info is-small" 
                        :href="'/list/pastores/'+data.id+'/informes/distrito/'+data.pastor.distrito.id" >
                            Click aquí
                        </a>
                    </div>
                </article>
                <h3 class="subtitle m-t-lg">Informes del mes</h3>
                <h6 class="title is-6">por iglesia</h6>
                <tabla-informes 
                    :id_pastor="id_pastor"
                    :id_distrito="data.pastor.distrito.id" :mes="mes">
                </tabla-informes>
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
            }
        },
        props: {
            id_pastor: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
