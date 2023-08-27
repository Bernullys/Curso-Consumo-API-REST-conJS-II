let maxPag; // se inicializa una variable para que tome el valor maximo de paguinas que se pueden cargar por función
let page = 1; // se trae para aca para utilizarla en todas las paginas de navegación
let infiniteScroll; // se deja vacia para que una vez se haga navegacion, se le pueda decir cual es el valor


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
window.addEventListener("scroll", infiniteScroll, { passive: false }); // para llamar a la funcion cuando se hace infinite scrolling en general en todas las paginas

function navigator () {

    console.log( { location }) // location es el que dice en que url estamos


    if (infiniteScroll) {   // antes de que navegue entre paginas, se pregunta si se habia cargado el infiniteScroll, y si cumple se remueve
        window.removeEventListener("scroll", infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }


    if (location.hash.startsWith("#trends")) {
        trendPage();
    } else if  (location.hash.startsWith("#search=")) {
        searchPage();
    } else if  (location.hash.startsWith("#movie=")) {
        movieDetailPage();
    } else if  (location.hash.startsWith("#category=")) {
        categoryPage();
    } else if (location.hash.startsWith("")) {
        homePage();
    }

    window.scrollTo({
        top: 0,
        behavior:'smooth',
    });

    if (infiniteScroll) { // despues de que navegue, si alguna funcion cargo el infiniteScroll, pues se llama
        window.addEventListener("scroll", infiniteScroll, { passive: false });
    }

};

function homePage() {

    console.log("HOME!!!");

    searchMainContainer.classList.remove("inactive");
    brandTitle.classList.remove("inactive");
    descriptionTitle.classList.remove("inactive");
    backButton.classList.add("inactive");
    oneMovieDetail.classList.add("inactive");
    categoryType.classList.add("inactive");
    searchFormArticleContainer.classList.remove("inactive");
    searchForm.classList.remove("inactive");
    searchInput.classList.remove("inactive");
    searchButton.classList.remove("inactive");

    homeViewMainContainer.classList.remove("inactive");
    homeViewArticleContainer.classList.remove("inactive");
    homeViewSubtitle.classList.remove("inactive");
    trendingButton.classList.remove("inactive");
    trendingMoviesMainContainer.classList.remove("inactive");
    trendingMoviePreviewList.classList.remove("inactive");

    categoriesListMainContainer.classList.remove("inactive");
    categoriesSubtitle.classList.remove("inactive");
    allCategoriesContainer.classList.remove("inactive");
    allCategories.classList.remove("inactive");

    genericSection.classList.add("inactive");
    lastContainer.classList.add("inactive");

    moviesDetail.classList.add("inactive");
    movieDetailTitle.classList.add("inactive");
    movieDetailRating.classList.add("inactive");
    movieDetailDescription.classList.add("inactive");
    movieDetailRelatedCategories.classList.add("inactive");

    relatedMoviesContainer.classList.add("inactive");
    relatedMoviesScrollContainer.classList.add("inactive");

    allTrendsSubTitle.classList.add("inactive");


    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
    getLikedMovies();

};


function categoryPage() {

    console.log("CATEGORY!!!");

    searchMainContainer.classList.remove("inactive");
    brandTitle.classList.add("inactive");
    descriptionTitle.classList.add("inactive");
    backButton.classList.remove("inactive");
    oneMovieDetail.classList.add("inactive");
    categoryType.classList.remove("inactive");
    searchFormArticleContainer.classList.add("inactive");
    searchForm.classList.add("inactive");
    searchInput.classList.add("inactive");
    searchButton.classList.add("inactive");

    homeViewMainContainer.classList.add("inactive");
    homeViewArticleContainer.classList.add("inactive");
    homeViewSubtitle.classList.add("inactive");
    trendingButton.classList.add("inactive");
    trendingMoviesMainContainer.classList.add("inactive");
    trendingMoviePreviewList.classList.add("inactive");

    categoriesListMainContainer.classList.add("inactive");
    categoriesSubtitle.classList.add("inactive");
    allCategoriesContainer.classList.add("inactive");
    allCategories.classList.add("inactive");

    genericSection.classList.remove("inactive");
    lastContainer.classList.remove("inactive");

    moviesDetail.classList.add("inactive");
    movieDetailTitle.classList.add("inactive");
    movieDetailRating.classList.add("inactive");
    movieDetailDescription.classList.add("inactive");
    movieDetailRelatedCategories.classList.add("inactive");

    relatedMoviesContainer.classList.add("inactive");
    relatedMoviesScrollContainer.classList.add("inactive");

    allTrendsSubTitle.classList.add("inactive");

    likedMoviesMainContainer.classList.add("inactive");


    const [_, urlCategoryIdName] = location.hash.split("=");
    const [urlCategoryId, urlCategoryName] = urlCategoryIdName.split("-");

    categoryType.textContent = urlCategoryName;

    getMoviesByCategory(urlCategoryId);

    infiniteScroll = getMoreMoviesByCategory(urlCategoryId);


};

function movieDetailPage() {

    console.log("MOVIE!!!");

    searchMainContainer.classList.remove("inactive");
    brandTitle.classList.add("inactive");
    descriptionTitle.classList.add("inactive");
    backButton.classList.remove("inactive");
    oneMovieDetail.classList.remove("inactive");
    categoryType.classList.add("inactive");
    searchFormArticleContainer.classList.add("inactive");
    searchForm.classList.add("inactive");
    searchInput.classList.add("inactive");
    searchButton.classList.add("inactive");

    homeViewMainContainer.classList.add("inactive");
    homeViewArticleContainer.classList.add("inactive");
    homeViewSubtitle.classList.add("inactive");
    trendingButton.classList.add("inactive");
    trendingMoviesMainContainer.classList.add("inactive");
    trendingMoviePreviewList.classList.add("inactive");

    categoriesListMainContainer.classList.add("inactive");
    categoriesSubtitle.classList.add("inactive");
    allCategoriesContainer.classList.add("inactive");
    allCategories.classList.add("inactive");

    genericSection.classList.add("inactive");
    lastContainer.classList.add("inactive");

    moviesDetail.classList.remove("inactive");
    movieDetailTitle.classList.remove("inactive");
    movieDetailRating.classList.remove("inactive");
    movieDetailDescription.classList.remove("inactive");
    movieDetailRelatedCategories.classList.remove("inactive");

    relatedMoviesContainer.classList.remove("inactive");
    relatedMoviesScrollContainer.classList.remove("inactive");

    allTrendsSubTitle.classList.add("inactive");

    likedMoviesMainContainer.classList.add("inactive");


    const [_, movieIds] = location.hash.split("=");

    getMovieById(movieIds);

};

function searchPage() {

    console.log("SEARCH!!!");

    searchMainContainer.classList.remove("inactive");
    brandTitle.classList.add("inactive");
    descriptionTitle.classList.add("inactive");
    backButton.classList.remove("inactive");
    oneMovieDetail.classList.add("inactive");
    categoryType.classList.add("inactive");
    searchFormArticleContainer.classList.remove("inactive");
    searchForm.classList.remove("inactive");
    searchInput.classList.remove("inactive");
    searchButton.classList.remove("inactive");

    homeViewMainContainer.classList.add("inactive");
    homeViewArticleContainer.classList.add("inactive");
    homeViewSubtitle.classList.add("inactive");
    trendingButton.classList.add("inactive");
    trendingMoviesMainContainer.classList.add("inactive");
    trendingMoviePreviewList.classList.add("inactive");

    categoriesListMainContainer.classList.add("inactive");
    categoriesSubtitle.classList.add("inactive");
    allCategoriesContainer.classList.add("inactive");
    allCategories.classList.add("inactive");

    genericSection.classList.remove("inactive");
    lastContainer.classList.remove("inactive");

    moviesDetail.classList.add("inactive");
    movieDetailTitle.classList.add("inactive");
    movieDetailRating.classList.add("inactive");
    movieDetailDescription.classList.add("inactive");
    movieDetailRelatedCategories.classList.add("inactive");

    relatedMoviesContainer.classList.add("inactive");
    relatedMoviesScrollContainer.classList.add("inactive");

    allTrendsSubTitle.classList.add("inactive");

    likedMoviesMainContainer.classList.add("inactive");


    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);

    infiniteScroll = getMoreMoviesBySearch(query);

};

