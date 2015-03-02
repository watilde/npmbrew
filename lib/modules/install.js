var child_process = require("child_process")
var fs = require("fs")
var http = require("http")
var path = require("path")
var shasum = require("crypto").createHash("sha1")
var mkdirp = require("mkdirp")
var url = require("../config").url
var dirname = require("../config").dirname

module.exports = function (version) {
  var body = ""
  if (version.substring(0, 1) !== "v") version = "v" + version
  var exists = fs.existsSync(path.join(dirname.src, version))
  if (exists) {
    console.log(version +" is already installed.\n")
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
          if(!exists) mkdirp.sync(dirname.src)
          var file_name = dirname.src + "/npm-" + version + "/npm-"
          file_name += version + ".tgz"
          mkdirp.sync(dirname.src + "/npm-" + version)
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
            child_process.exec(command, {encoding : "utf8"}, function () {
              var oldPath = dirname.src + "/npm-" + version + "/package"
              var newPath = dirname.npm + "/v" + version
              var exists = fs.existsSync(dirname.npm)
              if(!exists) mkdirp.sync(dirname.npm)
              exists = fs.existsSync(newPath)
              if (!exists) fs.renameSync(oldPath, newPath)
              var pkg = require(path.join(newPath, "package.json"))
              var bin = typeof pkg.bin === "string" ?
                pkg.bin : typeof pkg.bin === "object" ?
                pkg.bin.npm : false
              if (!bin) {
                console.log("There isn't bin prop in package.json for npmbrew")
                return
              }
              bin = path.join(dirname.current, pkg.bin)
              child_process.exec(
                "cd " + newPath + " " + bin + " install",
                {encoding : "utf8"},
                function (error) {
                  if (error) {
                    console.log(error)
                  } else {
                    console.log("installed")
                  }
                }
              )
            })
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
