<template>
    <div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                sortField: 'fechaFuente',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
				page: 1,
				perPage: 25,
            }
        },
        methods: {
            loadAsyncData() {

            }
        },
        mounted() {
            this.loadAsyncData()
        }
    }
</script>
