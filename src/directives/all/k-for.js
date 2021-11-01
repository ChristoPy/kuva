import directive from "../directive"

export default directive('for', (element, data, path) => {
  // adicionar check para saber se o element com [k-for] está dentro de um template
  // e é o único nó do template

  const getItems = () => {
    const expressionRegex = /^([\w]*)\s+in\s+([\w]*)$/;
    const matches = path.match(expressionRegex);
  
    if (!matches) throw new Error('[k-for] Invalid expression')
  
    const item = matches[1].trim()
    const matchedItems = matches[2].trim()
  
    if (!data[matchedItems]) throw new Error(`[k-for] Cannot find "${item}" in "${matchedItems}"`)
  
    return {
      item,
      items: matchedItems,
    }
  }

  const expression = getItems()

  const innerHandler = () => {
    const children = [...element.content.children]
    let last = element.nextSibling

    data[expression.items].forEach((_, index) => {
      children.forEach((child) => {
        const imported = document.importNode(child, true)

        imported._k_scope = { ...expression, index }

        element.parentNode.insertBefore(imported, last)
        last = imported.nextSibling
      })
    })
  }

  innerHandler()
  return [innerHandler]
})
