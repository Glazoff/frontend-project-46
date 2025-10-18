#!/usr/bin/env node
import { program } from 'commander'
import { diff } from '../src/index.js'
import { formatter } from '../src/utils/index.js'
import parserFile from '../src/ParserFile.js'

function gendiff() {
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2> ')

  program
    .action((filepath1, filepath2, options) => {
      const result = diff(parserFile(filepath1), parserFile(filepath2))

      console.log(formatter(options.format, result))
    })

  if (process.argv.length > 2) {
    program.parse()
  }
}

gendiff()
