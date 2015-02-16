var path = require("path")

module.exports = {
  url : "http://registry.npmjs.org/npm/",
  pkg : require(path.join(__dirname, "../package.json")),
  dirname : {
    src : path.join(__dirname, "../src"),
    npm : path.join(__dirname, "../npm")
  }
}
