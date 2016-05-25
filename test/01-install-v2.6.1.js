var fs = require('fs')
var test = require('tap').test
var npmbrew = require('../lib/')
var dirname = require('../lib/config').dirname
var version = '2.6.1'

test('npmbrew install v2.6.1', function (t) {
  npmbrew.install(version, function () {
    var srcFile = dirname.src + '/npm-' + version
    var npmFile = dirname.npm + '/v' + version
    t.ok(fs.existsSync(srcFile), 'v' + version + ' src file exists')
    t.ok(fs.existsSync(npmFile), 'v' + version + ' npm file exists')
    t.end()
  })
})
