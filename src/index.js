import _ from 'lodash'
import { isObject, formatter } from './utils/index.js'
import parserFile from './ParserFile.js'
import { filedStatus } from './const.js'

const { NOT_DIFF, ADDED, DELETED, MODIFIED } = filedStatus

export function diff(firstData, secondData) {
  const iter = (obj1, obj2, depth = 1) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()

    const ast = { depth, diffList: [] }

    for (const key of keys) {
      const body = {
        type: NOT_DIFF,
        value: {
          deleted: null,
          only: null,
          added: null,
        },
      }

      const features = {
        hasFirstKey: Object.hasOwn(obj1, key),
        hasSecondKey: Object.hasOwn(obj2, key),
        isSameValue: Object.is(obj1[key], obj2[key]),
        isObjBath: isObject(obj1[key]) && isObject(obj2[key]),
      }

      switch (true) {
        case features.isSameValue:
          body.value.only = obj1[key]
          break
        case features.isObjBath:
          body.value.only = iter(obj1[key], obj2[key], depth + 1)
          break
        case features.hasFirstKey && features.hasSecondKey && !features.isSameValue:
          body.type = MODIFIED
          body.value.deleted = obj1[key]
          body.value.added = obj2[key]
          break
        case features.hasFirstKey && !features.hasSecondKey:
          body.type = DELETED
          body.value.deleted = obj1[key]
          break
        case features.hasSecondKey && !features.hasFirstKey:
          body.type = ADDED
          body.value.added = obj2[key]
          break
      }

      ast.diffList.push({
        name: key,
        body,
      })
    }

    return ast
  }

  return iter(firstData, secondData)
}

export default function (firstData, secondData, formatName = 'stylish') {
  const result = diff(parserFile(firstData), parserFile(secondData))

  return formatter(formatName, result)
}
