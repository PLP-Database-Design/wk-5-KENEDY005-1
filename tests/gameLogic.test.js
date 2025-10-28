/**
 * @jest-environment jsdom
 */
// importing all the functions from game.js
const {
  scrambleWord,
  safeParse,
  updateLeaderboard,
  getLeaderboard,
  setLeaderboard,
  newPuzzle,
  resetGame,
  showHint,
  checkGuess
} = require("../game");

beforeEach(() => {
  // Prepare a minimal DOM structure
  // Creating a minimal fake HTML structure for the game.
  // This allows DOM-based functions to find the elements they need.
  document.body.innerHTML = `
    <div id="message"></div>
    <div id="scrambled-word"></div>
    <div id="hint"></div>
    <input id="guess-input" />
    <span id="score">0</span>
    <span id="solved">0</span>
    <span id="next-bonus">3</span>
    <ol id="leaderboard-list"></ol>
  `;
  // Clear the mock localStorage before every test run
  // so leaderboard tests start with a clean state.
  localStorage.clear();
});

// Pure Function Tests: no interacting with the DOM
// we are only testing the logic parts
describe("Pure Logic Tests", () => {
// TEST1: scrambleWord(): tests random shuffling of a word
  test("scrambleWord() shuffles characters", () => {
    // adding input
    const word = "variable";
    const scrambled = scrambleWord(word);
    // assertions: we expect the scrambled word to be not equal to the input and be of the same length.
    expect(scrambled).not.toBe(word);
    expect(scrambled).toHaveLength(word.length);
  });

  test("safeParse() returns fallback when JSON invalid", () => {
    const fallback = [1, 2];
    expect(safeParse("bad json", fallback)).toEqual(fallback);
  });
 // updateLeaderboard: tests sorting and limiting leaderboard to top 3
  test("updateLeaderboard() sorts descending and limits top 3", () => {
    setLeaderboard([]);
    updateLeaderboard(12);
    updateLeaderboard(25);
    updateLeaderboard(7);
    updateLeaderboard(30);
    const scores = getLeaderboard();
    expect(scores).toEqual([30, 25, 12]);
  });
});

// DOM and  Game Logic Tests
// Testing functions that depend on html elements.
describe("DOM & Game Behavior Tests", () => {
  test("newPuzzle() displays a scrambled word", () => {
    newPuzzle();
    const text = document.getElementById("scrambled-word").textContent;
    expect(text).not.toBe("");
    expect(typeof text).toBe("string");
  });

  test("showHint() displays hint and deducts points", () => {
    document.getElementById("score").textContent = "10";
    showHint();
    const hintText = document.getElementById("hint").textContent;
    const scoreAfterHint = parseInt(document.getElementById("score").textContent);
    expect(hintText).not.toBe("");
    expect(scoreAfterHint).toBeLessThan(10);
  });

  test("resetGame() resets score and solved counters", () => {
    document.getElementById("score").textContent = "50";
    document.getElementById("solved").textContent = "3";
    resetGame();
    expect(document.getElementById("score").textContent).toBe("0");
    expect(document.getElementById("solved").textContent).toBe("0");
  });

  test("checkGuess() warns when input empty", () => {
    const message = document.getElementById("message");
    document.getElementById("guess-input").value = "";
    checkGuess();
    expect(message.textContent.toLowerCase()).toMatch(/enter/);
  });
});
