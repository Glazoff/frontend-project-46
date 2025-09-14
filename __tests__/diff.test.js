import { expect, jest, test } from '@jest/globals'
import fs from 'fs'
import { diff } from '../src/index.js'
import parserFile from '../src/ParserFile.js'

const paths = {
  json: {
    first: '__fixtures__/file1.json',
    second: '__fixtures__/file2.json',
  },
  yml: {
    first: '__fixtures__/file1.yml',
    second: '__fixtures__/file2.yml',
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

afterEach(() => {
  jest.restoreAllMocks()
})

test('flat files json', () => {
  const { first, second } = paths.json

  expect(diff(parserFile(first), parserFile(second))).toBe(correctResult)
})

test('flat files yml', () => {
  const { first, second } = paths.yml

  expect(diff(parserFile(first), parserFile(second))).toBe(correctResult)
})

test('file not found', () => {
  expect(() => parserFile(fileNotFound))
    .toThrow('File not found')
})

test('support extensions file', () => {
  expect(() => parserFile(incorrectExtensionFile))
    .toThrow('Not support extensions file')
})

test('fail readFileSync in parserFile', () => {
  const { first } = paths.yml

  const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

  const fsSpy = jest.spyOn(fs, 'readFileSync')

  fsSpy.mockImplementation(() => {
    throw new Error('Permission denied')
  })

  const result = parserFile(first)
  expect(consoleErrorSpy).toHaveBeenCalled()
  expect(result).toBeUndefined()
})
