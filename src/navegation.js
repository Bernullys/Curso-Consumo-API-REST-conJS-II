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

function trendPage() {
    console.log("TRENDS!!!");
}

function searchPage() {
    console.log("SEARCH!!!");
}

function moviePage() {
    console.log("MOVIE!!!");
}

function categoryPage() {
    console.log("CATEGORY!!!");
}

function homePage() {
    console.log("HOME!!!");
    getTrendingMoviesPreview();
    getCategoriesMoviesPrevie();
}