<template>
<div class="py-1">
    <div>
        <h1 class='py-3'>Description</h1>
    </div>
    <div class="row m-0">
        <div v-show="loaded" class="loader"></div>
        <div class="logo-movie col-md-4">
            <img :src="imageUrl + item.poster_path" alt="">
        </div>
        <div class="details col-md-8 text-left">
            <h3><b>Name:</b> {{ item.original_title }}</h3>
            <p><b>Description:</b> {{ item.overview }}</p>
            <p><b>Relese date:</b> {{ item.release_date }}</p>
            <p><b>Raiting:</b> {{ item.vote_average }}</p>
        </div>
    </div>

</div>
    
</template>

<script>
    export default {
        name: 'DetailsMovie',
        data() {
            return {
                item: {},
                imageUrl: 'https://image.tmdb.org/t/p/w342',
                loaded: true
            }
        },
        created() {
            this.item = JSON.parse(localStorage.getItem('movie'));
            console.log('DETAIL', this.item.poster_path);
            this.loaded = false;
        },
    }
</script>

<style scoped lang="scss">
        .logo-movie {
            display: inline-block;
            vertical-align: top;
            position: relative;
            overflow: hidden;
        }

        .details {
            text-align: left;
            padding: 20px;
            padding-right: 10%;
        }
    
</style>
