'use strict'

const htmlparser = require('htmlparser2')

function parse(html) {

  let handler = new htmlparser.DomHandler(() => {}, {
    normalizeWhitespace: true
  })

  let parser = new htmlparser.Parser(handler, {
    decodeEntities: true
  })

  parser.write(html)
  parser.done()

  return handler.dom

}

function chaiHtmlPlugin(chai, utils) {

  chai.Assertion.addProperty('html', function() {
    new chai.Assertion(this._obj).to.be.a('string')
    utils.flag(this, 'html', true)
  })

  function compare(_super) {
    return function(value) {

      if (utils.flag(this, 'html')) {

        let actual = parse(this._obj)
        let expected = parse(value)

        if (utils.flag(this, 'negate')) {
          new chai.Assertion(actual).to.not.deep.equals(expected)
        } else {
          new chai.Assertion(actual).to.deep.equals(expected)
        }

      } else {
        _super.apply(this, arguments)
      }

    }
  }

  chai.Assertion.overwriteMethod('equals', compare)
  chai.Assertion.overwriteMethod('equal', compare)
  chai.Assertion.overwriteMethod('eq', compare)
}

module.exports = chaiHtmlPlugin
