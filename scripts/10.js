const buttonElement = document.querySelector('.test')

console.log(buttonElement.classList.contains('js-button'));

let lastButton;

function toggleButton(buttonID){
  toggleButtonElement = document.querySelector(`#${buttonID}`);

  if(toggleButtonElement.classList.contains('is-toggled')){
    toggleButtonElement.classList.remove('is-toggled');
  } else {
    if(lastButton){
      lastButton.classList.remove('is-toggled');
    } 
    lastButton = toggleButtonElement;
    toggleButtonElement.classList.add('is-toggled');
  }
}