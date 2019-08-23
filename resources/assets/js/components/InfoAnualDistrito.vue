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
                    Este módulo muestra el <strong>Acomulado Anual del Distrito </strong>
                    categorizado por remesa.
                </div>
            </article>
            <div class="content">
                <b-field grouped position="is-right">
                    <b-field label="Selecciona Remesa" class="m-t-md m-b-sm">
                    <b-select placeholder="Select a name" 
                        v-model="id_remesa" size="is-medium" 
                        :loading="loadingChart">
                        <option v-for="remesa in remesas" :value="remesa.id" :key="remesa.nombre">
                            {{ remesa.nombre }}
                        </option>
                    </b-select>
                    </b-field>
                </b-field>
                
                <tabla-remesa 
                @loading="compLoading"
                :mes="mes"
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
                loadingChart: false
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
        props: {
            id_distrito: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
