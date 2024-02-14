function generateRedisKey(apiRoute) {
    console.log(`Generating Redis Key for: <${apiRoute}>`);
    const url = apiRoute.substring(8);
    const urlWords = url.split("/");
    var key = urlWords[0];
    for(var idx = 1; idx < urlWords.length; idx++) {
        const curWord = urlWords[idx];
        if(curWord == "") continue;
        key += `:${urlWords[idx]}`;
    }
    console.log(`Generated Redis Key: <${key}>`);
    return key;
};

module.exports = generateRedisKey;