
let isAutoPlaying = false;
let intervalId;


document.querySelector('.js-rock-button')
.addEventListener('click', () =>{
  play('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () =>{
  play('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => play('scissors'));

document.querySelector('.js-auto-play')
.addEventListener('click', () => autoPlay());

document.querySelector('.js-reset-score')
.addEventListener('click', () => confirmReset());

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    play('rock');
  } else if(event.key === 'p'){
    play('paper');
  } else if(event.key === 's'){
    play('scissors');
  } else if(event.key ==='a'){
    autoPlay();
  } else if(event.key === 'Backspace'){
    confirmReset();
  }
})

const score = JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  losses: 0,
  ties:0
};

updateScoreElement();

let outcome = 'You lose.';

function autoPlay(){
  const autoButton = document.querySelector('.js-auto-play');
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      play(pickComputerChoice());
    }, 1000);
    isAutoPlaying = true;
    
    autoButton.innerHTML = 'Stop Playing';
  } else{
    clearInterval(intervalId);
    isAutoPlaying = false;

    autoButton.innerHTML = 'Auto Play';
  }
}

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

function confirmReset(){
  const conformationElement = document.querySelector('.js-reset-score-conformation');
  conformationElement.innerHTML = `
    Are you sure you want to reset the score?

    <button class="confirm-button js-yes">Yes</button>
    <button class="confirm-button js-no">No</button>
  `;

  document.querySelector('.js-yes').addEventListener('click', () => {
    conformationElement.innerHTML = '';
    resetScore();
  });

  document.querySelector('.js-no').addEventListener('click', () => {
    conformationElement.innerHTML = '';
  });
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
