const esix = require("./_tests");

describe("Posts", () => {
    test("Fetch specific post", async () => {
        const result = await esix.Posts.get(12345);
        expect(result.id).toBe(12345);
    });
    test("Fetch non-existent post", async () => {
        const result = await esix.Posts.get(1);
        expect(result.id).toBe(undefined);
    });
    test("Fetch random post", async () => {
        const result = await esix.Posts.random();
        expect(result.id).toBeDefined();
    });
    test("Fetch many posts", async () => {
        const result = await esix.Posts.find([]);
        expect(result.length).toBe(75);
    });
    test("Fetch many posts (with a limit)", async () => {
        const result = await esix.Posts.find([], 10);
        expect(result.length).toBe(10);
    });
    test("Fetch many posts (with a page)", async () => {
        const result = await esix.Posts.find([], undefined, 2);
        expect(result.length).toBe(75);
    });
    test("Fetch many posts (both a page and a limit)", async () => {
        const result = await esix.Posts.find([], 10, 2);
        expect(result.length).toBe(10);
    });
});
