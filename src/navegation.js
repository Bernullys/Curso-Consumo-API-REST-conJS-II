searchFormBtn.addEventListener("click", ()=>{
    location.hash = "#search=";
});
trendingBtn.addEventListener("click", ()=>{
    location.hash = "#trends";
});
arrowBtn.addEventListener("click", ()=>{
    location.hash = "home";
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

    headerContainerLong.classList .add("inactive");

    arrowBtn.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    title.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
};


function categoryPage() {
    console.log("CATEGORY!!!");

    headerContainerLong.classList .add("inactive");

    arrowBtn.classList.remove("inactive");
    headerCategoryTitle.classList.remove("inactive");
    title.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    const [_, urlCategoryIdName] = location.hash.split("=");
    const [urlCategoryId, urlCategoryName] = urlCategoryIdName.split("-");

    headerCategoryTitle.textContent = urlCategoryName;

    getMoviesByCategory(urlCategoryId);

};

function movieDetailPage() {
    console.log("MOVIE!!!");

    headerContainerLong.classList .remove("inactive");

    arrowBtn.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    title.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");
};

function searchPage() {
    console.log("SEARCH!!!");

    headerContainerLong.classList .add("inactive");

    arrowBtn.classList.remove("inactive");
    headerCategoryTitle.classList.remove("inactive");
    title.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
};

function trendPage() {
    console.log("TRENDS!!!");

    headerContainerLong.classList .add("inactive");

    arrowBtn.classList.remove("inactive");
    headerCategoryTitle.classList.remove("inactive");
    title.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
};






