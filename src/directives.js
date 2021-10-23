import { valueToText, get } from './shared.js'

let directives = [
  {
    name: "hide",
    elements: [],
    handler: (element, data, value) => {
      const innerHandler = () => element.style.display = data[value] ? '' : 'none'

      innerHandler()
      return innerHandler
    }
  },
  {
    name: "text",
    elements: [],
    handler: (element, data, value) => {
      const innerHandler = () => element.innerText = valueToText(data, data[value])

      innerHandler()
      return innerHandler
    }
  },
  {
    name: "bind",
    elements: [],
    handler: (element, data, value) => {
      const modelName = element.getAttribute("k-bind")
      element.oninput = () => {
        data[modelName] = element.value
      }

      const innerHandler = () => element.value = data[value]

      innerHandler()
      return innerHandler
    }
  },
  {
    name: "if",
    elements: [],
    handler: (element, data, value) => {
      const comment = document.createComment('')

      const innerHandler = () => {
        if (!data[value]) element.replaceWith(comment)
        else comment.replaceWith(element)
      }

      innerHandler()
      return innerHandler
    }
  },
]

export default (model) => {
  const handlersPerPath = {}
  const executeDirectiveHandler = (name, element, handler) => {
    const propertyPath = element.getAttribute(`k-${name}`)
    if (!handlersPerPath[propertyPath]) handlersPerPath[propertyPath] = []

    handlersPerPath[propertyPath].push(
      handler(element, model, propertyPath)
    )
  }

  directives = directives.map(({ name, handler, elements }) => {
    elements = get(`[k-${name}]`)
    elements.forEach((element) => executeDirectiveHandler(name, element, handler))

    return {
      name,
      handler,
      elements
    }
  })

  return (_, path) => {
    const handlers = handlersPerPath[path]
    if (!handlers) return
    handlers.forEach(innerDirective => innerDirective())
  }
}
