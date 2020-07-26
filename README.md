# grunt-chromedriver
[![NPM version](https://badge.fury.io/js/grunt-chromedriver.png)](http://badge.fury.io/js/grunt-chromedriver)
[![Build Status](https://travis-ci.org/prantlf/grunt-chromedriver.png)](https://travis-ci.org/prantlf/grunt-chromedriver)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/grunt-chromedriver/badge.svg?branch=master)](https://coveralls.io/github/prantlf/grunt-chromedriver?branch=master)
[![Dependency Status](https://david-dm.org/prantlf/grunt-chromedriver.svg)](https://david-dm.org/prantlf/grunt-chromedriver)
[![devDependency Status](https://david-dm.org/prantlf/grunt-chromedriver/dev-status.svg)](https://david-dm.org/prantlf/grunt-chromedriver#info=devDependencies)
[![peerDependency Status](https://david-dm.org/prantlf/grunt-chromedriver/peer-status.svg)](https://david-dm.org/prantlf/grunt-chromedriver#info=peerDependencies)

[![NPM Downloads](https://nodei.co/npm/grunt-chromedriver.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-chromedriver)

Controls Chrome or Chromium using the WebDriver interface via chromedriver without Selenium.

If you use a modern test driver like [webdriverio], you will not need [Selenium] to run the tests, because the browser driver itself implements the [WebDriver] interface. This module provides a [Grunt] multi-task for installing, starting and stopping the [chromedriver] executable. You take care of installing Chrome or Chromium.

This task and [grunt-geckodriver] can be used as a replacement for [grunt-selenium-standalone] for tasks like [grunt-html-dom-snapshot], to simplify the whole scenario by removing [Selenium] and [Java] from the requirements.

## Installation

You need [node >= 10][node], [npm] and [grunt >= 1.0.0][Grunt] installed and
your project build managed by a [Gruntfile]. If you have not used Grunt before,
be sure to check out the [Getting Started] guide, as it explains how to create
a Gruntfile as well as install and use Grunt plugins.  Once you are familiar
with that process, you may install this plugin with this command:

    npm install grunt-chromedriver --save-dev

## Configuration

Add the `chromedriver` entry with one or more tasks to the options of the
`grunt.initConfig` method in `Gruntfile.js`:

```js
grunt.initConfig({
  chromedriver: {
    default: {}
  }
});
```

Load the plugin:

```javascript
grunt.loadNpmTasks('grunt-chromedriver');
```

Add use the task to start and stop the browser driver before and after the tests:

```js
grunt.registerTask('default', ['chromedriver;default:start', ..., 'chromedriver;default:stop']);
```

### Options

Default task options support the most usual usage scenario:

```js
chromedriver: {
  default: {
    port: 9515,
    findAvailablePort: false,
    args: [],
    force: false
  }
}
```

#### port
Type: `Number`
Default value: `9515`

The port for the `chromedriver` to listen to. If `findAvailablePort` is set to
`true`, this port will be used to start the search for a free port with.

### findAvailablePort
Type: `Boolean`
Default value: `false`

If set to `true`, the value of `port` will be used to start the search for a
free port with.

### args
Type: `Array<String>`
Default value: `[]`

Command-line arguments for the `chromedriver` executable. Available ones:

    --port=PORT           port to listen on
    --adb-port=PORT       adb server port
    --log-path=FILE       write server log to file instead of stderr, increases
                          log level to INFO
    --log-level=LEVEL     set log level: ALL, DEBUG, INFO, WARNING, SEVERE, OFF
    --verbose             log verbosely (equivalent to --log-level=ALL)
    --silent              log nothing (equivalent to --log-level=OFF)
    --append-log          append log file instead of rewriting
    --replayable          (experimental) log verbosely and don't truncate long
                          strings so that the log can be replayed.
    --url-base            base URL path prefix for commands, e.g. wd/url
    --readable-timestamp  add readable timestamps to log
    --whitelisted-ips     comma-separated whitelist of remote IP addresses
                          which are allowed to connect to ChromeDriver

### force
Type: `Boolean`
Default value: `false`

If set to `true`, it suppresses failures. Instead of making the Grunt fail,
the errors will be written only to the console.

### Events

If `findAvailablePort` is set to `true`, the actual chosen port can be read by:

```js
grunt.config.get(`chromedriver.<task-name>.port`)
```

As soon es the browser driver process starts listening, an event will be
triggered with the actually chosen port:

```js
grunt.event.on(`chromedriver.<task-name>.listening`, port => {...})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## License

Copyright (c) 2017-2020 Ferdinand Prantl

Licensed under the MIT license.

[node]: https://nodejs.org
[npm]: https://npmjs.org
[Grunt]: https://gruntjs.com
[Gruntfile]: https://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[Selenium]: http://www.seleniumhq.org/download/
[chromedriver]: https://github.com/giggio/node-chromedriver#readme
[webdriverio]: http://webdriver.io/
[Java]: https://java.com/en/download/
[WebDriver]: https://www.w3.org/TR/webdriver/
[grunt-html-dom-snapshot]: https://github.com/prantlf/grunt-html-dom-snapshot#readme
[grunt-selenium-standalone]: https://github.com/zs-zs/grunt-selenium-standalone#readme
[grunt-geckodriver]: https://github.com/prantlf/grunt-geckodriver#readme
