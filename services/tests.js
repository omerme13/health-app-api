const settingService = require("./settings");
const {
    splitAndLowercaseString,
    getTotalTestScore,
    GetStringsMatch,
} = require("../utils/helpers");

const getTests = async () => {
    const tests = await settingService.getTestsSettings();
    return tests;
};

const getTestByName = async (name) => {
    const tests = await getTests();
    const nameAsArr = splitAndLowercaseString(name, /[ ,;\n:-]/g);
    let bestMatchTest = { name: "", testScore: 0, threshold: 0 };

    for (const test of tests) {
        const totalScore = getTotalTestScore(nameAsArr, test.name);

        if (totalScore > bestMatchTest.testScore) {
            bestMatchTest = { ...test, testScore: totalScore };
        }
    }

    for (let str of nameAsArr) {
        if (GetStringsMatch(bestMatchTest.name, str) > 0.7) {
            return bestMatchTest;
        }
    }
};

module.exports = {
    getTests,
    getTestByName,
};
