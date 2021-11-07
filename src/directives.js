import { valueToText, get } from './shared.js'

let directives = [
  {
    name: "hide",
    elements: [],
    handler: (element, data, path) => {
      const innerHandler = () => element.style.display = data[path] ? '' : 'none'

      innerHandler()
      return [innerHandler]
    }
  },
  {
    name: "text",
    elements: [],
    handler: (element, data, path) => {
      const innerHandler = () => element.innerText = valueToText(data, data[path])

      innerHandler()
      return [innerHandler]
    }
  },
  {
    name: "bind",
    elements: [],
    handler: (element, data, path) => {
      element.oninput = () => {
        data[path] = element.value
      }

      const innerHandler = () => element.value = data[path]

      innerHandler()
      return [innerHandler]
    }
  },
  {
    name: "if",
    elements: [],
    handler: (element, data, path) => {
      const comment = document.createComment('')

      const innerHandler = () => {
        if (!data[path]) element.replaceWith(comment)
        else comment.replaceWith(element)
      }

      innerHandler()
      return [innerHandler]
    }
  },
  {
    name: "not",
    elements: [],
    handler: (element, data, path) => {
      const comment = document.createComment('')

      const innerHandler = () => {
        if (!data[path]) comment.replaceWith(element)
        else element.replaceWith(comment)
      }

      innerHandler()
      return [innerHandler]
    }
  },
]

export default (model) => {
  const handlersPerPath = {}
  const executeDirectiveHandler = (name, element, handler) => {
    const path = element.getAttribute(`k-${name}`)
    let [innerHandler, context] = handler(element, model, path)

    if (!context) context = path

    if (!handlersPerPath[context]) handlersPerPath[context] = []
    handlersPerPath[context].push(innerHandler)
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
