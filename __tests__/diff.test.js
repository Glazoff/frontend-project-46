import { expect, test } from '@jest/globals'
import { diff } from '../src/index.js'
import parserFile from '../src/ParserFile.js'

const paths = {
  json: {
    first: '__fixtures__/file1.json',
    second: '__fixtures__/file2.json',
  },
  yaml: {
    first: '__fixtures__/file1.yaml',
    second: '__fixtures__/file2.yaml',
  },
}

const fileNotFound = './sameFile.json'
const incorrectExtensionFile = '__fixtures__/unsupported-format.xml'

const correctResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`

test('flat files', () => {
  const { first, second } = paths.json

  expect(diff(parserFile(first), parserFile(second))).toBe(correctResult)
})

test('file not found', () => {
  const { first } = paths.json

  expect(() => diff(parserFile(first), parserFile(fileNotFound)))
    .toThrow('File not found')
})

test('support extensions file', () => {
  const { second } = paths.json
  expect(() => diff(parserFile(incorrectExtensionFile), parserFile(second)))
    .toThrow('Not support extensions file')
})
