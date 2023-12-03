function mediaTemplate (data) {

    const { id, photographerId, title, video, image, likes, date, price } = data;


    function getMedia() {
        
        // let imgBloc = document.querySelector(".media-container");
        // imgBloc.appendChild(card); A FAIRE DANS LA PAGE

        let card = document.createElement('button');

        card.classList.add('photographer-card');
        // card.setAttribute aria-label
        card.appendChild(imgContainer);
        card.appendChild(infoContainer);

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('photographer-imgContainer');

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('photographer-infoContainer');
        infoContainer.appendChild(title);
        infoContainer.appendChild(likes);

        let title = document.createElement('p');
        title.classList.add('photographer-title');
        title.textContent = title;

        let likes = document.createElement('div');
        likes.classList.add('photographer-likes');
        likes.appendChild(number);

        let number = document.createElement('p');
        number.classList.add('photographer-numbers');
        // number.innerText = likes; + icon des likes


    }

    return 
}