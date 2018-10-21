$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    firebase.initializeApp(app.firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed IN');
            document.location.replace("menu.html");
        } else {
          // User is signed out.
          console.log('User is signed out');
        }
    });

    $("#btn-login").on("click", function(event){    
        event.preventDefault();

        var email = $("#input-email").val();
        var password = $("#input-password").val();

        // Add login functionality here....
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    });
});
