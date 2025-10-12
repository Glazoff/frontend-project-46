import { expect, jest, test } from '@jest/globals'
import fs from 'fs'
import { diff } from '../src/index.js'
import parserFile from '../src/ParserFile.js'
import stylish from '../src/formatters/stylish.js'

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

const correctResult = fs.readFileSync('__fixtures__/result.txt', { encoding: 'utf-8' })

afterEach(() => {
  jest.restoreAllMocks()
})

test('files json', () => {
  const { first, second } = paths.json

  expect(stylish(diff(parserFile(first), parserFile(second)))).toBe(correctResult)
})

test('files yml', () => {
  const { first, second } = paths.yml

  expect(stylish(diff(parserFile(first), parserFile(second)))).toBe(correctResult)
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

  const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

  const fsSpy = jest.spyOn(fs, 'readFileSync')

  fsSpy.mockImplementation(() => {
    throw new Error('Permission denied')
  })

  const result = parserFile(first)
  expect(consoleErrorSpy).toHaveBeenCalled()
  expect(result).toBeUndefined()
})
