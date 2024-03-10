    // On appelle les fonctions et éléments pour les placer sur notre page.
    
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographersSection.innerHTML="";
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
