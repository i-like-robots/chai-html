# Chai HTML

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
