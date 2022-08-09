const esix = require("./_tests");

describe("Tags", () => {
    // find()
    test("Fetch multiple tags", async () => {
        const result = await esix.Tags.find({ name: ["mammal", "solo"] });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(2);
        expect(result.data[0].name).toBe("mammal");
    });

    // get()
    test("Fetch specific tag", async () => {
        const result = await esix.Tags.get("mammal");
        expect(result.status.code).toBe(200);
        expect(result.data.name).toBe("mammal");
    });
    test("Fetch undefined tag", async () => {
        const result = await esix.Tags.get(undefined);
        expect(result.status.code).toBe(491);
        expect(result.data).toBe(null);
    });
});