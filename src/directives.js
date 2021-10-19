const valueToText = (data, value) => {
  if (typeof value === "function") return value.call(data)
  if (typeof value === "object") return JSON.stringify(value)
  return value
}

let directives = [
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
  }
]

const getAll = (name) => document.querySelectorAll(`[k-${name}]`)

export const attachDirectives = (model) => {
  const innerDirectivesHandler = []
  const executeDirectiveHandler = (name, element, handler) => innerDirectivesHandler.push(
    handler(element, model, element.getAttribute(`k-${name}`))
  )

  directives = directives.map(({ name, handler, elements }) => {
    elements = getAll(name)
    elements.forEach((element) => executeDirectiveHandler(name, element, handler))

    return {
      name,
      handler,
      elements
    }
  })

  return () => innerDirectivesHandler.forEach(innerDirective => innerDirective())
}
