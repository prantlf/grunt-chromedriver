const portscanner = require('portscanner')

const defaultPort = 9515

function getPortFromArgs (args) {
  let port
  return (args.some(arg => (port = /--port=(\d+)/.exec(arg))) && +port[1]) || defaultPort
}

function finalizeArgs (options) {
  const args = options.args || []
  const port = options.port || getPortFromArgs(args)
  const promise = options.findAvailablePort ? portscanner.findAPortNotInUse(port) : Promise.resolve(port)
  return promise.then(port => {
    if (port === defaultPort) return { args, port }
    return {
      args: args
        .filter(arg => !arg.startsWith('--port='))
        .concat([`--port=${port}`]),
      port
    }
  })
}

let chromedriver

module.exports = grunt => {
  grunt.registerMultiTask('chromedriver',
    'Controls Chrome or Chromium using the WebDriver interface via chromedriver without Selenium.',
    function (command) {
      /* istanbul ignore next */
      if (!command) grunt.fatal('command verb missing; append ":start" or ":stop" to the task name')
      switch (command.toLowerCase()) {
        case 'start': start(this); break
        case 'stop': stop(); break
        /* istanbul ignore next */
        default: grunt.fatal(`invalid command verb: "${command}"; append ":start" or ":stop" to the task name`)
      }

      function start (task) {
        /* istanbul ignore next */
        if (chromedriver) grunt.fatal('ChromeDriver already started.')
        chromedriver = require('chromedriver')
        const done = task.async()
        const options = Object.assign({
          findAvailablePort: false,
          args: [],
          force: false
        }, task.data)
        const target = this.target
        let usedPort
        finalizeArgs(options)
          .then(({ args, port }) => {
            usedPort = port
            grunt.config.set(`chromedriver.${target}.port`, port)
            return chromedriver.start(args, true)
          })
          .then(() => {
            grunt.event.emit(`chromedriver.${target}.listening`, usedPort)
            process.on('exit', stop)
          })
          .catch(/* istanbul ignore next */ function (error) {
            grunt.verbose.error(error.stack)
            const warn = options.force ? grunt.log.warn : grunt.fail.warn
            warn(`chromedriver failed: ${error.message}`)
          })
          .finally(() => done())
      }

      function stop () {
        if (chromedriver) {
          grunt.log.writeln('Stopping ChromeDriver.')
          chromedriver.stop()
          chromedriver = null
          process.off('exit', stop)
        }
      }
    })
}
