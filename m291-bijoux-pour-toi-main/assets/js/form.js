const submit = document.getElementById("submit")
const email = document.getElementById("email")
const vorname = document.getElementById("firstname")
const nachname = document.getElementById("lastname")
const farbe = document.getElementById("lieblingsschmuckfarbe")
const firstNameLabel = document.getElementById("firstNameLabel")
const lastNameLabel = document.getElementById("lastNameLabel")
const emailLabel = document.getElementById("emailLabel")
const form = document.getElementById("form")

submit.disabled = true

form.addEventListener("change", () => {
    validate()
})

vorname.addEventListener("change", () => {
    validateFirstname()

})

nachname.addEventListener("change", () => {
    validateLastName()
})

email.addEventListener("change", () => {
    validateEmail()
})


const validateFirstname = () => {
    if (vorname.value.length < 3) {
        firstNameLabel.classList.remove("hide")
        return true
    } else {
        firstNameLabel.classList.add("hide")
        return false
    }
}

const validateLastName = () => {
    if (nachname.value.length < 3) {
        lastNameLabel.classList.remove("hide")
        return true
    } else {
        lastNameLabel.classList.add("hide")
        return false
    }
}

const validateEmail = () => {
    if (!email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailLabel.classList.remove("hide")
        return true
    } else {
        emailLabel.classList.add("hide")
        return false
    }
}

const validate = () => {
    submit.disabled = email.value.length < 2 || vorname.value.length < 2 || nachname.value.length < 2
}



submit.addEventListener("click", async (event) => {
    if (!validateFirstname() && !validateLastName() && !validateEmail()) {
        event.preventDefault()
        const result = await databaseClient.insertInto("users", ["email", "vorname", "nachname", "farbe"], [email.value, vorname.value, nachname.value, farbe.value])
        if (result.error) {
            alert("Deine Eingaben waren leider nicht gültig. Bitte versuche nochmals :)")
            /*alert("Datenbank Fehler: " + JSON.stringify(result.error, null, 2))*/
        }
        else {
            // Weiterleitung auf die Game Page  
            location.href = "./game.html"
        }
    }

})
