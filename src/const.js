const extensions = ['json', 'yaml', 'yml']
const newline = '\n'

const filedStatus = {
  NOT_DIFF: 'not diff',
  ADDED: 'added',
  DELETED: 'deleted',
  MODIFIED: 'modified',
}
const fieldMapping = {
  [filedStatus.NOT_DIFF]: ['only'],
  [filedStatus.ADDED]: ['added'], // plus
  [filedStatus.DELETED]: ['deleted'], // minus
  [filedStatus.MODIFIED]: ['deleted', 'added'],
}

export { extensions, filedStatus, newline, fieldMapping }
