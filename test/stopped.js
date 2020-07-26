const tcpPortUsed = require('tcp-port-used')
const defaultPort = 9515

exports.chromedriver = {
  stopped: test => {
    const port = +process.env.CHROMEDRIVER_PORT || defaultPort
    tcpPortUsed
      .waitUntilFree(port)
      .then(() => test.ok(true, `port ${port} is free`))
      .catch(error => {
        console.error(error.stack)
        test.ok(false, error.message)
      })
      .finally(() => test.done())
  }
}
