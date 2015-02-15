var path = require("path")
var updateNotifier = require("update-notifier")
var pkg = require(path.join(__dirname, "../package.json"))
var npmbrew = require("./")
var argv = process.argv.slice(2)

updateNotifier({
  packageName : pkg.name,
  packageVersion : pkg.version
}).notify()

switch (argv[0]) {
  case "ls-remote":
    if (argv.length === 1) {
      npmbrew.lsRemote()
      break
    }
  case "install":
    if (argv.length === 2) {
      npmbrew.install(argv[1])
      break
    }
  default:
    var message = ""
    if (argv.length > 0) {
      message += "Unrecognized command line argument: "
      message += argv.join(" ")
      message += " ( See: \"npmbrew help\" )"
      console.log(message)
    } else {
      npmbrew.help()
    }
    break
}
