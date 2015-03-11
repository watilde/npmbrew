# npmbrew -- a npm version manager

[![Build Status](https://api.travis-ci.org/watilde/npmbrew.svg)](https://travis-ci.org/watilde/npmbrew)

## Why created npmbrew?
Many issue reports has come to npm everyday. Sometimes I spent much time reinstalling several different versions of npm for trying to reproduce the error.

npmbrew makes it easy. That's why created npmbrew. See also: [#14](https://github.com/watilde/npmbrew/issues/14)

## Install
Using npm.

```
npm install -g npmbrew
```

## Usage
```
Usage: npmbrew <command>

Commands:
clean                Delete all installed sources
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
npmbrew install v2.6.0
installed
```

Switch use version
```
npmbrew use v2.6.0
Using v2.6.0
```

Use npm
```
npmbrew npm help
Usage: npm <command> blah blah...
```

## Add `npmbrew npm` PATH
Add the following line to the end of your .bashrc or .zshrc.
```
alias n='npmbrew npm'
```

Reload config.
```
source ~/.zshrc
```

Test.
```
n help
Usage: npm <command> blah blah...
```

## One more thing
You can notice good news when you didn't know that npm latest version was updated.
```
npmbrew npm whoami
watilde


┌──────────────────────────────────────────┐
│ Update available: 2.7.0 (current: 2.6.0) │
│ Run npmbrew install 2.7.0 to update.     │
└──────────────────────────────────────────┘


```

## LICENSE
The MIT License (MIT)

Copyright (c) 2015 Daijiro Wachi

See also: [LICENSE](/LICENSE).
