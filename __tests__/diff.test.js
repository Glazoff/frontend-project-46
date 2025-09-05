import { expect, test } from '@jest/globals'
import { diff } from '../src/index.js'
import parserFile from '../src/ParserFile.js'

const path1 = '__fixtures__/file1.json'
const path2 = '__fixtures__/file2.json'

const correctResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`

test('flat files', () => {
  expect(diff(parserFile(path1), parserFile(path2))).toBe(correctResult)
})
