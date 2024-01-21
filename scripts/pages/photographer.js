let mediaFilterArray = []
const infosContainer = document.getElementById('infos-container');

//Mettre le code JavaScript lié à la page photographer.html
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    console.log(id);
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
        console.log(media);
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

function openLightbox() {
    let mediaModal = document.querySelector('.medias-modal');
    mediaModal.style.display = "block";
}

function closeLightbox() {
    let mediaModal = document.querySelector('.medias-modal');
    mediaModal.style.display = "none";
}
    

function mediaFilter(medias){

    //for each

    // Récupère le titre
    const Title = document.getElementById("select-title");

    Title.addEventListener("click", function (event) {
        event.preventDefault();

        const arraySorted = mediaFilterArray.sort( function (){

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

    let heartIcon = document.createElement('i');
    heartIcon.setAttribute('class', 'heart-icon fa-heart fa-solid fa-sharp fa-lg');

    likesArea.appendChild(totalLikes);
    likesArea.appendChild(heartIcon);

    const tarifsArea = document.createElement('div');
    tarifsArea.classList.add("tarifs-area");

    infosContainer.appendChild(tarifsArea);

    const dailyPrice = document.createElement('p');
    dailyPrice.classList.add("daily-price");
    dailyPrice.textContent = `${price}€ / jour`;
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