<template>
<div>
	<div v-show="loading">
        cargando...
    </div>
    <main class="column" v-show="!loading">
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
                  <div class="title is-5 has-text-centered">{{dashboard.pastores}}</div>
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
                  <div class="title is-5 has-text-centered">{{dashboard.iglesias}}</div>
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
                  <div class="title is-5 has-text-centered">{{dashboard.distritos}}</div>
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
                <div class="">
                  <div class="heading has-text-centered">Diezmos</div>
                  <div class="title is-5 has-text-centered">${{dashboard.diezmos | formatNumber}}</div>
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
                  <div class="heading has-text-centered">Plan de Desarrollo</div>
                  <div class="title is-5 has-text-centered">${{dashboard.planDesarrollo | formatNumber}}</div>
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
                  <div class="title is-5 has-text-centered">${{dashboard.ofrendasMisioneras | formatNumber}}</div>
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
			}
        },
		filters: {
            formatNumber(value){
                let val = (value/1).toFixed(0).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
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