import fs from 'fs'
import yaml from 'js-yaml'
import { extname, resolve } from 'path'
import { cwd } from 'process'
import { extensions } from './const.js'

const parses = {
  json: (data) => {
    return JSON.parse(data)
  },
  yaml: (data) => {
    return yaml.load(data)
  },
  yml: (data) => {
    return yaml.load(data)
  },
}

export default function (path) {
  const ext = extname(path).slice(1)

  const isValid = extensions.includes(ext)

  const absolutePath = resolve(cwd(), path)
  const isExist = fs.existsSync(absolutePath)

  if (!isExist) throw Error('File not found.')
  if (!isValid) throw Error('Not support extensions file')

  try {
    const data = fs.readFileSync(absolutePath, { encoding: 'utf-8' })

    const parser = parses[ext]
    return parser(data)
  }
  catch (err) {
    console.error(`Error reading ${path}:`, err)
  }
}
