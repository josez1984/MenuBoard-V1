$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    
    $("#btn-signup").on("click", function(event){    
        event.preventDefault();
        firebase.initializeApp(app.firebaseConfig);
        
        var email = $("#input-email").val();
        var password = $("#input-password").val();
    
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        
        var errorCaught = 0;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            errorCaught = 1;
            if (error.code == 'auth/weak-password') {
                app.genericModal('The password is too weak.',function(){});
            } else {
                app.genericModal(error.message,function(){});
            }
        }).then(function(){
            if(errorCaught === 0) {
                app.genericModal(
                    "You have successfully signed up for MenuBoard! Now, within BioTrackTHC, enter the same Email and Password in the MenuBoard menu item to link that location's product data to this specific MenuBoard account",
                    function(){
                        document.location.replace("menu.html");
                    }                
                )
            }
        });
    });
});
