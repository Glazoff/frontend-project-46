const isObject = x => typeof x === 'object' && !Array.isArray(x) && x !== null

export default isObject
