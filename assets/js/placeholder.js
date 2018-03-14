$(document).ready(function () {

    $('#signIn').on("click", function (e) {
        console.log('hi')
        // Prevents page from reloading if user presses Enter.
        e.preventDefault();

        var email = $('#inputEmail').val().trim()
        var password = $('#inputPassword').val().trim()


        localStorage.setItem("name", email)
        localStorage.setItem("password", password)


        $('#container1').removeClass('mainpage')
        $('#container2').hide()

    })

    $('#watchListBTN').on("click", function () {

        stock = $('#watchListInput').val().trim()

        var counter = localStorage.getItem('counter');
        counter++;

        localStorage.setItem('stock' + counter, JSON.stringify(stock));
        counter++;

        localStorage.setItem('counter', counter);

    });

    $('#logout').on("click", function() {
        $('#container1').addClass('mainpage')
        $('#container2').show()
        localStorage.clear()
    

    })



})


