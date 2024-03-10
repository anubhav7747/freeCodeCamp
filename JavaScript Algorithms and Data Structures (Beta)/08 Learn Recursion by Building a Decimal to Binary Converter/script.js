/*
// to learn call stack

const callStack = [
  // 'a(): returns "freeCodeCamp " + b()',
  // 'b(): returns "is " + c()',
  // 'c(): returns "awesome!"',

  // 'b(): returns "is " + "awesome!"',
  // 'a(): returns "freeCodeCamp " + "is awesome!"',
];

const a = () => {
  return "freeCodeCamp " + b();
};

const b = () => {
  return "is " + c();
};

const c = () => {
  return "awesome!";
};

// console.log(a()); // [Function: a]
console.log(a()); // freeCodeCamp is awesome!
*/

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const animationContainer = document.getElementById("animation-container");

const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: `decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.`,
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

/*
const countDownAndUp = (number) => {
  console.log(number);

  if (number === 0) {
    console.log("Reached base case");
    return;
  } else {
    countDownAndUp(number - 1);
    console.log(number);
  }
};

countDownAndUp(3);
*/
/* Output =>
  3
  2
  1
  0
  Reached base case
  1
  2
  3
*/

// const decimalToBinary = (input) => {
// return "1";
// return "1010"; // 10
// return "01110110"; // 118
/*
  const inputs = [];
  const quotients = [];
  const remainders = [];
  // input = 0;

  if (input == 0) {
    result.innerText = "0";
    return;
  }

  while (input > 0) {
    const quotient = Math.floor(input / 2);
    const remainder = input % 2;

    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);
    input = quotient;
  }

  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);
  result.innerText = remainders.reverse().join("");
  */
// Better way to do
// let binary = "";
// if (input === 0) {
//   binary = "0";
// }
// while (input > 0) {
//   // input = 0;
//   binary = (input % 2) + binary;
//   input = Math.floor(input / 2);
// }
// result.innerText = binary;
// };

const decimalToBinary = (input) => {
  // if (input === 0) {
  //   return "0";
  // } else if (input === 1) {
  //   return "1";
  // }

  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  // console.log("free");
  // console.log("Code");
  // console.log("Camp");

  // setTimeout(() => {
  //   console.log("free");
  // }, 500);
  // setTimeout(() => {
  //   console.log("Code");
  // }, 1000);
  // setTimeout(() => {
  //   console.log("Camp");
  // }, 1500);

  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
      <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
        decimalToBinary(${obj.inputVal});
      </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);

    setTimeout(() => {
      result.textContent = decimalToBinary(5);
    }, 20000);
  });
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  // if(numberInput.value === "") {}
  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    return;
  }
  // console.log(numberInput.value);

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // decimalToBinary(inputInt);
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key === "Enter") {
    checkUserInput();
  }
});
