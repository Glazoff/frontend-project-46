import { existsSync, readFileSync } from 'fs'
import { extname, resolve } from 'path'
import { cwd } from 'process'
import { extensions } from './const.js'

export default function (path) {
  const ext = extname(path)

  const isJSON = ext === '.json'
  const isValid = extensions.includes(ext)

  const absolutePath = resolve(cwd(), path)
  const isExist = existsSync(absolutePath)

  if (!isExist) throw Error('File not found.')
  if (!isValid) throw Error('Not support extensions file')

  try {
    const data = readFileSync(absolutePath, { encoding: 'utf-8' })

    return isJSON ? JSON.parse(data) : data.toString()
  }
  catch (err) {
    console.error(`Error reading ${path}:`, err)
  }
}
