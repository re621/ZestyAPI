const E621 = require("./_tests");

describe("Posts", () => {
    // find()
    test("Fetch favorites", async () => {
        const result = await E621.Favorites.find();
        // Unauthorized, thus not found
        expect(result.status.code).toBe(404);
        expect(result.data.length).toBe(0);
    });
    test("Fetch favorites (by user ID)", async () => {
        const result = await E621.Favorites.find({ user_id: 211960 });
        // Publicly visible, found
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch favorites (by user ID)", async () => {
        const result = await E621.Favorites.find({ user_id: 39030 });
        // Hidden from public view
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });
});
