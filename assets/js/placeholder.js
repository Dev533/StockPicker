$(document).ready(function(){



$('#signIn').on("click", function(e) {
    console.log('hi')
    // Prevents page from reloading if user presses Enter.
    e.preventDefault();

    var email = $('#inputEmail').val().trim()
    var password = $('#inputPassword').val().trim()

    localStorage.clear()

    localStorage.setItem("name", email)
    localStorage.setItem("password", password)


})

