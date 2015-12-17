'use strict'

const parse5 = require('parse5')
const deep = require('deep-diff')

function parse(html) {
  const normalised = html
    // Remove new lines
    .replace(/\r?\n|\r/g, '')
    // Remove extraneous whitespace
    .replace(/\s{2,}/g, ' ')

  return parse5.parseFragment(normalised, { locationInfo: true })
}

function walk(tree, path) {
  let leaf = tree

  for (let step of path) {
    if (Number.isInteger(step) || step === 'childNodes') {
      leaf = leaf[step]
    } else {
      break
    }
  }

  return leaf
}

function extract(parsed, diff) {
  return diff.map(d => {
    const fragment = walk(parsed, d.path).__location

    return parse5
      .serialize(parsed)
      .slice(fragment.startOffset, fragment.endOffset)
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

        const lhs = parse(this._obj)
        const rhs = parse(value)
        const diff = deep(lhs, rhs, (path, key) => key === '__location')

        let lhsHtml = ''
        let rhsHtml = ''

        if (diff) {
          lhsHtml = extract(lhs, diff)
          rhsHtml = extract(rhs, diff)
        }

        if (utils.flag(this, 'negate')) {
          new chai.Assertion(lhsHtml, 'expected HTML not to be equivalent')
            .to.not.equal(rhsHtml)
        } else {
          new chai.Assertion(lhsHtml[0])
            .to.equal(rhsHtml[0])
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
