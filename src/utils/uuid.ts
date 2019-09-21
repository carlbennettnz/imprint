export default function uuid() {
  return new Array(32).fill(0).reduce((result, _, i) => {
    const sep = i === 8 || i === 12 || i === 16 || i === 20
    const bit = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase()

    return result + (sep ? '-' : '') + bit
  }, '')
}
