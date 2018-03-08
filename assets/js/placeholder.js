//$(document).ready(function(){

   // var hotdog = "hotdog";
   // console.log(hotdog)
// })





$('#signIn').on("click", function(e) {
    // Prevents page from reloading if user presses Enter.
    e.preventDefault();

    var email = $('#inputEmail').val().trim()
    var password = $('#inputPassword').val().trim()

    localStorage.clear()

    localStorage.setItem("name", email)
    localStorage.setItem("password", password)


})
