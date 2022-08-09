const esix = require("./_tests");

describe("PostEvents", () => {
    // find()
    test("Fetch many post events", async () => {
        const result = await esix.PostEvents.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch post events (by event ID)", async () => {
        const result = await esix.PostEvents.find({ id: 13 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0].id).toBe(13);
    });
    test("Fetch post events (by creator ID)", async () => {
        const result = await esix.PostEvents.find({ creator_id: 211960 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch post events (by creator name)", async () => {
        const result = await esix.PostEvents.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch post events (by action)", async () => {
        const result = await esix.PostEvents.find({ action: esix.PostEvents.PostEventAction.Deleted });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].action).toBe(esix.PostEvents.PostEventAction.Deleted);
    });
});