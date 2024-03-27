import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../../utils/data.ts";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  close: false,
  title: "",
  status: "",
};

const headerSlice = createSlice({
  name: "headerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDocument.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addDocument.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const addDocument = createAsyncThunk(
  "addDocument",
  async function addDocument(action) {
    await addDoc(collection(db, "Task-Manager"), {
      title: action,
    });
  }
);

// export const { } = headerSlice.actions;
export default headerSlice.reducer;
