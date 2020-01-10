let tbody = document.getElementsByTagName("tbody")[0];
let activeNum = 0;
let pendingNum = 0;
let closedNum = 0;
let data;
let moduleNumber = document.getElementsByClassName("module-number");
let modulePercentage = document.getElementsByClassName("module-percentage");

function loadtTasks() {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "./db.json", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      let res = JSON.parse(xhr.responseText);
      data = res.projects;
      firstLoad();
    }
  }
}
function firstLoad() {
  for (var i = 0; i < 2; i++) {
    loadProjects(data[i]);
  }
  let ellipsisRow = document.createElement("tr");
  ellipsisRow.innerHTML = '<td class="ell-row" colspan="5"><span class="ellipsis-block" onmouseover="totalLoad()">。。。</span></td>'
  tbody.appendChild(ellipsisRow);
  updateDataNum();
}
function loadProjects(oneProject) {
  let addTableRow = document.createElement("tr");
  let addInner = "";
  addInner += '<td class="list-content">' + oneProject.name + '</td>';
  addInner += '<td class="list-content">' + oneProject.description + '</td>';
  addInner += '<td class="list-content">' + oneProject.endTime + '</td>';
  let coloredState = addStateColor(oneProject);
  addInner += coloredState;
  addInner += '<td class="list-content"><div class="delete-icon">删除</div></td>';
  addTableRow.innerHTML = addInner;
  tbody.appendChild(addTableRow);
}
function addStateColor(oneProject) {
  let status = oneProject.status;
  switch (status) {
    case "ACTIVE":
      activeNum++;
      return '<td class="list-content active-color">' + oneProject.status + '</td>';
    case "PENDING":
      pendingNum++;
      return '<td class="list-content pending-color">' + oneProject.status + '</td>';
    case "CLOSED":
      closedNum++;
      return '<td class="list-content closed-color">' + oneProject.status + '</td>';
    default:
      break;
  }
}
function totalLoad() {
  let ellRow = document.getElementsByClassName("ell-row")[0];
  tbody.removeChild(ellRow.parentElement);
  for (let i = 2; i < data.length; i++) {
    loadProjects(data[i]);
  }
  updateDataNum();
}
function updateNum() {
  let totalNum = activeNum + pendingNum + closedNum;
  moduleNumber[0].innerHTML = totalNum;
  moduleNumber[1].innerHTML = activeNum;
  moduleNumber[2].innerHTML = pendingNum;
  moduleNumber[3].innerHTML = closedNum;
}
function updatePercentage() {
  let totalNum = activeNum + pendingNum + closedNum;
  let activePer = percentage(activeNum, totalNum);
  let pendingPer = percentage(activeNum, totalNum);
  let closedPer = 100 - activePer - pendingPer;
  modulePercentage[0].innerHTML = activePer + '%';
  modulePercentage[1].innerHTML = pendingPer + '%';
  modulePercentage[2].innerHTML = closedPer + '%';
}
function updateDataNum() {
  updateNum();
  updatePercentage();
}
function percentage(num, total) {
  if (num == 0 || total == 0) {
    return 0;
  }
  return (Math.round(num / total * 10000) / 100.00);
}

loadtTasks();