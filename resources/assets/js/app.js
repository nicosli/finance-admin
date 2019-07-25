
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
    'tabla-iglesias',
    require('./components/TablaIglesias.vue')
);
Vue.component(
    'tabla-distritos',
    require('./components/TablaDistritos.vue')
);

Vue.component(
    'details-distrito',
    require('./components/detailsDistrito.vue')
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
    request.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhZTc4MTgzMGViNzQ0YWFhMDBlZGNjMTI2MDNiN2UxODVjOTk0ZjVkNmQzZDhlMTc2N2Q1MjY3ZGQxMGNmYzdjYmFmYjZlMmMyZTdkNWRhIn0.eyJhdWQiOiIxIiwianRpIjoiZWFlNzgxODMwZWI3NDRhYWEwMGVkY2MxMjYwM2I3ZTE4NWM5OTRmNWQ2ZDNkOGUxNzY3ZDUyNjdkZDEwY2ZjN2NiYWZiNmUyYzJlN2Q1ZGEiLCJpYXQiOjE1NjI5NjM1MzksIm5iZiI6MTU2Mjk2MzUzOSwiZXhwIjoxNTk0NTg1OTM5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.XQfllrJAqLy4U3Y7M7IMd5wo87KCCiVmRZHRpmtvPN_8uovCulGlqHVvBXYuyhfUqd4Dy0kvu199vRqslhE1o-UxO9Qoo0M-7VteD8VjZeJAKBDkH1ONw2hqnxbg-ySROKS4XmcUfHKjc24zpubkIaxfhhslvlZ1H-kZ0OmhaTzmOHYcGgePQbrmfM27A_A447J4kBhPFsBRc3JqrbYpNHAKUerIVfpIrNOoXoHC4YzK4tBbfdviEK0wjLPMrYULe0dzQb67ajuaCIDp07ToBTGqRPfbT47qVfDVMZjx-CbZ8KkJ9FHaFz1V3U_mbF0z_Naxf4gbt5IjcLNhvKlgGaaud1kcQa4vmIC-kMztNAhNQaP8XxkSntNRMY0JJJWAYJsS_f8s3mzk6EJhU-yCdZ0QKXF8CwVRfyhqDFNTFuGwxJElOz-Yiv5aqueXrs6XvyHXcI9f9Ix8_k0DKrYIMnmo4oezuNWgyjeQ7L3nvFzmTWpalQX7iNZ0-QneI2WYt7Z8WiC_6D7LqXUmvWQsX5d0o3lejrf_ZGxaLsnFoE_GfppbuPBAR1NzanyajrOmjaWBtb2gijv9Op-n-GRLwckb7Qlzf7XfkeLwTMxI1xgD7X1jrG5qVA-HIwtA1WAoVmCJ0O9bD74Z53pnwQ8f6BsB2LVbRs-NH65HGoyWKMg')
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
