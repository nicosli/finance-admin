<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="data.id">
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/list/pastores">Lista Pastores</a></li>
            <li><a :href="'/list/pastores/'+data.id">Pastor {{data.name}}</a></li>
            <li class="is-active"><a href="#" aria-current="page">Distrito {{data.pastor.distrito.nombre}}</a></li>
        </ul>
    </nav>
    <div v-show="!data.pastor">
        cargando...
    </div>
    <div class="card">
        <div class="card-content" v-if="data.pastor">
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title"><i class="fas fa-landmark"></i> Distrito {{data.pastor.distrito.nombre}}</h1>
                        <h2 class="subtitle">Pastor {{data.name}} {{data.last_name}}
                        </h2>
                    </div>
                </div>
            </section>
            <article class="message is-primary">
                <div class="message-body">
                    Este módulo muestra el <strong>acoumlado anual del distrito </strong>
                    categorizado por remesa. Para poder visualizar otra categoría, click en "Selecciona Remesa"
                </div>
            </article>
            <div class="content" v-if="data.pastor">
                <b-field grouped position="is-right">
                    <b-field label="Selecciona Remesa" class="m-t-md m-b-sm">
                    <b-select placeholder="Select a name" v-model="id_remesa" size="is-medium" :loading="loadingChart">
                        <option v-for="remesa in remesas" :value="remesa.id" :key="remesa.nombre">
                            {{ remesa.nombre }}
                        </option>
                    </b-select>
                    </b-field>
                </b-field>
                
                <tabla-remesa v-if="data.pastor" 
                @loading="compLoading"
                :id_distrito="data.pastor.distrito.id" 
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
                data: [],
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
                this.$http.get(`http://local.mayordomia.nicosli.com/api/list/pastores/${this.id_pastor}`)
				.then(( {data} ) => {
                    this.data = data.results
                    data.results.pastor.distrito.iglesias.forEach((item) => {
						if(this.id_iglesia == item.id)
                            this.iglesia = item
                    })
					this.loading = false
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
            id_pastor: {required:true},
            id_distrito: {required:true},
            mes: {required:true}
        },
        mounted() {
            this.loadAsyncData()
            this.loadRemesas()
        }
    }
</script>
