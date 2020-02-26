module.exports = function(config) {
  config.set({
    browsers: [ "ChromeHeadless" ],
    frameworks: [
      'quixote',
      'mocha',
      'chai'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-quixote',
      'karma-mocha',
      'karma-junit-reporter',
      'karma-mocha-reporter',
      'karma-chai'
    ],
    files: [
      'unit_tests/css_tests/vars.js',
      'unit_tests/css_tests/func.js',
      'unit_tests/css_tests/*.spec.js',
      { pattern: 'public/stylesheets/styles.css', included: false },
      { pattern: 'unit_tests/css_reset.css', included: false }
    ],
    reporters: ['dots','junit','mocha'],
    basePath:'../',
    customContextFile: 'unit_tests/index.html',
    junitReporter: {
      outputDir: 'audit/css_tests/', // results will be saved as $outputDir/$browserName.xml
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