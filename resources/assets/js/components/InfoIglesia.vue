<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="iglesia.id">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Informe Coparativo</a></li>
        </ul>
    </nav>
    <div v-show="!iglesia">
        cargando...
    </div>
    <div class="card">
        <div class="card-content" v-if="iglesia">
            <section class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title"><i class="fas fa-place-of-worship"></i> Iglesia {{iglesia.nombre}}</h1>
                        <h2 class="subtitle">Pastor {{iglesia.pastor.user.name}} {{iglesia.pastor.user.last_name}}
                        </h2>
                    </div>
                </div>
            </section>
            <article class="message is-info">
                <div class="message-body">
                    Este reporte muestra el <strong>Importe Acomulado Anual</strong> y 
                    lo compara con el año anterior, categorizado por remesa. 
                </div>
            </article>
            <div class="content" v-if="iglesia">
                <b-field grouped position="is-right">
                    <b-field label="Selecciona Remesa" class="m-t-md m-b-sm">
                    <b-select placeholder="Select a name" v-model="id_remesa" size="is-medium" :loading="loadingChart">
                        <option v-for="remesa in remesas" :value="remesa.id" :key="remesa.nombre">
                            {{ remesa.nombre }}
                        </option>
                    </b-select>
                    </b-field>
                </b-field>
                <chart-compara 
                @loading="compLoading"
                v-if="remesas.length > 0" 
                :id_iglesia="iglesia.id" 
                :id_remesa="id_remesa"></chart-compara>
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
                remesas: [],
                iglesia: '',
                id_remesa: '',
                loading: false,
                loadingChart: false
            }
        },
        methods: {
            getIglesia(){
                this.loading = true
                this.$http.get(`http://local.mayordomia.nicosli.com/api/details/iglesia/${this.id_iglesia}`)
				.then(( {data} ) => {
                    this.iglesia = data.results
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
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/remesas`)
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
            id_iglesia: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.getIglesia()
        }
    }
</script>
