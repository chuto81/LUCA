/*
 * main() will be run when you invoke this action
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 * @return The output of this action, which must be a JSON object.
 */

function main(params) {

var request = require('request')
var url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/97e36eba-5e90-47f8-8148-24c8a2bffd35?sortType=price&sortOrder=asc&stops=0&pageIndex=0&pageSize=5"

var headers = {
        'X-RapidAPI-Host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        'X-RapidAPI-Key': "ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c"
    };

    var promise = new Promise(function(resolve, reject) {request(
    { method: 'GET',
    url: url,
    headers: headers,
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var j = JSON.parse(body);
            resolve(j);
        } else {
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