import { isArray } from './shared'

const makeReactive = (target, options) => new Proxy(target, options)

const arrayHandler = (data, parentPath, callback) => makeReactive(data, {
  get: (target, path) => {
    const value = target[path]
    if (isArray(value)) return arrayHandler(value)

    if (typeof value === 'function') {
      const boundValue = value.bind(target)
      callback(parentPath)
      return boundValue
    }
    return value
  }
})

export default (data, callback) => makeReactive(data, {
  get: (target, path) => {
    const value = target[path]
    if (Array.isArray(value)) {
      return arrayHandler(value, path, callback)
    }
    return value
  },
  set: (_, path, value) => {
    data[path] = value
    callback(path)
    return true
  }
})
