
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');
import Buefy from 'buefy'

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

Vue.component(
    'tabla-pastores',
    require('./components/TablaPastores.vue')
);

Vue.component(
    'info-pastores',
    require('./components/InfoPastores.vue')
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
    'info-distrito',
    require('./components/InfoDistrito.vue')
);

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})


Vue.use(require('vue-resource'));
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRhYmI4NGY0NGY0NjQyZjQ0NDI2NGQ2NzUzYTM2MzViMDFmYjQwZTIxZTZmYzViZDk4M2MyODE5ZWJkZjVmNTBmNmI4ODdkOWQ1ZWEwMzgyIn0.eyJhdWQiOiIxIiwianRpIjoiNGFiYjg0ZjQ0ZjQ2NDJmNDQ0MjY0ZDY3NTNhMzYzNWIwMWZiNDBlMjFlNmZjNWJkOTgzYzI4MTllYmRmNWY1MGY2Yjg4N2Q5ZDVlYTAzODIiLCJpYXQiOjE1NjI5NDMwNzQsIm5iZiI6MTU2Mjk0MzA3NCwiZXhwIjoxNTk0NTY1NDc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.FiS8mP0L_4SR-cbx1tPS3tryHy1_b7x66lEBDsi3G4K-WRRfKOnVcSCpK9uDGMr77kLNHtbfC5McUHz4VVRJTdDjjue1Sfon3mV0XvhvkVpyN5pHhq70r1hVOjFl2fDzjpsF7U05NgIN5ts3BZ60yFYjt4mzO0rq29YZUUSZWPbhEuz7OxnqShr0vvKgmB854bFcIpZ0acUy5nS0iQ5h9rjw83tfkNhe9QVyg_gKlPtNd8Y-unTvssPTt98y7MDgkVWBgxlejuB7KsoHG7YgVtLAooltVEAaNJq-LpoBuVpVGFC_Ayam5y92j4wmi65M5ei4lrK-QlDkE5Zrwj2WOyXQNN6sQAkVxVYr8vum6L2N6UQw1B9XfLg7M6CjF0g19OM_1JzwLST59z3WyXo2jIBNksCphMVarf55IGvgDZppKcPsHqjug4H72zpCpeEJP5Bt1tAzK2viiT_N6bKEhLWk9d7T9V-YEl02Cr3fqBoPHIFxjc8t15MBXWfOuPp1Ww5ycFTAejf91UoAjuU7bi3f84XszAkIyPBW0xuXkhv2quWoTBu778KEdwERMUSSa3fERugiHVOPZN6nLhvPSQw4YR1nzSJZhDU8pCd-Hl5Cfh_vY9c9p3rHdgpym8WH-KHDZTTBeuWy51MEktJ5S-R_iixW18Rn2jaSxO0ZN90')
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
