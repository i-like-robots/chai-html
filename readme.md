# Chai HTML

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/chai-html/blob/main/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/chai-html.svg?branch=main)](https://travis-ci.org/i-like-robots/chai-html) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/chai-html/badge.svg?branch=main)](https://coveralls.io/github/i-like-robots/chai-html) [![npm version](https://img.shields.io/npm/v/chai-html.svg?style=flat)](https://www.npmjs.com/package/chai-html)

A focussed HTML assertions plugin for [Chai](http://chaijs.com/).

## Installation

This is a [Node.js] module available through the [npm] registry. Before installing, download and install Node.js. Node.js 12 or higher is required.

Installation is done using the [npm install] command:

```sh
npm install -D chai-html
```

[Node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Usage

```js
const { use, expect } = require('chai')
const chaiHtml  = require('chai-html')

// Register the plugin
use(chaiHtml)

// Write assertions!
expect('<div><img /></div>').html.to.equal('<div><img></div>')
expect('<h1>Hello World!</h1>').html.to.not.equal('<h1>Hallo Welt!</h1>')
```

HTML assertions will throw an error directing you to the change, so instead of squinting at a long HTML string you'll get something useful:

```js
expect('<img />').html.to.equal('<br />')
// throws: tag <img> was changed to tag <br>

expect('<img src="..." />').html.to.equal('<img src="..." alt="..." />')
// throws: attribute [alt="..."] has been added

expect('<p>Hello World!</p> Hej!').html.to.equal('<p>Hello World!</p>')
// throws: text " Hej!" has been removed
```

### .ignoringComments

Add the `ignoringComments` flag to the chain to ignore HTML comments.

```js
expect('<div><!--Comment--></div>').html.ignoringComments.to.equal('<div></div>')
```

## How does it work?

Underneath this plugin uses [parse5](https://github.com/inikulin/parse5) to parse the given HTML strings and normalize the generated trees before being compared. This means that although the two strings of markup may not be the same they should generate equivalent structures.

## Credits

This plugin is heavily inspired by the similar [chai-xml](https://www.npmjs.com/package/chai-xml) plugin.

## License

chai-html is MIT licensed.
