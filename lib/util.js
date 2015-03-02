var fs = require("fs")
var path = require("path")

module.exports.rmrf = rmrf

function rmrf (p) {
  if(fs.existsSync(p)) {
    fs.readdirSync(p).forEach(function (file, index) {
      var curPath = path.join(p, file)
      if(fs.lstatSync(curPath).isDirectory()) {
        rmrf(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(p)
  } else {
    try {
      if (fs.lstatSync(p).isSymbolicLink()) {
        fs.unlinkSync(p)
      }
    } catch (Exception) {
    }
  }
}
