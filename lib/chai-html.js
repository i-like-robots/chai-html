'use strict'

const parse5 = require('parse5')
const deepDiff = require('deep-diff')

const walk = require('./walk')
const format = require('./format')
const strategy = require('./strategy')
const normalize = require('./normalize')

function chaiHtmlPlugin (chai, utils) {
  chai.Assertion.addProperty('html', function () {
    new chai.Assertion(this._obj).to.be.a('string')
    utils.flag(this, 'html', true)
  })

  function compare (_super) {
    return function (value) {
      if (utils.flag(this, 'html')) {
        const lhsFormatted = format(this._obj)
        const rhsFormatted = format(value)

        const lhsTree = parse5.parseFragment(lhsFormatted)
        const rhsTree = parse5.parseFragment(rhsFormatted)

        normalize(lhsTree)
        normalize(rhsTree)

        // deep-diff 0.3.6 trips on circular references
        const ignore = (path, key) => key === 'parentNode'

        const diff = deepDiff(lhsTree, rhsTree, ignore)

        if (diff) {
          const change = diff.shift()

          // extract changed node from tree
          const lhsNode = walk(lhsTree, change.path)
          const rhsNode = walk(rhsTree, change.path)

          utils.flag(this, 'message', strategy(change, lhsNode, rhsNode))
        }

        if (!diff && utils.flag(this, 'negate')) {
          throw new chai.AssertionError('expected HTML not to be equivalent')
        }

        if (diff && !utils.flag(this, 'negate')) {
          throw new chai.AssertionError(utils.flag(this, 'message'))
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
