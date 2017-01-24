'use strict'

function attributes (attrs) {
  return attrs
    .map((attr) => {
      // Sort class names alphanumerically
      if (attr.name === 'class') {
        attr.value = attr.value.trim().split(/\s+/).sort().join(' ')
      }

      return attr
    })
    .sort((a, b) => {
      // Sort attributes alphanumerically
      a = a.name.toLowerCase()
      b = b.name.toLowerCase()

      if (a < b) {
        return -1
      }

      if (a > b) {
        return 1
      }
    })
}

function whitespace (childNodes) {
  const last = childNodes.length - 1

  childNodes.forEach((node, i) => {
    // a line break immediately following a start tag must be ignored...
    // ... as must a line break immediately before an end tag
    // <https://www.w3.org/TR/html4/appendix/notes.html#notes-line-breaks>
    if (node.nodeName === '#text' && i === 0) {
      node.value = node.value.replace(/^\s+/, '')
    }

    if (node.nodeName === '#text' && i === last) {
      node.value = node.value.replace(/\s+$/, '')
    }
  })
}

module.exports = function normalize (tree) {
  if (Array.isArray(tree)) {
    tree.forEach(normalize)
  } else {
    if (tree.attrs) {
      tree.attrs = attributes(tree.attrs)
    }

    if (tree.childNodes) {
      whitespace(tree.childNodes)
      normalize(tree.childNodes)
    }
  }
}
