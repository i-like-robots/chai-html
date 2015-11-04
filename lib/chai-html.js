'use strict'

const htmlparser = require('htmlparser2')

function parse(html) {

  return new Promise((resolve, reject) => {

    let handler = new htmlparser.DomHandler((error, tree) => {
      if (error) {
        reject(error)
      } else {
        resolve(tree)
      }
    }, {
      normalizeWhitespace: true
    })

    let parser = new htmlparser.Parser(handler, {
      decodeEntities: true
    })

    parser.write(html).done()

  })

}

function chaiHtmlPlugin(chai, utils) {

  chai.Assertion.addProperty('html', function() {
    new chai.Assertion(this._obj).to.be.a('string')
    utils.flag(this, 'html', true)
  })

  function compare(_super) {
    return function(value) {

      if (utils.flag(this, 'html')) {

        let parsing = [
          parse(this._obj),
          parse(value)
        ]

        return Promise.all(parsing).then(values => {
          if (utils.flag(this, 'negate')) {
            new chai.Assertion(values[0]).to.not.deep.equals(values[1])
          } else {
            new chai.Assertion(values[0]).to.deep.equals(values[1])
          }
        })

      } else {
        _super.apply(this, arguments);
      }

    }
  }

  chai.Assertion.overwriteMethod('equals', compare)
  chai.Assertion.overwriteMethod('equal', compare)
  chai.Assertion.overwriteMethod('eq', compare)
}

module.exports = chaiHtmlPlugin
