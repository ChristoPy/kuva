import { isArray } from './shared'

const makeReactive = (target, options) => new Proxy(target, options)

const arrayHandler = (data, parentPath, callback) => makeReactive(data, {
  get: (target, path) => {
    const value = target[path]
    if (isArray(value)) return arrayHandler(value)

    if (typeof value === 'function') {
      const boundValue = value.bind(target)
      
      return function (...args) {
        const returnedValue = boundValue(...args)
        // could use Symbol.iterator in Object(returnedValue)
        // but we need only to prevent running the callback
        // for certain methods (mostly loops)
        const skippable = ['forEach', 'map', 'filter', 'includes', 'slice'].includes(path)

        // prevent calling the callback for iterator methods
        if (!skippable) callback(parentPath)

        return returnedValue
      }
    }
    return value
  }
})

export default (data, callback) => makeReactive(data, {
  get: (target, path) => {
    const value = target[path]
    if (isArray(value)) {
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
