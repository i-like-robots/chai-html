'use strict'

function thing (ast) {
  if (ast.nodeName === '#text') {
    return `text "${ast.value}"`
  } else if (ast.nodeName === '#comment') {
    return `comment "${ast.data}"`
  } else if (ast.tagName) {
    return `tag <${ast.tagName}>`
  } else if (ast.name && ast.value) {
    return `attribute [${ast.name}="${ast.value}"]`
  } else if (ast.name) {
    return `attribute [${ast.name}]`
  }
}

module.exports = function strategy (diff, lhs, rhs) {
  switch (diff.kind) {
    case 'N':
      // take new property from RHS
      return `${thing(rhs)} has been removed`

    case 'E':
      // take edited property from both sides
      return `${thing(rhs)} was changed to ${thing(lhs)}`

    case 'D':
      // take deleted property from LHS
      return `${thing(lhs)} has been added`

    case 'A':
      // send the array difference back through if we receive an array
      return strategy(diff.item, lhs[diff.index], rhs[diff.index])
  }
}
