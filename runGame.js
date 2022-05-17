const { slide } = require('./slide.js');

const slidesTo = () => process.argv[2];

slide(slidesTo());
