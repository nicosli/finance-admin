<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">
            Informe pdocd</a></li>
        </ul>
    </nav>
    <div v-show="!data.pastor">
        cargando...
    </div>
    <div class="card">
        <div class="card-content">
            <section class="hero is-info">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                        <i class="fas fa-chart-line"></i> PDOCD</h1>
                        <h2 class="subtitle">Porcentaje de Diferencia
                        de Ofrendas en Comparación con el Diezmo</h2>
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
                <apexchart type=bar height=350 :options="options" :series="series" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                data: [],
                
            }
        },
        methods: {
            loadChart() {
                // this.loading = true
                // this.$http.get(`http://local.mayordomia.nicosli.com/api/reports/comparative/byChurch/${this.id_iglesia}/${this.id_remesa}`)
				// .then(( {data} ) => {
				// 	this.loading = false
                    
				// })
				// .catch((error) => {
				// 	this.loading = false
				// 	throw error
				// })
            },
        },
        filters: {
            formatNumber(value){
                let val = (value/1).toFixed(2).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        },
        watch: {
            
        },
        props: {
            id_iglesia: {required:true}
        },
        mounted() {
            this.loadChart()
        }
    }
</script>
