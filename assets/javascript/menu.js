$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');

    var menuId = $("body").attr("data-menu-id");

    $("#current-menu-status").text(menuId);

    const app = new App({
        "currentMenu": menuId,
        "showCustomCssGui": $("body").attr("data-show-css-editor")
    });

    var cssEditor = new CssEditor({
        "currentMenu": menuId
    });

    $("#entertainment-section").append('<p>' + app.defaultEntertainmentDescription + '</p>');
    $("#entertainment-section").append('<p>' + app.defaultEntertainmentContent + '</p>');

    firebase.initializeApp(app.firebaseConfig);

    firebase.database().ref('/newsApiKey').once('value').then(function(snapshot) {
        app.updateEntertainmentContent(snapshot.val(), app.defaultEntertainmentContent, app.defaultEntertainmentDescription);
        app.entIntervalId = setInterval(function(){
            app.updateEntertainmentContent(snapshot.val(), app.defaultEntertainmentContent, app.defaultEntertainmentDescription);
        }, 60000);
        
    });

    firebase.database().ref('/location/zipCode').once('value').then(function(snapshot) {
        firebase.database().ref('/weatherApiKey').once('value').then(function(snapshot2) {
            var intervalId = setInterval(function(){
                app.updateWeather(snapshot.val(), snapshot2.val(), intervalId);
            }, 60000);
        });
    });
    
    // CSS Editor //
    cssEditor.clearCssEditor();    
    app.domTemplate = cssEditor.getDomTemplate();
    app.domTemplate["main-body"] = false;
    cssEditor.loadCssDomWidgets(app.domTemplate);
    cssEditor.overlayElementIdChkbtn(app.domTemplate);
    // CSS Editor //

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed IN');

            // CSS Editor //
            cssEditor.loadSaveCssData(user, app);
            cssEditor.rmCustomCssBtnClick(app);
            cssEditor.applyCssBtnClick(app);

            var productsRef = firebase.database().ref('/products/' + user.uid);
            var discountsRef = firebase.database().ref('/discounts/' + user.uid);
        
            productsRef.once('value').then(function(snapshot) {
                refreshData(app, snapshot.val());
            });
        
            discountsRef.once('value').then(function(snapshot) {
                refreshDiscountData(app, snapshot.val());
            });
        
            productsRef.on("value", function(snapshot) {
                refreshData(app, snapshot.val());
              }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        
            discountsRef.on("value", function(snapshot) {
                refreshDiscountData(app, snapshot.val());
              }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } else {
          // User is signed out.
          console.log('User is signed out');
        }
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

