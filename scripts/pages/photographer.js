let mediaArray = []
const infosContainer = document.getElementById('infos-container');

//Mettre le code JavaScript lié à la page photographer.html
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    // console.log(id);
    return id;
}

async function displayData(photographer, listMedia) {
    const headerSection = document.querySelector(".photograph-header");
    const headerModel = photographerTemplate(photographer);
    const photographerHeader = headerModel.getHeaderPhotographer();
    headerSection.appendChild(photographerHeader);
    
    const mediaSection = document.querySelector(".media-container");
    const mediaModalContent = document.querySelector(".media-modal-content");
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

function sortedMedias(sortedArray){
    let refPos = 0;

    sortedArray.forEach(element => {
        
    })
}

function mediasFilter(medias){
    const select = document.getElementById('tri');
    const selectByPopularity = document.getElementById('select-popularity');
    const selectByDate = document.getElementById('select-date');
    const selectByTitle = document.getElementById('select-title');

    selectByTitle.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        const sortedArray = mediaArray.sort(function (a, b) {
            if(a.title < b.title){
                return -1;
            }
            if(a.title > b.title){
                return 0;
            };
        })
    })
}

function displayLikesAndPrice(likes, price) {
    // Tarifs et Likes

    const likesArea = document.createElement('div');
    likesArea.classList.add("likes-area");

    infosContainer.appendChild(likesArea);

    const totalLikes = document.createElement('p');
    totalLikes.classList.add('total-likes');
    totalLikes.textContent = likes;

    const heartIcon = document.createElement('i');
    heartIcon.setAttribute('class', 'heart-icon fa-heart fa-solid fa-sharp fa-lg');

    likesArea.appendChild(totalLikes);
    likesArea.appendChild(heartIcon);

    const tarifsArea = document.createElement('div');
    tarifsArea.classList.add("tarifs-area");

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
    const photographer = photographers[position];
    // recuperer les media du photographer en question 
    const listMedias = media.filter((element) => element.photographerId == id);
    displayData(photographer, listMedias);
}

init();