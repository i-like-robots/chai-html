# Chai HTML ![Build status](https://api.travis-ci.org/i-like-robots/chai-html.png)

HTML assertions plugin for [Chai](http://chaijs.com/).

## Installation

```bash
npm install --save-dev chai-html
```

## Usage

```js
const chai      = require('chai')
const expect    = require('chai').expect
const chaiHtml  = require('chai-html')

// Register the plugin
chai.use(chaiHtml)

// Write assertions!
expect('<div><img /></div>').html.to.equal('<div><img></div>')
expect('<h1>Hello World!</h1>').html.to.not.equal('<h1>Hallo Welt!</h1>')
```

## How does it work?

Underneath this plugin uses [parse5](https://github.com/inikulin/parse5) to parse the given HTML strings and the generated trees normalized before being compared. This means that although the two strings may not be the same they should generate equivalent structures.

## Credits

This plugin is heavily inspired by the similar [chai-xml](https://www.npmjs.com/package/chai-xml) plugin.
