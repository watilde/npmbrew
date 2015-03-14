# npmbrew -- a npm version manager

[![Build Status](https://api.travis-ci.org/watilde/npmbrew.svg)](https://travis-ci.org/watilde/npmbrew)

## Why npmbrew?
npm is flooded with [issue reports](https://github.com/npm/npm/issues) on a daily basis. Sometimes I spent just too much time juggling around different npm versions trying to reproduce the error.

I created npmbrew to make it easy to switch  versions. See also: [#14](https://github.com/watilde/npmbrew/issues/14)

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

Switch version with `use`:
```
npmbrew use v2.6.0
Using v2.6.0
```

Use npm
```
npmbrew npm help
Usage: npm <command> blah blah...
```

## Add `npmbrew npm` to PATH
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
npmbrew uses [update-notifier](https://github.com/yeoman/update-notifier/), to let users know when there is a new version available for download.
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
