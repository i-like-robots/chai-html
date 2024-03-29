import { parseFragment } from 'parse5'
import deepDiff from 'deep-diff'

import walk from './walk.js'
import format from './format.js'
import strategy from './strategy.js'
import normalize from './normalize.js'

export default function chaiHtmlPlugin(chai, utils) {
  chai.Assertion.addProperty('html', function () {
    new chai.Assertion(this._obj).to.be.a('string')
    utils.flag(this, 'html', true)
  })

  chai.Assertion.addProperty('ignoringComments', function () {
    utils.flag(this, 'ignoringComments', true)
  })

  function compare(_super) {
    return function (value) {
      if (utils.flag(this, 'html')) {
        const lhsFormatted = format(this._obj)
        const rhsFormatted = format(value)

        const lhsTree = parseFragment(lhsFormatted)
        const rhsTree = parseFragment(rhsFormatted)

        const options = {
          ignoreComments: utils.flag(this, 'ignoringComments'),
        }

        normalize(lhsTree, options)
        normalize(rhsTree, options)

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
