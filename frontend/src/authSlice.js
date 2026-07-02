import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
<<<<<<< HEAD
import axiosClient from '../src/utils/axiosClient'



export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/login', credentials);
      // ✅ token সেভ করো
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
=======
import axiosClient from './utils/axiosClient'



const extractError = (error) => error.response?.data?.message || error.message || 'Something went wrong';
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const response = await axiosClient.post('/register', userData);
      // ✅ token সেভ করো
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register failed");
=======
      const response = await axiosClient.post('/user/register', userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(extractError(error));
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const { data } = await axiosClient.get('/check');
      // ✅ নতুন token সেভ করো
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(error.response?.data);
=======
      const { data } = await axiosClient.get('/user/check');
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); 
      }
      return rejectWithValue(extractError(error)); 
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      await axiosClient.post('/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error);
=======
      await axiosClient.post('/user/logout');
      return null;
    } catch (error) {
      return rejectWithValue(extractError(error));
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
    }
  }
);

<<<<<<< HEAD
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
      // Register User Cases
=======
    
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
<<<<<<< HEAD
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
  
      // Login User Cases
=======
        .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong'; 
        state.isAuthenticated = false;
       state.user = null;
      })
  

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
  
<<<<<<< HEAD
      // Check Auth Cases
=======
    
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
  
<<<<<<< HEAD
      // Logout User Cases
=======

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export default authSlice.reducer;