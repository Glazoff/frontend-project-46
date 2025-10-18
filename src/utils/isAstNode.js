import isObject from '../utils/isObject.js'

const isAstNode = (value) => {
  if (!isObject(value)) return false
  return 'diffList' in value && Array.isArray(value.diffList)
}

export default isAstNode
