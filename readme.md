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
```

## How does it work?

Underneath this plugin uses [htmlparser2](https://www.npmjs.com/package/htmlparser2) to parse the given HTML strings and compares the generated trees using the `deep.equal` assertion. This means that although the two strings may not be the same they should generate equivalent structures.

## Credits

This plugin is heavily inspired by the similar [chai-xml](https://www.npmjs.com/package/chai-xml) plugin.
