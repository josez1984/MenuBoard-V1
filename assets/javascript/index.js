$(document).ready(function(){
    const app = new App({});

    var firebaseConfig = {
        apiKey: "AIzaSyAPOSDfU5G5VL00PY5sOUvfLAt_sxndovg",
        authDomain: "my-firebase-project-b51ee.firebaseapp.com",
        databaseURL: "https://my-firebase-project-b51ee.firebaseio.com",
        projectId: "my-firebase-project-b51ee",
        storageBucket: "my-firebase-project-b51ee.appspot.com",
        messagingSenderId: "546505648506"
    };

    firebase.initializeApp(firebaseConfig);
    var productsRef = firebase.database().ref('/products/');

    productsRef.once('value').then(function(snapshot) {
        refreshCards(app, snapshot.val());
    });

    productsRef.on("value", function(snapshot) {
        refreshCards(app, snapshot.val());
        // if (snapshot.child("highestBidData/highPrice").exists() && snapshot.child("highestBidData/highPrice").exists()) {       
        // } else {
        // }
      // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

function refreshCards(app, productsObj) {
    $(".card-columns").empty();
    $.each(productsObj, function(key, value) {
        console.log(value);

        if(value.inStock === 'true') {
            // var priceDisplay = '';
            // if(value.hasOwnProperty('pricingData')) {
            //     priceDisplay = value.pricingData.pricePlusTax;
            // }
    
            var htmlCardString = app.htmlCard(value);
            $(".card-columns").prepend(htmlCardString);
        }
    });

}