
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');
import Buefy from 'buefy'

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

import { config } from './config';
Vue.prototype.appConfig = config

Vue.component(
    'tabla-pastores',
    require('./components/TablaPastores.vue')
);

Vue.component(
    'tabla-iglesias',
    require('./components/TablaIglesias.vue')
);
Vue.component(
    'tabla-distritos',
    require('./components/TablaDistritos.vue')
);

Vue.component(
    'informe-mensual-distrito',
    require('./components/InfoMensualDistrito.vue')
);

Vue.component(
    'info-iglesia',
    require('./components/InfoIglesia.vue')
);

Vue.component(
    'chart-compara',
    require('./components/ChartCompara.vue')
);

Vue.component(
    'tabla-informes',
    require('./components/TablaInformes.vue')
);

Vue.component(
    'tabla-remesa',
    require('./components/TablaRemesa.vue')
);

Vue.component(
    'info-anual-distrito',
    require('./components/InfoAnualDistrito.vue')
);

Vue.component(
    'info-pdocd',
    require('./components/InfoPdocd.vue')
);

Vue.component(
    'dashboard',
    require('./components/Dashboard.vue')
);

Vue.component(
    'reporte-nivelasociacion',
    require('./components/NivelAsociacion.vue')
);

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})


Vue.use(require('vue-resource'));
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', config.$token)
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    request.headers.set('Accept', 'application/json')
    next()
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app'
});
