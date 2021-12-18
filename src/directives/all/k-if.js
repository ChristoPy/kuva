import { newComment } from '../../shared.js'
import directive from "../directive"

export default directive('if', (element, data, path) => {
  const comment = newComment()

  const innerHandler = () => {
    if (!data[path]) element.replaceWith(comment)
    else comment.replaceWith(element)
  }

  innerHandler()
  return [innerHandler]
})
