// ---------------------------
// Data: Word bank
// ---------------------------
const wordBank = {                                         // Declare a constant object named `wordBank` to hold the words and their hints.
  "words": [                                               // The `words` key contains an array of objects; each object is a word + hint pair.
    {"word":"javascript","hint":"The language this game is written in"}, // First word object: word "javascript" and its hint.
    {"word":"html","hint":"Markup language for the web"},   // Second word object: "html" with hint.
    {"word":"css","hint":"Stylesheet language for presentation"}, // etc.
    {"word":"algorithm","hint":"Step-by-step recipe to solve a problem"},
    {"word":"variable","hint":"A named container for data"},
    {"word":"function","hint":"A reusable block of code"},
    {"word":"browser","hint":"Software used to access the web"},
    {"word":"debugging","hint":"Finding and fixing errors"},
    {"word":"framework","hint":"A platform for building apps"},
    {"word":"responsive","hint":"Adapts to different screen sizes"}
  ]    
};                                                         

// State
// Variable to store the actual current word (the one to guess).
let currentWord = "";   
// Variable to store the displayed scrambled version.                                   
let scrambledWord = "";  
// Variable to hold the current word's hint text.                                  
let currentHint = "";   
// Player's score (starts at 0).                                   
let score = 0;   
// Counter for how many puzzles were solved.                                          
let puzzlesSolved = 0; 
// Flag to indicate whether the hint was used on the current puzzle.                               
let hintUsed = false;

// SCRAMBLE A WORD RANDOMLY
// Define a function that takes a word and returns a scrambled version.
function scrambleWord(word){ 
  // Split the input word into an array of characters.   
  const letters = word.split('');                          
  // Loop backwards over the array.
  for(let i=letters.length-1; i>0; i--){ 
     // Pick a random index `j` between 0 and i (inclusive).                  
    const j = Math.floor(Math.random()*(i+1)); 
    // Swap letters at indices i and j.            
    [letters[i], letters[j]] = [letters[j], letters[i]];  
  }
  // Join the letters back into a string and return it.
  return letters.join('');                                 
}
// Function to display a message to the user; `type` controls styling.
function showMessage(msg, type='danger'){ 
  // Grab the DOM element with id="message".                  
  const messageEl = document.getElementById('message');  
  // Set its text to the supplied message.  
  messageEl.textContent = msg; 
  // Set className to 'danger' or 'success' based on type.                            
  messageEl.className = type === 'danger' ? 'danger' : 'success'; 
  if(type !== 'danger'){   
    // If message is not an error (i.e., success/info),                                
    setTimeout(()=>{ if(messageEl.className!=='danger') messageEl.textContent=''; }, 3000);
    // After 3 seconds, clear the message text but only if the element's class isn't 'danger'
    
  }
}
// Function to safely parse JSON or return a fallback value.
function safeParse(json, fallback){                         
  try{ return JSON.parse(json); }catch{ return fallback; }
}

function updateNextBonusIndicator(){
    // Function to update the "next bonus" UI indicator (how many left to bonus).                        
  const remainder = puzzlesSolved % 3; 
  // Compute how many puzzles solved modulo 3. 
  // If remainder is 0 -> next bonus at 3; otherwise 3 - remainder.                    
  const nextAt = remainder === 0 ? 3 : (3 - remainder); 
  // Write the value into the DOM element with id="next-bonus".    
  document.getElementById('next-bonus').textContent = nextAt; 
}

// Leaderboard
function getLeaderboard(){                                 
    // Read leaderboard from localStorage and return an array.
    // Get raw JSON string stored under key 'leaderboard'.
  const raw = localStorage.getItem('leaderboard');   
  // Parse it safely; if invalid, return empty array.      
  const arr = safeParse(raw, []);
  // If parsed value is an array return it; otherwise return [].                          
  return Array.isArray(arr) ? arr : [];                    
}
// Save an array of scores to localStorage.
function setLeaderboard(arr){      
    // Convert array to JSON and store it.                        
  localStorage.setItem('leaderboard', JSON.stringify(arr)); 
}
// Render the leaderboard into the DOM.
function displayLeaderboard(list){                          
  const leaderboardListEl = document.getElementById('leaderboard-list');
  // If list empty or falsy,
  if(!list || list.length === 0){                          
    leaderboardListEl.innerHTML = `<li class="muted">No scores yet — be the first!</li>`;
    // show a placeholder and exit.
    return;                                                
  }
  leaderboardListEl.innerHTML = list.map((s, i)=> `<li><strong>${s}</strong>${i===0?' 🥇': i===1?' 🥈': i===2?' 🥉':''}</li>`).join('');
  // Otherwise map the scores into <li> strings, adding medals for top 3, then set innerHTML.
}
// Add a new score, sort, trim to top 3, save, and display.
function updateLeaderboard(currentScore){ 
// Retrieve current leaderboard array.                  
  let leaderboard = getLeaderboard();  
// Add the new score.
  leaderboard.push(currentScore); 
// Sort descending.                          
  leaderboard.sort((a,b)=> b-a);   
  // Keep only top 3 scores.                         
  leaderboard = leaderboard.slice(0,3); 
  // Save back to localStorage.                    
  setLeaderboard(leaderboard);   
  // Update the visible leaderboard in the UI.                           
  displayLeaderboard(leaderboard);                          
}

