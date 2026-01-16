function addStudent() {
  let name = document.getElementById('name').value;
  let math = Number(document.getElementById('math').value);
  let science = Number(document.getElementById('science').value);
  let english = Number(document.getElementById('english').value);

  let total = math + science + english;
  let percent = total / 3;
  let grade = percent >= 60 ? "A" : percent >= 40 ? "B" : "F";
  let pass = math >= 40 && science >= 40 && english >= 40;

  let table = document.getElementById('resultTable');
  let row = table.insertRow();
  row.insertCell(0).innerText = name;
  row.insertCell(1).innerText = math;
  row.insertCell(2).innerText = science;
  row.insertCell(3).innerText = english;
  row.insertCell(4).innerText = total;
  row.insertCell(5).innerText = percent.toFixed(2) + "%";
  row.insertCell(6).innerText = grade;

  if (!pass) {
    row.className = "fail";
  } else {
    row.className = "pass";
  }
}
