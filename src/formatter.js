import { stylish, plain, json } from './formatters/index.js'
import { typeFormat } from './const.js'

const formatter = (format, data) => {
  if (format === typeFormat.STYLISH) {
    return stylish(data)
  }

  if (format === typeFormat.PLAIN) {
    return plain(data)
  }

  if (format === typeFormat.JSON) {
    return json(data, ' ', 2)
  }
}

export default formatter
