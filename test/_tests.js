const E621 = require("../dist/ZestyAPI");

const esix = E621.connect({
    userAgent: "ZestyAPI/Example",
    debug: false,
});

module.exports = esix;
