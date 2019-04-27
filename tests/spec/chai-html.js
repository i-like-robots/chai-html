/* eslint-env mocha */

'use strict'

const fs = require('fs')
const path = require('path')
const chai = require('chai')
const expect = require('chai').expect
const chaiHtml = require('../../lib/chai-html')

chai.use(chaiHtml)

const a = fs.readFileSync(path.join(__dirname, '/../fixtures/article-a.html')).toString()
const b = fs.readFileSync(path.join(__dirname, '/../fixtures/article-b.html')).toString()
const c = fs.readFileSync(path.join(__dirname, '/../fixtures/article-c.html')).toString()

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

    it('does not fret when text is written in an expanded format', () => {
      expect('<p>\n\tHello World\n</p>')
        .html.to.equal('<p>Hello World</p>')

      expect('<p>\n\tHello <b> World </b>\n</p>')
        .html.to.equal('<p>Hello <b>World</b></p>')
    })

    it('does not baulk at comparing self-closing and unclosed void elements', () => {
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
      expect(a).html.to.equal(b)
      expect(a).html.to.not.equal(c)
    })
  })

  describe('not equals', () => {
    it('supports the negation flag', () => {
      expect(() => {
        expect('<div><h1>Hello World</h1></div>')
          .html.not.to.equal('<div><h1>Hello World</h1></div>')
      }).to.throw()

      expect(() => {
        expect('<div><h1>Hello World</h1></div>')
          .html.not.to.equal('<div><h2>Hello World</h2></div>')
      }).not.to.throw()
    })
  })

  describe('error messaging', () => {
    context('edits', () => {
      it('detects tag changes', () => {
        try {
          expect('<img />').html.to.equal('<br />')
        } catch (e) {
          expect(e.message).to.equal('tag <br> was changed to tag <img>')
        }
      })

      it('detects attribute changes', () => {
        try {
          expect('<img foo />').html.to.equal('<img bar />')
        } catch (e) {
          expect(e.message).to.equal('attribute [bar] was changed to attribute [foo]')
        }
      })

      it('detects attribute value changes', () => {
        try {
          expect('<img foo="bar" />').html.to.equal('<img foo="baz" />')
        } catch (e) {
          expect(e.message).to.equal('attribute [foo="baz"] was changed to attribute [foo="bar"]')
        }
      })

      it('detects text changes', () => {
        try {
          expect('<p>Hello world!</p>').html.to.equal('<p>Hej world!</p>')
        } catch (e) {
          expect(e.message).to.equal('text "Hej world!" was changed to text "Hello world!"')
        }
      })
    })

    context('additions', () => {
      it('detects tags added', () => {
        try {
          expect('<img /><br />').html.to.equal('<img />')
        } catch (e) {
          expect(e.message).to.equal('tag <br> has been added')
        }
      })

      it('detects attributes added', () => {
        try {
          expect('<img foo />').html.to.equal('<img />')
        } catch (e) {
          expect(e.message).to.equal('attribute [foo] has been added')
        }
      })

      it('detects text added', () => {
        try {
          expect('<p>Hello world!</p> Hej!').html.to.equal('<p>Hello world!</p>')
        } catch (e) {
          expect(e.message).to.equal('text " Hej!" has been added')
        }
      })
    })

    context('deletions', () => {
      it('detects tags removed', () => {
        try {
          expect('<img />').html.to.equal('<img /><br />')
        } catch (e) {
          expect(e.message).to.equal('tag <br> has been removed')
        }
      })

      it('detects attributes removed', () => {
        try {
          expect('<img />').html.to.equal('<img foo />')
        } catch (e) {
          expect(e.message).to.equal('attribute [foo] has been removed')
        }
      })

      it('detects text removed', () => {
        try {
          expect('<p>Hello world!</p>').html.to.equal('<p>Hello world!</p> Hej!')
        } catch (e) {
          expect(e.message).to.equal('text " Hej!" has been removed')
        }
      })
    })
  })
})
