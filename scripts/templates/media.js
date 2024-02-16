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
        card.setAttribute("tabIndex" , 0);
        card.setAttribute("data-id" , id);

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

        // mediaContent.addEventListener("click", function(event){
        //     event.preventDefault();
        //     openLightbox(id);
        // })
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
        number.setAttribute('aria-label', 'likes');

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

        // Ouverture lightbox

        card.addEventListener("click", function (event){
            event.preventDefault();
            openLightbox(id);
        })

        return card; 
    };

    function getMediaLightbox (){

        const div = document.createElement('div');
        div.classList.add("mySlides");
        div.id = id;

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

        const mediaTitleContainer = document.createElement("div");
        mediaTitleContainer.classList.add("media-title-container")
        div.appendChild(mediaTitleContainer);

        const mediaTitle = document.createElement("p");
        mediaTitle.classList.add("media-title");
        mediaTitle.textContent = title;
        mediaTitleContainer.appendChild(mediaTitle);

        return div;
    }
    return {getMedia, getMediaLightbox, nbrLikes, price, date, id, photographerId};
}