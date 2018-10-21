$(document).ready(function(){    
    const app = new App({
        currentMenu: $("body").attr("data-template-id")
    });
    console.log(app.currentMenu);
    firebase.initializeApp(app.firebaseConfig);

    // $("body").find("*").each(function(idx, val){
    //     var elemId = $(this).attr("id");
    //     app.domTemplate[elemId] = false;
    // });

    $("#main-page-content").find("*").each(function(idx, val) {
        // var elemId = $(this).attr("id");
        app.domTemplate[$(this).attr("id")] = false;
    });

    $("#accordion-template-config").empty();
    $("#template-form").empty();

    console.log("Checking DOM first...");
    $.each(app.domTemplate, function(elemId, val) {
        $("#" + elemId).prepend('<p class="overlay">' + elemId + '</p>');      
        var collapsibleCard = getCollapsibleCard(elemId);                                                                              
        $("#accordion-template-config").append(collapsibleCard);
        console.log(elemId);
        console.log(val);
        if(elemId && val) {
            $.each(val, function(key1, val1) {
                $.each(val1, function(key2, val2) {
                    if(key2 && val2) {
                        $("#" + elemId).css(key2, val2);
                        var id = app.randN(100000,10000000000);                                
                        var row = customCssRow(id, cssClass, cssValue, key1, elemId);
                        $("#custom-template-table-" + elemId).prepend(row);
                    }
                });
            });
        }
    });
    console.log("Finished checking DOM.");

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // INITIAL PUSH OF TEMPLATE OBJECT //
    //         // firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu).set(app.domTemplate);
    //         // INITIAL PUSH OF TEMPLATE OBJECT //

    //         var templateRef = firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu);
            
    //         templateRef.once('value').then(function(snapshot) {
    //             console.log("Retreiving template from the cloud.");
    //             $.each(snapshot.val(), function(key, val) {
    //                 $("#" + key).prepend('<p class="overlay">' + key + '</p>');                                                                                    
    //                 $("#accordion-template-config").append(getCollapsibleCard(key));

    //                 $.each(val, function(key1, val1) {
    //                     $.each(val1, function(key2, val2) {
    //                         if(key2 && val2) {
    //                             $("#" + key).css(key2, val2);
    //                             var id = app.randN(100000,10000000000);                                
    //                             var row = customCssRow(id, cssClass, cssValue, key1, key);
    //                             $("#custom-template-table-" + key).prepend(row);
    //                             // var row = $('<tr id="row-id-' + id + '">');
    //                             // var td1 = $('<td>' + key2 + '</td>');
    //                             // var td2 = $('<td>' + val2 + '</td>');          
    //                             // var td3 = $('<td><button data-record-id="' + key1 + '" data-row-id="row-id-' + id + '" data-css-class="' + key2 + '" data-id="' + key + '" class="btn btn-remove-css">Remove</button></td>');

    //                             // row.append(td1);
    //                             // row.append(td2);
    //                             // row.append(td3);

    //                             // $("#custom-template-table-" + key).prepend(row);
    //                         }
    //                     });
    //                 });
    //             });
    //         });
            
    //         $("#accordion-template-config").on("click", ".btn-remove-css", function(){
    //             console.log("Removing CSS Class...");
    //             var elemId = $(this).attr("data-id");
    //             var cssClass = $(this).attr("data-css-class");
    //             var rowId = $(this).attr("data-row-id");
    //             $("#" + elemId).css(cssClass, '');
    //             $("#" + rowId).remove();
    //             var user = firebase.auth().currentUser;
    //             if(user) {
    //                 var dataRecordId = $(this).attr("data-record-id");
    //                 firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId + '/' + dataRecordId + '/').remove();    

    //                 var ref = firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId);
    //                 ref.once("value").then(function(snapshot) {
    //                     if(!snapshot.exists()) {
    //                         firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId).set("false");
    //                     }
    //                 });

                    
    //             }
    //         });

    //         $("#accordion-template-config").on("click", ".btn-template-apply", function(event){
    //             event.preventDefault();
    //             var user = firebase.auth().currentUser;
    //             var elemId = $(this).attr("data-elem-id");
    //             var cssClass = $("#input-key-" + elemId).val();
    //             var cssValue = $("#input-value-" + elemId).val();
    //             $("#input-key-" + elemId).val("");
    //             $("#input-value-" + elemId).val("");  
    //             if(cssClass && cssValue) {
    //                 $("#" + elemId).css(cssClass, cssValue); 

    //                 var id = app.randN(100000,10000000000);
    //                 var key1 = '';

    //                 if(user) {
    //                     var payload = {};
    //                     payload[cssClass] = cssValue;                        
    //                     key1 = firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId).push(payload).key;
    //                 }

    //                 var row = getCustomCssRow(id, cssClass, cssValue, key1, elemId);
    //                 $("#custom-template-table-" + elemId).prepend(row);
    //             }                
    //             $("#input-key-" + elemId).focus();
    //         });
    //     } else {
    //       // User is signed out.
    //       document.location.replace("index.html");
    //     }
    // });
});

function getCustomCssRow(id, cssClass, cssValue, key1, elemId) {
    var row = $('<tr id="row-id-' + id + '">');
    row.append($('<td>' + cssClass + '</td>'));
    row.append($('<td>' + cssValue + '</td>'));
    row.append($('<td><button data-record-id="' + key1 + '" data-row-id="row-id-' + id + '" data-css-class="' + cssClass + '" data-id="' + elemId + '" class="btn btn-remove-css">Remove</button></td>'));
    return row;
}

function refreshCustomCssWidgets(app) {

}

function getCollapsibleCard(key) {
    return '<div class="card">'
        + '<div class="card-header" id="heading-' + key + '">'
            + '<h5 class="mb-0">'
                + '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-' + key + '" aria-expanded="true" aria-controls="collapse-' + key + '">'
                    + key
                + '</button>'
            + '</h5>'
        + '</div>'                                
        + '<div id="collapse-' + key + '" class="collapse" aria-labelledby="heading-' + key + '" data-parent="#accordion-template-config">'
            + '<div id="card-body-' + key + '" class="card-body">'                                
                + '<form>'
                    + '<div class="form-group">'                          
                        + '<label for="' + key + '">HTML Element ID: ' + key + '</label>'
                        + '<input id="input-key-' + key + '" data-elem-id="' + key + '" class="form-control template-form-ctrl" type="text" name="' + key + '" placeholder="CSS Class">'
                        + '<input id="input-value-' + key + '" data-elem-id="' + key + '" class="form-control" type="text" name="' + key + '" placeholder="CSS Class Value">'
                        + '<div class="form-group"><button data-elem-id="' + key + '" class="btn btn-primary btn-template-apply" type="submit">Apply</button></div>'
                    + '</div>'
                + '</form>'                    
                + '<table class="table table-striped">'
                    + '<thead>'
                        + '<tr>'                                            
                            + '<th scope="col">CSS Class</th>'
                            + '<th scope="col">Value</th>'
                            + '<th scope="col">Remove</th>'                                            
                        + '</tr>'
                    + '</thead>'
                    + '<tbody id="custom-template-table-' + key +'">'
                    + '</tbody>'
                + '</table>'                                    
            + '</div>'
        + '</div>'
    + '</div>';
}