async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    return await fetch("./data/photographers.json")
    .then((res) => {      
        if (res.ok) {
            return res.json();
        }
    })
    .then((value) => {
        return (value)
    })
    .catch(function (err) {
        console.log(err);
        alert("Une erreur est survenue lors du chargement des données. Veuillez contacter l\'administrateur du site !");
    })
}