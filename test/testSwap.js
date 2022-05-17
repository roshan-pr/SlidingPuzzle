const { deepEqual } = require('assert').strict;
const { swap } = require('../slide.js');
const { createTest, runTests } = require('./runTests.js');

createTest('Move the emptyBlock one position right',
  (desc) => {
    const actl = swap({ puzzle: [[' ', 1], [2, 3]], 'emptyBlock': [0, 0] }, [0, 1]);
    return deepEqual(actl, { puzzle: [[1, ' '], [2, 3]], 'emptyBlock': [0, 1] }, desc);
  }
);

createTest('Move the emptyBlock one position left',
  (desc) => {
    const actl = swap({ puzzle: [[1, ' ']], 'emptyBlock': [0, 1] }, [0, 0]);
    return deepEqual(actl, { puzzle: [[' ', 1]], 'emptyBlock': [0, 0] }, desc);
  }
);

createTest('Move the emptyBlock one position down',
  (desc) => {
    const actl = swap({ puzzle: [[1, ' '], [2, 3]], 'emptyBlock': [0, 1] }, [1, 1]);
    return deepEqual(actl, { puzzle: [[1, 3], [2, ' ']], 'emptyBlock': [1, 1] }, desc);
  }
);

createTest('Move the emptyBlock one position up',
  (desc) => {
    const actl = swap({ puzzle: [[1, 2], [' ', 3]], 'emptyBlock': [1, 0] }, [0, 0]);
    return deepEqual(actl, { puzzle: [[' ', 2], [1, 3]], 'emptyBlock': [0, 0] }, desc);
  }
);

runTests();
