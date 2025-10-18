import { newline, filedStatus } from '../const.js'
import isObject from '../utils/isObject.js'

const { ADDED, DELETED, MODIFIED, NOT_DIFF } = filedStatus

const complexValue = '[complex value]'

const checkAst = (value) => {
  if (!isObject(value)) return false
  return 'diffList' in value && Array.isArray(value.diffList)
}

const fieldsText = {
  [ADDED]: ({ added }) => `was added with value: ${added}`,
  [DELETED]: () => 'was removed',
  [MODIFIED]: ({ deleted, added }) => `was updated. From ${deleted} to ${added}`,
}

const formatValue = (values) => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      isObject(value)
        ? complexValue
        : typeof value === 'string' ? `'${value}'` : value,
    ]),
  )
}

const getChainKey = (chain, key) => {
  if (!chain.length) {
    return String(key)
  }
  return `${chain}.${key}`
}

export default function plain({ diffList }) {
  const iter = (diffs, key = '') => {
    if (!Array.isArray(diffs)) {
      return String(diffs)
    }

    const lines = []

    for (const diff of diffs) {
      const { name, body } = diff
      const { type, value } = body
      const chainKey = getChainKey(key, name)

      if (type === NOT_DIFF) {
        // type NOT_DIFF always has field 'only'
        const isAst = checkAst(value['only'])
        isAst && lines.push(iter(value['only'].diffList, chainKey))
      }
      else {
        lines.push(`Property '${chainKey}' ${fieldsText[type]({ ...formatValue(value) })}`)
      }
    }

    return lines.join(newline)
  }

  return iter(diffList)
}
