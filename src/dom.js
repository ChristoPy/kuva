import directives from './directives.js'

export default (model) => {
  let runInnerDirective = directives(model)

  return (model, path) => runInnerDirective(model, path)
}
