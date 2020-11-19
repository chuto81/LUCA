/*main() will be run when you invoke this action
 *@param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *@return The output of this action, which must be a JSON object.*/

function main(params) {

    var request = require('request')
    /*var ciudaddestino = params.destino
    var ciudadorigen = params.origen
    var fechaida = params.ida
    var fechavuelta  = params.vuelta
    var pasajeros = params.personas*/
    
    var buildSearch = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0/';
    
    var headers = {
        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c'
    };
    
    var formData = {
        inboundDate: '2019-09-10' /*fechavuelta*/,
        cabinClass: 'economy',
        children: '0',
        infants: '0',
        includeCarriers: 'VH;LA',
        /*excludeCarriers: 'AV;EX',*/
        country: 'CO',
        currency: 'COP',
        locale: 'es-MX',
        originPlace: 'BOG' + '-sky' /*ciudadorigen*/,
        destinationPlace: 'MDE' + "-sky" /*ciudaddestino*/,
        outboundDate: '2019-09-02' /*fechaida*/,
        adults: '1' /*pasajeros*/
    };

    var promise = new Promise(function (resolve, reject) {
        request.post({
            url: buildSearch,
            headers: headers,
            form: formData
        }, function (error, response, body) {
            if (!error && response.statusCode === 201) {
                var loc = response.headers.location;
                var locSplit = loc.split('/');
                var key = locSplit[locSplit.length - 1];
                resolve({
                    error: {
                        key_post: key,
                        error: response.statusCode,
                    }
                })
            } else {
                reject({
                    error: response.statusCode,
                    response: response,
                    body: body,
                    key_post: '0',
                });
            }
        })
    });
    
    return promise
}