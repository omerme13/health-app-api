const wuzzy = require("wuzzy");

const GetStringsMatch = (str1, str2) =>
    wuzzy.jarowinkler(str1.toLowerCase(), str2.toLowerCase());

const splitAndLowercaseString = (str, regEx) => {
    const splittedArr = str.toLowerCase().split(regEx);
    const splittedArrNoSpaces = splittedArr.filter((item) => item);
    return splittedArrNoSpaces;
};

const getTotalTestScore = (strArr, nameToCompare) => {
    let totalScore = 0;

    for (const str of strArr) {
        totalScore += GetStringsMatch(nameToCompare, str);
        if (nameToCompare.toLowerCase().includes(str)) {
            totalScore += 1; // giving more weight to a name that includes the string
        }
    }

    return totalScore / strArr.length; //normalize the test score
};

module.exports = {
    getTotalTestScore,
    splitAndLowercaseString,
    GetStringsMatch,
};
