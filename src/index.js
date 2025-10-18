import { program } from 'commander'
import _ from 'lodash'
import parserFile from './ParserFile.js'
import isObject from './utils/isObject.js'
import { filedStatus } from './const.js'
import stylesh from './formatters/stylish.js'

const { NOT_DIFF, ADDED, DELETED, MODIFIED } = filedStatus

function diff(firstData, secondData) {
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

export default function () {
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2> ')

  program
    .action((filepath1, filepath2, options) => {
      const result = diff(parserFile(filepath1), parserFile(filepath2))

      if (options.format === 'stylish') {
        console.log(stylesh(result))
      }
    })

  if (process.argv.length > 2) {
    program.parse()
  }
}

export { diff }
