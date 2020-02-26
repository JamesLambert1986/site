module.exports = function(config) {
  config.set({
    browsers: [ "ChromeHeadless" ],
    frameworks: [
      'qunit',
      'sinon'
    ],
    plugins: [
      'karma-qunit',
      'karma-sinon',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-mocha-reporter',
    ],
    files: [
      'unit_tests/variables.js',
      'node_modules/hammer-simulator/index.js',
      'public/scripts/libs/jquery-3.4.1.min.js',
      'public/scripts/vmstrap.js',
      'unit_tests/bootstrap_tests/collapse.js',
      'unit_tests/js_tests/**/*.spec.js',
    ],
    preprocessors: {
      'public/scripts/vmstrap.js': 'coverage'
    },
    reporters: ['dots','junit','mocha'],
    basePath:'../',
    customContextFile: 'unit_tests/index.html',
    junitReporter: {
      outputDir: 'audit/tests/', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    }
  });
};