# last-shot

## **"Bang!"**

### Questions

> Why?

I sent a bang suggestion to DuckDuckGo. It was something really important (to me), but they don't seem to even check the suggestions people send.

So I made this. It allows you to use your favorite search engine as default (in the absence of a bang) and personalized bangs.

The idea was inspired by [mikecrittenden/duckduckgo](https://github.com/mikecrittenden/duckduckgoog). If you want something that uses Google and DuckDuckGo bangs at the same time, I [recommend using it](http://www.duckduckgoog.com/) instead.

> Can't you just use your browser's search engine manager?

No. I don't want to waste my time configuring every single browser and that's why I used to use DDG.

### Install and run

You'll need io.js to run it, but you can get over this with the `--harmony` flag.

As last-shot is meant to personal use, you may run it in your machine (to use pm2 is a good idea, so I will show how here, but you can just use tmux or even nohup):

`npm -g install pm2`

`cd ~/ && git clone https://github.com/underr/last-shot && cd last-shot && npm install`

`pm2 start index.js`

You may edit the bangs.json file or config.js before starting it.

### Configure

#### bangs.json

bangs.json is the file where you configure your colletion of bangs. I think its format is pretty much self-explanatory:

```
{
  "bang": "g",
  "url": "https://www.google.com.br/search?q=%s",
  "name": "Google"
},
{
  "bang: "dg",
  "url: "https://duckduckgo.com/?q=%s",
  "name": "DuckDuckGo"
}
```

#### config.json

It's where you configure things like your default engine. Still pretty basic.


### Contribute

If something in the code feels too hackish or wrong to you, feel free to send a pull request or open an issue.
