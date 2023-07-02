// funcion para llamar a las peliculas en tendencia de dia a dia
const API_BASE = "https://api.themoviedb.org/3";
const END_POINT_TRENDING_DAY = "/trending/movie/day";
const GENRE_END_POINT = "/genre/movie/list";
const MOVIES_BY_CATEGORIES_END_POINT = "/discover/movie";
const SEARCH_MOVIES = "/search/movie";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": `${API_KEY}`,
    },
});

//Utils ó Helpers --- funciones para no repetir codigo

function createMovies (arraysOfMovies, aContainer) {

    aContainer.innerHTML = "";
    const moviesArray = [];

    arraysOfMovies.forEach(arrayOfMovie => {
    
        const articleContainer = document.createElement("article");
        articleContainer.classList.add = "trending-movies-article-container";

        const MoviePoster = document.createElement("img");
        const urlMoviePoster = arrayOfMovie.poster_path;
        const MovieId = arrayOfMovie.id;
        MoviePoster.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${urlMoviePoster}`
        MoviePoster.classList.add = "movie-poster movie-image";
        MoviePoster.alt = MovieId;

        const MovieTitle = document.createElement("h2");
        MovieTitle.textContent = arrayOfMovie.title;

        const MovieVoteAverage = document.createElement("h3");
        MovieVoteAverage.textContent = arrayOfMovie.vote_average;

        articleContainer.appendChild(MoviePoster);
        articleContainer.appendChild(MovieTitle);
        articleContainer.appendChild(MovieVoteAverage);

        moviesArray.push(articleContainer);
    }); 

    aContainer.append(...moviesArray);
}


// Llamados a la API

async function getTrendingMoviesPreview() {
    const { data } = await api(`${END_POINT_TRENDING_DAY}`);
    const trendingMoviess = data.results;

    createMovies(trendingMoviess, trendingMoviePreviewList);

}

async function getCategoriesMoviesPreview() {

    const { data } = await api(`${GENRE_END_POINT}`);

    const categoriesPreviewList = document.querySelector(".categories-type-container");
    const categoriesTypes = [];

    data.genres.forEach(dataOfGenresMovies => {
        categoriesPreviewList.innerHTML = ""; // limpia cada vez

        const articleOfCategoriesMovies = document.createElement("article");

        const categoryType = document.createElement("h3");
        categoryType.textContent = dataOfGenresMovies.name;
        categoryType.addEventListener("click", ()=> {
            location.hash = `#category=${dataOfGenresMovies.id}-${dataOfGenresMovies.name}`});

        articleOfCategoriesMovies.appendChild(categoryType);

        categoriesTypes.push(articleOfCategoriesMovies);
    }); 

    categoriesPreviewList.append(...categoriesTypes)

}

async function getMoviesByCategory(id) {
    const { data } = await api(`${MOVIES_BY_CATEGORIES_END_POINT}`, { // se pasa un segundo parametro gracias a axios y segun la documentacion de la api, que necesita el with_genres, y este a su vez necesita el id de la categoria
        params: {
            with_genres: id,
        },

    });

    createMovies(data.results, genericSection);
    
}

async function getMoviesBySearch(query) {
    const { data } = await api(`${SEARCH_MOVIES}`, { // se pasa un segundo parametro gracias a axios y segun la documentacion de la api, necesita un parametro que se llame query.
        params: {
            query,
        },

    });

    createMovies(data.results, genericSection);
    
}