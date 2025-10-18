import { stylish, plain } from '../formatters/index.js'

const formatter = (format, data) => {
  if (format === 'stylish') {
    return stylish(data)
  }

  if (format === 'plain') {
    return plain(data)
  }
}

export default formatter
