const esix = require("./_tests");

describe("Users", () => {
    test("Fetch specific user (by name)", async () => {
        const result = await esix.Users.getByUsername("bitWolfy");
        expect(result.id).toBe(211960);
    });
    test("Fetch specific user (by ID)", async () => {
        const result = await esix.Users.getByID(211960);
        expect(result.id).toBe(211960);
    });
});
