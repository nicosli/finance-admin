<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active" v-if="data.pastor"><a href="#" aria-current="page">
            Informe Mensual</a></li>
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
                        Este módulo muestra el <strong>Informe Mensual de Remesas</strong>
                        del distrito.
                    </div>
                </article>
                <div class="columns is-vcentered m-t-md m-b-md">
                    <div class="column is-9-widescreen">
                        <h3 class="subtitle">Informes {{dateReporte}}</h3>
                        <h6 class="title is-6 m-b-sm">por iglesia</h6>
                        <p>
                            <i class="far fa-lightbulb"></i>
                            Para ver el informe acomlado por iglesia, click sobre el nombre
                        </p>
                    </div>
                    <div class="column is-3-widescreen">
                        <template>
                            <b-field label="Seleccionar Mes">
                                <b-datepicker
                                    type="month"
                                    v-model="monthPicker"
                                    placeholder="Clic para seleccionar..."
                                    icon-pack="fas"
                                    icon="calendar-alt">
                                </b-datepicker>
                            </b-field>
                        </template>
                    </div>
                </div>
                <tabla-informes 
                    @dateReport="printDateReport"
                    :id_pastor="data.pastor.user.id"
                    :id_distrito="data.id" :mes="mes" :anio="anio">
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
                mes: new Date().getMonth(),
                anio: new Date().getFullYear(),
                monthPicker: new Date(),
                dateReporte: ''
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
            },
            printDateReport(val){
                this.dateReporte = val
            }
        },
        watch: {
            monthPicker: function(val){
                this.dateReporte = ''
                this.mes = val.getMonth() + 1
                this.anio = val.getFullYear()
            }
        },
        props: {
            id_distrito: {required:true}
        },
        mounted() {
            this.mes = (this.mes == 0)? 1 : this.mes
            this.monthPicker.setMonth(this.mes-1)
            this.loadAsyncData()
        }
    }
</script>
