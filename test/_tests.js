const ZestyAPI = require("../dist/ZestyAPI");

const E621 = ZestyAPI.connect({
    userAgent: "ZestyAPI/Example",
    debug: false,
});

module.exports = E621;
