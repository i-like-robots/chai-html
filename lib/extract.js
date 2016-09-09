'use strict'

module.exports = function extract (html, node) {
  const pre = node.startOffset > 0 ? '…' : ''
  const post = node.endOffset < html.length ? '…' : ''

  let slice = html.slice(node.startOffset, node.endOffset)

  if (slice.length > 120) {
    slice = slice.slice(0, 60) + ' … … ' + slice.slice(-60)
  }

  return `${pre}${slice}${post}`
}
