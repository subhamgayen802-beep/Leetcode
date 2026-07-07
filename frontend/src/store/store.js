import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
<<<<<<< HEAD

export const store = configureStore({
  reducer: {
    auth: authReducer
=======
import problemReducer  from "../problemSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems:problemReducer
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
  }
});

