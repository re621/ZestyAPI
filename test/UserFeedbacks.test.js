const esix = require("./_tests");

describe("UserFeedbacks", () => {

    // find()
    test("Fetch latest feedback", async () => {
        const result = await esix.UserFeedbacks.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch feedback (by user name)", async () => {
        const result = await esix.UserFeedbacks.find({ user_name: "CharlotteWontLeave" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].user_id).toBe(11738);
    });
    test("Fetch feedback (by creator name)", async () => {
        const result = await esix.UserFeedbacks.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch feedback (by body match)", async () => {
        const result = await esix.UserFeedbacks.find({ body: "rickrolling" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
    });
    test("Fetch feedback (by category)", async () => {
        const result = await esix.UserFeedbacks.find({ category: esix.UserFeedbacks.FeedbackCategory.Positive });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].category).toBe(esix.UserFeedbacks.FeedbackCategory.Positive);
    });
    test("Fetch feedback (by ID)", async () => {
        const result = await esix.UserFeedbacks.find({ id: [1000, 1001] });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(2);
    });
    test("Fetch feedback (by user ID)", async () => {
        const result = await esix.UserFeedbacks.find({ user_id: 11738 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].user_id).toBe(11738);
    });
    test("Fetch feedback (by creator ID)", async () => {
        const result = await esix.UserFeedbacks.find({ creator_id: 211960 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });

});