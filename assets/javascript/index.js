$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');

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
    var discountsRef = firebase.database().ref('/discounts/');

    productsRef.once('value').then(function(snapshot) {
        refreshData(app, snapshot.val());
    });

    discountsRef.once('value').then(function(snapshot) {
        console.log(app, snapshot.val());
        refreshDiscountData(app, snapshot.val());
    });

    productsRef.on("value", function(snapshot) {
        refreshData(app, snapshot.val());
        // if (snapshot.child("highestBidData/highPrice").exists() && snapshot.child("highestBidData/highPrice").exists()) {       
        // } else {
        // }
      // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    discountsRef.on("value", function(snapshot) {
        refreshDiscountData(app, snapshot.val());
        // if (snapshot.child("highestBidData/highPrice").exists() && snapshot.child("highestBidData/highPrice").exists()) {       
        // } else {
        // }
      // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

function refreshDiscountData(app, discountsObj) {
    $("#discounts-table-body").empty();
    $.each(discountsObj, function(key, value) {
        if(value !== null && typeof value === 'object') {
            $("#discounts-table-body").append($('<tr><th>' + value.name + '</th></tr>'));
        }
    });
}

function refreshData(app, productsObj) {
    var sortedData = {};
    $.each(productsObj, function(key, value) {
        var catName = value.productCategoryName;
        if(sortedData.hasOwnProperty(catName)) {
            sortedData[catName].push(value);
        } else {
            sortedData[catName] = [];
            sortedData[catName].push(value);
        }
    });

    $("#menu-content-top-left").empty();
    $("#menu-content-bottom-row").empty();

    var productCategories = Object.keys(sortedData);
    for(var i = 0; i < productCategories.length; i++) {
        var id = i + 1;
        var htmlTable = app.htmlProductTable(productCategories[i], 'table-' + id, 'table-body-' + id);

        if(id == 1) {
            $("#menu-content-top-left").append(htmlTable);
        } else {
            var htmlCol = app.htmlColProductTable(htmlTable);
            $("#menu-content-bottom-row").append(htmlCol);
        }

        $.each(sortedData[productCategories[i]], function(key, value){
            if(value.inStock === 'true') {
                var tblRow = app.htmlProductTableRow(value);
                $("#" + 'table-body-' + id).prepend(tblRow);
            }
        });
    }
}

