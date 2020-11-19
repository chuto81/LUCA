/*
* main() will be run when you invoke this action
* @param Cloud Functions actions accept a single parameter, which must be a JSON object.
* @return The output of this action, which must be a JSON object.
*/

function main(params) {

    var request = require('request')
    var url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices'
    
    var promise = new Promise(function(resolve, reject) {request(
        { method: 'GET',
        url: url + '/browsequotes/v1.0/CO/COP/es-MX/BOG/CTG/2019-09-14?inboundpartialdate=0',
        headers:
        {
            'X-RapidAPI-Host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            'X-RapidAPI-Key': "ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c" }
        },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var j = JSON.parse(body);
                    resolve(j);
                } else {
                    console.log('body:', body);
                    reject({
                        error: error,
                        response: response,
                        body: body
                    });
                }
            });
        });
    
        return promise
    }