let history = [];

function calculate() {
  let n1 = Number(document.getElementById('num1').value);
  let n2 = Number(document.getElementById('num2').value);
  let op = document.getElementById('operator').value;
  let res;

  if (op === '/' && n2 === 0) {
    res = "Error: Cannot divide by zero";
  } else {
    if (op === '+') res = n1 + n2;
    else if (op === '-') res = n1 - n2;
    else if (op === '*') res = n1 * n2;
    else if (op === '/') res = n1 / n2;
  }

  document.getElementById('result').innerText = "Result: " + res;

  if (typeof res === "number" || (typeof res === "string" && res.startsWith("Error"))) {
    let calc = `${n1} ${op} ${n2} = ${res}`;
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
