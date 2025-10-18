import { newline, filedStatus } from '../../const.js'
import { getChainKey, processNotDiff, processDiff } from './util.js'

const { NOT_DIFF } = filedStatus

export default function plain({ diffList }) {
  const iter = (diffs, key = '') => {
    if (!Array.isArray(diffs)) {
      return String(diffs)
    }

    const lines = diffs.map((diff) => {
      const { name, body } = diff
      const { type, value } = body
      const chainKey = getChainKey(key, name)

      return type === NOT_DIFF
        ? processNotDiff(value, chainKey, iter)
        : processDiff(type, value, chainKey)
    })

    return lines.filter(Boolean).join(newline)
  }

  return iter(diffList)
}
