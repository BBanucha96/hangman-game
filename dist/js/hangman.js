var password = "Three witches watch three swatch watches";
password.toUpperCase();
var password_hidden = "";
var miss = 0;
var picNumber = 1;

var compare = function(e) {
  compareLetters(e.target);
}

//putting "-" instead of letters in password
function rewritePassword() {
  for (var i = 0; i < password.length; i++) {
    if (password.charAt(i) == " ") {
      password_hidden += " ";
    } else {
      password_hidden += "-";
    }
  }
}

//writing password on screen
function writePassword() {
  document.getElementById("pass").innerHTML = password_hidden;
}

//filling div with letters (based on ASCII table)
function fillAlphabetTable() {
  var alphabet = "";
  var letter = "";
  for (var i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    alphabet +=
      '<div class="letter" id="letter_' + letter + '">' + letter + "</div>";
  }
  document.getElementById("alphabet-table").innerHTML = alphabet;
}

//adding listeners to every letter
function addEventListeners() {
  for (var i = 65; i < 91; i++) {
    var currnetVariable = document.getElementById(
      "letter_" + String.fromCharCode(i)
    );
    currnetVariable.addEventListener("click", compare)
  }
}

//new function to change letters in password_hidden
String.prototype.putLetter = function(index, char)
{
  //simple test to check if index value is not greater than string length
  if (index > this.length - 1)
  {
    return this.toString();
  } 
  else {
    return this.substr(0, index) + char + this.substr(index + 1)
  };
}

//function responsible of comparing letters, changing letter color and ending game
function compareLetters(let) {
  var isSame = false;
  var letterToCompare = let.innerHTML;
  for(var i = 0; i < password.length; i++)
  {
    if (password.charAt(i).toUpperCase() == letterToCompare)
    {
      password_hidden = password_hidden.putLetter(i, letterToCompare)
      isSame = true;
    }
  }

  if (isSame == true)
  {
    document.getElementById("letter_" + letterToCompare).style.color = "#52ff2b";
    document.getElementById("letter_" + letterToCompare).style.backgroundColor = "#226b11";
    document.getElementById("letter_" + letterToCompare).style.padding = "3px";
    document.getElementById("letter_" + letterToCompare).style.border = "5px solid #52ff2b";
    document.getElementById("letter_" + letterToCompare).style.transition = "0.4s";

    writePassword()

    if (password_hidden.toUpperCase() == password.toUpperCase())
    {
      win();
    }
  }
  else
  {
    document.getElementById("letter_" + letterToCompare).style.color = "#ff2121";
    document.getElementById("letter_" + letterToCompare).style.backgroundColor = "#6b1111";
    document.getElementById("letter_" + letterToCompare).style.padding = "3px";
    document.getElementById("letter_" + letterToCompare).style.border = "5px solid #ff2121";
    document.getElementById("letter_" + letterToCompare).style.transition = "0.4s";
    document.getElementById("letter_" + letterToCompare).removeEventListener("click", compare);
    
    miss++;
    picNumber++;

    if (miss >= 7)
    {
      lose();
    }
    document.getElementById("display").style.backgroundImage = "url('/dist/img/hangman-"+picNumber+".png')";
  }
}

function win() {
  document.getElementById("password").style.display = "none";
  document.getElementById("alphabet-table").style.display = "none";
  document.getElementById("game-won").style.display = "block";
}

function lose() {
  document.getElementById("password").style.display = "none";
  document.getElementById("alphabet-table").style.display = "none";
  document.getElementById("game-over").style.display = "block";
}

function restartGame()
{
  location.reload()
}

function loadElements() {
  rewritePassword();
  writePassword();
  fillAlphabetTable();
  addEventListeners();
}

window.onload = loadElements();
