//  This Logic is extracted from index.html for jest unit testing

//Scramble a word randomly
function scrambleWord (word) {
    const chars = word.split('')
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
}

// check if the user's guess is correct. should be case insensitive
function checkGuess(actual, guess) {
    return actual.toLowerCase() === guess.toLowerCase();
}
//applying bonus or double score 
function applyBonus(score) {
    return score * 2;
}
//deducting hint penalty but ensuring the score does not go below zero
function deductHintPoints(score) {
    return Math.max(0, score - 2);
}

// Exporting for jest
module.export = {scrambleWord, checkGuess, applyBonus, deductHintPoints};