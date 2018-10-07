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
        refreshData(app, snapshot.val());
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
});

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
        var ref = sortedData[productCategories[i]];
        var id = i + 1;
        var tableId = 'table-' + id;
        var tableBodyId = 'table-body-' + id;
        var htmlTable = app.htmlProductTable(productCategories[i], tableId, tableBodyId);
        // menu-bottom-row
        if(id == 1) {
            $("#menu-content-top-left").append(htmlTable);
        } else {
            var htmlCol = app.htmlColProductTable(htmlTable);
            console.log(htmlCol);
            $("#menu-content-bottom-row").append(htmlCol);
        }

        $.each(ref, function(key, value){
            console.log(tableId);
            var tblRow = app.htmlProductTableRow(value);
            $("#" + tableBodyId).prepend(tblRow);
        });
    }
}