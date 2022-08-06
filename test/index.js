// import E621 from "../dist/zestyapi.node.js";
const E621 = require("../dist/zestyapi");

const esix = E621.connect({
    userAgent: "zestyapi/example",
    debug: true,
});

/*
esix.Posts.get(12345).then((result) => {
    console.log(JSON.stringify(result, null, 2));
});
*/

esix.Posts.find().then((result) => {
    console.log(result);
});
