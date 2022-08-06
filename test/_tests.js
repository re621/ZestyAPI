const E621 = require("../dist/zestyapi");

const esix = E621.connect({
    userAgent: "zestyapi/example",
    debug: false,
});

module.exports = esix;
