# Glimmer Weather

A small Glimmer application to fetch your current location and display the daily summary.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone git@github.com:willrax/glimmer-weather.git`
* `cd weather`
* `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Fetching the Report

This app assumes that you're using the [Darksky](https://darksky.net/dev/) API. You'll also need to proxy these requets due to CORS. Here's a small Node app that can do it.j

```js
var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();
var apiServerHost = 'https://api.darksky.net/forecast/<YOUR_API_TOKEN>';

app.use(cors());

app.use('/', function(req, res) {
  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 4000);
```

You'll just need to install express, request and cors to get it working. Then fill in your API_TOKEN.

## Further Reading / Useful Links

* [glimmerjs](http://github.com/tildeio/glimmer/)
* [ember-cli](https://ember-cli.com/)
