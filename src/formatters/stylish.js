import { newline, filedStatus } from '../const.js'
import isObject from '../utils/isObject.js'

const fieldMapping = {
  [filedStatus.NOT_DIFF]: ['only'],
  [filedStatus.ADDED]: ['added'], // plus
  [filedStatus.DELETED]: ['deleted'], // minus
  [filedStatus.MODIFIED]: ['deleted', 'added'],
}

const badgeMapping = {
  added: '+',
  deleted: '-',
  only: ' ',
}

const checkAst = (value) => {
  if (!isObject(value)) return false
  return 'diffList' in value && Array.isArray(value.diffList)
}

const createIndents = (replacer, depth) => ({
  currentIndent: replacer.repeat(depth),
  bracketIndent: replacer.repeat(depth - 1),
})

const stringify = (value, depth, replacer) => {
  if (!isObject(value)) {
    return value === null ? 'null' : String(value)
  }

  const { currentIndent, bracketIndent } = createIndents(replacer, depth)

  const lines = Object.entries(value).flatMap(([key, val]) => {
    return `${currentIndent}${key}: ${stringify(val, depth + 1, replacer)}`
  })

  return ['{', ...lines, bracketIndent].join(newline) + '}'
}

export default function stylish(ast, replacer = '    ') {
  const iter = (diffs, depth) => {
    const { currentIndent, bracketIndent } = createIndents(replacer, depth)

    const lines = diffs.flatMap((diff) => {
      const { body, name } = diff
      const { type, value } = body
      const fileds = fieldMapping[type]

      const line = fileds.flatMap((field) => {
        const badge = badgeMapping[field]
        const currentValue = value[field]

        const nested = checkAst(currentValue)
          ? iter(currentValue.diffList, currentValue.depth)
          : stringify(currentValue, depth + 1, replacer)

        return `${currentIndent.slice(0, -2)}${badge} ${name}: ${nested}`
      })

      return line
    })

    return ['{', ...lines, bracketIndent].join(newline) + '}'
  }

  return iter(ast.diffList, ast.depth)
}
