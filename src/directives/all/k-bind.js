import directive from "../directive"

export default directive('bind', (element, data, path) => {
  element.oninput = () => {
    data[path] = element.value
  }

  const innerHandler = () => element.value = data[path]

  innerHandler()
  return [innerHandler]
})
