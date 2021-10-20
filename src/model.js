export default (data, callback) => new Proxy(data, {
  get: (target, path) => target[path],
  set: (_, path, value) => {
    data[path] = value
    callback(path)
    return true
  }
})
