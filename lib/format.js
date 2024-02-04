export default function format(html) {
  return (
    html
      // Remove whitespace between elements (no whitespace only nodes)
      .replace(/>\s+</g, '><')
      // Remove leading and trailing whitespace
      .trim()
  )
}
