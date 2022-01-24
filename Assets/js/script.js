// Assignment Code
var generateBtn = document.querySelector("#generate");
var password = "";
var length = 0;
var lowerCaseCharSet = "abcdefghijklmnopqrstuvwxyz";
var upperCaseCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberSet = "0123456789";
var specialCharSet = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var includeUppercase = false;
var includeLowercase = false;
var includeNumericChar = false;
var includeSpecialChar = false;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Generate password using user inputs
function generatePassword () {

  length = GetPasswordLength();
  if(length == ""){
    AlertUser("Invalid password length entered.\nPassword length should be of at least 8 characters and no more than 128 characters.\nPlease start again.");
    return "";
  }

  var isValid = isPasswordCriteriaValid();
  if(!isValid){
      AlertUser("Atleast one password criteria should be included.\nPlease start again.");
    return "";
  }

  // Logic to generate password
  var passwordOutput = "";
  var passwordCharSet = "";

  // Add mandate criteria to password as per user selection.
  // Generate passwordCharset for rest of the password.
  if(includeUppercase){
    passwordOutput += upperCaseCharSet.charAt(Math.floor(Math.random() * upperCaseCharSet.length));
    passwordCharSet += upperCaseCharSet;
  }
  if(includeLowercase){
    passwordOutput += lowerCaseCharSet.charAt(Math.floor(Math.random() * lowerCaseCharSet.length));
    passwordCharSet += lowerCaseCharSet;
  }
  if(includeNumericChar){
    passwordOutput += numberSet.charAt(Math.floor(Math.random() * numberSet.length));
    passwordCharSet += numberSet;
  }
  if(includeSpecialChar){
    passwordOutput += specialCharSet.charAt(Math.floor(Math.random() * specialCharSet.length));
    passwordCharSet += specialCharSet;
  }

  // Generate random sequence for rest of password
  for (var i = passwordOutput.length, n = passwordCharSet.length; i < length; ++i) {
    passwordOutput += passwordCharSet.charAt(Math.floor(Math.random() * n));
  }

  return passwordOutput;
}

  // Ask user for password length
  function GetPasswordLength(){
    var lengthInput = Number(window.prompt("Please enter length of Password"));
    if(lengthInput >= 8 && lengthInput < 128){
      return lengthInput;
    }
    return "";
  }

  // Ask user for password criteria and form charset for Password
  function isPasswordCriteriaValid(){
    includeUppercase = ConfirmUser("Would you want to include Upper case charactor in Password?");
    includeLowercase = ConfirmUser("Would you want to include Lower case charactor in Password?");
    includeNumericChar = ConfirmUser("Would you want to include Numeric charactor in Password?");
    includeSpecialChar = ConfirmUser("Would you want to include Special charactor in Password?");

    return (includeUppercase || includeLowercase || includeNumericChar || includeSpecialChar);
  }

  // Alert user with msg
  function AlertUser(msg){
    window.alert(msg);
  }

  // Get user confirmation for question
  function ConfirmUser(question){
    return window.confirm(question);
  }