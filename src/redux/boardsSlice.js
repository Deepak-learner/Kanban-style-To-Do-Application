import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("kanbanState")) || {
  name: "Kanban Board",
  columns: [
    {
      name: "Backlog",
      tasks: [
        {
          title: "Set Up Project",
          description: "Initialize project and set up basic files.",
          id: 1,
          dueDate: "2024-09-22",
        },
        {
          title: "Research Authentication",
          description: "Look into methods like JWT and OAuth.",
          id: 2,
          dueDate: "2024-09-24",
        },
      ],
    },
    {
      name: "Doing",
      tasks: [
        {
          title: "Create Login Page",
          description: "Build login feature with JWT.",
          id: 3,
          dueDate: "2024-09-25",
        },
        {
          title: "Design Homepage",
          description: "Work on the homepage layout and style.",
          id: 4,
          dueDate: "2024-09-26",
        },
      ],
    },
    {
      name: "Review",
      tasks: [
        {
          title: "Review Signup Code",
          description: "Check signup code for bugs.",
          id: 5,
          dueDate: "2024-09-18",
        },
        {
          title: "Feedback on Dashboard",
          description: "Collect feedback on dashboard UI.",
          id: 6,
          dueDate: "2024-09-19",
        },
      ],
    },
    {
      name: "Done",
      tasks: [
        {
          title: "Wireframe Settings Page",
          description: "Completed wireframe for settings page.",
          id: 7,
          dueDate: "2023-09-23",
        }
      ],
    },
  ],
};
const saveToLocalStorage = (state) => {
  localStorage.setItem("kanbanState", JSON.stringify(state));
};
const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    loadFromLocalStorage: (state) => {
      const localState = JSON.parse(localStorage.getItem("kanbanState"));
      if (localState) {
        return localState;
      }
      return state;
    },
    addTask: (state, action) => {
      const { title, description, dueDate, colIndex } = action.payload;
      const column = state.columns[colIndex];
      column.tasks.push({
        id: Date.now(),
        title,
        description,
        dueDate,
      });
      saveToLocalStorage(state);
    },
    editTask: (state, action) => {
      const { title, description, dueDate, colIndex, taskIndex } = action.payload;
      const task = state.columns[colIndex].tasks[taskIndex];
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      saveToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      state.columns[colIndex].tasks.splice(taskIndex, 1);
      saveToLocalStorage(state);
    },
    updateTaskStatus: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const task = state.columns[prevColIndex].tasks.splice(taskIndex, 1)[0];
      state.columns[colIndex].tasks.push(task);
      saveToLocalStorage(state);
    },
    reorderTaskInColumn: (state, action) => {
      const { colIndex, sourceIndex, destinationIndex } = action.payload;
      const column = state.columns[colIndex];
      const [movedTask] = column.tasks.splice(sourceIndex, 1);
      column.tasks.splice(destinationIndex, 0, movedTask);
    },
  },
});
export const {
  loadFromLocalStorage,
  reorderTaskInColumn,
  addTask,
  editTask,
  deleteTask,
  updateTaskStatus,
} = boardsSlice.actions;
export default boardsSlice.reducer;