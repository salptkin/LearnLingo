import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterTeachers: [],
  name: '',
  selectedLevel: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, { payload }) => {
      state.filterTeachers = payload;
    },
    deleteFilter: state => {
      state.filterTeachers = [];
    },
    addFilterName: (state, { payload }) => {
      state.name = payload;
    },
    setSelectedLevel: (state, { payload }) => {
      state.selectedLevel = payload;
    },
  },
});

export const { addFilter, deleteFilter, addFilterName, setSelectedLevel } = filterSlice.actions;