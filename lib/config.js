var path = require("path")
module.exports = {
  url : "http://registry.npmjs.org/npm/",
  pkg : require(path.join(__dirname, "../package.json")),
  dirname : {
    current : path.join(__dirname, "../current"),
    src : path.join(__dirname, "../src"),
    npm : path.join(__dirname, ../npm"),
  }
}
