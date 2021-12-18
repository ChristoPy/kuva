import { valueToText } from '../../shared.js'
import directive from "../directive"

export default directive('text', (element, data, path) => {
  const innerHandler = () => element.innerText = valueToText(data, data[path])

  innerHandler()
  return [innerHandler]
})
