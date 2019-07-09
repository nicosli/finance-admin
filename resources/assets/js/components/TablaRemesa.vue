<template>
<div>
    <h3 class="subtitle m-t-lg">Tabla Remesa</h3>
    <h6 class="title is-6">año anterior</h6>
</div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false
            }
        },
        methods: {
            loadChart() {
                this.loading = true
                this.$emit('loading', true)
                this.$http.get(`http://local.mayordomia.nicosli.com/api/reports/comparative/${this.id_iglesia}/${this.id_remesa}`)
				.then(( {data} ) => {
					this.loading = false
                    this.$emit('loading', false)
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
            formateNumber(value){
                let val = (value/1).toFixed(2).replace(',', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
        },
        props: {
            id_distrito: {required:true},
            id_remesa: {required:true}
        },
        mounted() {
            
        }
    }
</script>
