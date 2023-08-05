searchButton.addEventListener("click", ()=>{
    location.hash = `#search=${searchInput.value}`;
});
trendingButton.addEventListener("click", ()=>{
    location.hash = "#trends";
});
backButton.addEventListener("click", ()=>{
    //location.hash = "home";
    history.back();
});


window.addEventListener("DOMContentLoaded", navigator, false); // llamamos la funcion tambien cuando cargue la pagina
window.addEventListener("hashchange", navigator, false); // esto es para que llame la funcion cada vez que cambie el hash

function navigator () {
    console.log( { location }) // location es el que dice en que url estamos +
    if (location.hash.startsWith("#trends")) {
        trendPage();
    } else if  (location.hash.startsWith("#search=")) {
        searchPage();
    } else if  (location.hash.startsWith("#movie=")) {
        movieDetailPage();
    } else if  (location.hash.startsWith("#category=")) {
        categoryPage();
    } else{
        homePage();
    }

    window.scrollTo({
        top: 0,
        behavior:'smooth',
    });
};

function homePage() {
    console.log("HOME!!!");

    oneMovieDetail.classList.add("inactive");
    backButton.classList.add("inactive");
    categoryType.classList.add("inactive");
    brandTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");
    homeViewMainContainer.classList.remove("inactive");
    homeViewArticleContainer.remove("inactive");
    homeViewSubtitle.classList.remove("inactive");
    trendingButton.classList.remove("inactive");
    trendingMoviesMainContainer.classList.remove("inactive");
    trendingMoviePreviewList.classList.remove("inactive");

    categoriesListMainContainer.remove("inactive");
    genericSection.classList.add("inactive");
    moviesDetail.classList.add("inactive");

    searchMainContainer
    brandTitle
    descriptionTitle
    backButton
    oneMovieDetail
    categoryType
    searchFormArticleContainer
    searchForm
    searchInput
    searchButton


    homeViewMainContainer
    homeViewArticleContainer
    homeViewSubtitle
    trendingButton
    trendingMoviesMainContainer
    trendingMoviePreviewList


    categoriesListMainContainer
    categoriesSubtitle
    allCategoriesContainer
    allCategories


    genericSection


    moviesDetail
    movieDetailTitle
    movieDetailRating
    movieDetailDescription
    movieDetailRelatedCategories


    relatedMovies
    relatedMoviesScrollContainer



    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
};


function categoryPage() {
    console.log("CATEGORY!!!");



    const [_, urlCategoryIdName] = location.hash.split("=");
    const [urlCategoryId, urlCategoryName] = urlCategoryIdName.split("-");

    categoryType.textContent = urlCategoryName;

    getMoviesByCategory(urlCategoryId);

};

function movieDetailPage() {
    console.log("MOVIE!!!");


    const [_, movieId] = location.hash.split("=");

    getMovieById(movieId);
};

function searchPage() {
    console.log("SEARCH!!!");



    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);


};

function trendPage() {
    console.log("TRENDS!!!");


    getTrendingMoviesFull();
};
