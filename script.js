document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".task-input");
  const addBtn = document.querySelector(".add-task-btn");
  const tasksSection = document.querySelector(".tasks-section");

  let tasksList = document.querySelector(".tasks-list");
  if (!tasksList) {
    tasksList = document.createElement("div");
    tasksList.className = "tasks-list";
    tasksSection.appendChild(tasksList);
  }

  function addTask() {
    const value = input.value.trim();
    if (value) {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";

      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = value;

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      const editIcon = document.createElement("i");
      editIcon.className = "bi bi-pencil-square icon-img";
      editBtn.appendChild(editIcon);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "bi bi-trash3-fill icon-img";
      deleteBtn.appendChild(deleteIcon);

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(editBtn);
      taskItem.appendChild(deleteBtn);
      tasksList.appendChild(taskItem);
      input.value = "";

      tasksList.scrollTop = tasksList.scrollHeight;

      if (tasksList.childElementCount > 3) {
        tasksList.style.maxHeight = "240px";
        tasksList.style.overflowY = "auto";
      }

      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskText.style.textDecoration = "line-through";
          taskText.style.color = "#888";
        } else {
          taskText.style.textDecoration = "";
          taskText.style.color = "";
        }
      });

      let isEditing = false;
      editBtn.addEventListener("click", function () {
        if (!isEditing) {
          const editInput = document.createElement("input");
          editInput.type = "text";
          editInput.value = taskText.textContent;
          editInput.className = "edit-input";
          taskItem.replaceChild(editInput, taskText);
          editIcon.className = "bi bi-check-square icon-img";
          isEditing = true;
        } else {
          const editInput = taskItem.querySelector(".edit-input");
          taskText.textContent = editInput.value;
          taskItem.replaceChild(taskText, editInput);
          editIcon.className = "bi bi-pencil-square icon-img";
          isEditing = false;
        }
      });

      deleteBtn.addEventListener("click", function () {
        tasksList.removeChild(taskItem);
      });
    }
  }

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
  });
});
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
