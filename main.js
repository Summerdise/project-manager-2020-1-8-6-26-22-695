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
      console.log(data);
      listLoad();
    }
  }
}
function listLoad() {
  for (var i = 0; i < 2; i++) {
    console.log(i);
    console.log(data[0]);
    loadProjects(data[0]);
  }
  let ellipsisRow = document.createElement("tr");
  ellipsisRow.innerHTML = '<td class="ell-row">...</td>'
  tbody.appendChild(ellipsisRow);
}
function loadProjects(oneProject) {
  // let projectName = oneProject.name;
  // let projectDescription = oneProject.description;
  // let projectEndTime = oneProject.endTime;
  // let projectState = oneProject.status;

  let addTableRow = document.createElement("tr");
  let addInner = "";
  addInner += '<td class="list-content">' + oneProject.name + '</td>';
  addInner += '<td class="list-content">' + oneProject.description + '</td>';
  addInner += '<td class="list-content">' + oneProject.endTime + '</td>';
  addInner += '<td class="list-content">' + oneProject.status + '</td>';
  addInner += '<td class="list-content"><div class="delete-icon">删除</div></td>';
  addTableRow.innerHTML = addInner;
  tbody.appendChild(addTableRow);
}

loadtTasks();
// listLoad();