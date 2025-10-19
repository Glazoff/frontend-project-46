import { newline } from '../../const.js'
import { isAstNode } from '../../utils/index.js'
import { fieldMapping, badgeMapping } from './const.js'
import { createIndents, stringify } from './util.js'

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

        const nested = isAstNode(currentValue)
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
