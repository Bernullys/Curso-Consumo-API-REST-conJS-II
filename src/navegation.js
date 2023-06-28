window.addEventListener("DOMContentLoaded", navigator, false); // llamamos la funcion tambien cuando cargue la pagina
window.addEventListener("hashchange", navigator, false); // esto es para que llame la funcion cada vez que cambie el hash

function navigator () {
    console.log( { location }) // location es el que dice en que url estamos +
    if (location.hash.startsWith("#trends")) {
        trendPage();
    } else if  (location.hash.startsWith("#search=")) {
        searchPage();
    } else if  (location.hash.startsWith("#movie=")) {
        moviePage();
    } else if  (location.hash.startsWith("#category=")) {
        categoryPage();
    } else{
        homePage();
    }
};

// function navigator () {
//     const hash = {
//         "#trends": () => trendPage(),
//         "#search": () => searchPage(),
//         "#movie": () => moviePage(),
//         "#category": () => categoryPage(),
//         "#home": () => homePage(),
//     }
//     hash[location.hash]()
// }

function homePage() {
    console.log("HOME!!!");

    arrowBtn.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    title.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMoviesPreview();
    getCategoriesMoviesPrevie();
};


function categoryPage() {
    console.log("CATEGORY!!!");

    arrowBtn.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    title.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
};

function trendPage() {
    console.log("TRENDS!!!");
};

function searchPage() {
    console.log("SEARCH!!!");
};

function moviePage() {
    console.log("MOVIE!!!");
};


