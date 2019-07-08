
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
    require('./components/Informes.vue')
);

Vue.use(Buefy, {
    defaultIconPack: 'fa'
})


Vue.use(require('vue-resource'));
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2NTU1MzMyYTliODZhNDcxZGQ2ODZkNThhOTYwMGY1NDFhNWYwYTAzMzEyNDlhNDhlNTFmY2NlYTYwYmEzNDg2Yjc3NzUzNjMxMDA1NzA2In0.eyJhdWQiOiIxIiwianRpIjoiODY1NTUzMzJhOWI4NmE0NzFkZDY4NmQ1OGE5NjAwZjU0MWE1ZjBhMDMzMTI0OWE0OGU1MWZjY2VhNjBiYTM0ODZiNzc3NTM2MzEwMDU3MDYiLCJpYXQiOjE1NjIyODA3NjksIm5iZiI6MTU2MjI4MDc2OSwiZXhwIjoxNTkzOTAzMTY5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ue2WCWV9pJ9qfN7LWtt2Qr6g_4McL0WUhU6NGuykYtWQxgbSqQ2lXJ6idZW4QGuSurvnro_L1anDvWVDv1Ah1yFxuNnduj0Z_d2CihuiUG098joeZAWJFVc7wim_CYw8H_jKtAy5822_wkPAU8abiqkYh85ZipNJmkocH9YMZhx0F04KdOXzDHrS-uNFgN0OFsN46edWWtrVP26kSjZmeu3c19ebqjZmV-yS3UH1ik74s8VRyrlNA8596AmWZ_qfYyHDk9kaPZv8avhcG0JpGc14yuyvBrK7djy1_JaLxS8gVtUU9UQ5hvrgJ5opRol_PKaqoureM6W8evVxRcgPrdhKkxBvHhMWZm-SeBMQCVNCbtUfhlLqMxB8ka5sxgaaLEoWVpQlCqjOX4l7kVwiW3kSw6-zCvUigcNvXwFCx1Y9fkYHWMyhtlTy_b2pFbVe1G3fjMQncFxy3FdazTAk3PNseGdv62x_lrkOBuo8gPl2fDg_csPYprE1cyfvt68vV5DJ8YSw-8-910oyI0TylmfJscQHPBQHo6jzr3eWQFAQdoqeeLs0jnY5Nm7GVKf5CBg0uCvpQuEyHAQHnMe01ipJoq_qzQdmvAdERm-7PavTRhXo66rNOVl4uhaC2VGD2DbA0_yjsEN7LIymtoCd27oADjP-1aePRktYEvTjaIM')
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
