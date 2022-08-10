const E621 = require("./_tests");

describe("IQDBQueries", () => {
    // find()
    test("Check for duplicates (by URL)", async () => {
        const result = await E621.IQDBQueries.find({ url: "https://pbs.twimg.com/media/EcWMQ9IXsAAKoPE?format=jpg&name=orig" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
    });
    test("Check for duplicates (by ID)", async () => {
        const result = await E621.IQDBQueries.find({ post_id: 2626544 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(2);
    });
    test("Check for duplicates (invalid)", async () => {
        const result = await E621.IQDBQueries.find();
        expect(result.status.code).toBe(490);
        expect(result.data).toStrictEqual([]);
    });

});