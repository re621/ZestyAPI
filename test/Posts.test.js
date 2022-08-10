const E621 = require("./_tests");

describe("Posts", () => {
    // find()
    test("Fetch many posts", async () => {
        const result = await E621.Posts.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many posts (tags, method A)", async () => {
        const result = await E621.Posts.find({ tags: "horse solo" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many posts (tags, method B)", async () => {
        const result = await E621.Posts.find({ tags: ["horse", "solo"] });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many posts (tags, method C)", async () => {
        const result = await E621.Posts.find({ tags: ["horse", "solo"] });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many posts (with a limit)", async () => {
        const result = await E621.Posts.find({ limit: 10 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(10);
    });
    test("Fetch many posts (with a page)", async () => {
        const result = await E621.Posts.find({ page: 2 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many posts (both a page and a limit)", async () => {
        const result = await E621.Posts.find({ limit: 10, page: 2 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(10);
    });
    test("Fetch many posts (no results)", async () => {
        const result = await E621.Posts.find({ tags: "abcdefg" });
        expect(result.status.code).toBe(404);
        expect(result.data.length).toBe(0);
    });
    test("Fetch many posts (encoding test)", async () => {
        const result = await E621.Posts.find({ tags: "love_death_+_robots" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });

    // get()
    test("Fetch specific post", async () => {
        const result = await E621.Posts.get(12345);
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBe(12345);
    });
    test("Fetch non-existent post", async () => {
        const result = await E621.Posts.get(1);
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });

    // getMany()
    test("Fetch many posts (by IDs)", async () => {
        const result = await E621.Posts.getMany([12345, 12346, 12347]);
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(3);
    })

    // random()
    test("Fetch random post", async () => {
        const result = await E621.Posts.random();
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBeDefined();
    });

    // randomMany()
    test("Fetch many random posts", async () => {
        const result = await E621.Posts.randomMany();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch many random posts (with everything)", async () => {
        const result = await E621.Posts.randomMany({ tags: ["horse"], limit: 10, page: 2 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(10);
    });
});
