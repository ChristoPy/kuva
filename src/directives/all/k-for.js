import directive from "../directive"

export default directive('for', (element, data, path) => {
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
  let initialLength = -1
  let last = element.nextSibling
  const children = [...element.content.children]
  const nodes = []

  const addNode = (index, node) => {
    const imported = document.importNode(node, true)

    imported._k_scope = { ...expression, index }

    element.parentNode.insertBefore(imported, last)
    last = imported.nextSibling
    nodes.push(imported)
  }

  const orchestrateItems = (items) => {
    items.forEach((_, index) => {
      children.forEach((child) => addNode(index, child))
    })
  }

  const getNodesInRange = (start, end) => nodes.slice(start, end)

  const removeItemsInRange = (start, end) => {
    getNodesInRange(start, end).forEach((node) => node.remove())
    nodes.length = start
  }

  const patchItems = (lastLength, currentLength, items) => {
    if (currentLength > lastLength) {
      const newItems = items.slice(lastLength, currentLength)
      orchestrateItems(newItems)
    }
    else removeItemsInRange(currentLength, lastLength)
  }

  const innerHandler = () => {
    const currentItems = data[expression.items]
    const currentLength = currentItems.length

    if (initialLength === currentLength) return

    if (initialLength < 0) orchestrateItems(currentItems)
    else patchItems(initialLength, currentLength, currentItems)

    initialLength = currentLength
  }

  innerHandler()
  return [innerHandler, expression.items]
})
