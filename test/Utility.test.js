const esix = require("./_tests");

describe("Utility", () => {

    test("E621 online", async () => {
        const result = await esix.Utility.isOnline();
        expect(result).toBe(true);
    });

    test("Returns error 403", async () => {
        const result = await esix.Utility.test403();
        expect(result.status.code).toBe(403);
        expect(result.data).toBe(null);
    });

    test("Returns error 404", async () => {
        const result = await esix.Utility.test404();
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });

});