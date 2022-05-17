const tests = [];
const makeTest = function (desc, test) {
  return this.push({ desc, test });
};

const runTest = function ({ desc, test }) {
  let isPassed = true;
  let error = null;
  try {
    test();
  } catch (err) {
    isPassed = false;
    error = err;
  }
  return { isPassed: isPassed, description: desc, error: error };
};

const addPassed = (report) => report.passed + 1 || 1;
const addFailed = (report) => report.failed + 1 || 1;

const generateReport = (testResult) => {
  return testResult.reduce(function (report, test) {
    if (test.isPassed) {
      report.passed = addPassed(report);
      return report;
    }
    report.failed = addFailed(report);
    if (report.errors) {
      report.errors += '\n' + test.description;
      return report;
    }
    report.errors = test.description;
    return report;
  }, {});
};

const runTests = function () {
  const errorLog = this.map(runTest);
  // console.log(errorLog);
  console.log(generateReport(errorLog));
  return errorLog;
};

exports.createTest = makeTest.bind(tests);
exports.runTests = runTests.bind(tests);
