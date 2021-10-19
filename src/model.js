const getAll = (name) =>
  document.querySelectorAll(name ? `[k-model="${name}"]` : "[k-model]")

const updateModel = (value, name) =>
  getAll(name).forEach(
    (element) =>
      (element.value =
        typeof value !== "string" ? JSON.stringify(value) : value)
  )

const setupModels = (model) => {
  getAll().forEach((element) => {
    const modelName = element.getAttribute("k-model")
    updateModel(model[modelName] || "", modelName)
    element.oninput = () => (model[modelName] = element.value)
  })
  return model
}

export default (data, callback) => setupModels(
  new Proxy(data, {
    get: (target, path) => target[path],
    set: (target, path, value) => {
      data[path] = value
      updateModel(data[path], path)
      callback(data)
      return true
    }
  })
)
