// Fonctions d'ouverture et fermeture de la modal

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Fonction submit et listener du bouton de formulaire

const submitBtn = document.getElementById("submit_button");

function submit() {
    let firstname = document.getElementById('firstname').value
    console.log("Prénom :  " + firstname)
    let lastname = document.getElementById('lastname').value
    console.log("Nom : " + lastname)
    let email = document.getElementById('email').value
    console.log("Email : " + email)
    if (document.getElementById('yourmessage').value) {
        let yourmessage = document.getElementById('yourmessage').value
        console.log("Message : " + yourmessage)
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submit();
})