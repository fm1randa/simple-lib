const { queryString } = require("./queryString");

describe("Object to query string", () => {
    it("should create a valid query string when an object is provided", () => {
        const obj = {
            name: "Filipe",
            profession: "developer",
        };
        expect(queryString(obj)).toBe("name=Filipe&profession=developer");
    });
});
