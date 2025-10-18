import { filedStatus } from '../../const.js'

export const fieldMapping = {
  [filedStatus.NOT_DIFF]: ['only'],
  [filedStatus.ADDED]: ['added'], // plus
  [filedStatus.DELETED]: ['deleted'], // minus
  [filedStatus.MODIFIED]: ['deleted', 'added'],
}

export const badgeMapping = {
  added: '+',
  deleted: '-',
  only: ' ',
}
