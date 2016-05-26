var https = require('https')
var table = require('text-table')
var url = require('../config').url

module.exports = function () {
  var message = ''
  var body = ''
  var versions = []
  var stdout = []

  https.get(url, function (res) {
    if (res.statusCode !== 200) {
      message = 'Error: Server responsed status code '
      message += res.statusCode
      console.error(message)
    }

    res.on('data', function (chunk) { body += chunk })

    res.on('end', function () {
      body = JSON.parse(body)
      versions = Object.keys(body.versions)
      versions = versions.map(function (version) {
        return 'v' + version
      })
      versions.forEach(function (version, index) {
        var key = Math.floor(index / 8)
        if (!Array.isArray(stdout[key])) stdout[key] = []
        stdout[key].push(version)
      })
      message = table(stdout)

      console.log('remote:')
      console.log(message)
    })
  }).on('error', function (e) {
    console.error(e.message)
  })
}
