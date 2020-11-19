/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 function main(params) {

    var request = require('request')
    
    var endPoints = {
        'buildSearch': 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0/',
        'getSearchData': 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/'
    };
    
    var headers = {
        'X-RapidAPI-Host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        'X-RapidAPI-Key': "ccd0998f3amsh10e1fed69fc31afp14386ejsnb4fdf587810c"
    };
    
    var formData = {
        inboundDate: '2020-09-10',
        cabinClass: 'business',
        children: '0',
        infants: '0',
        country: 'US',
        currency: 'USD',
        locale: 'en-US',
        originPlace: 'SFO-sky',
        destinationPlace: 'LHR-sky',
        outboundDate: '2020-09-01',
        adults: '1'
    }
    
    
    var promise = new Promise(function (resolve, reject) {
        request.post({
            url: endPoints.buildSearch,
            headers: headers,
            form: formData
        }, function (error, response, body) {
            if (!error && response.statusCode === 201) {
                var loc = response.headers.location;
                var locSplit = loc.split('/');
                var key = locSplit[locSplit.length - 1];
            
                getPricingWithKey(key, 0, 10);
            } else {
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        })
    
        function getPricingWithKey(key, pageIndex, pageSize) {
            var url = endPoints.getSearchData;
            url += key;
            url += '?pageIndex=' + pageIndex;
            url += '&pageSize=' + pageSize;
        
            request.get({
                url: url,
                headers: headers,
                form: formData
            }, function (error, response, body) {
    
                if (!error && response.statusCode === 200) {
                    var j = JSON.parse(body);
                    resolve({id:j.Agents[0].Id});
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
    
        return promise
    }