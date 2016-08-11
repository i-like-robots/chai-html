'use strict'

function attributes(attrs) {
  return attrs
    .map(attr => {
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

      return 0
    })
}

module.exports = function normalize(tree) {
  if (Array.isArray(tree)) {
    tree.forEach(normalize)
  } else {
    tree.attrs && (tree.attrs = attributes(tree.attrs))
    tree.childNodes && normalize(tree.childNodes)
  }
}
