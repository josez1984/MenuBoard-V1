$(document).ready(function(){
    var menuId = $("body").attr("data-menu-id");

    const app = new App({
        currentMenu: menuId
    });
    
    firebase.initializeApp(app.firebaseConfig);

    $('#page-main-content').find("*").each(function(idx, val){
        var elemId = $(this).attr("id");
        if(elemId) {
            app.domTemplate[elemId] = false;
        }        
    });

    $("#accordion-template-config").empty();
    $("#template-form").empty();

    $.each(app.domTemplate, function(key, val) {        
        $("#" + key).prepend('<p id="overlay-text-' + key + '" class="overlay">' + key + '</p>');                                                          
        $("#accordion-template-config").append(getCollapsibleCard(key));
    });

    $('#chkbx-overlay-elem-id').change(function() {
        var checkBox = this;
        $.each(app.domTemplate, function(key, val) {
            if(checkBox.checked) {                
                $("#overlay-text-" + key).show();
            } else {                
                $("#overlay-text-" + key).hide();
            }            
        });
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var templateRef = firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu);            
            templateRef.once('value').then(function(snapshot) {     
                $.each(snapshot.val(), function(elemId, val) {                    
                    if(val !== "false") {                    
                        $.each(val, function(dataRecordId, dataRecords) {                        
                            $.each(dataRecords, function(cssKey, cssVal) {                                
                                if(cssKey && cssVal) {
                                    $("#" + elemId).css(cssKey, cssVal);
                                    insertCustomCssRow({
                                        "app": app, 
                                        "cssKey": cssKey , 
                                        "cssVal": cssVal, 
                                        "dataRecordId": dataRecordId, 
                                        "elemId": elemId
                                    });
                                }
                            });
                        });
                    }
                });
            });
            
            $("#accordion-template-config").on("click", ".btn-remove-css", function(){
                var elemId = $(this).attr("data-id");
                var cssClass = $(this).attr("data-css-class");
                var rowId = $(this).attr("data-row-id");

                $("#" + elemId).css(cssClass, '');
                $("#" + rowId).remove();

                var user = firebase.auth().currentUser;
                if(user) {
                    var dataRecordId = $(this).attr("data-record-id");
                    firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId + '/' + dataRecordId + '/').remove();                        
                }
            });

            $("#accordion-template-config").on("click", ".btn-template-apply", function(event){
                event.preventDefault();

                var user = firebase.auth().currentUser;
                var elemId = $(this).attr("data-elem-id");
                var cssClass = $("#input-key-" + elemId).val();
                var cssValue = $("#input-value-" + elemId).val();

                $("#input-key-" + elemId).val("");
                $("#input-value-" + elemId).val("");  

                if(cssClass && cssValue) {
                    $("#" + elemId).css(cssClass, cssValue);                     
                    var dataRecordId = '';
                    if(user) {
                        var payload = {};
                        payload[cssClass] = cssValue;                        
                        dataRecordId = firebase.database().ref('/menu-templates/' + user.uid + '/' + app.currentMenu + '/' + elemId).push(payload).key;
                    }
                    
                    insertCustomCssRow({
                        "app": app, 
                        "cssKey": cssClass , 
                        "cssVal": cssValue, 
                        "dataRecordId": dataRecordId, 
                        "elemId": elemId
                    });
                }                
                $("#input-key-" + elemId).focus();
            });
        } else {
          // User is signed out.
          document.location.replace("index.html");
        }
    });
});

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

function insertCustomCssRow(args) {
    var id = args.app.randN(100000,10000000000);                                    
    var row = $('<tr id="row-id-' + id + '">');
    row.append($('<td>' + args.cssKey + '</td>'));
    row.append($('<td>' + args.cssVal + '</td>'));
    row.append($('<td><button data-record-id="' + args.dataRecordId + '" data-row-id="row-id-' + id + '" data-css-class="' + args.cssKey + '" data-id="' + args.elemId + '" class="btn btn-remove-css">Remove</button></td>'));
    $("#custom-template-table-" + args.elemId).prepend(row);
}