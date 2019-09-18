<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Informe Comparativo</a></li>
        </ul>
    </nav>
    <div class="card">
        <div class="card-content">
            <section class="hero is-dark">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title"><i class="fas fa-landmark"></i> Reporte Acumulado </h1>
                        <h2 class="subtitle"> 
                            {{empresa}}
                        </h2>
                    </div>
                </div>
            </section>
            <article class="message is-dark">
                <div class="message-body">
                    Este reporte muestra el <strong>Importe Acumulado o Mensual de todos los distritos </strong>
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
                                <option value="1">Acumulado</option>
                                <option value="2">Mensual</option>
                            </b-select>
                        </b-field>
                    </div>
                </b-field>
                <tabla-nivelDistrito
                    :id_remesa="id_remesa"
                    :mes="mes"
                    :anio="anio"
                    :tipo_reporte="tipo_reporte"
                ></tabla-nivelDistrito>
                <div v-show="loading">
                    cargando...
                </div>
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
                loading: false,
                tipo_reporte: 2,
                id_remesa: 1,
                mes: new Date().getMonth(),
                anio: new Date().getFullYear(),
                monthPicker: new Date(),
                loadingChart: false,
                remesas: [],
            }
        },
        methods: {
            loadRemesas() {
                this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/list/remesas`)
				.then(( {data} ) => {
                    this.loading = false
                    this.remesas = data.results
                    this.id_remesa = this.remesas[0].id
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            }
        },
        watch: {
            monthPicker: function(val){
                this.mes = val.getMonth() + 1
                this.anio = val.getFullYear()
            }
        },
        props: {
            empresa: {required:true}
        },
        mounted() {
            this.monthPicker.setMonth(this.monthPicker.getMonth()-1)
            this.loadRemesas()
        }
    }
</script>
