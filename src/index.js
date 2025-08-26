import { program } from 'commander'
import parserFile from './ParserFile.js'

export default function () {
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')

  program
    .action((filepath1, filepath2) => {
      console.log(parserFile(filepath1))
      console.log(parserFile(filepath2))
    })

  program.parse()
}
