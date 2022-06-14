module.exports = function (grunt) {
  const alternativePort = '9517'

  grunt.initConfig({
    chromedriver: {
      quiet: {},
      verbose: { verbose: true, args: [`--port=${alternativePort}`] },
      otherPort: { port: +alternativePort, findAvailablePort: true },
      fail: { args: ['--invalid'] }
    },

    nodeunit: {
      started: ['test/started.js'],
      stopped: ['test/stopped.js']
    }
  })

  grunt.loadNpmTasks('grunt-contrib-nodeunit')
  grunt.loadTasks('tasks')

  process.env.CHROMEDRIVER_PORT = undefined
  grunt.registerTask('switchPort', 'Grunt task switching the chromedriver port.', function () {
    process.env.CHROMEDRIVER_PORT = alternativePort
  })

  grunt.registerTask('default', [
    'nodeunit:stopped', 'chromedriver:quiet:start',
    'nodeunit:started', 'chromedriver:quiet:stop',
    'nodeunit:stopped', 'chromedriver:verbose:start', 'switchPort',
    'nodeunit:started', 'chromedriver:verbose:stop', 'nodeunit:stopped',
    'chromedriver:otherPort:start', 'nodeunit:started'
  ])
}
