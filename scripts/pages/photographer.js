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

function displayLikesAndPrice(likes, price) {
    // Tarifs et Likes

    const likesArea = document.querySelector(".likes-area");
    likesArea.innerHTML="";
    
//    infosContainer.appendChild(likesArea);

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
/* Bloc de tri des cartes */

function sortMedias(listMedia){
    const selectSort = document.getElementById("tri");
    console.log(listMedia);
    selectSort.addEventListener("change", function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("selectSort"+selectSort.value)
        // Il faut ajouter une condition de vérification de la value selected 
        if(selectSort.value=="type00"){
            listMedia.sort(function (a, b) {
                if(a.likes < b.likes){
                    return -1;
                }
                if(a.likes > b.likes){
                    return 1;
                };
                return 0; 
            });
        }
        if(selectSort.value=="type01"){
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
        if(selectSort.value=="type02"){
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
    displayData(listMedia);
    });
}
init();