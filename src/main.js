// funcion para llamar a las peliculas en tendencia de dia a dia
const API_BASE = "https://api.themoviedb.org/3";
const END_POINT_TRENDING_DAY = "/trending/movie/day";
const GENRE_END_POINT = "/genre/movie/list";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": `${API_KEY}`,
    },
});

async function getTrendingMoviesPreview() {
    const { data } = await api(`${END_POINT_TRENDING_DAY}`);


    const trendingMoviesContainer = document.querySelector(".trending-movie-poster-description-container");
    const trendingMovies = [];

    data.results.forEach(dataOfTrendingMovies => {
        const articleOfTrendinfMovies = document.createElement("article");
        articleOfTrendinfMovies.className = "trending-movies-article-container";

        const trendingMoviePoster = document.createElement("img");
        const urlTrendingMoviePoster = dataOfTrendingMovies.poster_path;
        const trendingMovieId = dataOfTrendingMovies.id;
        trendingMoviePoster.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${urlTrendingMoviePoster}`
        trendingMoviePoster.className = "movie-poster movie-image";
        trendingMoviePoster.alt = trendingMovieId;

        const trendingMovieTitle = document.createElement("h2");
        trendingMovieTitle.textContent = dataOfTrendingMovies.title;

        const trendingMovieVoteAverage = document.createElement("h3");
        trendingMovieVoteAverage.textContent = dataOfTrendingMovies.vote_average;

        articleOfTrendinfMovies.appendChild(trendingMoviePoster);
        articleOfTrendinfMovies.appendChild(trendingMovieTitle);
        articleOfTrendinfMovies.appendChild(trendingMovieVoteAverage);

        trendingMovies.push(articleOfTrendinfMovies);
    }); 

    trendingMoviesContainer.append(...trendingMovies)

}

async function getCategoriesMoviesPrevie() {
    const { data } = await api(`${GENRE_END_POINT}`);


    const categoriesMoviesContainer = document.querySelector(".categories-type-container");
    const categoriesTypes = [];

    data.genres.forEach(dataOfGenresMovies => {
        const articleOfCategoriesMovies = document.createElement("article");
        // articleOfTrendinfMovies.className = "trending-movies-article-container";

        const categoryType = document.createElement("h3");
        categoryType.textContent = dataOfGenresMovies.name;

        articleOfCategoriesMovies.appendChild(categoryType);

        categoriesTypes.push(articleOfCategoriesMovies);
    }); 

    categoriesMoviesContainer.append(...categoriesTypes)

}

