# pingjs
JavaScript ping API for use in a web browser context.  Released under the BSD-3-Clause license, see 
LICENSE.  

## Installation

There are three possible ways to install this.  

### HTML script tag

Drag and drop the ping.js file next to an HTML file.  Inside the `<head>` tag 
of the HTML file, use a script tag to load ping.js.  

```html
<script src="./ping.js"></script>
```

### NPM

`npm install --save web-pingjs`

### Bower

`bower install --save web-pingjs`

## Usage

This library uses a  [UMD header](https://github.com/umdjs/umd/blob/master/templates/returnExports.js) 
that allows it to be loaded as CommonJS, AMD, or a window global object.  

A single function is exported, `ping`.  Ping's signature follows:  

```js
/**
 * Pings a url.
 * @param  {String} url
 * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
 * @return {Promise} promise that resolves to a ping (ms, float).
 */
```

Example:  

```js
ping('https://google.com/').then(function(delta) {
    console.log('Ping time was ' + String(delta) + ' ms');
}).catch(function(err) {
    console.error('Could not ping remote URL', err);
});
```

## Caveats

The user should be aware that this method relies on the HTTP protocol to ping 
remote URLs.  Consequently, ping times are not as reliable as if they were 
performed using the ICMP protocol.  
