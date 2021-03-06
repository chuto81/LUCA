/*
 * main() will be run when you invoke this action
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 * @return The output of this action, which must be a JSON object.
 */

function main(params) {

var request = require('request');
var ciudaddestino = "CTG";
var ciudadorigen = "BOG";
var fechaida = "2020-03-15";
var fechavuelta  = "";
var pasajeros = "1";

var endPoints = {
    'buildSearch': 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0/',
    'getSearchData': 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'
};

var headers = {
    'X-RapidAPI-Host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    'X-RapidAPI-Key': "ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c"
};

var formData = {
    inboundDate: fechavuelta,
    cabinClass: 'economy',
    children: '0',
    infants: '0',
    includeCarriers: 'VH;LA',
    excludeCarriers: 'AV;EX',
    country: 'CO',
    currency: 'COP',
    locale: 'es-MX',
    originPlace: ciudadorigen  + "-sky",
    destinationPlace: ciudaddestino + "-sky",
    outboundDate: fechaida,
    adults: pasajeros
};

var promise = new Promise(function (resolve, reject) {
    request.post({
        url: endPoints.buildSearch,
        headers: headers,
        form: formData
    }, function (error, response, body) {
        if (!error && response.statusCode === 201) {
            //RateLimit 400 x Minuto = 429
            var loc = response.headers.location;
            var locSplit = loc.split('/');
            var key = locSplit[locSplit.length - 1];

            getPricingWithKey(key, 'price', 'asc', 0, 0, 5);
        } else {
            reject({
                error: error,
                response: response,
                body: body
        });
    }
})

function getPricingWithKey(key, sortType, sortOrder, stops, pageIndex, pageSize) {
    var url = endPoints.getSearchData;
    url += key;
    url += '?sortType=' + sortType;
    url += '&sortOrder=' + sortOrder;
    url += '&stops=' + stops;
    url += '&pageIndex=' + pageIndex;
    url += '&pageSize=' + pageSize;

    request.get({
        url: url,
        headers: headers,
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //RateLimit 400 x Minuto = 410
                var j = JSON.parse(body);
                var dataClaro = stripData(j);
                resolve(dataClaro);
            } else {
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        })
    }
});

function stripData(dataClaro){   
    var filteredData = [];
    var result = dataClaro.Itineraries;
    
    for(var i=0; i<result.length; i++){
        var tempObj = {
            InboundLegId: result[i].InboundLegId,
            OutboundLegId: result[i].OutboundLegId,
            price: result[i].PricingOptions[0].Price
        };
        filteredData.push(tempObj)
    }

    return filteredData

};

    return promise.then(function(filteredData){
        return filteredData
        //console.log(filteredData)
    });

}