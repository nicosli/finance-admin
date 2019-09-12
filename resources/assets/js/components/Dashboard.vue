<template>
<div>
	<div class="column">
		<div class="">
			Dashboard
		</div>
	</div>
	<div class="column p-t-none">
		<div class="level">
			<div class="level-left">
				<div class="title">
					<div class="is-size-4">Depto. De Mayordomía</div>
					<div class="">{{empresa}}</div>
				</div>
			</div>
			<div class="level-right">
				<b-field>
					<b-datepicker
						type="month"
						v-model="monthPicker" 
						placeholder="Clic para seleccionar..."
						icon-pack="fas"
						icon="calendar-alt">
					</b-datepicker>
				</b-field>
			</div>
		</div>
	</div>
	<div class="column p-b-none">
		<div class="tags has-addons">
			<span class="tag">Mes</span>
			<span class="tag is-info">{{getMontName(mes)}} {{anio}}</span>
		</div>
	</div>
    <main class="column" >
		<div class="column p-b-none" v-show="loading">
			<b-loading :active.sync="loading">
				<b-icon
					pack="fas"
					icon="spinner"
					size="is-large"
					custom-class="fa-spin">
				</b-icon>
			</b-loading>
		</div>
      <div class="columns is-multiline">
        <div class="column">
          <div class="box">
            <article class="message is-primary">
                <div class="message-body">
                    Resumen de <strong>Pastores e Iglesias</strong>
                </div>
            </article>
            <div class="level">
              <div class="level-item">
                <div class="">
                  <div class="heading has-text-centered">Total pastores</div>
                  <div class="title is-size-4 has-text-centered">{{dashboard.pastores}}</div>
                  <div class="has-text-centered m-t-sm">
                    <a class="has-text-link" href="list/pastores">
                        <span class="icon m-l-none">
                            <i class="fas fa-angle-right"></i>
                        </span>
                        Ver tabla
                    </a>
                  </div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading has-text-centered">Total Iglesias</div>
                  <div class="title is-size-4 has-text-centered">{{dashboard.iglesias}}</div>
                  <div class="has-text-centered m-t-sm">
                    <a class="has-text-link" href="list/iglesias">
                        <span class="icon m-l-none">
                            <i class="fas fa-angle-right"></i>
                        </span>
                        Ver tabla
                    </a>
                  </div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading has-text-centered">Total Distritos</div>
                  <div class="title is-size-4 has-text-centered">{{dashboard.distritos}}</div>
                  <div class="has-text-centered m-t-sm">
                    <a class="has-text-link" href="list/distritos">
                        <span class="icon m-l-none">
                            <i class="fas fa-angle-right"></i>
                        </span>
                        Ver tabla
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <article class="message is-info">
                <div class="message-body">
                    Resumen de <strong>Diezmos y Ofrendas</strong>
                </div>
            </article>
            <div class="level">
              <div class="level-item">
                <div class="" v-if="dashboard.diezmos">
                  <div class="heading has-text-centered">Diezmos</div>
                  <div class="title is-size-4 has-text-centered">${{dashboard.diezmos.informes.anio | formatNumber}}</div>
                  <div class="has-text-centered m-t-sm">
                    <b-tooltip 
                        type="is-info"
                        position="is-left"
                        :label="dashboard.diezmos.informes.anio_anterior | formatNumber">
                        <span style="font-size:14px">
                            <b-icon
                                pack="fas"
                                :icon="dashboard.diezmos.informes.icon"
                                :type="dashboard.diezmos.informes.type"
                                size="is-small">
                            </b-icon>
                            {{dashboard.diezmos.informes.porc | formatNumber}}%
                        </span>
                    </b-tooltip>
                  </div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading has-text-centered">Plan de Desarrollo</div>
                  <div class="title is-size-4 has-text-centered">${{dashboard.planDesarrollo | formatNumber}}</div>
                  <div class="has-text-centered m-t-sm">
                    <b-tooltip 
                        type="is-info"
                        label="pendiente">
                        <span style="font-size:14px">
                            <b-icon
                                pack="fas"
                                icon="caret-up"
                                type="is-success"
                                size="is-small">
                            </b-icon>
                            +0%
                        </span>
                    </b-tooltip>
                  </div>
                </div>
              </div>
              <div class="level-item">
                <div class="">
                  <div class="heading has-text-centered">Ofrenda Misionera</div>
                  <div class="title is-size-4 has-text-centered">${{dashboard.ofrendasMisioneras | formatNumber}}</div>
                  <div class="has-text-centered m-t-sm">
                    <b-tooltip 
                        type="is-info"
                        label="pendiente">
                        <span style="font-size:14px">
                            <b-icon
                                pack="fas"
                                icon="caret-up"
                                type="is-success"
                                size="is-small">
                            </b-icon>
                            +0%
                        </span>
                    </b-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
</div>
</template>

<script>
    export default {
        data() {
            return {
                dashboard: [],
				loading: false,
				mes:'',
				mes: new Date().getMonth()+1,
				anio: new Date().getFullYear(),
				monthPicker: new Date()
            }
        },
        methods: {
			dataDashboard(){
				this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/dashboard/${this.mes}/${this.anio}`)
				.then(( {data} ) => {
					this.dashboard = data.results
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
			},
			getMontName(mes){
				mes--
				const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
					"Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
				];
				return monthNames[mes]
			}
        },
		filters: {
            formatNumber(value){
				if(value != null || value == 0){
					let val = (value/1).toFixed(0).replace(',', '')
                	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
				}else{
					return 0
				}
            }
		},
		watch: {
            monthPicker: function(val){
                this.mes = val.getMonth() + 1
				this.anio = val.getFullYear()
				this.dataDashboard()
            }
        },
		props:{
			empresa: {required:true}
		},
        mounted() {
			this.dataDashboard()
        }
    }
</script>

<style>
    .icon{
        width: 10px;
    }
</style>