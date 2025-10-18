import { stylish, plain } from '../formatters/index.js'

export const formatData = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
}

const formatter = (format, data) => {
  if (format === formatData.STYLISH) {
    return stylish(data)
  }

  if (format === formatData.PLAIN) {
    return plain(data)
  }
}

export default formatter
