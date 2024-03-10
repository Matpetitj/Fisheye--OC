async function getPhotographers() {
    // Importe les datas du document .JSON
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