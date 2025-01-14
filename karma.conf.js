// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-verbose-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: [ 'html', 'text-summary' ],
      fixWebpackSourcePaths: true,
      watermarks: {
        statements: [ 50, 75 ],
        functions: [ 50, 70 ],
        branches: [ 50, 70 ],
        lines: [ 50, 70 ]
      }
    },
    angularCli: {
      environment: 'dev',
      codeCoverage: true
    },
    reporters: config.angularCli && config.angularCli.codeCoverage ? ['progress', 'coverage-istanbul'] : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    flags: ['--no-sandbox', '--disable-gpu'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 10000,
    singleRun: false,
    failOnFailingTestSuite: false
  });
};
