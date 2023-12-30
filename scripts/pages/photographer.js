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
    listMedia.forEach(media => {
        media = {...media, name: photographer.name};
        console.log(media);
        const mediaModel = mediaTemplate(media);
        const mediaCard = mediaModel.getMedia();
        console.log(mediaCard);
        mediaSection.appendChild(mediaCard);  
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
     displayData(photographer, listMedias)
}

init();