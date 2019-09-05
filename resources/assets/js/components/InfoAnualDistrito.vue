<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="distrito.id">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Informe Anual</a></li>
        </ul>
    </nav>
    <div v-if="!distrito">
        cargando...
    </div>
    <div class="card" v-if="distrito.id && remesas.length > 0">
        <div class="card-content">
            <section class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title"><i class="fas fa-landmark"></i> Distrito {{distrito.nombre}}</h1>
                        <h2 class="subtitle">Pastor {{distrito.pastor.user.name}} {{distrito.pastor.user.last_name}}
                        </h2>
                    </div>
                </div>
            </section>
            <article class="message is-info">
                <div class="message-body">
                    Este módulo muestra el <strong>Importe Acomulado o Mensual del Distrito </strong>
                    categorizado por remesa.
                </div>
            </article>
            <div class="content">
                <b-field grouped position="is-right">
                    <div class="control">
                        <b-field label="Seleccionar Mes">
                            <b-datepicker
                                type="month"
                                v-model="monthPicker" 
                                placeholder="Clic para seleccionar..."
                                icon-pack="fas"
                                icon="calendar-alt">
                            </b-datepicker>
                        </b-field>
                    </div>
                    <div class="control">
                        <b-field label="Selecciona Remesa">
                            <b-select placeholder="Select a name" 
                                v-model="id_remesa"
                                :loading="loadingChart">
                                <option v-for="remesa in remesas" :value="remesa.id" :key="remesa.nombre">
                                    {{ remesa.nombre }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>
                    <div class="control">
                        <b-field label="Tipo Reporte">
                            <b-select placeholder="Select tipo" 
                                v-model="tipo_reporte"
                                :loading="loadingChart">
                                <option value="1">Acomulado</option>
                                <option value="2">Mensual</option>
                            </b-select>
                        </b-field>
                    </div>
                </b-field>

                <tabla-remesa 
                @loading="compLoading"
                :mes="mes"
                :anio="anio"
                :tipo_reporte="tipo_reporte"
                :id_distrito="distrito.id" 
                :id_remesa="id_remesa"></tabla-remesa>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                distrito: [],
                remesas: [],
                iglesia: '',
                id_remesa: '',
                loading: false,
                loadingChart: false,
                mes: new Date().getMonth()+1,
                anio: new Date().getFullYear(),
                monthPicker: new Date(),
                tipo_reporte: 2
            }
        },
        methods: {
            loadAsyncData() {
                this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/details/distrito/${this.id_distrito}`)
				.then(( {data} ) => {
                    this.distrito = data.results
					this.loading = false
                    this.loadRemesas()
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            loadRemesas() {
                this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/list/remesas`)
				.then(( {data} ) => {
                    this.remesas = data.results
                    this.id_remesa = this.remesas[0].id
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
            compLoading(val){
                this.loadingChart = val
            }
        },
        watch: {
            monthPicker: function(val){
                this.mes = val.getMonth() + 1
                this.anio = val.getFullYear()
            }
        },
        props: {
            id_distrito: {required:true}
        },
        mounted() {
            this.monthPicker.setMonth(this.monthPicker.getMonth()-1)
            console.log(this.monthPicker.getMonth())
            this.loadAsyncData()
        }
    }
</script>
