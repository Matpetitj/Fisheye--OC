function mediaTemplate (data) {

    const { id, photographerId, title, video, image, likes, date, price, name } = data;

    const nameFolder = name.split(" ")[0].replace("-", " ");

    function getMedia() {
        
        let card = document.createElement('div');

        card.classList.add('photographer-card');
        // card.setAttribute aria-label

        let imgContainer = document.createElement('img');
        imgContainer.classList.add('photographer-img');
        imgContainer.src = `./assets/Sample Photos/${nameFolder}/${image}`;
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('photographer-infoContainer');

        let titleMedia = document.createElement('p');
        titleMedia.classList.add('photographer-title');
        titleMedia.textContent = title;

        let likesMedia = document.createElement('div');
        likesMedia.classList.add('photographer-likes');    

        let number = document.createElement('p');
        number.classList.add('photographer-numbers');
        number.innerText = likes; 

        card.appendChild(imgContainer);
        card.appendChild(infoContainer);
        infoContainer.appendChild(titleMedia);
        infoContainer.appendChild(likesMedia);
        likesMedia.appendChild(number);

        // Mettre le calcul des likes dans la card

        return card; 
    }

    return {getMedia};
}