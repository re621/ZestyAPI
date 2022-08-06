const E621 = require("../dist/zestyapi");

const esix = E621.connect({
    userAgent: "zestyapi/example",
    debug: false,
});

describe("ZestyAPI", () => {
    test("Fetch 1 post", () => {
        esix.Posts.get(12345).then((result) => {
            expect(result.id).toBe(12345);
        });
    });
    test("Fetch many posts", async () => {
        const result = await esix.Posts.find([], 320);
        expect(result.length).toBe(320);
    });
});
