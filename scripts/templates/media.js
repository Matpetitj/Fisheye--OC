function mediaTemplate (data) {

    const { id, photographerId, title, video, image, likes, date, price } = data;


    function getMedia() {
        
        // let imgBloc = document.querySelector(".media-container");
        // imgBloc.appendChild(card); A FAIRE DANS LA PAGE

        let card = document.createElement('button');

        card.classList.add('photographer-card');
        // card.setAttribute aria-label

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('photographer-imgContainer');

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('photographer-infoContainer');

        let title = document.createElement('p');
        title.classList.add('photographer-title');
        title.textContent = title;

        let likes = document.createElement('div');
        likes.classList.add('photographer-likes');    

        let number = document.createElement('p');
        number.classList.add('photographer-numbers');
        // number.innerText = likes; + icon des likes

        card.appendChild(imgContainer);
        card.appendChild(infoContainer);
        infoContainer.appendChild(title);
        infoContainer.appendChild(likes);
        likes.appendChild(number);

    }

    async function likesFactory() {
        //gère l'ensemble du systeme de likes sur photos
    
        function addingOne(heart) {
            //fonction d'incrementation pour les chiffres sur les photos et le total
            let blocLikes = document.getElementById('infoBloc__Likes')
            let previous = heart.nextSibling
            let number = Number(previous.innerText)
            if (heart.classList.contains('liked')) {
                previous.innerText = number + 1
                blocLikes.innerText = Number(blocLikes.innerText) + 1
            } else {
                previous.innerText = number - 1
                blocLikes.innerText = Number(blocLikes.innerText) - 1
            }
        }
    
        setTimeout(() => {
            let hearts = document.querySelectorAll('.fa-heart');
    
            for (const heart of hearts) {
                heart.addEventListener('click', function liked() {
                    heart.classList.toggle('liked')
                    addingOne(heart)
                });
            }
        }, "100")
    
        totalLikes()
    }
    
    async function totalLikes() {
        //gère l'affichage du total des likes
        setTimeout(() => {
            let hearts = document.querySelectorAll('.fa-heart');
            let blocLikes = document.getElementById('infoBloc__Likes')
            let total = 0;
    
            for (const heart of hearts) {
                let likes = heart.nextSibling
                let number = Number(likes.innerText)
                total = total + number
            }
            blocLikes.innerText = total
        }, "200")
    }

    return {getMedia};
}