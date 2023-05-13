import {configureStore} from '@reduxjs/toolkit';
import {toDoReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import watcher from './reduxSaga';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {toDoReducer},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(watcher);

export default store;