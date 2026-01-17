let history = [];
let display = document.getElementById('display');

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  const lastChar = display.value.slice(-1);
  if (display.value === '' && op !== '-') return;
  if (['+', '-', '*', '/'].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op;
  } else {
    display.value += op;
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  let expression = display.value;
  let res;

  if (!expression) return;

  try {
    if (/[^0-9+\-*/.]/.test(expression)) {
      throw new Error("Invalid characters");
    }

    if (expression.includes('/0') && !expression.includes('/0.')) {
    }

    res = eval(expression);

    if (res === Infinity || res === -Infinity) {
      res = "Error: Div by 0";
    } else {
      // Format to avoid long decimals
      res = Math.round(res * 10000) / 10000;
    }

  } catch (e) {
    res = "Error";
  }

  // Update Display
  display.value = res;

  // Add to History
  if (res !== "Error" && res !== "Error: Div by 0") {
    let calc = `${expression} = ${res}`;
    history.unshift(calc);
    if (history.length > 5) history.pop();
    showHistory();
  }
}

function showHistory() {
  let list = document.getElementById('history');
  list.innerHTML = "";
  history.forEach(item => {
    let li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  showHistory();
}
