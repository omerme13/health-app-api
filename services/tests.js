const settingService = require("./settings");
const {
    splitAndLowercaseString,
    getTotalTestScore,
    GetStringsMatch,
} = require("../utils/helpers");
const AppErr = require('../utils/AppErr')

const getTests = async () => {
    try {
        const tests = await settingService.getTestsSettings();
        return tests;
    } catch (err) {
        throw new AppErr(err.message, err.status);
    }
};

const getTestByName = async name => {
    try {
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
    } catch (err) {
        throw new AppErr(err.message, err.status)
    }
};

module.exports = {
    getTests,
    getTestByName,
};
