import directive from "../directive"

export default directive('not', (element, data, path) => {
  const innerHandler = () => element.style.display = data[path] ? '' : 'none'

  innerHandler()
  return [innerHandler]
})
