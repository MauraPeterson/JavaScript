
const score = JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  losses: 0,
  ties:0
};

updateScoreElement();

let outcome = 'You lose.';

function pickComputerChoice(){
  const randomNumber = Math.random();

  if(randomNumber <= 1/3) {
    return 'rock';
  } else if(randomNumber <= 2/3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

function compareChoices(playerChoice, computerChoice){
  outcome = 'You lose.';

  if(computerChoice === playerChoice){
    outcome = 'Tie.';
  } else{
    if(computerChoice === 'rock'){
      (playerChoice === 'paper') ? outcome = 'You win.' : outcome = 'You lose.';
    }
    if(computerChoice === 'paper'){
      (playerChoice === 'scissors') ? outcome = 'You win.' : outcome = 'You lose.';
    }
    if(computerChoice === 'scissors'){
      (playerChoice === 'rock') ? outcome = 'You win.' : outcome = 'You lose.';
    }
  }
}

function updateScore(){
  if(outcome === 'You win.'){
    score.wins++;
  } else if(outcome === 'You lose.'){
    score.losses++;
  } else if(outcome === 'Tie.'){
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
}

function play(playerChoice){
  const computerChoice = pickComputerChoice();

  compareChoices(playerChoice, computerChoice);
  
  updateScore(outcome);

  updateChoicesElement(playerChoice, computerChoice);

  updateOutcomeElement(outcome);

}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');

  updateScoreElement();
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateOutcomeElement(outcome){
  document.querySelector('.js-outcome')
    .innerHTML = outcome;
}

function updateChoicesElement(playerChoice, computerChoice){
  document.querySelector('.js-choices')
    .innerHTML = `
      You 
      <img src="images/${playerChoice}-emoji.png" class="move-icon" alt="Rock"> 
      <img src="images/${computerChoice}-emoji.png" class="move-icon" alt="Scissors"> 
      Computer `;
}
