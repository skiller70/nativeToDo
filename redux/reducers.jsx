import {createReducer} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import {reference} from '../App';

const initialState = {
  test: 'hellll',
  toDoTextInput: '',
  toDoList: [],
  popUp: false,
  isEdit: false,
  editId: '',
  editInputText: '',
  userLogIn : ''
};

export const toDoReducer = createReducer(initialState, {
  // CHANGE TEXT INPUT STATE
  changeTextInput: (state, payload) => {
    state.toDoTextInput = payload.payload;
  },
  // ADD ITEMS IN TODO LIST
  removeInputText: (state, payload) => {
   state.toDoTextInput = " "
  },
  //CLOSE POPUP
  closePopUp: (state, action) => {
    state.popUp = action.payload;
  },
  closeEditPopup: (state, action) => {
    state.isEdit = action.payload;
  },

  //DELETE ITEM FROM TO DO LIST
  deleteToDo: (state, action) => {
    const itemId = action.payload;
    state.toDoList = state.toDoList.filter(item => item.id !== itemId);
  },
  //CHANGE EDIT TEXT INPUT

  changeEditInput: (state, action) => {
    state.editInputText = action.payload;
  },

  //EDIT ITEM FROM TO DO LIST
  editToDo: (state, action) => {
    state.editId = action.payload.id
   state.editInputText = action.payload.text;
    state.isEdit = true;
  },
  //Confirm edit text
  // confirmEdit: (state, action) => {
  //   let itemIndex = state.toDoList.findIndex(item => item.id == state.editId);

  //   state.toDoList[itemIndex].text = state.editInputText;

  //   state.editId = '';

  //   state.editInputText = '';

  //   state.isEdit = false;
  // },
  //Cancel edit text

  cancelEdit: (state, action) => {
    state.editId = '';

    state.editInputText = '';

    state.isEdit = false;
  },
  fetchToDoList: (state, action) => {},

  // FETCH DATA

  fetchAllToDo: (state, action) => {
    state.toDoList = action.payload;
  },

  setUserLogin : (state,action)=>{
    state.userLogIn = action.payload
  }
});
