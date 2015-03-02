# npmbrew - NPM version manager

+ [![Build Status](https://api.travis-ci.org/watilde/npmbrew.svg)](https://travis-ci.org/watilde/npmbrew)

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

## LICENSE
The MIT License (MIT)

Copyright (c) 2015 Daijiro Wachi

See also: [LICENSE](/LICENSE).
