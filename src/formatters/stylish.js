import { newline, fieldMapping } from '../const.js'
import isObject from '../utils/isObject.js'

const badgeMapping = {
  added: '+',
  deleted: '-',
  only: ' ',
}

const formatValue = (value, replacer, depth) => {
  if (!isObject(value)) {
    if (value === null) return 'null'
    return String(value)
  }

  const currentIndent = replacer.repeat(depth)
  const bracketIndent = replacer.repeat(depth - 1)

  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = formatValue(val, replacer, depth + 1)
    return `${currentIndent}${key}: ${formattedValue}`
  })

  return ['{', ...lines, `${bracketIndent}}`].join(newline)
}

export default function stylish(ast, replacer = '    ') {
  const iter = (diffList, depth) => {
    const currentIndent = replacer.repeat(depth)
    const bracketIndent = replacer.repeat(depth - 1)

    const lines = diffList.map((item) => {
      const { name, body } = item
      const { type, value } = body
      const fields = fieldMapping[type]

      if (type === 'modified') {
        const oldFormatted = formatValue(value.deleted, replacer, depth + 1)
        const newFormatted = formatValue(value.added, replacer, depth + 1)
        return [
          `${currentIndent.slice(0, -2)}- ${name}: ${oldFormatted}`,
          `${currentIndent.slice(0, -2)}+ ${name}: ${newFormatted}`,
        ].join(newline)
      }

      return fields.map((field) => {
        const badge = badgeMapping[field]
        const fieldValue = value[field]

        if (isObject(fieldValue) && fieldValue.diffList) {
          const nested = iter(fieldValue.diffList, depth + 1)
          return `${currentIndent.slice(0, -2)}${badge} ${name}: ${nested}`
        }
        else {
          const formattedValue = formatValue(fieldValue, replacer, depth + 1)
          return `${currentIndent.slice(0, -2)}${badge} ${name}: ${formattedValue}`
        }
      }).join(newline)
    })

    return ['{', ...lines.flat(), `${bracketIndent}}`].join(newline)
  }

  return iter(ast.diffList, 1)
}
