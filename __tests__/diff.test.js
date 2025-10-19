import { expect, jest, test } from '@jest/globals'
import fs from 'fs'
import { diff } from '../src/index.js'
import parser from '../src/parser.js'
import { stylish, plain } from '../src/formatters/index.js'

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

const correctResults = {
  stylish: fs.readFileSync('__fixtures__/result.txt', { encoding: 'utf-8' }),
  plain: fs.readFileSync('__fixtures__/result_plain.txt', { encoding: 'utf-8' }),
}

afterEach(() => {
  jest.restoreAllMocks()
})

test('files json', () => {
  const { first, second } = paths.json

  expect(stylish(diff(parser(first), parser(second)))).toBe(correctResults.stylish)
})

test('files yml', () => {
  const { first, second } = paths.yml

  expect(stylish(diff(parser(first), parser(second)))).toBe(correctResults.stylish)
})

test('file not found', () => {
  expect(() => parser(fileNotFound))
    .toThrow('File not found')
})

test('support extensions file', () => {
  expect(() => parser(incorrectExtensionFile))
    .toThrow('Not support extensions file')
})

test('fail readFileSync in parser', () => {
  const { first } = paths.yml

  const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })

  const fsSpy = jest.spyOn(fs, 'readFileSync')

  fsSpy.mockImplementation(() => {
    throw new Error('Permission denied')
  })

  const result = parser(first)
  expect(consoleErrorSpy).toHaveBeenCalled()
  expect(result).toBeUndefined()
})

test('format plain', () => {
  const { first, second } = paths.json

  expect(plain(diff(parser(first), parser(second)))).toBe(correctResults.plain)
})
