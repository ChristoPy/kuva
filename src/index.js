import model from "./model.js"
import dom from "./dom.js"

export default (data) => {
  let updateDOM = () => {}

  const app = model(data, (path) => updateDOM(app, path))
  updateDOM = dom(app)

  return app
}
