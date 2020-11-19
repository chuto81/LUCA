/*
 * main() will be run when you invoke this action
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 * @return The output of this action, which must be a JSON object.
 */

function main(params) {

var request = require('request');
var key_post  = '5e7ebd89-5b6a-434d-9440-62344d8fc286';
var sortType = 'price';
var sortOrder= 'asc';
var stops = '0';
var pageIndex = '0';
var pageSize = '5';

var getSearchData = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/";

var headers = {
    'X-RapidAPI-Host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    'X-RapidAPI-Key': "ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c"
};

var url = getSearchData;
url += key_post;
url += '?sortType=' + sortType;
url += '&sortOrder=' + sortOrder;
url += '&stops=' + stops;
url += '&pageIndex=' + pageIndex;
url += '&pageSize=' + pageSize;

var promise = new Promise(function (resolve, reject) {
    request.get({
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
    })
});

return promise

}