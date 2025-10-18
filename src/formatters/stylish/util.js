import { newline } from '../../const.js'
import { isObject } from '../../utils/index.js'

export const createIndents = (replacer, depth) => ({
  currentIndent: replacer.repeat(depth),
  bracketIndent: replacer.repeat(depth - 1),
})

export const stringify = (value, depth, replacer) => {
  if (!isObject(value)) {
    return value === null ? 'null' : String(value)
  }

  const { currentIndent, bracketIndent } = createIndents(replacer, depth)

  const lines = Object.entries(value).flatMap(([key, val]) => {
    return `${currentIndent}${key}: ${stringify(val, depth + 1, replacer)}`
  })

  return ['{', ...lines, bracketIndent].join(newline) + '}'
}
