// Task store module extracted from routes for reuse and easier testing.
// Mirrors the original FastAPI in-memory list. Not persistent.

const seedTasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

let tasks = [...seedTasks];

function listTasks() {
  return tasks;
}

function addTask(text) {
  tasks.push(text);
  return text;
}

function deleteTaskByIndex(index) {
  if (index < 0 || index >= tasks.length) return null;
  const removed = tasks.splice(index, 1)[0];
  return removed;
}

// Test helper to reset state between tests.
function resetTasks() {
  tasks = [...seedTasks];
}

module.exports = {
  listTasks,
  addTask,
  deleteTaskByIndex,
  resetTasks,
  // export seed for potential assertions
  seedTasks
};
