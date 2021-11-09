import { newComment } from '../../shared.js'
import directive from "../directive"

export default directive('not', (element, data, path) => {
  const comment = newComment()

  const innerHandler = () => {
    if (!data[path]) comment.replaceWith(element)
    else element.replaceWith(comment)
  }

  innerHandler()
  return [innerHandler]
})
