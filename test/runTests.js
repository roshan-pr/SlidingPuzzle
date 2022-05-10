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

const generateReport = (testResult) => {
  const report = {};
  testResult.map((test) => {
    if (test.isPassed)
      report.passed = report.passed + 1 || 1;
    else {
      report.failed = report.failed + 1 || 1;
      if (report.errors) { report.errors += '\n' + test.description }
      else { report.errors = test.description; };
    }
  })
  console.log(report);
};

const runTests = function () {
  const errorLog = this.map(runTest);
  // console.log(errorLog);
  generateReport(errorLog);
  return errorLog;
};

exports.createTest = makeTest.bind(tests);
exports.runTests = runTests.bind(tests);
