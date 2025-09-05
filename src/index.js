import { program } from 'commander'
import _ from 'lodash'
import parserFile from './ParserFile.js'
import { tab } from './const.js'

function diff(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const keys = _.union(keys1, keys2).sort()

  let result = '{\n'
  for (const key of keys) {
    const isBoth = Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)

    if (isBoth && obj2[key] === obj1[key]) {
      result += `${tab}  ${key}: ${obj1[key]}\n`
      continue
    }
    if (Object.hasOwn(obj1, key)) {
      result += `${tab}- ${key}: ${obj1[key]}\n`
    }

    if (Object.hasOwn(obj2, key)) {
      result += `${tab}+ ${key}: ${obj2[key]}\n`
    }
  }

  return result += '}'
}

export default function () {
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')

  program
    .action((filepath1, filepath2) => {
      console.log(diff(parserFile(filepath1), parserFile(filepath2)))
    })

  if (process.argv.length > 2) {
    program.parse()
  }
}

export { diff }
