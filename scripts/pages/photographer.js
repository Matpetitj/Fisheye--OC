const infosContainer = document.getElementById('infos-container');
let photographer = null;
//Mettre le code JavaScript lié à la page photographer.html
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    // console.log(id);
    return id;
}

async function displayData(listMedia) {
    const headerSection = document.querySelector(".photograph-header");
    headerSection.innerHTML="";
    const headerModel = photographerTemplate(photographer);
    const photographerHeader = headerModel.getHeaderPhotographer();
    headerSection.appendChild(photographerHeader);
    
    const mediaSection = document.querySelector(".media-container");
    const mediaModalContent = document.querySelector(".media-modal-content");
    mediaSection.innerHTML= "";
    mediaModalContent.innerHTML="";
    let totalLikes = 0;
    listMedia.forEach(media => {
        media = {...media, name: photographer.name};
        // console.log(media);
        const mediaModel = mediaTemplate(media);
        const mediaCard = mediaModel.getMedia();
        // console.log(mediaCard);
        mediaSection.appendChild(mediaCard);
        const mediaContent = mediaModel.getMediaLightbox();
        mediaModalContent.appendChild(mediaContent);
        totalLikes = totalLikes + mediaModel.nbrLikes;
    });

    displayLikesAndPrice(totalLikes, photographer.price);
   
}

var slideIndex = 0;
function openLightbox(id) {
    let mediaModal = document.querySelector('.medias-modal');
    mediaModal.style.display = "block";
    // chercher l'element avec id selectionné
    slideIndex = searchPosition(id);
    console.log(slideIndex,"/", id)
    showSlides(slideIndex);
}

function closeLightbox() {
    let mediaModal = document.querySelector('.medias-modal');
    mediaModal.style.display = "none";
}

function searchPosition(id) {
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      console.log(slides[i].id);
      if(slides[i].id == id) return i;
  }
  return -1;
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length-1) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length-1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Tarifs et Likes

function displayLikesAndPrice(likes, price) {
    
    const likesArea = document.querySelector(".likes-area");
    likesArea.innerHTML="";
    
    const totalLikes = document.createElement('p');
    totalLikes.classList.add('total-likes');
    totalLikes.textContent = likes;

    const heartIcon = document.createElement('i');
    heartIcon.setAttribute('class', 'heart-icon fa-heart fa-solid fa-sharp fa-lg');

    likesArea.appendChild(totalLikes);
    likesArea.appendChild(heartIcon);

    const tarifsArea = document.querySelector(".tarifs-area");
    tarifsArea.innerHTML="";

    infosContainer.appendChild(tarifsArea);

    const dailyPrice = document.createElement('p');
    dailyPrice.classList.add("daily-price");
    dailyPrice.textContent = `${price}€ / jour`;
    tarifsArea.appendChild(dailyPrice);
}

async function init() {
    const id = getId();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    // Recuperer le photographer en question 
    const position = photographers.findIndex((element) => element.id == id );
    photographer = photographers[position];
    // recuperer les media du photographer en question 
    const listMedia = media.filter((element) => element.photographerId == id);
    displayData(listMedia);
    sortMedias(listMedia);
}

// Filtres

const filterContainer = document.getElementById('filter-container');

const mediaFilters = document.createElement('section');
mediaFilters.classList.add('media-filters-container');

const dropdown = document.createElement('div');
dropdown.classList.add('dropdown');
dropdown.setAttribute("role", "menubar");
dropdown.setAttribute("tabIndex", 0);

dropdown.addEventListener("keydown", function(e) {
    let dropdownMenu = document.querySelector('.menu-dropdown');
    if (e.key == "Enter") {
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.opacity = 1;
        dropdownMenu.style.transform = "translateY(0%)";
    };
    if (e.key == "Escape") {
        dropdownMenu.style.visibility = "hidden";
        dropdownMenu.style.opacity = 0;
        dropdownMenu.style.transform = "translateY(-50%)";
    };
});

const menuDropdown = document.createElement('div');
menuDropdown.classList.add('menu-dropdown');

const Popularite = document.createElement('button');
Popularite.classList.add('menu-filter');
Popularite.classList.add('select-popularity');
Popularite.textContent = "Popularité";
Popularite.setAttribute("role", "menu");
Popularite.setAttribute("type", "button");
Popularite. setAttribute("value", "type00");

