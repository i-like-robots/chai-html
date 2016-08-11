'use strict'

module.exports = function extract(html, node) {
  const pre = node.startOffset > 0 ? '…' : ''
  const post = node.endOffset  < html.length ? '…' : ''
  const slice = html.slice(node.startOffset, node.endOffset)

  return `${pre}${slice}${post}`
}
