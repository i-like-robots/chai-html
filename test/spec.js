import { describe, it } from 'node:test'
import { Assertion, expect, use } from 'chai'
import chaiHtml from '../lib/chai-html.js'
import { a, b, c, d } from './fixtures.js'

use(chaiHtml)

describe('Chai HTML', () => {
  describe('the plugin', () => {
    it('should be a chai property', () => {
      expect(Assertion.prototype.__lookupGetter__('html')).to.be.a('function')
    })

    it('should apply only to strings', () => {
      expect('foo').html.to.be.a('string')
      expect(() => expect(1).html).to.throw()
    })
  })

  describe('equals', () => {
    it('can compare HTML markup', () => {
      expect('<div><h1>Hello World</h1></div>').html.to.equal('<div><h1>Hello World</h1></div>')

      expect('<div><h1>Hello World</h1></div>').html.to.not.equal('<div><h2>Hello World</h2></div>')
    })

    it('does not fret about different whitespace and newlines', () => {
      expect('<div>  <img>\n\n  \t</div>').html.to.equal('<div> <img> </div>')
    })

    it('does not fret about leading whitespace', () => {
      expect('  \t<div> <img> </div>').html.to.equal('<div> <img> </div>')
    })

    it('does not fret about trailing whitespace', () => {
      expect('<div> <img> </div> \t   ').html.to.equal('<div> <img> </div>')
    })

    it('does not fret when text is written in an expanded format', () => {
      expect('<p>\n\tHello World\n</p>').html.to.equal('<p>Hello World</p>')

      expect('<p>\n\tHello <b> World </b>\n</p>').html.to.equal('<p>Hello <b>World</b></p>')
    })

    it('does not baulk at comparing self-closing and unclosed void elements', () => {
      expect('<div><br><hr /></div>').html.to.equal('<div><br /><hr></div>')
    })

    it('sorts attributes and class names', () => {
      expect('<img src="foo" alt="bar" class="baz qux" />').html.to.equal(
        '<img class="qux baz" alt="bar" src="foo" />'
      )

      expect('<img src="foo" alt="bar" class="baz qux" />').html.to.not.equal(
        '<img class="quux qux baz" alt="bar" src="foo" />'
      )
    })

    it('can handle large HTML chunks', () => {
      expect(a).html.to.equal(b)
      expect(a).html.to.not.equal(c)
    })

    describe('ignoringComments', () => {
      it('does not ignore comments if the ignoringComments flag is not set', () => {
        expect('<div><!--Comment--></div>').html.to.not.equal('<div></div>')
      })

      it('ignores comments if the ignoringComments flag is set', () => {
        expect('<div><!--Comment--></div>').html.ignoringComments.to.equal('<div/>')
      })

      it('ignores comments in the middle of text nodes', () => {
        expect('<div>aaa<!--Comment-->bbb</div>').html.ignoringComments.to.equal(
          '<div>aaabbb</div>'
        )
      })

      it('ignores complex comments if ignoringComments flag set', () => {
        expect(c).html.ignoringComments.to.equal(d)
      })
    })
  })

  describe('not equals', () => {
    it('supports the negation flag', () => {
      expect(() => {
        expect('<div><h1>Hello World</h1></div>').html.not.to.equal(
          '<div><h1>Hello World</h1></div>'
        )
      }).to.throw()

      expect(() => {
        expect('<div><h1>Hello World</h1></div>').html.not.to.equal(
          '<div><h2>Hello World</h2></div>'
        )
      }).not.to.throw()
    })
  })

  describe('error messaging', () => {
    describe('edits', () => {
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

      it('detects comment changes', () => {
        try {
          expect('<p>Hello world!</p><!-- Hello -->').html.to.equal(
            '<p>Hello world!</p><!-- Hej -->'
          )
        } catch (e) {
          expect(e.message).to.equal('comment " Hej " was changed to comment " Hello "')
        }
      })
    })

    describe('additions', () => {
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

      it('detects comment added', () => {
        try {
          expect('<p>Hello world!</p><!-- Hej! -->').html.to.equal('<p>Hello world!</p>')
        } catch (e) {
          expect(e.message).to.equal('comment " Hej! " has been added')
        }
      })
    })

    describe('deletions', () => {
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

      it('detects comment removed', () => {
        try {
          expect('<p>Hello world!</p>').html.to.equal('<p>Hello world!</p> <!-- Hej! -->')
        } catch (e) {
          expect(e.message).to.equal('comment " Hej! " has been removed')
        }
      })
    })
  })
})
