const esix = require("./_tests");

describe("Tags", () => {
    // Functionality
    test("Fetch specific tag", async () => {
        const result = await esix.Tags.get("mammal");
        expect(result.data.name).toBe("mammal");
    });
    test("Fetch specific tag, the other way", async () => {
        const result = await esix.Tags.find("mammal");
        expect(result.data.length).toBe(1);
    });
    test("Fetch multiple tags", async () => {
        const result = await esix.Tags.find(["mammal", "solo"]);
        expect(result.data.length).toBe(2);
    });

    // Bad input
    test("Undefined input", async () => {
        const result = await esix.Tags.get(undefined);
        expect(result).toBe(null);
    });
});