var koa = require('koa');
var app = koa();
var _ = require('koa-route');
var bangs = require('./bangs.json') || {};
var config = require('./config.js');

var logo = "\ndb       .d8b.  .d8888. d888888b        .d8888. db   db  .d88b.  d888888b \n" +
           "88      d8' `8b 88'  YP `~~88~~'        88'  YP 88   88 .8P  Y8. `~~88~~' \n" +
           "88      88ooo88 `8bo.      88           `8bo.   88ooo88 88    88    88    \n" +
           "88      88~~~88   `Y8b.    88    C8888D   `Y8b. 88~~~88 88    88    88    \n" +
           "88booo. 88   88 db   8D    88           db   8D 88   88 `8b  d8'    88    \n" +
           "Y88888P YP   YP `8888Y'    YP           `8888Y' YP   YP  `Y88P'     YP    \n";

// Create the bang array to detect bangs on queries
var bangList = [];
for(var i=0; i < bangs.length; i++) {
  bangList.push('!' + bangs[i]['bang']);
}

var index = function *() {
  this.body = logo + "\nPaths:\n * /list - list all bangs\n * /search - self-explanatory";
};

var search = function *() {
  var query = this.query.q;
  var words = query.split(' '); // what about '  '?

  // unwanted double loop; can't be helped
  for(var i=0; i < words.length; i++) {
    for(var n=0; n < bangList.length; n++) {
      if (words[i] == bangList[n]) // so no false-positives can occur
        var result = {
          bangN: n, // index of requested bang
          query: query.replace(bangList[n], '').trim() // remove bang from query and trim spaces
        };
    }
  }

  if (result) {
    this.redirect(bangs[result.bangN]['url'].replace('%s', result.query));
  } else {
    this.redirect(config.DEFAULT.replace('%s', query));
  }
};

var list = function*() {
  this.type = 'json';
  this.body = bangs;
};

app.use(_.get('/', index));
app.use(_.get('/search', search));
if (config.LIST) app.use(_.get('/list', list));

app.listen(3000);
console.log(logo + '\n* online @ :3000');
