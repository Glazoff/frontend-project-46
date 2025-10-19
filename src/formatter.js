import { stylish, plain } from './formatters/index.js'
import { typeFormat } from './const.js'

const formatter = (format, data) => {
  if (format === typeFormat.STYLISH) {
    return stylish(data)
  }

  if (format === typeFormat.PLAIN) {
    return plain(data)
  }
}

export default formatter
