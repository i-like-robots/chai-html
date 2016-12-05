'use strict'

module.exports = function format (html) {
  return html
    // Remove new lines
    .replace(/\r?\n|\r/g, '')
    // Replace tabs with spaces
    .replace(/\t/g, ' ')
    // Remove extraneous whitespace
    .replace(/\s{2,}/g, ' ')
    // Remove whitespace between elements
    .replace(/>\s+</g, '><')
    // Remove leading and trailing whitespace
    .trim()
}
