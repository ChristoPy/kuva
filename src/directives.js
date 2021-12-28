import { get, forEach } from './shared.js'
import directives from './directives/index.js'

export default (model) => {
  const handlersPerPath = {}
  const executeDirectiveHandler = (name, element, handler) => {
    const path = element.getAttribute(`k-${name}`)
    let [innerHandler, context] = handler(element, model, path)

    if (!context) context = path

    if (!handlersPerPath[context]) handlersPerPath[context] = []
    handlersPerPath[context].push(innerHandler)
  }

  const _ = directives.map(({ name, handler, nodes }) => {
    nodes = get(`[k-${name}]`)
    forEach(nodes, (element) => executeDirectiveHandler(name, element, handler))

    return {
      name,
      handler,
      nodes
    }
  })

  return (_, path) => {
    const handlers = handlersPerPath[path]
    if (!handlers) return
    forEach(handlers, innerDirective => innerDirective())
  }
}
