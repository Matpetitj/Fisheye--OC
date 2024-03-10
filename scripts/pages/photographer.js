const infosContainer = document.getElementById('infos-container');
let photographer = null;
//Mettre le code JavaScript lié à la page photographer.html
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    // console.log(id);
    return id;
}

// Fonction de chargement du DOM

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

// Ouverture et fermeture de la lightbox

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

// Recherche de l'index de la slide

function searchPosition(id) {
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      console.log(slides[i].id);
      if(slides[i].id == id) return i;
  }
  return -1;
}

// Navigation entre les slides de la lightbox

function plusSlides(n) {
  showSlides(slideIndex += n);
}

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// Affichage de la lightbox

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

let triggerCloseModal = document.querySelector('.close-modal');
triggerCloseModal.addEventListener("keydown", function(e){
    let mediaModal = document.querySelector('.medias-modal');
    if(mediaModal.style.display == "block") {
        if(e.key == "Enter"){
            closeLightbox();
        }
    }
})

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

/* Bloc de tri des cartes */

function sortMedias(listMedia){
    console.log(listMedia);

    const popularityBtn = document.getElementById("popularity-btn");
    const dateBtn = document.getElementById("date-btn");
    const titleBtn = document.getElementById("title-btn");

    popularityBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        sort("type00", listMedia);
    });
    dateBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        sort("type01", listMedia);
    });
    titleBtn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        sort("type02", listMedia);
    });
}

// Fonction de tri des médias

function sort (type, listMedia) {
        if(type=="type00"){
            listMedia.sort(function (a, b) {
                if(a.likes < b.likes){
                    return 1;
                }
                if(a.likes > b.likes){
                    return -1;
                };
                return 0; 
            });
        }
        if(type=="type01"){
            listMedia.sort(function (a, b) {
                if(a.date < b.date){
                    return -1;
                }
                if(a.date > b.date){
                    return 1;
                };
                return 0; 
            });
        }
        if(type=="type02"){
        listMedia.sort(function (a, b) {
            if(a.title < b.title){
                return -1;
            }
            if(a.title > b.title){
                return 1;
            };
            return 0; 
        });
    }

    //Commenter si j'utilise l'autre option
    // displayData(listMedia);

    // Deuxieme façon pour actualiser le dom 
    reorganizeMedias(listMedia);
}

// Fonction de réorganisation du DOM sans régénération du DOM

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
        const nodeSearchedModal = arrayCreatedMediasModal[positionElement];
        const nodeReferenceModal = arrayCreatedMediasModal[positionRefence];
        wrapperModal.insertBefore(nodeSearchedModal, nodeReferenceModal);

        positionRefence++;
    });
}

init();