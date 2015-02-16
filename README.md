# npmbrew
NPM Version Manager

## Install
Using npm.

```
$ npm install -g npmbrew
```

## Usage
```
Usage: npmbrew <command>

Commands:
help                 Output help information
install <version>    Install the version passed
ls                   List versions currently installed
ls-remote            List registry versions
npm                  An alias of npm <command>
uninstall <version>  Delete the install for <version>
use <version>        Use <version>
```

## Example
Install
```
$ npmbrew install v2.6.0
installed
```

Switch use version
```
$ npmbrew use v2.6.0
Using v2.6.0
```

Use npm
```
$ npmbrew npm help
Usage: npm <command> blah blah...
```