function trendPage() {

    console.log("TRENDS!!!");

    searchMainContainer.classList.remove("inactive");
    brandTitle.classList.add("inactive");
    descriptionTitle.classList.add("inactive");
    backButton.classList.remove("inactive");
    oneMovieDetail.classList.add("inactive");
    categoryType.classList.add("inactive");
    searchFormArticleContainer.classList.add("inactive");
    searchForm.classList.add("inactive");
    searchInput.classList.add("inactive");
    searchButton.classList.add("inactive");

    homeViewMainContainer.classList.add("inactive");
    homeViewArticleContainer.classList.remove("inactive");
    homeViewSubtitle.classList.remove("inactive");
    trendingButton.classList.add("inactive");
    trendingMoviesMainContainer.classList.add("inactive");
    trendingMoviePreviewList.classList.add("inactive");

    categoriesListMainContainer.classList.add("inactive");
    categoriesSubtitle.classList.add("inactive");
    allCategoriesContainer.classList.add("inactive");
    allCategories.classList.add("inactive");

    genericSection.classList.remove("inactive");
    lastContainer.classList.remove("inactive");

    moviesDetail.classList.add("inactive");
    movieDetailTitle.classList.add("inactive");
    movieDetailRating.classList.add("inactive");
    movieDetailDescription.classList.add("inactive");
    movieDetailRelatedCategories.classList.add("inactive");

    relatedMoviesContainer.classList.add("inactive");
    relatedMoviesScrollContainer.classList.add("inactive");

    allTrendsSubTitle.classList.remove("inactive");

    likedMoviesMainContainer.classList.add("inactive");

    getTrendingMoviesFull();

    infiniteScroll = getMoreTrendingMovies;
    
};
