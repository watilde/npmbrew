var path = require("path")
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
var npmbrew = path.join(home, ".npmbrew")

module.exports = {
  url : "http://registry.npmjs.org/npm/",
  pkg : require(path.join(__dirname, "../package.json")),
  dirname : {
    current : path.join(npmbrew, "../current"),
    src : path.join(npmbrew, "../src"),
    npm : path.join(npmbrew, "../npm")
  }
}
