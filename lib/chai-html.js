'use strict'

const parse5 = require('parse5')
const deepDiff = require('deep-diff')

const walk =require('./walk')
const format = require('./format')
const extract = require('./extract')
const normalize = require('./normalize')

function chaiHtmlPlugin(chai, utils) {

  chai.Assertion.addProperty('html', function() {
    new chai.Assertion(this._obj).to.be.a('string')
    utils.flag(this, 'html', true)
  })

  function compare(_super) {
    return function(value) {

      if (utils.flag(this, 'html')) {

        const lhsFormatted = format(this._obj)
        const rhsFormatted = format(value)

        let lhsTree = parse5.parseFragment(lhsFormatted, { locationInfo: true })
        let rhsTree = parse5.parseFragment(rhsFormatted, { locationInfo: true })

        normalize(lhsTree)
        normalize(rhsTree)

        // Ignore location information as this will be affected by some
        // formatting that we want to ignore.
        const diff = deepDiff(lhsTree, rhsTree, (path, key) => key === '__location')

        let lhsHtml = ''
        let rhsHtml = ''

        if (diff) {
          lhsHtml = parse5.serialize(lhsTree)
          rhsHtml = parse5.serialize(rhsTree)

          const lhsNode = walk(lhsTree, diff[0].path)
          const rhsNode = walk(lhsTree, diff[0].path)

          lhsHtml = extract(lhsHtml, lhsNode.__location)
          rhsHtml = extract(rhsHtml, rhsNode.__location)
        }

        if (utils.flag(this, 'negate')) {
          new chai.Assertion(lhsHtml, 'expected HTML not to be equivalent')
            .to.not.equal(rhsHtml)
        } else {
          new chai.Assertion(lhsHtml, 'expected HTML to be equivalent')
            .to.equal(rhsHtml)
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
