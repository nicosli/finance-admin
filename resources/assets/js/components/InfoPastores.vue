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
                        <div class="media">
                            <div class="media-left m-r-sm">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="'https://i.pravatar.cc/150?u='+data.email">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{data.name}} {{data.last_name}}</p>
                                <p class="subtitle is-6">Distrito {{data.pastor.distrito.nombre}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="content" v-if="data.pastor">
                <article class="message is-info">
                    <div class="message-body">
                        Para ver el informe acomlado del Distrito
                        <strong>{{data.pastor.distrito.nombre}}</strong>
                        <a class="button is-info is-small" 
                        :href="'/list/pastores/'+data.id+'/informes/distrito/'+data.pastor.distrito.id" >
                            Click aquí
                        </a>
                    </div>
                </article>
                <h3 class="subtitle m-t-lg">Informes del mes</h3>
                <h6 class="title is-6 m-b-md">por iglesia</h6>
                <p>
                    <i class="far fa-lightbulb"></i>
                    Para ver el informe acomlado por iglesia, click sobre el nombre
                </p>
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
                this.loading = true
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
