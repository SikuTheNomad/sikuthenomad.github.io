const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];


const generateBtn = document.getElementById("generate-btn")
const passwordOne = document.getElementById("password-one")
const passwordTwo = document.getElementById("password-two")

const numbersCheck = document.getElementById("numbers-chk")
const symbolsCheck = document.getElementById("symbols-chk")

const passwordLengthBox = document.getElementById("password-length")
const decLengthBtn = document.getElementById("dec-length")
const incLengthBtn = document.getElementById("inc-length")


const popupEl = document.getElementById("popup")

let selectedCharacters = []

decLengthBtn.addEventListener("click", decLength)
incLengthBtn.addEventListener("click", incLength)
generateBtn.addEventListener("click", generatePasswords)
passwordOne.addEventListener("click", copyToClipboard)
passwordTwo.addEventListener("click", copyToClipboard)


function generatePasswords() {
  let passwordLength = Number(passwordLengthBox.textContent);

  if (passwordLength > 32) {
    passwordLength = 32
  }
  if (passwordLength < 4) {
    passwordLength = 4
  }
  passwordLengthBox.textContent = passwordLength

  setCharacters()
  clearPasswords()

  for (let i = 0; i < passwordLength; i++) {
    let randomIndexOne = Math.floor(Math.random() * (selectedCharacters.length))
    let randomIndexTwo = Math.floor(Math.random() * (selectedCharacters.length))
    passwordOne.textContent += selectedCharacters[randomIndexOne]
    passwordTwo.textContent += selectedCharacters[randomIndexTwo]
  }

  selectedCharacters = []
}

function setCharacters() {
  if (numbersCheck.checked && symbolsCheck.checked) {
    selectedCharacters = letters.concat(numbers, symbols)
  } else if (numbersCheck.checked) {
    selectedCharacters = letters.concat(numbers)
  } else if (symbolsCheck.checked) {
    selectedCharacters = letters.concat(symbols)
  } else {
    selectedCharacters = letters
  }
}

function clearPasswords() {
  passwordOne.textContent = ""
  passwordTwo.textContent = ""
}

async function copyToClipboard() {
  if (this.textContent != "") {
    await navigator.clipboard.writeText(this.textContent);
    popupEl.textContent = "Copied to clipboard"
    popupEl.style.opacity = 100
    setTimeout(() => {
      popupEl.style.opacity = 0
    }, 2000)
    clearPasswords()
  } else {
    popupEl.textContent = "Nothing to copy"
    popupEl.style.opacity = 100
    setTimeout(() => {
      popupEl.style.opacity = 0
    }, 2000)
  }
}

function decLength() {
  let length = passwordLengthBox.textContent

  if (length > 4 && length <= 32) {
    length--
    passwordLengthBox.textContent = length
  }
}

function incLength() {
  let length = passwordLengthBox.textContent

  if (length >= 4 && length < 32 ) {
    length++
    passwordLengthBox.textContent = length
  }
}