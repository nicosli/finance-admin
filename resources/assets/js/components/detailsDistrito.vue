<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active" v-if="data.pastor"><a href="#" aria-current="page">
            Distrito {{data.nombre}}</a></li>
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
                        <h1 class="title"><i class="fas fa-user-tie"></i> Distrito {{data.nombre}}</h1>
                        <h2 class="subtitle">Pastor {{data.pastor.user.name}} {{data.pastor.user.last_name}}</h2>
                    </div>
                </div>
            </section>
            <div class="content">
                <article class="message is-info">
                    <div class="message-body">
                        Para ver el informe acomlado del Distrito
                        <strong>{{data.nombre}}</strong>
                        <a class="button is-info is-small" 
                        :href="'/informes/distrito/'+data.id" >
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
                    :id_pastor="data.pastor.user.id"
                    :id_distrito="data.id" :mes="mes">
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
                this.$http.get(`http://local.mayordomia.nicosli.com/api/details/distrito/${this.id_distrito}`)
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
            id_distrito: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
