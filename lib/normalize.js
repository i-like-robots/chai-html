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

function removeComments (childNodes) {
  childNodes = childNodes.filter(x => x.nodeName !== '#comment')
  // Removing comments might leave text nodes next to each other,
  // in which case we should join them together into one node.
  const toRemove = []
  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeName === '#text') {
      let endOfTextNodeChunk = childNodes.findIndex((node, index) => node.nodeName !== '#text' && index > i)
      if (endOfTextNodeChunk === -1) {
        endOfTextNodeChunk = childNodes.length - 1
      }
      for (let j = i + 1; j <= endOfTextNodeChunk; j++) {
        childNodes[i].value += childNodes[j].value
        toRemove.push(childNodes[j])
      }
      i = endOfTextNodeChunk + 1
    }
  }
  return childNodes.filter(x => !toRemove.includes(x))
}

module.exports = function normalize (tree, options) {
  if (Array.isArray(tree)) {
    tree.forEach(x => normalize(x, options))
  } else {
    if (tree.attrs) {
      tree.attrs = attributes(tree.attrs)
    }

    if (tree.childNodes) {
      if (options.ignoreComments) {
        tree.childNodes = removeComments(tree.childNodes)
      }

      whitespace(tree.childNodes)
      normalize(tree.childNodes, options)
    }
  }
}
