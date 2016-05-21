var path = require("path")
var home = process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"]
var env = process.env.NODE_ENV || "production"
var dirname = (env === "development")
  ? path.join(__dirname, "../")
  : path.join(home, ".npmbrew")

module.exports = {
  env : env,
  url : "https://registry.npmjs.org/npm/",
  pkg : require(path.join(__dirname, "../package.json")),
  dirname : {
    current : {
      dir : path.join(dirname, "current"),
      npm : path.join(dirname, "current/npm"),
      bindir : path.join(dirname, "current/bin"),
      bin : path.join(dirname, "current/bin/npm")
    },
    src : path.join(dirname, "src"),
    npm : path.join(dirname, "npm")
  }
}
