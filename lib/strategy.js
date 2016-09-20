'use strict'

module.exports = function strategy (diff, lhs, rhs) {
  switch (diff.kind) {
    case 'N':
      // take new property from RHS
      console.log('New property: ', diff.rhs)
      return { lhs: rhs.__location, rhs: rhs.__location }

    case 'E':
      // take edited property from both sides
      console.log('Edited property: ', diff.lhs, ' => ', diff.rhs)
      return { lhs: lhs.__location, rhs: rhs.__location }

    case 'D':
      // take deleted property from LHS
      console.log('Deleted property: ', diff.lhs)
      return { lhs: lhs.__location, rhs: lhs.__location }

    case 'A':
      // send the array difference back through
      return strategy(diff.item, lhs[diff.index], rhs[diff.index])
  }
}
