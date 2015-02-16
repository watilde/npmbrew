var child_process = require("child_process")
var fs = require("fs")
var http = require("http")
var path = require("path")
var shasum = require("crypto").createHash("sha1")
var url = require("../config").url
var dirname = require("../config").dirname

module.exports = function (version) {
  var body = ""
  if (version.substring(0, 1) !== "v") version = "v" + version
  var exists = fs.existsSync(path.join(dirname.src, version))
  if (exists) {
    console.log(version +" is already installed.\n")
    return
  }
  version = version.substr(1)

  http.get(url, function(res) {
    if(res.statusCode !== 200) {
      var message = "Error: Server responsed status code "
      message += res.statusCode
      console.error(message)
    }
    res.on("data", function(chunk) { body += chunk })

    res.on("end", function() {
      body = JSON.parse(body)
      var versions = Object.keys(body.versions)
      if (versions.indexOf(version) === -1) {
        console.log("Unknown version: " + version)
        return
      }
      var dist = body.versions[version].dist
      var buffer = []
      var buffersize = 0
      http.get(dist.tarball, function (res) {
        res.on("data", function (chunk) {
          buffer.push(chunk)
          buffersize += chunk.length
        })
        res.on("end", function() {
          var data = Buffer.concat(buffer, buffersize)
          shasum.update(data)
          if(shasum.digest("hex") !== dist.shasum) {
            console.error("Error: Download data is broken")
            return
          }
          var exists = fs.existsSync(dirname.src)
          if(!exists) fs.mkdirSync(dirname.src)
          var file_name = dirname.src + "/npm-" + version + "/npm-"
          file_name += version + ".tgz"
          fs.mkdirSync(dirname.src + "/npm-" + version)
          fs.openSync(file_name, "w+")
          var writeStream = fs.createWriteStream(file_name)
          writeStream.on("error", function (e) {
            console.error(e.message)
          })
          writeStream.write(data, "binary")
          writeStream.end()
          writeStream.on("close", function () {
            var command = "tar -zxf " + file_name
            command += " -C " + dirname.src + "/npm-" + version
            child_process.execSync(command)
            var old_path = dirname.src + "/npm-" + version + "/package"
            var new_path = dirname.npm + "/npm-" + version
            command = "cp -r " + old_path + " " + new_path
            var exists = fs.existsSync(dirname.npm)
            if(!exists) fs.mkdirSync(dirname.npm)
            child_process.execSync(command)
            console.log("installed")
          })
        })
      }).on("error", function(e) {
        console.error(e.message)
      })
    })
  }).on("error", function(e) {
    console.error(e.message)
  })
}
