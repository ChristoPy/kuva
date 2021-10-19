import model from "./model.js"
import { attachDirectives } from "./directives.js"

export default (data) => {
  let runInnerDirective = null

  const app = model(data, () => runInnerDirective())

  runInnerDirective = attachDirectives(app)

  return app
}
