/**
 * Creates and loads an image element by url.
 * @param  {String} url
 * @return {Promise} promise that resolves to an image element or
 *                   fails to an Error.
 */
var request_image = function(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = function() { reject(url); };
        img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
};

/**
 * Pings a url.
 * @param  {String} url
 * @return {Promise} promise that resolves to a ping (ms, float).
 */
var ping = function(url) {
    return new Promise(function(resolve, reject) {
        var start = (new Date()).getTime();
        var response = function() { 
            var delta = ((new Date()).getTime() - start);
            
            // HACK: Use a fudge factor to correct the ping for HTTP bulk.
            delta /= 4;
            
            resolve(delta); 
        };
        request_image(url).then(response).catch(response);
        
        // Set a timeout for max-pings, 5s.
        setTimeout(function() { reject(Error('Timeout')); }, 5000);
    });
};
