describe("testScores", function() {
    it("sorts scores in descending order (only top 5 highest scores)", function() {
        let w0=90, w1=88, w2=54, w3=18, w4=10, w5=2;
        let res = testScores([w4,w5,w3,w0,w2,w1]);
        assert.equal(res.length,5);
        assert.equal(res[0].words, w0);
        assert.equal(res[1].words, w1);
        assert.equal(res[2].words, w2);
        assert.equal(res[3].words, w3);
        assert.equal(res[4].words, w4);
    });
});
describe("testTickDelay", function() {
    it("changes tick delay", function() {
        let testValue = 500;
        let value = testTickDelay(testValue);
        assert.equal(value, testValue);
    });
});
describe("testWordDelay", function() {
    it("changes word delay", function() {
        let testValue = 500;
        let value = testTickDelay(testValue);
        assert.equal(value, testValue);
    });
});
describe("testWordList", function() {
    it("changes word list array", function() {
        let testArray = ["hello","world"];
        let res = testWordList(testArray);
        assert.equal(res[0], testArray[0]);
        assert.equal(res[1], testArray[1]);
    });
});