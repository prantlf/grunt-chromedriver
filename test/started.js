const { remote } = require('webdriverio')
const tcpPortUsed = require('tcp-port-used')
const defaultPort = 9515

exports.chromedriver = {
  started: test => {
    const port = +process.env.CHROMEDRIVER_PORT || defaultPort
    tcpPortUsed
      .check(port)
      .then(used => test.ok(used, `port ${port} is used`))
      .catch(error => {
        console.error(error.stack)
        test.ok(false, error.message)
      })
      .finally(() => test.done())
  },
  works: test => {
    const port = +process.env.CHROMEDRIVER_PORT || defaultPort
    remote({
      port,
      logLevel: 'warn',
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--headless']
        }
      }
    })
      .then(browser => {
        test.ok(true, 'browser is up')
        return browser.deleteSession()
      })
      .catch(error => {
        console.error(error.stack)
        test.ok(false, error.message)
      })
      .finally(() => test.done())
  }
}
