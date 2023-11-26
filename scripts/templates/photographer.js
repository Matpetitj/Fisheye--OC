function photographerTemplate(data) {
    const { name, portrait, id, tagline, city, country, price } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');

        const a = document.createElement('a');
        a.href = `./photographer.html?id=${id}`;
        a.setAttribute('aria-label', 'Lien du profil de ' + name);
        article.appendChild(a);

        const imgContainer = document.createElement('div');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'photo de ' + name);
       
        const h2 = document.createElement('h2');
        h2.textContent = name;
       
        const location = document.createElement('h3');
        location.textContent = city + ', ' + country;
        const text = document.createElement('p');
        text.textContent = tagline;
        const dayPrice = document.createElement('p'); 
        dayPrice.textContent = price + '€/jour';

        imgContainer.classList.add('card__containerImg');
        location.classList.add('card__location');
        dayPrice.classList.add('card__dayPrice');
        text.classList.add('card__text');
        h2.classList.add('card__name');
        img.classList.add('card__img');
        a.classList.add('card__link');

        imgContainer.appendChild(img);
        a.appendChild(imgContainer);
        a.appendChild(h2);
        
        a.appendChild(location);
        a.appendChild(text);
        a.appendChild(dayPrice)

        return (article);
    }

    // Affichage du bandeau infos sur la page photographe
    function getHeaderPhotographer() {

        const picture = `./assets/photographers/${portrait}`;
        const photographHeader = document.querySelector(".photograph-header");

        const infoLeft = document.createElement('article');
        infoLeft.classList.add("infoList");

        const infoRight = document.createElement('article');
        infoRight.classList.add("infoRight");
        
        photographHeader.appendChild(infoLeft);
        photographHeader.appendChild(infoRight);

        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.classList.add('header__name');

        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.classList.add = ("header__location");

        const text = document.createElement('p');
        text.textContent = tagline;
        text.classList.add = ("header__tagline");

        infoLeft.appendChild(h1);
        infoLeft.appendChild(location);
        infoLeft.appendChild(text);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add = ("header_imgContainer");
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.classList.add("header__img");

        imgContainer.appendChild(img);
        infoRight.appendChild(imgContainer);
    }

    return { getUserCardDOM , getHeaderPhotographer}
}

