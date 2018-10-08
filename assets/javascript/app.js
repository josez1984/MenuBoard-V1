class App {
    constructor(params) {
        this.defaultEntertainmentDescription = "Our priority is always the customer";
        this.defaultEntertainmentContent = "We have always had the philosophy that our customers are our number 1 priority. You can rest assured we go above and beyond to make sure you are 100% satisfied with your experience with us.";
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

    updateEntertainmentContent() {
        firebase.database().ref('/newsApiKey').once('value').then(function(snapshot) {
            if(snapshot.val().length > 0) {
                var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + snapshot.val();
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var randN = Math.floor(Math.random() * response.articles.length);
                    var description = response.articles[randN].description;
                    var content = response.articles[randN].content;

                    if(description.length === 'null' && content.length === 'null') {
                        description = this.defaultEntertainmentDescription;
                        content = this.defaultEntertainmentContent;
                    }

                    $("#entertainment-section").empty();
                    $("#entertainment-section").append('<p>' + description + '</p>');
                    $("#entertainment-section").append('<p>' + content + '</p>');
                });
            }
        });
    }
}