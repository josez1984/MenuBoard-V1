class App {
    constructor(params) {
        this.currentMenu = params.currentMenu;
        this.showCustomCssGui = params.showCustomCssGui;
        this.domTemplate = {};

        this.defaultEntertainmentDescription = "Our priority is always the customer";
        this.defaultEntertainmentContent = "We have always had the philosophy that our customers are our number 1 priority. You can rest assured we go above and beyond to make sure you are 100% satisfied with your experience with us.";
        
        this.firebaseConfig = {
            apiKey: "AIzaSyAPOSDfU5G5VL00PY5sOUvfLAt_sxndovg",
            authDomain: "my-firebase-project-b51ee.firebaseapp.com",
            databaseURL: "https://my-firebase-project-b51ee.firebaseio.com",
            projectId: "my-firebase-project-b51ee",
            storageBucket: "my-firebase-project-b51ee.appspot.com",
            messagingSenderId: "546505648506"
        };
    }
    
    htmlProductTableRow(productObj) {
        if(productObj.pricingData !== null && typeof productObj.pricingData === 'object') {
            var price1 = productObj.pricingData[0].amount + ' X ' + productObj.pricingData[0].pricePlusTax;
            return '<tr>'
                       + '<th class="main-font" scope="row">' + productObj.name + '</th>'
                       + '<td class="main-font">' + price1 + '</td>'
                   + '</tr>';
        }
    }

    htmlColProductTable(htmlTable) {
        var html = '<div class="row-sm p-1">'
                        + '<div class="col-sm box-clear-dark p-1">'
                            + htmlTable
                        + '</div>'
                    + '</div>'
        return html;
    }

    htmlProductTable(categoryName, tableId, tableBodyId) {
        return '<h6 class="text-center box-clear-dark p-2 main-font">' + categoryName + '</h6>'
                + '<table id="' + tableId + '" class="table table-sm box-clear-dark p-1">'
                    + '<tbody id="' + tableBodyId + '" class="box-clear-dark">'
                    + '</tbody>'
                + '</table>';
    }

    htmlCard(cardId) {
        return '<div class="card text-center box-clear-dark">'
                + '<div id="' + cardId + '" class="card-body box-clear-dark">'                                   
                + '</div>'
            + '</div>';
    }

    randN(multiplier, plus) {
        return Math.floor(Math.random() * multiplier) + plus;
    }

    updateWeather(arg1, arg2, intervalId) {
        if(arg1 !== null && arg2 !== null) {               
            var queryURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + arg1 + ',us&APPID=' + arg2 + '&units=imperial';
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                clearInterval(intervalId);
                $("#weather-div").empty();                
                $("#weather-table-body").append($('<tr><th>In ' + response.name + '</th></tr>'));
                $("#weather-table-body").append($('<tr><th>Temperature: ' + response.main.temp + ' F</th></tr>'));
                $("#weather-table-body").append($('<tr><th>Condition: ' + response.weather[0].description + '</th></tr>'));
                $("#weather-table-body").append($('<tr><th>Wind Speed: ' + response.wind.speed + '</th></tr>'));
            });
        }
    }

    updateEntertainmentContent(arg1, arg2, arg3) {
        console.log('from updateEntertainmentContent');
        if(arg1 !== null && typeof arg1 === 'string') {
            var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + arg1;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var randN = Math.floor(Math.random() * response.articles.length);
                var description = response.articles[randN].description;
                var content = response.articles[randN].content;

                if(description === null && content === null) {
                    description = arg3;
                    content = arg2;
                }

                $("#entertainment-section").empty();
                $("#entertainment-section").append('<p>' + description + '</p>');
                $("#entertainment-section").append('<p>' + content + '</p>');
            });
        }
    }

    genericModal(text, cbFn) {
        bootbox.confirm({
            closeButton: false,
            message: text,
            buttons: {
                confirm: {
                    label: 'Ok',
                    className: 'btn-success'
                }
            },
            callback: cbFn
        });
    }
}   