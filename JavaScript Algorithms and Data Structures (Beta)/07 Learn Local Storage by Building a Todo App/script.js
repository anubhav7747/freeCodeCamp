const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// array will store all the tasks along with their associated data. This storage will enable you to keep track of tasks, display them on the page, and save them to localStorage.
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// used to track the state when editing and discarding tasks.
let currentTask = {};

const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));

  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
          <div class="task" id="${id}">
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Description:</strong> ${description}</p>
            <button type="button" class="btn" onclick="editTask(this)">Edit</button>
            <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
          </div>
        `;
  });
};

const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);

  localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

// to clear the input fields after adding a task
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

if (taskData.length) {
  updateTaskContainer();
}

// opening and closing the form modal
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

// to display a modal dialog box on a web page
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  // confirmCloseDialog.showModal();
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// to close a modal dialog box on a web page
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

// to close the modal showing the Cancel and Discard buttons
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();

  // the form modal will close too
  // taskForm.classList.toggle("hidden");

  reset();
});

// to get the values from the input fields, save them and display them.
taskForm.addEventListener("submit", (e) => {
  // to stop the browser from refreshing the page after submitting the form
  e.preventDefault();

  //   const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  //   const taskObj = {
  //     id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
  //     title: titleInput.value,
  //     date: dateInput.value,
  //     description: descriptionInput.value,
  //   };

  //   if (dataArrIndex === -1) {
  //     taskData.unshift(taskObj);
  //   }

  //   taskData.forEach(({ id, title, date, description }) => {
  //     tasksContainer.innerHTML += `
  //         <div class='task' id='${id}'></div>
  //         <p><strong>Title:</strong> ${title}</p>
  //         <p><strong>Date:</strong> ${date}</p>
  //         <p><strong>Description:</strong> ${description}</p>
  //         <button type="button" class="btn">Edit</button>
  //         <button type="button" class="btn">Delete</button>
  //         `;
  //   });

  // taskForm.classList.toggle('hidden');
  // reset();

  addOrUpdateTask();
});

// console.log(taskData);

// const myTaskArr = [
//   { task: "Walk the Dog", date: "22-04-2022" },
//   { task: "Read some books", date: "02-11-2023" },
//   { task: "Watch football", date: "10-08-2021" },
// ];

// localStorage.setItem("data", JSON.stringify(myTaskArr));

// // localStorage.removeItem('data');
// localStorage.clear();

// const getTaskArr = localStorage.getItem("data");
// console.log(getTaskArr);

// const getTaskArrObj = JSON.parse(localStorage.getItem('data'));
// console.log(getTaskArrObj);
