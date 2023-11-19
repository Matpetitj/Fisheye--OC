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

    function getHeaderPhotographer(){}
    return { getUserCardDOM , getHeaderPhotographer}
}