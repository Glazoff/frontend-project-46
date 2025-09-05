import { expect, test } from '@jest/globals'
import { diff } from '../src/index.js'
import parserFile from '../src/ParserFile.js'

const path1 = '__fixtures__/file1.json'
const path2 = '__fixtures__/file2.json'
const unsupportedFormat = '__fixtures__/unsupported-format.xml'
const nonExistentFile = './sameFile.json'

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

test('file not found', () => {
  expect(() => diff(parserFile(path1), parserFile(nonExistentFile)))
    .toThrow('File not found')
})

test('support extensions file', () => {
  expect(() => diff(parserFile(unsupportedFormat), parserFile(unsupportedFormat)))
    .toThrow('Not support extensions file')
})
