import { isObject, isAstNode } from '../../utils/index.js'
import { filedStatus } from '../../const.js'
import { complexValue } from './const.js'

const { ADDED, DELETED, MODIFIED } = filedStatus

export const statusMessages = {
  [ADDED]: ({ added }) => `was added with value: ${added}`,
  [DELETED]: () => 'was removed',
  [MODIFIED]: ({ deleted, added }) => `was updated. From ${deleted} to ${added}`,
}

export const formatValue = (values) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = formatSingleValue(value)
    return acc
  }, {})
}

const formatSingleValue = (value) => {
  if (isObject(value)) return complexValue
  if (typeof value === 'string') return `'${value}'`
  return value
}

export const getChainKey = (chain, key) => {
  if (!chain.length) {
    return String(key)
  }
  return `${chain}.${key}`
}

export const processNotDiff = (value, chainKey, iter) => {
  const isAst = isAstNode(value.only)
  return isAst && iter(value.only.diffList, chainKey)
}

export const processDiff = (type, value, chainKey) => {
  const formattedValue = formatValue(value)
  return `Property '${chainKey}' ${statusMessages[type](formattedValue)}`
}
