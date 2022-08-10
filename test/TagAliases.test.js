const esix = require("./_tests");

describe("TagAliases", () => {
    // find()
    test("Fetch aliases (by name)", async () => {
        const result = await esix.TagAliases.find({ name: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].consequent_name).toBe("mammal");
    });
    test("Fetch aliases (by antecedent)", async () => {
        const result = await esix.TagAliases.find({ antecedent_name: "mammals" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].antecedent_name).toBe("mammals");
    });
    test("Fetch aliases (by consequent)", async () => {
        const result = await esix.TagAliases.find({ consequent_name: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].consequent_name).toBe("mammal");
    });
    test("Fetch aliases (by creator name)", async () => {
        const result = await esix.TagAliases.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch aliases (by approver name)", async () => {
        const result = await esix.TagAliases.find({ approver_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].approver_id).toBe(211960);
    });
    test("Fetch aliases (by category)", async () => {
        const result = await esix.TagAliases.find({ antecedent_tag_category: 4, consequent_tag_category: 3 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch aliases (by status)", async () => {
        const result = await esix.TagAliases.find({ status: esix.TagAliases.AliasStatus.Deleted });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].status).toBe(esix.TagAliases.AliasStatus.Deleted);
    });
});

describe("TagImplications", () => {
    // find()
    test("Fetch implications (by name)", async () => {
        const result = await esix.TagImplications.find({ name: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].consequent_name).toBe("mammal");
    });
    test("Fetch implications (by antecedent)", async () => {
        const result = await esix.TagImplications.find({ antecedent_name: "aardvark" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].antecedent_name).toBe("aardvark");
    });
    test("Fetch implications (by consequent)", async () => {
        const result = await esix.TagImplications.find({ consequent_name: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].consequent_name).toBe("mammal");
    });
    test("Fetch implications (by creator name)", async () => {
        const result = await esix.TagImplications.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch implications (by approver name)", async () => {
        const result = await esix.TagImplications.find({ approver_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].approver_id).toBe(211960);
    });
    test("Fetch implications (by category)", async () => {
        const result = await esix.TagImplications.find({ antecedent_tag_category: 4, consequent_tag_category: 3 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch implications (by status)", async () => {
        const result = await esix.TagImplications.find({ status: esix.TagAliases.AliasStatus.Deleted });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].status).toBe(esix.TagAliases.AliasStatus.Deleted);
    });
});