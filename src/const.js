const extensions = ['json', 'yaml', 'yml']
const newline = '\n'

const filedStatus = {
  NOT_DIFF: 'not diff',
  ADDED: 'added',
  DELETED: 'deleted',
  MODIFIED: 'modified',
}

const typeFormat = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
}

export { extensions, filedStatus, newline, typeFormat }
