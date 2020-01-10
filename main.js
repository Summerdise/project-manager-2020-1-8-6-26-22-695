let tbody = document.getElementsByTagName("tbody")[0];
let data;

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
      return '<td class="list-content active-color">' + oneProject.status + '</td>';
    case "PENDING":
      return '<td class="list-content pending-color">' + oneProject.status + '</td>';
    case "CLOSED":
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
}


loadtTasks();