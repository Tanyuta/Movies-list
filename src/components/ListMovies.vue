<template>
    <div>
        <div v-show="loaded" class="loader"></div>
        <h1>Movies list</h1>
        <ul>
            <li v-for="(item, i) in items" :key="i" @click="showDetaisMovie(item)">
                <img :src="imageUrl + item.poster_path" alt="">
                <h5 class="pt-3">{{ item.original_title }}</h5>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ListMovies',
        data() {
            return {
                items: [],
                currentPage: 1,
                totalPages: 1,
                baseUrl: 'https://api.themoviedb.org/3',
                apiKey: '9c0bb3e4f21289191ff35377e8ef2757',
                imageUrl: 'https://image.tmdb.org/t/p/w342',
                loaded: true
            }
        },
        mounted() {
            this.getData();
            this.scroll();
        },
        methods: {
    
            getData() {
                if (this.currentPage > this.totalPages) {
                    return;
                } else {
                    axios.get(this.baseUrl + '/discover/movie?api_key=' + this.apiKey + '&sort_by=popularity.desc' + '&page=' + this.currentPage)
                        .then(response => {
                            this.totalPages = response.data.total_pages;
                            response.data.results.forEach(element => {
                                this.items.push(element);
                            });
                            this.loaded = false;
                        })
                        .catch(error => {
                            throw new Error(error);
                        });
                }
            },
            showDetaisMovie(movie) {
                localStorage.setItem('movie', JSON.stringify(movie));
                this.$router.push('/details');
            },
            scroll() {
                window.onscroll = () => {
                    let manualOffset = 10
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= (document.documentElement.offsetHeight - manualOffset);
                    if (bottomOfWindow) {
                        if (this.currentPage <= this.totalPages) {
                            this.loaded = true;
                            this.currentPage += 1;
                            this.getData();
                        }
                    }
                };
            },
        }
    }
</script>

<style scoped lang="scss">
    ul {
        li {
            display: inline-block;
            vertical-align: top;
            width: 25vw;
            position: relative;
            overflow: hidden;
            margin: 10px;
            &:hover {
                section {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
                img {
                    transform: scale(0.9);
                }
            }
            img {
                width: 100%;
                height: auto;
                display: block;
                transform: scale(1);
                transition: transform 350ms ease-in-out;
            }
        }
    }
    
    section {
        position: absolute;
        bottom: 0;
        background: rgba(white, 0.9);
        padding: 20px;
        overflow: hidden;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        opacity: 0;
        transform: translate3d(0, 10%, 0);
        transition: opacity 350ms ease-in-out 150ms, transform 350ms ease-in-out 150ms;
        h3 {
            margin-bottom: 10px;
            font-size: 18px;
        }
        p {
            line-height: 1.4;
            font-size: 15px;
        }
    }
</style>
