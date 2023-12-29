//Mettre le code JavaScript lié à la page photographer.html
function getId() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    console.log(id);
    return id;
}

async function displayData(photographer) {
    const headerSection = document.querySelector(".photograph-header");
    const headerModel = photographerTemplate(photographer);
    const photographerHeader = headerModel.getHeaderPhotographer();
    headerSection.appendChild(photographerHeader);
    
    const mediaSection = document.querySelector(".media-container");
    const mediaModel = mediaTemplate(photographer);
    const media = mediaModel.getMedia();
    mediaSection.appendChild(media);
}

async function init() {
    const id = getId();
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    // console.log(photographers);
    // console.log(media);
    const position = photographers.findIndex((element) => element.id == id );
    const photographer = photographers[position];
    console.log(photographer);
    displayData(photographer)
}

init();