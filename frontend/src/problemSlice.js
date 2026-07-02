// src/problemSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

// ✅ localStorage থেকে cache load করো
const loadFromCache = () => {
  try {
    const cached = localStorage.getItem("problems");
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    
    // ✅ 10 মিনিটের বেশি পুরনো হলে re-fetch করবে
    const isExpired = Date.now() - timestamp > 10 * 60 * 1000;
    if (isExpired) return null;
    
    return data;
  } catch {
    return null;
  }
};

export const fetchProblems = createAsyncThunk(
  "problems/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      // ✅ Redux এ আগে থেকে data থাকলে আবার fetch করবে না
      const existing = getState().problems.data;
      if (existing.length > 0) return existing;

      const { data } = await axiosClient.get("/problem/getAllProblem");

      // ✅ localStorage এ save করো timestamp সহ
      localStorage.setItem("problems", JSON.stringify({
        data,
        timestamp: Date.now()
      }));

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchSolvedProblems = createAsyncThunk(
  "problems/fetchSolved",
  async (_, { getState, rejectWithValue }) => {
    try {
      const existing = getState().problems.solvedData;
      if (existing.length > 0) return existing;

      const { data } = await axiosClient.get("/problem/problemSolvedByUser");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


const problemSlice = createSlice({
  name: "problems",
  initialState: {
    data: loadFromCache() || [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        if (state.data.length === 0) {
          state.loading = true;
        }
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default problemSlice.reducer;