function mediaTemplate (data) {

    const { id, photographerId, title, video, image, likes, date, price, name } = data;

    const nameFolder = name.split(" ")[0].replace("-", " ");

    const imgSource = `./assets/Sample Photos/${nameFolder}/${image}`;
    const vidSource = `./assets/Sample Photos/${nameFolder}/${video}`;
    let nbrLikes = likes;
    // créer une seule mediaSource qui contient un if / else pour 
    // le media et la return pour l'utiliser dans la lightbox

    function getMedia() {
        
        let card = document.createElement('div');
        let mediaContent = document.createElement('div');

        card.classList.add('photographer-card');
        // card.setAttribute aria-label

        // Source dynamique vers les medias :

        if (image) {
            const selectImage = document.createElement('img');
            selectImage.classList.add("photographer-media");
            selectImage.setAttribute('src', imgSource);
            selectImage.setAttribute('alt', `${title}`);
            mediaContent.appendChild(selectImage);
        }

        if(video){
            const selectVideo = document.createElement('video');
            selectVideo.classList.add("photographer-media");
            selectVideo.setAttribute('src', vidSource);
            selectVideo.setAttribute('type', "video/mp4");
            selectVideo.setAttribute('alt', `${title}`);
            selectVideo.controls = true;
            mediaContent.appendChild(selectVideo);
        }

        mediaContent.addEventListener("click", function(event){
            event.preventDefault();
            openModal();
        })
        card.appendChild(mediaContent);

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('photographer-infoContainer');

        let titleMedia = document.createElement('p');
        titleMedia.classList.add('photographer-title');
        titleMedia.textContent = title;

        let likesMedia = document.createElement('div');
        likesMedia.classList.add('photographer-likes');    

        let number = document.createElement('p');
        number.classList.add('photographer-numbers');
        number.textContent = likes; 

        let heartIcon = document.createElement('i');
        heartIcon.setAttribute('class', 'heart-icon fa-heart fa-solid fa-sharp fa-lg');

        card.appendChild(infoContainer);
        infoContainer.appendChild(titleMedia);
        infoContainer.appendChild(likesMedia);
        likesMedia.appendChild(number);
        likesMedia.appendChild(heartIcon);

        // Mettre le calcul des likes dans la card

        heartIcon.addEventListener("click", function (event){
            event.preventDefault();
            event.stopPropagation();

            if(heartIcon.classList.contains('liked')) {
                nbrLikes = nbrLikes - 1;
            } else {
                nbrLikes = nbrLikes + 1;
                heartIcon.classList.add('liked');
            }
            number.textContent = nbrLikes;
        })

        return card; 
    };

    function getMediaLightbox (){

        const div = document.createElement('div');

        if (image) {
            const selectImage = document.createElement('img');
            selectImage.classList.add("photographer-media");
            selectImage.setAttribute('src', imgSource);
            selectImage.setAttribute('alt', `${title}`);
            div.appendChild(selectImage);
        }

        if(video){
            const selectVideo = document.createElement('video');
            selectVideo.classList.add("photographer-media");
            selectVideo.setAttribute('src', vidSource);
            selectVideo.setAttribute('type', "video/mp4");
            selectVideo.setAttribute('alt', `${title}`);
            selectVideo.controls = true;
            div.appendChild(selectVideo);
        }
        console.log(div);
        return div;
    }
    return {getMedia, getMediaLightbox, nbrLikes};
}



// // Alimenter la fonction par le tableau des Medias trié
// function displaySortedElements(arraySorted){
//     const wrapper = document.querySelector(".wrapper");
//     let positionReference = 0;
//     // Réorganisation des Médias triés par leur Popularité (sans supprimer ce qui est déjà affiché !) :
//     arraySorted.forEach(element => {
//         // console.log(wrapper.childNodes);
//         const arrayCreatedElement = Array.prototype.slice.call(wrapper.childNodes); // Convertir une NodeList vers un tableau d'éléments HTML
//         // console.log(arrayCreatedElement);

//         let positionElement = arrayCreatedElement.findIndex((mediaContainer) =>
//             (mediaContainer.dataset.id == element.id)
//         );

//         const nodeSearched = arrayCreatedElement[positionElement];
//         const nodeReference = arrayCreatedElement[positionReference];
//        // console.log(element.title +"/"+element.likes +" / position "+ positionElement + "deplacer vers: " +positionReference);
//         wrapper.insertBefore(nodeSearched, nodeReference);
//         positionReference++;
//     });
// }