// See LICENSE for usage information

// The following lines allow the ping function to be loaded via commonjs, AMD,
// and script tags, directly into window globals.
// Thanks to https://github.com/umdjs/umd/blob/master/templates/returnExports.js
// (function (root, factory) { if (typeof define === 'function' && define.amd) { define([], factory); } else if (typeof module === 'object' && module.exports) { module.exports = factory(); } else { root.ping = factory(); }
// }(this, function () {

/**
 * Creates and loads an image element by url.
 * @param  {String} url
 * @return {Promise} promise that resolves to an image element or
 *                   fails to an Error.
 */
function request_image(url) {
    return new Promise(function(resolve, reject) {
        let img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => reject(url));
        img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
}

/**
 * Pings a url.
 * @param  {String} url
 * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
 * @return {Promise} promise that resolves to a ping (ms, float).
 */
function ping(url, multiplier) {
    return new Promise(function(resolve, reject) {
        let start = (new Date()).getTime();
        let response = function() {
            var delta = ((new Date()).getTime() - start);
            delta *= (multiplier || 1);
            resolve(delta);
        };
        request_image(url).then(response).catch(response);

        // Set a timeout for max-pings, 5s.
        setTimeout(function() { reject(Error('Timeout')); }, 5000);
    });
}

/**
 * Checks that the URL given exists. Since the default does not, even bad URL's always succeed some low ping.
 * Note that checking that the URL "exists"/is online fails when the remote server does not enable CORS requests,
 * so usefulness is quite limited.
 * Unfortunately, there doesn't seem to be any better solution / middleground for browser-based JS. If possible,
 * verifying that the URL is alive should be done server-side..
 * @param {String} url
 * @param {Number} multiplier - optional, factor to adjust the ping by.  0.8-0.9? works well for HTTP servers.
 * @returns {Promise} promise that resolves to to a ping (ms, float), or
 */
function existsPing(url, multiplier) {
    return new Promise(function(resolve, reject) {
        fetch(url).then(function(response) {
            ping(url, multiplier).then(resolve).catch(reject);
        }).catch(function(error) {
            reject('URL could not be fetched. Either it doesn\'t exist, or there is a CORS issue.\n' +
                'Official error is: ', error);
        });
    });
}
// return {ping, existsPing};
// }));

export default ping;
export {existsPing};