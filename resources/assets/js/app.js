
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');
import Buefy from 'buefy'

Vue.component(
    'tabla-pastores',
    require('./components/TablaPastores.vue')
);

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})

Vue.use(require('vue-resource'));
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIyMmZlN2U4OGQwM2M5YTExMThjYmE5MGMwNDYwYzJhOTAzZmE5ZmQ5ZTMyZmJmZjU0MzlkNzJmMzQ3OThkNTQwODgyYWNjZmJkYTNkNTFhIn0.eyJhdWQiOiIxIiwianRpIjoiYjIyZmU3ZTg4ZDAzYzlhMTExOGNiYTkwYzA0NjBjMmE5MDNmYTlmZDllMzJmYmZmNTQzOWQ3MmYzNDc5OGQ1NDA4ODJhY2NmYmRhM2Q1MWEiLCJpYXQiOjE1NjIyNTg5ODMsIm5iZiI6MTU2MjI1ODk4MywiZXhwIjoxNTkzODgxMzgzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.K_-CFs84-01UY0jjdeBRy7RxYvZaJtizCRjWYkSCEgNZbJsbkcMfq4Lv3N9Zvg7M8JJqB1qAR9c2FqvltrG7zwJycgKMpAUKJ8JpNP5sEcAjsaP-F9Nr6PA-7baLfaW7y14zdOpoxztij4aqB7OETUtAgZN5M3Q7MIlvasIAqnoxhTcUUFV0AV87-tZH2VNNKQnD6KOffTxNj2cmmqdnkIVm03ZbN9saRUJL9IMVdKsGwA_RY27rvw4vq7u-ZkSl6vzaV7777dnvYh0SJP7kTjB33tX5tNMQSNeT893Zh2_qq0BPGq7C5k6UtFG33j0XvVR67RO2PzJsgTmdXoPO6oPK0wWVC_kzAQksXEmaaBlEOruGJeuCgceVdy6VD2u8AVqDGVtNjALgJVsr1It5d1r4h72Ca7BOZQfZDk0KWcgFGuCdaywtYjiqDRe9UPn1bSSFw3JZCW0x_nGGJH24w1oK_5MDpRyO3i3dg3j5soJTMqNaTmWT5nR1K5K-nzP5G14VSh4lji5Lsxzp1SSFAdpHs9Hh4CptPzJ1IfCsZq1No0aDeSqfF8mO_lshyd4MJBkUJqWL6ARsTKHmhf_X5lIHqAnRprsYfGetVFq6kNOuujg1HwFWG_BbRwOroQbDmCAEYI4B9QgtDLU1fHNpueLn301kjNf7up6YE4VOF-U')
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
