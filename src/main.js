// funcion para llamar a las peliculas en tendencia de dia a dia
const API_BASE = "https://api.themoviedb.org/3"
const END_POINT_TRENDING_DAY = "/trending/movie/day"

async function getTrendingMoviesPreview() {
    const response = await fetch(`${API_BASE}${END_POINT_TRENDING_DAY}?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);

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
getTrendingMoviesPreview();