const DateFilter = document.createElement('button');
DateFilter.classList.add("menu-filter");
DateFilter.classList.add("select-date");
DateFilter.textContent = "Date";
DateFilter.setAttribute("role", "menu");
DateFilter.setAttribute("type", "button");
DateFilter.setAttribute("value", "type01");

const Titre = document.createElement('button');
Titre.classList.add("menu-filter");
Titre.classList.add("select-title");
Titre.textContent = "Titre";
Titre.setAttribute("role", "menu");
Titre.setAttribute("type", "button");
Titre.setAttribute("value", "type02");

const chevronIcon = document.createElement('i');
chevronIcon.setAttribute('class', 'chevron-icon fa-sharp fa-solid fa-angle-up');

const emptyButton = document.createElement('div');
emptyButton.classList.add("empty-button");
const emptyButton2 = document.createElement('div');
emptyButton.classList.add("empty-button");
const emptyButtonWhite = document.createElement('div');
emptyButton.classList.add("empty-button-white");
const emptyButtonWhite2 = document.createElement('div');
emptyButton2.classList.add("empty-button-white");

filterContainer.appendChild(mediaFilters);
mediaFilters.appendChild(dropdown);
dropdown.appendChild(Popularite);
Popularite.appendChild(chevronIcon);
dropdown.appendChild(menuDropdown);
menuDropdown.appendChild(emptyButton);
emptyButton.appendChild(emptyButtonWhite);
menuDropdown.appendChild(DateFilter);
menuDropdown.appendChild(emptyButton2);
emptyButton.appendChild(emptyButtonWhite2);
menuDropdown.appendChild(Titre);

/* Bloc de tri des cartes */

function sortMedias(listMedia){
    console.log(listMedia);

    Popularite.addEventListener("click", function (event){
        event.preventDefault();
        event.stopPropagation();
        listMedia.sort(function (a, b) {
            if(a.likes < b.likes){
                return 1;
            }
            if(a.likes > b.likes){
                return -1;
            };
            return 0; 
        });
        //Commenter si j'utilise l'autre option
        // displayData(listMedia);

        // Deuxieme façon pour actualiser le dom 
        reorganizeMedias(listMedia);
    });

    DateFilter.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        listMedia.sort(function (a, b) {
            if(a.date < b.date){
                return -1;
            }
            if(a.date > b.date){
                return 1;
            };
            return 0; 
        });
        //Commenter si j'utilise l'autre option
        // displayData(listMedia);

        // Deuxieme façon pour actualiser le dom 
        reorganizeMedias(listMedia);
    })

    Titre.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        listMedia.sort(function (a, b) {
            if(a.title < b.title){
                return -1;
            }
            if(a.title > b.title){
                return 1;
            };
            return 0; 
        });

        //Commenter si j'utilise l'autre option
        // displayData(listMedia);

        // Deuxieme façon pour actualiser le dom 
        reorganizeMedias(listMedia);
    })
}

function reorganizeMedias(listMedia){
    const wrapper = document.querySelector(".media-container");
    const wrapperModal = document.querySelector(".media-modal-content");
    
    let positionRefence = 0; 
    listMedia.forEach(element => {
        console.log("element", element);
      
        const arrayCreatedMedias = Array.prototype.slice.call(wrapper.childNodes); 
        const arrayCreatedMediasModal = Array.prototype.slice.call(wrapperModal.childNodes); 

        let positionElement = arrayCreatedMedias.findIndex((mediaCard) => (
            mediaCard.dataset.id == element.id
        ));
        console.log("positionElement", positionElement);

        // Deplacer le node recherché sur la page index avant le node de la position de reference 
        const nodeSearched = arrayCreatedMedias[positionElement];
        const nodeReference = arrayCreatedMedias[positionRefence];
        wrapper.insertBefore(nodeSearched, nodeReference);

        // Deplacer le node modal recherché sur la lightbox avant l'element de la position de reference 
        const nodeSearchedModal = arrayCreatedMedias[positionElement];
        const nodeReferenceModal = arrayCreatedMedias[positionRefence];
        wrapperModal.insertBefore(nodeSearchedModal, nodeReferenceModal);

        positionRefence++;
    });
}

init();