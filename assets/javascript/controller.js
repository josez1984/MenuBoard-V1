function initFirebase(app) {
    firebase.initializeApp(app.firebaseConfig);
}

function setupNewsFeed(app) {
    firebase.database().ref('/newsApiKey').once('value').then(function(snapshot) {
        app.updateEntertainmentContent(snapshot.val(), app.defaultEntertainmentContent, app.defaultEntertainmentDescription);
        app.entIntervalId = setInterval(function(){
            app.updateEntertainmentContent(snapshot.val(), app.defaultEntertainmentContent, app.defaultEntertainmentDescription);
        }, 60000);
    });
}

function setupWeatherFeed(app) {
    firebase.database().ref('/location/zipCode').once('value').then(function(snapshot) {
        firebase.database().ref('/weatherApiKey').once('value').then(function(snapshot2) {
            var intervalId = setInterval(function(){
                app.updateWeather(snapshot.val(), snapshot2.val(), intervalId);
            }, 60000);
        });
    });
}

function setupProductsFeed(app) {
    var productsRef = firebase.database().ref('/products/' + app.userId);

    productsRef.once('value').then(function(snapshot) {
        refreshData(app, snapshot.val());
    });

    productsRef.on("value", function(snapshot) {
        refreshData(app, snapshot.val());
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function setupDiscountsFeed(app) {
    var discountsRef = firebase.database().ref('/discounts/' + app.userId);

    discountsRef.once('value').then(function(snapshot) {
        refreshDiscountData(app, snapshot.val());
    });

    discountsRef.on("value", function(snapshot) {
        refreshDiscountData(app, snapshot.val());
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function setupAuthFeed(app) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed IN');
            setupProductsFeed(app);
            setupDiscountsFeed(app);            
        } else {
          console.log('User is signed out');
        }
    });
}

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

    $("#menu-content-cards-div").empty();

    var productCategories = Object.keys(sortedData);
    for(var i = 0; i < productCategories.length; i++) {
        var productCount = 0;
        $.each(sortedData[productCategories[i]], function(key, value){
            if(value.inStock === 'true' && value.requiresInventory === 'true') {
                productCount++;
            } else if(value.requiresInventory !== 'true') {
                productCount++;
            } 
        });

        if(productCount > 0) {
            var id = i + 1;
            var htmlTable = app.htmlProductTable(productCategories[i], 'table-' + id, 'table-body-' + id);
            var card = app.htmlCard('card-' + id);

            $("#menu-content-cards-div").append(card);
            $("#card-" + id).append(htmlTable);

            $.each(sortedData[productCategories[i]], function(key, value){
                if((value.inStock === 'true' && value.requiresInventory === 'true') || value.requiresInventory !== 'true') {
                    var tblRow = app.htmlProductTableRow(value);
                    $("#" + 'table-body-' + id).prepend(tblRow);
                }
            });
        }
    }
}

