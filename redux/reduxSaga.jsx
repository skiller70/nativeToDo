import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';
import {firebase} from '@react-native-firebase/database';

export const reference = firebase
  .app()
  .database(
    'https://hunny-hub-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

function* addToDo(action) {
  const checkInput = yield select(state => state.toDoReducer.toDoTextInput);

  try {
    if (checkInput) {
      yield call(
        [reference.ref(`toDoList/${action.payload.id}`), 'set'],
        action.payload,
      );
      yield put({type: 'removeInputText'});
    } else {
      yield put({type: 'closePopUp', payload: true});
    }
  } catch (error) {}
}

function* confirmEdit(action) {
  const globalState = yield select(state => state.toDoReducer);

  try {
    yield call([reference.ref(`toDoList/${globalState.editId}`), 'set'], {
      text: globalState.editInputText,
    });
    yield put({type: 'closeEditPopup', payload: false});
  } catch (error) {}
}


function* removeToDo(action){

  yield call([reference.ref(`toDoList/${action.payload}`), 'remove']);
}


// -****************************************************------------------------------------------
export default function* watcher() {
  yield takeEvery('ADD_TODO', addToDo);
  yield takeEvery('CONFIRM_EDIT', confirmEdit);
  yield takeEvery('DELETE_TODO', removeToDo);
}
