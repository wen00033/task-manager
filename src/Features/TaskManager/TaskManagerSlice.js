import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskManager: [],
  currentTask: {},
};

const TaskManagerSlice = createSlice({
  name: "TaskManager",
  initialState,
  reducers: {
    AddNewTask: (state, action) => {
      state.taskManager = [...state.taskManager, action.payload];
    },
    DeleteTask: (state, action) => {
      state.taskManager = state.taskManager.filter(
        (task) => task.id !== action.payload
      );
    },
    CurrentTask: (state, action) => {
      state.currentTask = state.taskManager.find(
        (task) => task.id === action.payload
      );
    },
    AddNewSingleTask: (state, action) => {
      state.taskManager = state.taskManager.map((object) => {
        if (object.id === action.payload.id) {
          if (object.task) {
            return { ...object, task: [...object.task, action.payload.task] };
          } else {
            return {
              ...object,
              task: [action.payload.task],
            };
          }
        }
        return object;
      });
    },
    UpdateSingleTask: (state, action) => {
      state.taskManager = state.taskManager.map((object) => {
        if (object.id === state.currentTask.id) {
          return {
            ...object,
            task: [...object.task].map(
              (object) =>
                [action.payload].find((task) => task.id === object.id) || object
            ),
          };
        }
        return object;
      });
    },
  },
});

export const {
  AddNewTask,
  DeleteTask,
  CurrentTask,
  AddNewSingleTask,
  UpdateSingleTask,
} = TaskManagerSlice.actions;
export default TaskManagerSlice.reducer;
