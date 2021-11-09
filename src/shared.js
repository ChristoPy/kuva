export const valueToText = (data, value) => {
  if (typeof value === "function") return value.call(data)
  if (typeof value === "object") return JSON.stringify(value)
  return value
}

export const get = (selector) => [...document.querySelectorAll(selector)]

export const newComment = () => document.createComment('')
