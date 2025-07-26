import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.token = payload;
    },
    deleteToken: state => {
      state.token = '';
    },
  },
});

export const { addToken, deleteToken } = authUserSlice.actions;