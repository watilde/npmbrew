var updateNotifier = require('update-notifier');
var pkg = require(__dirname + '/package.json');
var argv = require('optimin')(process.argv.slice(2), {
  ls: { boolean: true },
  'ls-remote': { boolean: true },
  help: {},
  use: {},
  install: {},
  uninstall: {}
});
var npmbrew = function () {};

updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify();

module.exports = npmbrew;