// Game core
// Start a new puzzle (reset hint flag, pick a word, scramble, display).
function newPuzzle(){ 
    // Reset hint usage flag for this new puzzle.                                      
  hintUsed = false;   
  // Clear hint text in UI.                                      
  document.getElementById('hint').textContent = ''; 
  // Clear any messages.       
  document.getElementById('message').textContent = '';  
  // Clear the guess input field.   
  document.getElementById('guess-input').value = '';       
// Choose a random index from wordBank.words.
  const idx = Math.floor(Math.random()*wordBank.words.length); 
  // Set currentWord to the chosen word (lowercase).
  currentWord = wordBank.words[idx].word.toLowerCase();
  // Set currentHint to the chosen word's hint.     
  currentHint = wordBank.words[idx].hint;                   
// Start attempt as the original word.
  let attempt = currentWord;  
  // Safety counter to avoid infinite loop.                              
  let safety = 0;
  // Try to scramble until it's different from original or limit reached.                                           
  while(attempt === currentWord && safety < 20){  
    // Generate a scrambled attempt.          
    attempt = scrambleWord(currentWord);
     // Increment safety counter.                    
    safety++;                                               
  }
  // Store the scrambled result.
  scrambledWord = attempt;  
  // Display scrambled word in UI.                                
  document.getElementById('scrambled-word').textContent = scrambledWord; 
  // Update the "next bonus" indicator based on puzzlesSolved count.
  updateNextBonusIndicator();                               
}
// checking if user's guess is correct
function checkGuess(){           
  const guess = document.getElementById('guess-input').value.trim().toLowerCase(); 
  // If the guess is empty,
  if(!guess){                                               
    showMessage("Please enter a guess!");                   
    return;
  }
  if(guess === currentWord){               
    let points = hintUsed ? 5 : 10;                         
    score += points;                      
    puzzlesSolved++;                                    
    // If puzzlesSolved is divisible by 3,
    if (puzzlesSolved % 3 === 0){ 
        // double the total score (bonus round).                          
      score *= 2;   
      // Show success message for bonus.                                        
      showMessage("🎉 Bonus Round! Score doubled!", "success"); 
    } else {
        // Otherwise show a normal correct message.
      showMessage(`Correct! +${points} points`, 'success'); 
    }

    document.getElementById('score').textContent = score;  
    document.getElementById('solved').textContent = puzzlesSolved; 
    updateNextBonusIndicator();                           

    updateLeaderboard(score);                           

    document.getElementById('scrambled-word').textContent = currentWord; 
    document.getElementById('scrambled-word').style.color = 'var(--success)'; 
    setTimeout(newPuzzle, 1200);                            
  }else{
    showMessage("Incorrect, try again!");                   
    document.getElementById('guess-input').select();        
  }
}
// Show the hint for current word and deduct points (once).
function showHint(){ 
    // If hint hasn't been used for this puzzle yet,                                       
  if(!hintUsed){   
    // display the hint in the UI.                                         
    document.getElementById('hint').textContent = currentHint; 
    // Deduct 2 points but never below 0.
    score = Math.max(0, score - 2);                         
    document.getElementById('score').textContent = score;
    // Mark that hint has been used for this puzzle.   
    hintUsed = true;                                        
    showMessage("Hint shown (−2 points).", "success");     
  }else{
    showMessage("You've already used your hint for this puzzle!"); // If hint already used, show a message and don't deduct again.
  }
}
// Reset overall game progress and UI values (not leaderboard).
function resetGame(){                                       
  score = 0;                                                
  puzzlesSolved = 0;                                     
  hintUsed = false;                       

  document.getElementById('score').textContent = score;    
  document.getElementById('solved').textContent = puzzlesSolved; 
  updateNextBonusIndicator();                               
  document.getElementById('message').textContent = "Game reset!"; 
  document.getElementById('message').className = "success"; 
  document.getElementById('scrambled-word').textContent = ""; 
  document.getElementById('hint').textContent = "";        
  document.getElementById('guess-input').value = "";  
}

// ---------------------------
// Init
// ---------------------------
if (typeof document !== "undefined") {               
  document.addEventListener('DOMContentLoaded', ()=>{    
    document.getElementById('submit-guess').addEventListener('click', checkGuess); 
    document.getElementById('hint-btn').addEventListener('click', showHint); 
    document.getElementById('new-puzzle').addEventListener('click', newPuzzle); 
    document.getElementById('reset-game').addEventListener('click', resetGame); 
    document.getElementById('guess-input').addEventListener('keypress', e => { if(e.key === 'Enter') checkGuess(); });
    // Also submit guess when user presses Enter inside the input.

    displayLeaderboard(getLeaderboard());                  
    newPuzzle();                                           
  });
}

// Export for Jest
if (typeof module !== "undefined") {                        // If running under Node (module exists),
  module.exports = {                               
    scrambleWord,
    safeParse,
    getLeaderboard,
    setLeaderboard,
    updateLeaderboard,
    newPuzzle,
    resetGame,
    showHint,
    checkGuess
  };
}
