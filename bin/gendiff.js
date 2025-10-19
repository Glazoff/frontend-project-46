#!/usr/bin/env node
import { program } from 'commander'
import { diff } from '../src/index.js'
import formatter from '../src/formatter.js'
import parser from '../src/parser.js'
import { typeFormat } from '../src/const.js'

function gendiff() {
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', typeFormat.STYLISH)
    .arguments('<filepath1> <filepath2> ')

  program
    .action((filepath1, filepath2, options) => {
      const result = diff(parser(filepath1), parser(filepath2))

      console.log(formatter(options.format, result))
    })

  if (process.argv.length > 2) {
    program.parse()
  }
}

gendiff()
