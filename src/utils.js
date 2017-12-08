module.exports.getRandomId = () => {
    const INITIAL_LETTER_INDEX = 65;
    const LETTER_LENGTH = 26;

    return `${String.fromCharCode(INITIAL_LETTER_INDEX + Math.floor(Math.random() * LETTER_LENGTH))}${Date.now()}`;
};
