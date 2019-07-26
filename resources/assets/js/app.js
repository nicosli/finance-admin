
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

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})


Vue.use(require('vue-resource'));
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEwODE5MmI5OGIwZjE1ZTJjZTM0OTliMDkwYzc5ZjAwYmNlZWU0ZTg5YWQ1Zjc3NGYyZTQ1ODY2ZTI4YmJjNGM0YThlMTIwNTU1MzQwNTIwIn0.eyJhdWQiOiIxIiwianRpIjoiMTA4MTkyYjk4YjBmMTVlMmNlMzQ5OWIwOTBjNzlmMDBiY2VlZTRlODlhZDVmNzc0ZjJlNDU4NjZlMjhiYmM0YzRhOGUxMjA1NTUzNDA1MjAiLCJpYXQiOjE1NjQwODgwNzcsIm5iZiI6MTU2NDA4ODA3NywiZXhwIjoxNTk1NzEwNDc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Kg3XZUgcDRWJqHmZ3gerAJqpQkcNne6hrL_50godZWZs7ggu13vwTQNr3HBGm_sRBekbm9bomD4lvYssLB_6Wk8DWe8tK7BMzuegQ2TWqHNLeZxxVcZkQnZkEdTuQw-RELOvDIFiokozlAlpIALGWpqHZNGugBdOpF4M7qvBBhLE-bGnTiJ0olR3f1rQ7Go42hTeDJ6pmwAG5y3VHkhyg8iXmEC6S4oM5dgwNp3-_evcVKluvqYnzvr7H1_AWToTliHajm-aPj4i0cvgexgQLj8AqUo4UEL4HagbxWkSM2HXS-4wb8d15qYLzl5aPinHZ0TlsMc-LegYyrGE_uDsktms9q16EvxtVzCpczjAse3lHBfYrVh2DtjmCXvofg43PinFjZCEuJuIwO0R3zh7QSfJ-60OVv5cnjFetndNyGPl_eLcO8Xrr2py-xI0-GlOkz4GNBy6ur4aVqOoDD6BZek10xECFVq4emcCVaHk0il2QoUAoRAdQmmkQvxGQmNBAu6tcUsx3OL0EpTvkc1ldnQsTF-BKcKJiHI7Q5-ZVffVuAP9v8V-X1EeJC39AT7TeOXhsXh-eHKa1hq0hSZDUT3D2YylfgWSfigO4ndTUe9f2bHvPrX91XS3xzq6nLQlwpIUAx_WgVp0mF5QULGdL9Ikb5GCUbFIWnRrdzyK46o')
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
