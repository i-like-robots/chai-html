'use strict'

function thing (ast) {
  if (ast.nodeName === '#text') {
    return `text "${ast.value}"`
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
      return `${thing(rhs)} has been added`

    case 'E':
      // take edited property from both sides
      return `${thing(lhs)} was changed to ${thing(rhs)}`

    case 'D':
      // take deleted property from LHS
      return `${thing(lhs)} has been removed`

    case 'A':
      // send the array difference back through if we receive an array
      return strategy(diff.item, lhs[diff.index], rhs[diff.index])
  }
}
