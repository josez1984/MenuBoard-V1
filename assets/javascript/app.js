class App {
    constructor(params) {
        this.dataTables = [];
    }
    //     this.difficulty = params.difficulty;
    //     this.showHost = 1;
    //     this.questionKey = 0;
    //     this.questions = [
    //         {
    //             question: "What is pusheen's gender?",
    //             choices: {
    //                 1: "Male",
    //                 2: "Female"
    //             },
    //             correctChoice: 2,
    //             alreadyAsked: 0
    //         },            
    //     ];
    // }

    htmlProductTableRow(productObj) {
        var price1 = '';
        var price2 = '';

        if(productObj.pricingData.hasOwnProperty(0)) {
            price1 = productObj.pricingData[0].amount + ' X ' + productObj.pricingData[0].pricePlusTax;
        }

        if(productObj.pricingData.hasOwnProperty(1)) {
            price2 = productObj.pricingData[1].amount + ' X ' + productObj.pricingData[1].pricePlusTax;
        }

        return '<tr>'
                   + '<th scope="row">' + productObj.name + '</th>'
                   + '<td>' + price1 + '</td>'
                   + '<td>' + price2 + '</td>'
               + '</tr>';
    }

    htmlColProductTable(htmlTable) {
        var html = '<div class="row-sm">'
                        + htmlTable
                    + '</div>'
        return html;
    }

    htmlProductTable(categoryName, tableId, tableBodyId) {
        return '<h3 class="text-center">' + categoryName + '</h3>'
                + '<table id="' + tableId + '" class="table table-sm">'
                    + '<thead>'
                        + '<tr>'
                            + '<th scope="col">Product</th>'
                            + '<th scope="col">Price Per</th>'
                            + '<th scope="col">Price Per</th>'
                        + '</tr>'
                    + '</thead>'
                    + '<tbody id="' + tableBodyId + '">'
                    + '</tbody>'
                + '</table>';
    }

    htmlCard(productObj) {
        var htmlString = '<div class="card text-center">'
                            + '<div class="card-body">'
                                + '<h1 class="card-title">' + productObj.name + '</h1>';
        
        if(productObj.hasOwnProperty('pricingData')) {
            htmlString = htmlString + '<h5 class="card-text">Price: ' + productObj.pricingData.pricePlusTax + '</h5>';
        }

        if(productObj.hasOwnProperty('strain')) {
            htmlString = htmlString + '<h5 class="card-text">Strain: ' + productObj.strain + '</h5>';
        }

        htmlString = htmlString + '<p class="card-text"><small class="text-muted">In Stock</small></p>'                    
                            + '</div>'
                        + '</div>';

        return htmlString;
    }
}