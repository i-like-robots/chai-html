/* eslint-env mocha */

'use strict'

const fs = require('fs')
const path = require('path')
const chai = require('chai')
const expect = require('chai').expect
const chaiHtml = require('../../lib/chai-html')

chai.use(chaiHtml)

describe('Chai HTML', () => {
  describe('the plugin', () => {
    it('should be a chai property', () => {
      expect(chai.Assertion.prototype.__lookupGetter__('html')).to.be.a('function')
    })

    it('should apply only to strings', () => {
      expect('foo').html.to.be.a('string')
      expect(() => expect(1).html).to.throw()
    })
  })

  describe('equals', () => {
    it('can compare HTML markup', () => {
      expect('<div><h1>Hello World</h1></div>')
        .html.to.equal('<div><h1>Hello World</h1></div>')

      expect('<div><h1>Hello World</h1></div>')
        .html.to.not.equal('<div><h2>Hello World</h2></div>')
    })

    it('does not fret about different whitespace and newlines', () => {
      expect('<div>  <img>\n\n  \t</div>')
        .html.to.equal('<div> <img> </div>')
    })

    it('does not fret about leading whitespace', () => {
      expect('  \t<div> <img> </div>')
        .html.to.equal('<div> <img> </div>')
    })

    it('does not fret about trailing whitespace', () => {
      expect('<div> <img> </div> \t   ')
        .html.to.equal('<div> <img> </div>')
    })

    it('does not baulk at comparing self-closing and unclosed elements', () => {
      expect('<div><br><hr /></div>')
        .html.to.equal('<div><br /><hr></div>')
    })

    it('sorts attributes and class names', () => {
      expect('<img src="foo" alt="bar" class="baz qux" />')
        .html.to.equal('<img class="qux baz" alt="bar" src="foo" />')

      expect('<img src="foo" alt="bar" class="baz qux" />')
        .html.to.not.equal('<img class="quux qux baz" alt="bar" src="foo" />')
    })

    it('can handle large HTML chunks', () => {
      const a = fs.readFileSync(path.join(__dirname, '/../fixtures/article-a.html')).toString()
      const b = fs.readFileSync(path.join(__dirname, '/../fixtures/article-b.html')).toString()
      const c = fs.readFileSync(path.join(__dirname, '/../fixtures/article-c.html')).toString()

      expect(a).html.to.equal(b)
      expect(a).html.to.not.equal(c)
    })
  })
})
