let mediaFilterArray = []

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
    listMedia.forEach(media => {
        media = {...media, name: photographer.name};
        console.log(media);
        const mediaModel = mediaTemplate(media);
        const mediaCard = mediaModel.getMedia();
        // console.log(mediaCard);
        mediaSection.appendChild(mediaCard);
        const mediaContent = mediaModel.getMediaLightbox();
        mediaModalContent.appendChild(mediaContent);
    });
   
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
    getModalMedia();
}

init();

function getModalMedia(){

        const crossImg = `./assets/icons/close.svg`;
        
        let triggerMedia = document.querySelector(".photographer-media");

        // Création de la lightbox

        let mediaModal = document.querySelector('.medias-modal');

        let closeBtn = document.createElement('img');
        closeBtn.classList.add('close-modal');
        closeBtn.setAttribute('src', crossImg);
        mediaModal.appendChild(closeBtn);

        //créer le bouton dans le html et la fonction du click ici + créer un contenu vide

        // Ouverture lightbox

        triggerMedia.addEventListener("click", function (event){
            event.preventDefault();
            openModal();
        })

        closeBtn.addEventListener("click", function(event){
            event.preventDefault();
            closeModal();
        })
        
    }

    function openModal() {
        document.querySelector(".medias-modal").style.display = "block";
    }

    function closeModal() {
        document.querySelector(".medias-modal").style.display = "none";
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