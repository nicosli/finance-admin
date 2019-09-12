<template>
<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="/home">Home</a></li>
            <li class="is-active"><a href="#" aria-current="page">Informe Coparativo</a></li>
        </ul>
    </nav>
    <div>
        cargando...
    </div>
    <div class="card">
        
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                loading: false,
            }
        },
        methods: {
            getIglesia(){
                this.loading = true
                this.$http.get(
                    this.appConfig.$api_url +
                    `/api/details/iglesia/${this.id_iglesia}`)
				.then(( {data} ) => {
                    
				})
				.catch((error) => {
					this.loading = false
					throw error
				})
            },
        },
        props: {
            
        },
        mounted() {
            //this.getIglesia()
        }
    }
</script>
