const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// All events uploaded

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);

    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        // error 
        UI.displayMessages("Fill the blanks...","danger");

    }
    else {
        // new film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme

        UI.displayMessages("Movie Successfully added...","success");


    }


    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Deletion successful...","success");

    }

}
function clearAllFilms(){

    if (confirm("Are You Sure ?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();

    }
   

}