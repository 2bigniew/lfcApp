const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const playerNum = document.getElementById('playerNum');
const inputSubmit = document.getElementById('inputSubmit');

let lastnameCorrect = false;
let numCorrect = false;
let firstnameCorrect = false;

firstname.addEventListener('blur', function(){
  const reg = /[a-zA-Z1-9]$/;
  if (reg.test(firstname.value) && firstname.value.length <= 50) {
     firstname.style.border = 'solid 1px green';
     firstname.style.background = 'rgba(100,200,100, .1)';
     firstnameCorrect = true;
  } else {
    firstname.style.border = 'solid 1px red';
    firstname.style.background = 'rgba(200,100,100, .3)';
  }

  if (firstnameCorrect && lastnameCorrect && numCorrect) {
    inputSubmit.disabled = false;
  }
}, false);

lastname.addEventListener('blur', function(){
  const reg = /[a-zA-Z1-9]$/;
  if (reg.test(lastname.value) && lastname.value.length <= 50) {
     lastname.style.border = 'solid 1px green';
     lastname.style.background = 'rgba(100,200,100, .1)';
     lastnameCorrect = true;
  } else {
    lastname.style.border = 'solid 1px red';
    lastname.style.background = 'rgba(200,100,100, .3)';
  }

  if (firstnameCorrect && lastnameCorrect && numCorrect) {
    inputSubmit.disabled = false;
  }
}, false);

playerNum.addEventListener('blur', function(){
  const reg = /[a-zA-Z1-9]$/;
  if (playerNum.value >= 1 && playerNum.value <= 100) {
     playerNum.style.border = 'solid 1px green';
     playerNum.style.background = 'rgba(100,200,100, .1)';
     numCorrect = true;
  } else {
    playerNum.style.border = 'solid 1px red';
    playerNum.style.background = 'rgba(200,100,100, .3)';
  }

  if (firstnameCorrect && lastnameCorrect && numCorrect) {
    inputSubmit.disabled = false;
  }
}, false);
