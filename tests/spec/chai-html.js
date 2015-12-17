'use strict'

const chai      = require('chai')
const expect    = require('chai').expect
const chaiHtml  = require('../../lib/chai-html')

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

      expect('<div><br></div>')
        .html.to.equal('<div><br /></div>')

      expect('<img src="foo" alt="bar" class="baz" />')
        .html.to.not.equal('<img class="baz" alt="bar" src="foo" />')

      expect('<div><h1></h1></div>')
        .html.to.not.equal('<div><h2></h2></div>')
    })

    it('does not fret about different whitespace and newlines', () => {
      expect('<div>  <img>\n\n  \t</div>')
        .html.to.equal('<div> <img> </div>')
    })

  })

})
