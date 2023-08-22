//import { registerImages } from "./lazy"; Don't know why don´t work importing from another file

const API_BASE = "https://api.themoviedb.org/3";
const END_POINT_TRENDING_DAY = "/trending/movie/day";
const GENRE_END_POINT = "/genre/movie/list";
const MOVIES_BY_CATEGORIES_END_POINT = "/discover/movie";
const SEARCH_MOVIES = "/search/movie";
const MOVIE_DETAILS = "/movie/";
const RELATE_MOVIES = "/recommendations";

//These are functions  are helpers for data /////

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers:{
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": `${API_KEY}`,
    },
});


function likedMoviesList () {
    const item = JSON.parse(localStorage.getItem("liked_movies"));
    let arrayOfMovie;

    if (item) {
        arrayOfMovie = item;
    } else{
        arrayOfMovie = {};
    }
    return arrayOfMovie;
}

function likeOrunlike(arrayOfMovie) {
    const likedMovies = likedMoviesList();
    if (likedMovies[arrayOfMovie.id]) {
        likedMovies[arrayOfMovie.id] = undefined;
    } else {
        likedMovies[arrayOfMovie.id] = arrayOfMovie;
    }

    localStorage.setItem("liked_movies",JSON.stringify(likedMovies));

}

// These two functions are helpers //////////////////////

function createMovies (arraysOfMovies, aContainer, { observed = false, clean = true } = {}){
    
    if (clean) {
        aContainer.innerHTML = "";
    };

    const moviesHelperArray = [];

    arraysOfMovies.forEach(arrayOfMovie => {
    
        const articleContainer = document.createElement("article");
        const moviePoster = document.createElement("img");
        const urlMoviePoster = arrayOfMovie.poster_path;
        //console.log(urlMoviePoster);

        //moviePoster.setAttribute("data-img", `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${urlMoviePoster}`);
        if (observed) {
            moviePoster.dataset.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${urlMoviePoster}`;
        } else {
            moviePoster.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${urlMoviePoster}`;
        }

        const movieId = arrayOfMovie.id;
        moviePoster.className = "movie-poster";
        moviePoster.alt = arrayOfMovie.title;
        moviePoster.addEventListener("click", () => {
            location.hash = `#movie=${movieId}`;
        })

        if (urlMoviePoster === null) {
            moviePoster.src = "https://images.pexels.com/photos/4271933/pexels-photo-4271933.jpeg?auto=compress&cs=tinysrgb&w=1600";
        }
        //other option to catch the images that don't charge:
        // moviePoster.addEventListener("error", () => {
        //     moviePoster.setAttribute("src", "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1600" )
        // });

        const likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("liked-unliked-button");
            likeOrunlike(arrayOfMovie);
        })


        if (observed) {
            observer.observe(moviePoster);
            //registerImages(moviePoster);
        };


        const movieTitle = document.createElement("h2");
        movieTitle.textContent = arrayOfMovie.title;
        movieTitle.className = "movie-title";

        const movieVoteAverage = document.createElement("h3");
        movieVoteAverage.textContent = `Rating: ${arrayOfMovie.vote_average}`;
        movieVoteAverage.className ="movie-rating";

        articleContainer.appendChild(moviePoster);
        articleContainer.appendChild(movieTitle);
        articleContainer.appendChild(movieVoteAverage);
        articleContainer.appendChild(likeButton);

        moviesHelperArray.push(articleContainer);
    }); 

    aContainer.append(...moviesHelperArray);
}

function createCategories (categories, aContainer) {

    aContainer.innerHTML = "";
    const categoriesTypes = [];

    categories.forEach(dataOfGenresMovies => {

        const articleOfCategoriesMovies = document.createElement("article");
        const categoryType = document.createElement("h3");
        categoryType.textContent = dataOfGenresMovies.name;
        categoryType.addEventListener("click", ()=> {
            location.hash = `#category=${dataOfGenresMovies.id}-${dataOfGenresMovies.name}`});

        articleOfCategoriesMovies.appendChild(categoryType);

        categoriesTypes.push(articleOfCategoriesMovies);
    }); 

    aContainer.append(...categoriesTypes)

}

/////////////////////////////////////////////////////////
////////// Lazy Loader //////////////////////////////////

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            //console.log(`This is entry: ${entry.target.setAttribute}`);
            // const url = entry.target.getAttribute("data-img");
            // entry.target.setAttribute("src", url);
            const image = entry.target;
            const url = image.dataset.src;
            image.src = url;
            observer.unobserve(image);
        }
    })
})
/////////////////////////////////////////////////////////

async function getTrendingMoviesPreview() {
    const { data } = await api(`${END_POINT_TRENDING_DAY}`);
    const trendingMoviess = data.results;

    createMovies(trendingMoviess, trendingMoviePreviewList, true); 

}

async function getCategoriesMoviesPreview() {

    const {data} = await api(`${GENRE_END_POINT}`);

    createCategories (data.genres, allCategoriesContainer);


}

async function getMoviesByCategory(id) {
    const {data} = await api(`${MOVIES_BY_CATEGORIES_END_POINT}`, {
        params: {
            with_genres: id,
        },
    });
    
    maxPage = data.total_pages;

    createMovies(data.results, genericSection);

};

function getMoreMoviesByCategory(id) {

    return async function () {

        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const {data} = await api(`${MOVIES_BY_CATEGORIES_END_POINT}`, {
                params: {
                    with_genres: id,
                    page,
                },
            });
        
            const moviesByCategories = data.results;
        
            createMovies(moviesByCategories, genericSection, { observed: true, clean: false });
        }

    }

}

async function getMoviesBySearch(query) {
    const {data} = await api(`${SEARCH_MOVIES}`, {
        params: {
            query,
        },
    });

    maxPage = data.total_pages;

    createMovies(data.results, genericSection);

};

function getMoreMoviesBySearch (query) {

    return async function () {

        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    
        const pageIsNotMax = page < maxPage;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const {data} = await api(`${SEARCH_MOVIES}`, {
                params: {
                    query,
                    page,
                },
            });
        
            const moviesBySearch = data.results;
        
            createMovies(moviesBySearch, genericSection, { observed: true, clean: false });
        }

    }

}

async function getMovieById(id) {
    const {data: movie} = await api(`${MOVIE_DETAILS}${id}`);

    movieDetailTitle.textContent = movie.title;
    movieDetailRating.textContent = `Rating: ${movie.vote_average}`;
    movieDetailDescription.textContent = movie.overview;

    oneMovieDetail.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`;


    createCategories (movie.genres, movieDetailRelatedCategories);

    getRelatedMoviesId(id);

};

async function getRelatedMoviesId (id) {
    const {data} = await api(`/movie/${id}${RELATE_MOVIES}`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
};

async function getTrendingMoviesFull() {
    const {data} = await api(`${END_POINT_TRENDING_DAY}`);
    const trendingMoviesFull = data.results;

    maxPage = data.total_pages; // tenemos el maximo de paginas que se pueden cargar utilizando este consumo

    createMovies(trendingMoviesFull, genericSection, { observed: true, clean: true });

}

async function getMoreTrendingMovies () {

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement; // Desestructurando
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const {data} = await api(`${END_POINT_TRENDING_DAY}`, {
            params: {
                page,
            },
        });
    
        const trendingMoviesFull = data.results;
    
        createMovies(trendingMoviesFull, genericSection, { observed: true, clean: false });
    }

}