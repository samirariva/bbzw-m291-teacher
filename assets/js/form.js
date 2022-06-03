const submit = document.getElementById("submit")
const email = document.getElementById("email")
const vorname = document.getElementById("firstname")
const nachname  = document.getElementById("lastname")
const farbe = document.getElementById("lieblingsschmuckfarbe")
submit.disabled = true

const validate = () => {
    if (email.value == "") {
        submit.disabled = true
    } else {
        submit.disabled = false
    }
}

email.addEventListener("keyup", (event) => {
    validate()
})


submit.addEventListener("click", async (event) => {
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

})
