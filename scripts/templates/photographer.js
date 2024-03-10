// Création de la template des profils de photographe

function photographerTemplate(data) {
    const { name, portrait, id, tagline, city, country, price } = data;

    const picture = `./assets/photographers/${portrait}`;               

    // Création de la carte des photographes

    function getUserCardDOM() {

        const article = document.createElement('article');

        const a = document.createElement('a');
        a.href = `./photographer.html?id=${id}`;
        a.setAttribute('aria-label', 'Lien du profil de ' + name);
        article.appendChild(a);

        const imgContainer = document.createElement('div');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name);
       
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', `Photographe ${name}`);
       
        const location = document.createElement('h3');
        location.textContent = city + ', ' + country;
        location.setAttribute('aria-label', `Le photographe ${name} vient de ${city}, ${country}`);
        const text = document.createElement('p');
        text.textContent = tagline;
        text.setAttribute('aria-label', `La devise de ${name} est : "${tagline}"`);
        const dayPrice = document.createElement('p'); 
        dayPrice.textContent = price + '€/jour';
        dayPrice.setAttribute('aria-label', `La prestation de ce photographe est de ${price} par jour`);

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
        const photographHeader = document.createElement("div");
        photographHeader.classList.add("header__container")

        const infoLeft = document.createElement('article');
        infoLeft.classList.add("infoLeft");

        const infoRight = document.createElement('article');
        infoRight.classList.add("infoRight");

        const btnCenter = document.createElement('div');
        btnCenter.classList.add("center__container");
        
        const btnContact = document.createElement('button');
        btnContact.textContent = "Contactez-moi";
        btnContact.classList.add("contact_button");
        btnContact.setAttribute('aria-label', `Bouton pour ouvrir le formulaire`);
        btnContact.setAttribute('role', `bouton`);
        btnCenter.appendChild(btnContact);

        btnContact.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(btnContact);
            displayModal();
        })
        
        photographHeader.appendChild(infoLeft);
        photographHeader.appendChild(btnCenter);
        photographHeader.appendChild(infoRight);

        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.classList.add('header__name');
        h1.setAttribute('aria-label', `Photographe ${name}`);

        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        location.classList.add("header__location");
        location.setAttribute('aria-label', `Le photographe ${name} vient de ${city}, ${country}`);

        const text = document.createElement('p');
        text.textContent = tagline;
        text.classList.add("header__tagline");
        text.setAttribute('aria-label', `La devise de ${name} est : "${tagline}"`);

        infoLeft.appendChild(h1);
        infoLeft.appendChild(location);
        infoLeft.appendChild(text);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add("header__imgContainer");
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.classList.add("header__img");
        img.setAttribute("alt", 'Photo de ' + name);

        imgContainer.appendChild(img);
        infoRight.appendChild(imgContainer);

        return photographHeader;
    }

    // On retourne les informations et les éléments que l'on souhaite utiliser dans la page

    return { getUserCardDOM , getHeaderPhotographer}
}

