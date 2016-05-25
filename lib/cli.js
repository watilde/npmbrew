var updateNotifier = require('update-notifier')
var pkg = require('./config').pkg
var npmbrew = require('./')
var argv = process.argv.slice(2)

updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify()

switch (argv[0]) {
  case 'help':
    if (argv.length === 1) {
      npmbrew.help()
      break
    }
    /* falls through */
  case 'uninstall':
    if (argv.length === 2) {
      npmbrew.uninstall(argv[1])
      break
    }
    /* falls through */
  case 'clean':
    if (argv.length === 1) {
      npmbrew.clean()
      break
    }
    /* falls through */
  case 'install':
    if (argv.length === 2) {
      npmbrew.install(argv[1])
      break
    }
    /* falls through */
  case 'ls':
    if (argv.length === 1) {
      npmbrew.ls()
      break
    }
    /* falls through */
  case 'ls-remote':
    if (argv.length === 1) {
      npmbrew.lsRemote()
      break
    }
    /* falls through */
  case 'use':
    if (argv.length === 2) {
      npmbrew.use(argv[1])
      break
    }
    /* falls through */
  case 'npm':
    npmbrew.npm(argv.slice(1))
    break
  default:
    var message = ''
    if (argv.length > 0) {
      message += 'Unrecognized command line argument: '
      message += argv.join(' ')
      message += ' ( See: \'npmbrew help\' )'
      console.log(message)
    } else {
      npmbrew.help()
    }
    break
}
