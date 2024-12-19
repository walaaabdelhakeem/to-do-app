var btnAdd = document.getElementById("btn-add");
var writeTask = document.getElementById("writetask");
var btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", function () {
  if (writeTask.value == "") {
    setTimeout(() => {
      document.querySelector(".error").classList.add("d-none");
    }, 4000);
    document.querySelector(".error").classList.remove("d-none");
  } else {
    var user = {
      title: writeTask.value,
      apiKey: "67632dfd60a208ee1fde513a",
    };
    addTask(user);
  }
});

getALLTask();

async function addTask(user) {
  document.querySelector(".load").classList.remove("d-none");
  btnAdd.style.display = "none";
  var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  var response = await data.json();
  document.querySelector(".load").classList.add("d-none");
  btnAdd.style.display = "block";
  if (response.message == "success") {
    document.querySelector(".error").classList.add("d-none");
    getALLTask();
  }
  if (response.message == "error") {
    document.querySelector(".error").classList.add("d-none");
    document.querySelector(".error").textContent = "can not add tack try again";
  }
}

async function getALLTask() {
  try {
    document.querySelector(".loader").classList.remove("d-none");
    document.getElementById("tasks").classList.add("d-none");
  } catch (e) {
    console.log(e);
  }
  var data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/67632dfd60a208ee1fde513a"
  );
  var response = await data.json();
  if (response.message == "success") {
    document.getElementById("tasks").classList.remove("d-none");
    document.querySelector(".loader").classList.add("d-none");
    display(response.todos);
    writeTask.value = "";
  }
}
async function deleteorputTask(userid, method) {
  var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: method,
    body: JSON.stringify({ todoId: userid }),
    headers: { "Content-Type": "application/json" },
  });
  var response = await data.json();
  if (response.message == "success") {
    getALLTask();
  }
}

function display(data) {
  var allDIv = "";
  if (data.length == 0) {
    document.querySelector(".text").textContent = "No tasks";
  }else
  {
    document.querySelector(".text").textContent = "All tasks";
  }
  for (let i = 0; i < data.length; i++) {
    allDIv += ` <div class="${
      data[i].completed ? "bg-warning" : ""
    } p-2 my-3 mx-3 rounded-4 task d-flex justify-content-between">
           <p class="  ${
             data[i].completed ? "text-decoration-line-through" : ""
           }"> ${data[i].title}</p> 
           
            <div>
              <i class=" ${
                data[i].completed ? "d-none" : ""
              } fa-solid fa-thumbs-up me-2" onclick="deleteorputTask('${
      data[i]._id
    }','put')"></i>
              <i class="fa-solid fa-xmark me-2" onclick="deleteorputTask('${
                data[i]._id
              }','delete')"></i>
            </div>
          </div>`;
  }
  document.getElementById("tasks").innerHTML = allDIv;
}


// function Instactor(name,age,gener) {
//   this.name=name;
//   this.age=age;
//   this.gener=gener
// }
// let odj=new Instactor('walaa',25,'female');
// console.log(odj)