var updateNotifier = require("update-notifier")
var cli = require("commander")
var pkg = require("./config").pkg

updateNotifier({
  packageName : pkg.name,
  packageVersion : pkg.version
}).notify()

cli.version(pkg.version)
  .command("clean", "remove all installed npm versions")
  .command("install <version>", "install the specified npm <version>")
  .command("uninstall <version>", "remove the specified npm <version>")
  .command("ls", "list all installed npm versions")
  .command("ls-remote", "list registry versions")
  .command("npm <command>", "alias for npm <command>")
  .command("use <version>", "use the specified npm <version>")
  .parse(process.argv)

if (cli.args.length < 1) {
  cli.help()
} else if (!cli._execs[cli.args[0]]) {
    var message = "Unrecognized command line argument: "
    message += cli.args.join(" ")
    message += " ( See: \"npmbrew help\" )"
    console.log(message)
}
