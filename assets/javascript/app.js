class App {
    constructor(params) {
 
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
        return '<h4 class="text-center box-clear-dark p-2 main-font">' + categoryName + '</h4>'
                + '<table id="' + tableId + '" class="table table-sm box-clear-dark p-1">'
                    + '<tbody id="' + tableBodyId + '" class="box-clear-dark">'
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