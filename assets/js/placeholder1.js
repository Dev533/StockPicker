$('#signIn').on("click", function (e) {
    console.log('hi')
    // Prevents page from reloading if user presses Enter.
    e.preventDefault();

    var email = $('#inputEmail').val().trim()
    var password = $('#inputPassword').val().trim()

    localStorage.clear()

    localStorage.setItem("name", email)
    localStorage.setItem("password", password)

    $('#container1').removeClass('mainpage')
    $('#container2').hide()

})

// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}    
