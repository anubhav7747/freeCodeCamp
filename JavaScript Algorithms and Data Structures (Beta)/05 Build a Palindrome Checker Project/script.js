const textInputElement = document.getElementById("text-input");
const checkBtnElement = document.getElementById("check-btn");
const resultElement = document.getElementById("result");

const palindromeCheck = () => {
  if (textInputElement.value === null || textInputElement.value === "") {
    alert("Please input a value");
  } else {
    const originalText = textInputElement.value
      .replace(/[^A-Za-z0-9]/g, "")
      .toLowerCase();

    const isPalindrome =
      originalText === originalText.split("").reverse().join("");

    resultElement.textContent = isPalindrome
      ? `${textInputElement.value} is a palindrome`
      : `${textInputElement.value} is not a palindrome`;
  }
};

checkBtnElement.addEventListener("click", palindromeCheck);
